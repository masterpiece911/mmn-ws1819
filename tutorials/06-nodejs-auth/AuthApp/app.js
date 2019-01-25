const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');


// Our custom modules:
const privateRoute = require('./routes/private');
const authRoute = require('./routes/auth');

// Instantiate the web app.
const app = express();


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Now all parsing middleware is there and we can use more advanced middleware.

// TODO initialize passport
app.use(passport.initialize());

const { Strategy, ExtractJwt } = require('passport-jwt');

const jwtOptions = {
  secretOrKey: config.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use('mmn-auth', new Strategy(
  jwtOptions, (payload, done) => {
    if (payload.auth.read) {
      done(null, 'Authorized User');
    } else {
      done(null, false);
    }
  }
));

// Forwarder if logged in
app.use('/', [ express.static(path.join(__dirname, 'public')) ]);
app.use('/auth', authRoute);

app.use('/private', [
  passport.authenticate('mmn-auth', {
    failWithError: true,
    session: false,
  }),
  privateRoute,
]);



// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// Error handlers

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;

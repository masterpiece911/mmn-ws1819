var express = require('express');
var router = express.Router();

/*
Breakout #1
get all christmas tracks and render them into a pug view
 */
router.get('/christmastracks', function (req,res) {

    const db = req.db;

    const songsCollection = db.get('albums');
    songsCollection.find({}, {}, function(e, docs) {
        if (e) {
            res.status(500).send();
        } else {
            res.render('music', {tracks: docs})
        }
    });

    


    // TODO Breakout #1 - load all christmas tracks from your MongoDB and render them into a pug view by calling the following:
    // res.render('music', {tracks: docs})
    // (docs is the array containing the track documents)
});

/*
TODO Breakout #2:
TODO create a endpoint which expects a query parameter trackname and increases that track's popularity by 5 which each call
TODO finally, the updated track should be rendered in a pug view similar as in Breakout #1
 */

router.post('/updatepopularity', (req,res) => {
    const db = req.db;
    const tracks = db.get('tracks');

    const trackname = req.query.trackname;

    tracks.findOneAndUpdate({name:trackname}, {$inc: {popularity: 5}}).then(updatedDoc => {
        res.render('music', {tracks: [updatedDoc]})
    }).catch(e => {
        console.error(e);
        res.status(500).send();
    });
});


module.exports = router;

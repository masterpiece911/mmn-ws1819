const express = require('express');
const config = require('../config');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {

    console.log(req.body.key);

    if(req.body.key == config.API_KEY) {
        const token = jwt.sign({
            auth: {read: true}
         }, config.SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid API key' });
    }

});




module.exports = router;
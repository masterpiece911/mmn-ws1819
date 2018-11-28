var express = require('express');
var router = express.Router();


var products = {
    'id_A': {
        name: 'Product A',
        price: 30
    },
    'id_B': {
        name: 'Product B',
        price: 50
    }
};


/* GET home page. */
router.get('/', function (req, res, next) {
    var productArray =
        Object.keys(products).map(function(key) {
            var entry = products[key];
            entry.id = key;
            return entry;
        });
    var response = {
        code: 200,
        products: productArray
    };
    res.json(response);
});

router.post('/', function(req, res, next) {
    var entry, id, response;
    if (req.body.name && req.body.price) {
        id = Math.random();
        entry = {};
        entry[id] = {
            id : id,
            name : req.body.name,
            price : req.body.price
        };
        products[id] = entry[id];
        response = {
            code : 201,
            message : 'created product',
            products : [entry]
        };
    } else {
        response = {
            code : 400,
            message : "bad request. required parameters: name, price"
        }
    };
});


module.exports = router;

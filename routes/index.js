var express = require('express');
var router = express.Router();

var Product= require('../models/product');

/* GET home page. */

//Read

router.get('/', function(req, res, next) {
  Product.find(function (err,docs) {

    var productChunks = [];
    var chunkSize = 3;

    for (var i=0; i< docs.length; i += chunkSize){

      productChunks.push(docs.slice(i, i + chunkSize));

    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks});

  });
});

router.get('/add-to-cart/:id', function(req, res, next) {

    res.render('shop/index', { title: 'Shopping Cart', products: productChunks});


});

module.exports = router;

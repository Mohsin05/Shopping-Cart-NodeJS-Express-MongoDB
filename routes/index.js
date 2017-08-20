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
router.get('/signup', function(req, res, next) {

  res.render('user/signup', { title: 'Signup'});


});
router.get('/signin', function(req, res, next) {

  res.render('user/signin', { title: 'Signin'});


});

module.exports = router;

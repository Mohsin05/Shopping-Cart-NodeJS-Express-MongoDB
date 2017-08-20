var express = require('express');
var router = express.Router();

var Product= require('../models/product');


//csrf is the protection for the routes so below we include the route
var csrf = require('csurf');

var csrfProtection = csrf();

//below we are inlcuding the csrfprotection here we are telling the node that each of the route will
//be protected with the csrf protection

router.use(csrfProtection);

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



router.get('/user/signup', function(req, res, next) {


  res.render('user/signup', {csrfToken: req.csrfToken()});


});



router.post('/user/signup', function(req, res, next) {

  // var email= req.body.email;
  // console.log(email);
  res.redirect('/');

});




router.get('/signin', function(req, res, next) {

  res.render('user/signin', { title: 'Signin'});

});



module.exports = router;

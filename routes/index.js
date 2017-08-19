var express = require('express');
var router = express.Router();

/* GET home page. */

//Read

router.get('/', function(req, res, next) {
  res.render('shop/index', { title: 'Shopping Cart' });
});

module.exports = router;

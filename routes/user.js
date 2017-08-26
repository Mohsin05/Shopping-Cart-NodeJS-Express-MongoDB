var express = require('express');
var passport= require('passport')

var router = express.Router();

//csrf is the protection for the routes so below we include the route
var csrf = require('csurf');

var csrfProtection = csrf();

//below we are inlcuding the csrfprotection here we are telling the node that each of the route will
//be protected with the csrf protection

router.use(csrfProtection);

//the notLoggedin filter will restrict the loading of certain pages when the user is logged in
//when notLoggedIn condition is true the pages will not load. which have this filter.
router.get('/signup',notLoggedIn, function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages:messages , hasErrors: messages.length > 0} );
});



router.post('/signup', passport.authenticate('local.signup', {

    successRedirect: '/user/signin',
    failureRedirect: '/user/signup',
    failureFlash: true
}));




router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

router.get('/signin',notLoggedIn, function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages:messages , hasErrors: messages.length > 0} )});


//the below isLoggedIn is a kind of filer which restricts to load the profile only when there user is login


router.get('/profile',isLoggedIn, function(req, res, next) {

    res.render('user/profile', { title: 'Signin'});

});

router.get('/logout',function (req,res,next) {
   req.logout();
   res.redirect('/');

});

module.exports = router;

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){

    return next();

    }
    res.redirect('/')
}

function notLoggedIn(req,res,next) {
    if(!req.isAuthenticated()){

    return next();

    }
    res.redirect('/')
}
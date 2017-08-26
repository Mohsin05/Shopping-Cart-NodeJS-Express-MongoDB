//we have include the passport file in the app.
var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

//it tell the passport to how to store the user in the session
passport.serializeUser(function (user, done) {
    done(null,user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id,function (err,user) {
        done(err,user);
    });
});

//where the local.signup is the name of the stratgy we have use that in the route in index.js
passport.use('local.signup', new LocalStrategy({
         usernameField: 'email',
         //usernameField:'name',
         passwordField: 'password',
         passReqToCallback:true
},function (req,email,password,done) {

    /* This validaotor works prefectly but it is implimented using bootstrap class uncomment it
        to make it work.

    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.checkBody('password','Invalid password').notEmpty().isLength({min:4});

    var errors = req.validationErrors();
    if (errors){

        var messages = [];
        errors.forEach(function (error) {

            messages.push(error.msg);
        });
        return done(null,false,req.flash('error',messages));
    }*/


//var name=req.body.name;
    User.findOne( {'email':email},function (err,user) {
        if (err){
            return done(err);}
        if (user){
            return done(null,false,{message:'Email is already in use.'});}
        var newUser = new User();
        newUser.email = email;

      // newUser.username=name;

        console.log(newUser.username);
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err,result) {
            if (err){
                return done(err); }
            return done(null,newUser);
        });
    })}
));



//local.signin is the name of the stratgy
passport.use('local.signin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {


    User.findOne( {'email':email},function (err,user) {
        if (err){
            return done(err);}
        if (!user){
            return done(null,false,{message:'No user found.'});}

        if(!user.validPassword(password)) {
            return done(null,false,{message:'Wrong password.'});}

        return done(null,user);

    })

    }));


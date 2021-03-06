var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs=require('express-handlebars');
var index = require('./routes/index');
var user = require('./routes/user');
var mongoose=require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
//session
var session = require('express-session');

//instead of using the default session we will use the connect-mongo session module. becs it is not good practice
//to use the default memory
var MongoStore = require('connect-mongo')(session);

var app = express();
mongoose.connect('localhost:27017/shopping');

// we just import that and all the passport code is suppose to be here.
require('./config/passport');

// view engine setup
app.engine('.hbs',expressHbs({defaultLayout: 'layout',extname:'.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//starting the validator
app.use(validator());
app.use(cookieParser());

//this is use to save the sessoion where mysupersecret is the key
//after installing the connect mongo module now we can add some other variable like storing the session into the
//database and storing the cookie time, now we are also storing into the mongodb
app.use(session({secret: 'mysupersecret',
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    cookie: {maxAge:180*60*100}
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


//creating the local vaiable login to enable or disaable the login or logout button
//app.use is use to intite something.
app.use(function (req,res,next) {
    res.locals.login = req.isAuthenticated();

    res.locals.session = req.session;

    //by next we are letting the req to continue other wise it will keep on loading this function
    //and will not display anything else.
    next();
});

app.use('/user', user);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

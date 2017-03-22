var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var session;
var passport = require('passport');
var expressValidator = require('express-validator');




var app = express();

var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
})
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessions({
	secret: '&^%^&UFGFGHF%&*%^GUF%^&%UG&^%',
	resave: false,
	saveUninitialixed: true
}));
app.use(expressValidator());

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use( passport.initialize());
app.use( passport.session());

passport.use(new GoogleStrategy({
    clientID:     "854726433028-0vtss2k30sabg8u3o9dhdvqrec5i5l58.apps.googleusercontent.com",
    clientSecret: "dwmTRlQ8Y106pa_F5MPU5OPd",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
  
      return done(null, profile);
    });
  }
));



app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }
));

 
app.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        failureRedirect: 'http://localhost:4200',
        successRedirect: '/api/v5/google'
}));





var dbUrl = 'mongodb://localhost:27017/event_dbs';
mongoose.connect(dbUrl);

app.use('/api/v5', users);


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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}


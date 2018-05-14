var express = require('express');
//var auth_app = angular.module("auth_app", [])
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/meeting_management')
  .then(() => console.log('connection successful'))
  .catch((err) => console.log(err));

var passport = require('passport');
var auth_app = angular.module("auth_app", [])
var LocalStrategy = require('passport-local').Strategy;
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// passport configuration
var User = require('./models/User');
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Telling passport that when user is
// serialized, only user id is required.
// When deserializing a user from session
// data, look up the user by id.

passport.serializeUser(function(User, done) {
	
	 // tells passport which id to user for user.
	console.log("serializing user: ",  User.id);
    return done(null, user.id);
});

passport.deserializeUser(function(User, done) {
    
     // return user object back.
	console.log("deserializing user ", User.id)
	return done(null, User[email]);
});

function authFail(done) {
  return done(null, false, {message : 'incorrect email or password'});
} 

// Tell passport how to tell if 
// a given email and password 
// represents a valid user. Or,
// tell passport how to authenticate
// users locally via LocalStrategy()
// function. 

passport.use('signup', new LocalStrategy({
	    passReqToCallback : true
    },
	function(email, password, done) {
		
		// check if the user already exist.
		if(User[email]){
			return done("Email already taken", false);
		}
		
		// add user to the db.
		User[email] = {
			email: email,
			password: createHash(password)
		}
		
		// return newly created User object.
		return done(null, User[email]);
	}	
));


passport.use('login', new LocalStrategy(function(err, email, password, done) {
    if (err) {
	  return done(err);
	}  
	// check if user exist
    if (!User[email]) {
	  return authFail(done);
	}
	// check if password is correct
	if (!isValidPassword(User[email], password)) {
	  return authFail(done);
	}
	// else returns a success message to console.
	console.log("Successfully signed in");
	return done(null, User[email]);
  }));

var isValidPassword = function(User, password) {
	return bCrypt.compareSync(password, User.password);
};

// Generates hash using bCrypt 
var createHash = function(password) {
	return bCrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

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

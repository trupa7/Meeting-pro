var express = require('express');
var router = express.Router();
//var auth = require("../controllers/AuthControllers.js");
var User = require('../models/User');

// restrict index for logged in user only

router.get('/', auth.home);

// route to signup page

router.get('/signup', auth.signup);

// route for signup action

//router.post('/signup', auth.doSignup);
router.post('/signup', function(req, res) {
	User.signUp(new User({ email : req.body.email }), req.body.password, function(err, user) {
      if (err) {
	    alert("Sign Up Failed. Try again.");
	    return res.render('signup', { user : user });
	  }
	  
	  passport.authenticate('local')(req, res, function () {
	    alert("Sign up successful. Welcome to Meeting King Management!");
	    res.redirect('/');
	  });
   });
});

// route to login page

router.get('/login', auth.login);

// route for login action

//router.post('/login', auth.doLogin);
router.post('/login', function(req, res) {
	passport.authenticate('local')(req, res, function () {
    alert("Welcome back, user!");
    res.redirect('/');
  });
});

// route for logout action

router.get('/logout', auth.logout);

// route to reset password page

router.get('/resetPassword', auth.resetPassword);

// route for reset password action 

// router.post('/resetPassword', auth.doResetPassword);
router.post('/resetPassword', function(res, req) {
	User.newPassword(new User({ email : req.body.email }) req.body.password, function(err, user) {
	  if(err) {
		  alert("Attempt to reset password failed");
		  res.redirect('resetPassword', {user : user});
	    };
	  passport.authenticate('local')(req, res, function () {
		  alert("Password was reset!");
		  User[email] = req.body.email;
		  User[password] = req.body.newPassword;
		  res.redirect('/');
	  })
   });
});
// /* GET home page. */
// router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
// });

module.exports = router;

'use strict';

var util = require('util');
var passport = require('passport');
var User = require('./models/user');
var LocalStrategy = require('passport-local')
	.Strategy;


// serialize and deserialize
passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

// Middleware
passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {
	User.findOne({ email: email }, function(err, user) {
			if (err) return done(err);

			if (!user || !user.comparePassword(password)) {
				return done(null, false, req.flash('LoginMessage',
					'Ops! You Username or Password could be wrong!'));
			}
			return done(null, user);
		})
		.select('+password')

}));

// custom function to validate
exports.isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/login');
}

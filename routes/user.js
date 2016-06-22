'use strict';

var router = require('express')
	.Router();
var User = require('../models/user');

router.get('/signup', function(req, res) {
	res.render('accounts/signup', {
		errors: req.flash('errors')
	});
});

router.post('/signup', function(req, res, next) {
	var user = new User();
	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

	User.findOne({ email: req.body.email }, function(err, existingUser) {
		if (existingUser) {
			req.flash('errors', "%s already exists", req.body.email)
			return res.redirect('/signup');
		} else {
			user.save(function(err) {
				if (err) return next(err);
				return res.redirect('/');
				res.status(200)
					.json('Successfully created new user');
			});
		}
	});
});


module.exports = router;

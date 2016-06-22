'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: { type: String, select: false },

	profile: {
		name: { type: String, default: '' },
		picture: { type: String, default: '' }
	},

	address: String,
	history: [{
		date: Date,
		paid: { type: Number, default: 0 }
	}]
});


/**
 * HAS THE PASSWORD BEFORE WE EVEN SAVE IT TO THE DATABASE
 * Acts like a middleware for Save Action on MongoDB
 * @param  {Function}
 * @return {null}
 */
UserSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

/**
 * COMPARE PASSWORD IN THE DATABASE AND THE ONE THAT THE USER TYPE IN
 */
UserSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);

'use strict';
var util = require('util');

var server = {
	port: 3000
}

var db = {
	username: "root",
	password: "root",
	connectionString: function() {
		return util.format('mongodb://%s:%s@ds021034.mlab.com:21034/ecommerce', this.username, this.password);
	}
}

var session = {
	secret: ";o]NT]d82nWU;S`;0P8aZ6fvLQVD8-"
}



module.exports = function() {
	return {
		db: db,
		session: session,
		server: server
	}
};

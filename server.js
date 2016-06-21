'use strict';

var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));

app.get('/', function(req, res) {
	res.json("Working")
});

app.listen(3000, function(err) {
	if (err) throw err;
	console.log("Server is Running on Port %d", 3000);
})

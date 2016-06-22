'use strict';
//	Imports
var express = require('express');
var app = express();
var config = require('./config.js')();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var util = require('util');
var MongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');

//	Models
var User = require('./models/user');

//	Database Connection
mongoose.connect(config.db.connectionString(), function(err) {
	if (err) throw err;
	console.log('Connected to database');
})

//	Middlewares
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: config.session.secret,
	store: new MongoStore({
		url: config.db.connectionString(),
		autoReconnect: true
	})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
	res.locals.userInfo = req.user;
	next();
});

// Routes
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);


app.listen(3000, function(err) {
	if (err) throw err;
	console.log("Server is Running on Port %d", config.server.port);
})

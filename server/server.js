// server.js
// From www file
var appBackend = require('./appBackend');
var debug = require('debug')('server:server');
var http = require('http');

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var appBackend      = express();
var path     = require('path');
var port     = process.env.PORT || 3000;

var passport = require('passport');

var morgan       = require('morgan');
//var cookieParser = require('cookie-parser');      Check if this is still needed.
var bodyParser   = require('body-parser');
var session      = require('express-session');

var DB = require('./models/database.js');
var DBPath = './models/data/ProjectTT.db'

const validator = require('./helpers/validate.js');

// Database Config =============================================================
let appDB = new DB.DataAPI();
appDB.initDB(DBPath);

var authentication = require('./config/authentication.js')(appDB);

// Express Application Config ==================================================
appBackend.use(morgan('dev'));
//app.user(cookieParser());
appBackend.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
appBackend.use(bodyParser.json());
// Set Public folder
appBackend.use(express.static(path.join(__dirname, 'public')));

// Required for Passport =======================================================

// Passport does not directly manage your session, it only uses the session.
// So you configure session attributes (e.g. life of your session) via express
var sessionOptions = {
    secret: 'awesomesauce',
    resave: false,
    saveUninitialized: true,
    //store:
    cookie : { httpOnly: true, maxAge: 24192000 } // configure when sessions expires
};

appBackend.use(session(sessionOptions));

//app.use(passport.initialize());
//app.use(passport.session());    // Persistent login sessions
//appBackend.use(flash());                 // Used for messaging


// app.use('/login', authentication.logIn);
// app.use('/logout', authentication.logOut);
//app.use(authentication.validateRequest);

// routes ======================================================================
//require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./appBackend.js')(appBackend, passport, appDB, validator);
require('./config/passport.js') (passport, appDB);

// launch ======================================================================
appBackend.listen(port);
console.log('The magic happens on port ' + port);
// server.js
//var debug = require('debug')('server:server');
//var http = require('http');
var cors = true;

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var appBackend      = express();
var path     = require('path');
var port     = process.env.PORT || 3000;
var host     = '192.168.0.1'

var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var session      = require('express-session');

const DB = require('./models/database.js');
const DB_PATH = './server/models/data/ProjectTT.db'
const SQLiteStore = require('connect-sqlite3')(session);

const { v } = require('./validations.js');


// Database Config =============================================================
let appDB = new DB.DataAPI();
appDB.initDB(DB_PATH);

var passport = require('passport');
require('./config/passport.js')(passport, appDB);

// Express Application Config ==================================================
//appBackend.use(morgan('dev'));
appBackend.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
appBackend.use(bodyParser.json());
// Set Public folder
appBackend.use(express.static(path.join(__dirname, '../dist')));


// Required for Passport =======================================================

// Passport does not directly manage your session, it only uses the session.
// So you configure session attributes (e.g. life of your session) via express
var sessionOptions = {
    secret: 'awesomesauce',
    resave: false,
    saveUninitialized: false,   // This creates a cookie just by visiting the site. We only want to turn this on after login.
    store: new SQLiteStore({
        db: 'ProjectTT.db',
        table: 'sessions',
        dir: 'server/models/data',
    }),
    cookie : {
        maxAge: null,  // configure when sessions expires
        httpOnly: true,
        secure: false
    }
};

appBackend.use(session(sessionOptions));
appBackend.use(passport.initialize());
appBackend.use(passport.session());    // Persistent login sessions


// CORS
if (cors === true) {
    appBackend.use(function (req, res, next){
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
}

// routes ======================================================================
//require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./appBackend.js')(appBackend, passport, appDB, v);


// launch ======================================================================
appBackend.listen(port);
//appBackend.listen(port, host); The host part means that it's required in order for the server to respond!!!
console.log('The magic happens on port ' + port);
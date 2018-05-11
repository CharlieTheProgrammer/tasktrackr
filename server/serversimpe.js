var cors = true;

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var path     = require('path');
var port     = process.env.PORT || 3000;


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
//app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// Set Public folder
app.use(express.static(path.join(__dirname, '../dist')));


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

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());    // Persistent login sessions


// CORS
if (cors === true) {
    app.use(function (req, res, next){
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
}


var myMidware = function(req, res, next){
    console.log("My understanding is this should run last because app.use is near the very bottom.")
    next();
};


    // Gets user id by session
    app.post('/login', function (req, res, next) {
        console.log("This should not be last");
        next();
    });


    app.use(myMidware);

// launch ======================================================================
app.listen(port);
//app.listen(port, host); The host part means that it's required in order for the server to respond!!!
console.log('The magic happens on port ' + port);
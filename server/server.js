// server.js

// Stuff that should be arg'ed
const cors         = true;
const port         = process.env.PORT || 3000;
const host         = '192.168.0.1'
const DB_PATH      = './server/models/data/ProjectTT.db';

// set up ======================================================================
const express      = require('express');
const appBackend   = express();
const path         = require('path');
const morgan       = require('morgan');
const bodyParser   = require('body-parser');
const session      = require('express-session');


// Database Config =============================================================
const DB           = require('./models/database.js');
const appDB        = new DB.DataAPI();
appDB.initDB(DB_PATH);

// Passport Setup ==============================================================
var passport = require('passport');
require('./config/passport.js')(passport, appDB);

// Sessions Setup ==============================================================
const SQLiteStore = require('connect-sqlite3')(session);
const sessionOptions = {
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

// File Exports ================================================================
// My routes need the passport and appDB object and want to centralize the config here.
// Not sure if there's another way of doing this. The line below is usually first or last in  a file.
module.exports = { passport, appDB }

// Route Imports ===============================================================
const router = require('./appBackendRoutes')//(passport, appDB);
const globalBeforeRouter = require('./globalroutehandlers_before');

// Express Middleware Config ==================================================
appBackend.use(bodyParser.urlencoded({ extended: true }));
appBackend.use(bodyParser.json());
appBackend.use(express.static(path.join(__dirname, '../dist')));
// CORS
if (cors === true) {
    const corsSettings = require('./config/cors');
    appBackend.use(corsSettings);
}
appBackend.use(session(sessionOptions));
appBackend.use(passport.initialize());
appBackend.use(passport.session());


//appBackend.use(globalBeforeRouter)
appBackend.use(router)

// Launch ======================================================================
appBackend.listen(port);
//appBackend.listen(port, host); The host part means that it's required in order for the server to respond!!!
console.log('The magic happens on port ' + port);
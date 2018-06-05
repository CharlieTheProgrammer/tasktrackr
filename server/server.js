// server.js

const path         = require('path');

// ENV HANDLING  ==============================================================
const CMD_ARGS = process.argv;
const VALID_CMD_ARGS = ['test', 'prod'];

if (!VALID_CMD_ARGS.includes(CMD_ARGS[2])) {
    console.error("Environment argument must be set to valid value to launch application.");
    console.log("--- Valid Values ---");
    VALID_CMD_ARGS.forEach(arg =>  console.log(arg));
    return;
} else {
    var env = CMD_ARGS[2];
    console.log("*****  Connected to " + env + " environment. *****\n");
}

const test = {
    app: {
        port: 3000,
        cors: true,
        helmet: false
    },
    db: {
        path: path.resolve(__dirname, './models/data/Test.db'),
        name: 'Test.db'
    }
};

const prod = {
    app: {
        port: 3000,
        cors: false,
        helmet: true
    },
    db: {
        path: path.resolve(__dirname, './models/data/ProjectTT.db'),
        name: 'ProjectTT.db'
    }
};

const config = {
    test: test,
    prod: prod
}


// Set up ======================================================================
const express      = require('express');
const appBackend   = express();
const morgan       = require('morgan');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const helmet = require('helmet');

// Database Config =============================================================
const DB_PATH = config[env].db.path;
const DB           = require('./models/database.js');
const appDB        = new DB.DataAPI();
appDB.initDB(DB_PATH);

// Passport Setup ==============================================================
var passport = require('passport');
require('./config/passport.js')(passport, appDB);

// Sessions Setup ==============================================================
const SQLiteStore = require('connect-sqlite3')(session);
const sessionOptions = {
    secret: 'ngEyZqWagRgvkVK63nJUpZUe7YFf5W2sUSRYCWzX',
    resave: false,
    saveUninitialized: false,   // This creates a cookie just by visiting the site. We only want to turn this on after login.
    store: new SQLiteStore({
        db: config[env].db.name,
        table: 'sessions',
        dir: path.dirname(DB_PATH),
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
const usersRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');
const entryRoutes= require('./routes/entry');
const categoryRoutes= require('./routes/category');
const globalBeforeRouter = require('./globalroutehandlers_before');

// Express Middleware Config ===================================================
if (config[env].app.helmet) {
    console.log("Helmet Enabled")
    appBackend.use(helmet)
    appBackend.use(helmet.noCache())
}
appBackend.use(bodyParser.urlencoded({ extended: true }));
appBackend.use(bodyParser.json());
appBackend.use(express.static(path.join(__dirname, '../dist')));
// CORS
if (config[env].app.cors === true) {
    const corsSettings = require('./config/cors');
    appBackend.use(corsSettings);
}
appBackend.use(session(sessionOptions));
appBackend.use(passport.initialize());
appBackend.use(passport.session());

// For Testing =================================================================
var TESTING = false;

appBackend.use('/', function(req, res, next) {
    if (TESTING) {
        req.user = { user_id : 1 };
    }
    next();
});
//appBackend.use(globalBeforeRouter);
appBackend.use(usersRoutes);
appBackend.use(entryRoutes);
appBackend.use(projectRoutes);
appBackend.use(categoryRoutes);
// Launch ======================================================================
appBackend.listen(config[env].app.port);
console.log('The magic happens on port ' + config[env].app.port);
// server.js
//var debug = require('debug')('server:server');
//var http = require('http');
var cors = true;

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
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

// routes ======================================================================
const { validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

    var TESTING = false;

        // LOGIN TO USER ID MIDDLEWARE
    // This needs to run after the passport middleware
var myMid = function(req, res, next){
    // If there is a user name that is stored via passport (req.user), use that to get the user ID and
    // store it on the req.
    var auth = req.isAuthenticated();
    console.log(auth);

    // Both of these below need to run after passport has serialized the data back into the session
    // req.session.reload(function(err) {
    //     // session updated
    //     if (err) {
    //         console.log("Error when loading sessions")
    //         console.log(err.stack);
    //     }
    // })

    if (req.user && !req.session.user_id) {
        appDB.findUserByLogin(req.user, function(error, response){
            console.log(error);
            console.log(response);
            req.session.user_id = response.user_id;
            req.session.save(function(err) {
                if (err) {
                    console.log("Error when saving sessions")
                    console.log(err);
                }
            });
            next();
        });
    }
    next();
};

    // app.use('/', function(req, res, next) {
    //     if (TESTING) {
    //         req.user_id = 1;
    //     }
    //     next();
    // });

    // Makes it easy to see which routes I have.
    let route_enum = {
        new: {
            project: '/new/project',
            category: '/new/category',
            entry: '/new/entry',
            //user: '/new/user'
            user: '/signup'
        },
        delete: {
            project: '/delete/project',
            category: '/delete/category',
            entry: '/delete/entry'
        },
        update: {
            project: '/update/project',
            category: '/update/category',
            entry: '/update/entry'
        },
        get: {
            project: '/get/project',
            projectList: '/get/projectlist',
            categories: '/get/categories',
            entries: '/get/entries',
            allUserEntries: '/get/allUserEntries',
            user: '/get/user'
        },
        login: '/login',
        logout: '/logout'
    };


    // Setup initial page
    app.get('/', function (req, res) {
        res.redirect('index.html');
        //res.sendFile(Ppath.join(__dirname, "../dist/index.html"));
    });


    app.get('/testing', function (req, res) {
        res.send("Testing API Connection Success", 200)
    });


    //      *** LOGIN and SIGNUP ***
    const errorFormatters = {
        signupFailures: ({location, msg, param, value, nestedErrors}) => {
            return {type: "Error", name: "Signup Failure", message: msg}
        },
        loginFailures: ({location, msg, param, value, nestedErrors}) => {
            return {type: "Error", name: "Login Failure", message: msg}
        },
        newProjectFailures: ({location, msg, param, value, nestedErrors}) => {
            return {type: "Error", name: "New Project Failure", message: msg}
        },
        genericFailure: ({location, msg, param, value, nestedErrors}) => {
            return {type: "Error", name: "Generic Failure", message: msg}
        },
    }

    app.post(route_enum.login, v.loginValidators, (req, res, next) => {
        console.log("Req user id " + req.session.user_id)
        next();
        //Check for validation errors
         if (v.foundErrors(req, res, v.errorFormatters.loginFailures, 401)) {
            return;
         }

        console.log("Inside login callback");
        passport.authenticate('local', (err, user, info) => {
            console.log("Inside passport authenticate callback");
            if (err) {
                console.log("Error");
                console.log(err);
            }

            if (user) {
                console.log("User");
                console.log(user)
                req.login(user, (err) => {
                    console.log('Inside req.login() callback')
                    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
                    console.log(`req.user: ${JSON.stringify(req.user)}`)
                    if (!err) {
                        //return res.status(200).send('You were authenticated & logged in!\n')
                        var success = {
                            type: "Notification",
                            name: "Login Notification",
                            message: "Successfully logged in!"
                        }
                        res.json(success);
                    }
                });
            }

            if (info) {
                console.log("Info");
                console.log(info)
                return res.status(401).json(info);
            }
        })(req, res, next);
    });

    app.post(route_enum.logout, function(req, res) {
        console.log(req);

        if (req.isAuthenticated()) {
            req.logout();
            req.session.destroy(function (err) {
                if (!err) {
                    res.status(200).clearCookie('connect.sid', {path: '/'}).json({status: "Success"});
                } else {
                    // handle error case...
                    console.log("An error occurred while clearing the cookie from the DB.");
                    console.log(err);
                    res.status(200);
                }
            });
        } else {
            console.log("User not logged in to begin with")
            res.send(500);
        }
    });

    app.post(route_enum.new.user, v.signupValidators, function(req, res){
        console.log(req.body);

        // Check for validation errors
        const errors= validationResult(req).formatWith(errorFormatters.signupFailures);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            var errs = errors.array();
            res.json(errs)
            return;
        }

        var newUser = {
            login: req.body.username,
            password: req.body.password,
            email: req.body.email,
            user_first_name: req.body.firstName,
            user_last_name: req.body.lastName
        }

        // If a value is not provided, it will be set to null.
        for (var key in newUser) {
            if (newUser.hasOwnProperty(key)) {
                if (newUser[key] === "") {
                    newUser[key] = null;
                }
            }
        }

        appDB.createNewUser(newUser, function(error, response){
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {
                req.login(newUser.login, function(err) {
                    if (err) {
                        console.log(err)
                        res.send(500);
                        return;
                    } else {
                        var success = {
                            type: "Notification",
                            name: "Login Notification",
                            message: "Successfully logged in!"
                        }
                        res.json(success);
                    }
                });
            }
        });
    });


    //      *** PROJECTS ****
    // Holds all routes related to projects. This may be moved into its own file later
    // to make it easier to manage.

    // Add new project
    app.post(route_enum.new.project, v.newProjectValidators, function (req, res) {
        // Check for validation errors
        const errors= validationResult(req).formatWith(errorFormatters.newProjectFailures);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            var errs = errors.array();
            res.json(errs)
            return;
        }
        res.send(200);
        return;

        // Assuming validation is fine
        appDB.insertNewProject(req.body.project_name, req.user_id, req.body.created_date, function (error, response) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                console.log("Inserted new project: " + req.body.project_name);
                res.send(response);
            }
        });
    });


    // Update project name
    app.post(route_enum.update.project, v.updateProjectValidator, function (req, res) {
        // Check for validation errors
        const errors= validationResult(req).formatWith(errorFormatters.genericFailure);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            var errs = errors.array();
            res.json(errs)
            return;
        }
        res.send(200);
        return;

        appDB.updateProject(req.body.projectID, req.body.projectName, function (error, response) {
            if (error) {
                res.sendStatus(500);
            } else {
                console.log("Project name updated to: " + req.body.projectName);
                res.sendStatus(200);
            }
        });
    });


    // Delete project. This actually hides a project, but is exposed as 'deleting' to the end user.
    app.post(route_enum.delete.project, v.deleteProjectValidators, function (req, res) {
        // Check for validation errors
        const errors= validationResult(req).formatWith(errorFormatters.genericFailure);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            var errs = errors.array();
            res.json(errs)
            return;
        }
        res.send(200);
        return;

        //var projectID = appDB.getProjectIDByName(req.body.project_name);
        appDB.hideProject(req.body.projectID, function (error, response) {
            if (error) {
                res.sendStatus(500);
            } else {
                console.log("Successfully deleted project.");
                res.sendStatus(200);
            }
        });
    });


    // Get a list of user's projects
    app.post(route_enum.get.projectList, function (req, res) {
        //Validate user ID, which should be added by custom middleware once user is logged in.
        if (!req.user_id) {
            res.send(500)
            return;
        }

        appDB.getProjectList(req.user_id, function (error, response) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                console.log("Got list of projects!");
                console.log(response);
                res.send(response);
            }
        });
    });

    //      *** Categories ****

    // Add a category
    app.post(route_enum.new.category, v.newCategoryValidators, function (req, res) {
        // Validate req
        if (!req.user_id) {
            res.send(500);
            return;
        }

        // Check for validation errors
        const errors= validationResult(req).formatWith(errorFormatters.genericFailure);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            var errs = errors.array();
            res.json(errs)
            return;
        }
        res.send(200);
        return;

        appDB.insertNewCategory(req.body.category_name, req.user_id, function (error, response) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                console.log("Inserted new category");
                res.sendStatus(200);
            }
        });
    });

    // Delete a category
    app.post(route_enum.delete.category, v.deleteCategoryValidator, function (req, res) {
        // Check for validation errors
        const errors= validationResult(req).formatWith(errorFormatters.genericFailure);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            var errs = errors.array();
            res.json(errs)
            return;
        }
        res.send(200);
        return;

        // TODO - Refactor to use a user ID for security purposes or anyone with a valid login can update a category.
        appDB.deleteCategory(req.body.categoryID, function (error, response) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                console.log("Deleted a category.")
                res.sendStatus(200);
            }
        });
    });

    // Update a category name
    app.post(route_enum.update.category, v.updateCategoryValidators, function (req, res) {
        // Check for validation errors
        const errors= validationResult(req).formatWith(errorFormatters.genericFailure);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            var errs = errors.array();
            res.json(errs)
            return;
        }
        res.send(200);
        return;

        appDB.updateCategory(req.body.category_id, req.body.newCategoryName, function (error, response) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                console.log("Updated a category.");
                res.sendStatus(200);
            }
        });
    });

    // Get all categories
    app.post(route_enum.get.categories, function (req, res) {
        //Validate user ID, which should be added by custom middleware once user is logged in.
        if (!req.user_id) {
            res.send(500)
            return;
        }

        appDB.getCategories(req.body.user_id, function (error, response) {
            if (error) {
                res.sendStatus(500);
            } else {
                console.log("Got categories for User ID: " + req.body.user_id);
                res.send(response);
            }
        })
    });


    //      *** Entries ****

    // Add a entry
    app.post(route_enum.new.entry, v.newEntryValidators, function (req, res) {
        // Check for validation errors
        const errors= validationResult(req).formatWith(errorFormatters.genericFailure);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            var errs = errors.array();
            res.json(errs)
            return;
        }
        res.send(200);
        return;

        appDB.insertNewEntry(req.body.project_id, req.body.start_time, req.body.entry_date, function (error, response) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                console.log("Inserted new entry");
                res.send(response);
            }
        });
    });


    // Delete a entry
    app.post(route_enum.delete.entry, function (req, res) {
        // Don't have a function for this one yet
    });

    // Update entry
    app.post(route_enum.update.entry, v.updateEntryValidators, function (req, res) {
        // Check for validation errors
        const errors= validationResult(req).formatWith(errorFormatters.genericFailure);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            var errs = errors.array();
            res.json(errs)
            return;
        }
        res.send(200);
        return;

        // Creating an object for this one since there are too many parameters.
        var entryData = {
            entry_id: req.body.entry_id,
            category_id: req.body.category_id,
            entry_description: req.body.entry_description,
            end_time: req.body.end_time,
            total_time: req.body.total_time,
        }

        // If a value is not provided, it will be set to null.
        for (var key in entryData) {
            if (entryData.hasOwnProperty(key)) {
                if (entryData[key] === "") {
                    entryData[key] = null;
                }
            }
        }
        res.send(200)
        return;

        appDB.updateEntry(entryData, function (error, response) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                console.log("Entry successfully updated");
                res.sendStatus(200);
            }
        });
    });

    app.post(route_enum.get.allUserEntries, function (req, res) {
        appDB.getEntriesByUser(req.body.user_id, function (error, response) {
            if (error) {
                console.
                    res.sendStatus(500);
            } else {
                res.send(response);
            }
        });
    });

    // Get all entries - Maybe this should be part of load project below.
    app.post(route_enum.get.entries, function (req, res) {

        //appDB.getCategories(1);
        appDB.getCategories(1, function (error, response) {
            if (error) {
                //console.log(error);
                res.sendStatus(500);
            } else {
                console.log("Callback was triggered\n" + response);
                res.send(response);
            }
        });
    });

    // Get Project. Project mainly consists of the table entries.
    app.post(route_enum.get.project, function (req, res) {
        if (!req.body.projectID) {
            res.send(500);
            console.log("Missing project ID");
            return;
        };

        appDB.getEntriesByProject(req.body.projectID, function (error, response) {
            if (error) {
                res.send(500);
            } else {
                console.log("Got entries for project ID: " + req.body.projectID);
                res.send(response);
            }
        });
    });


    //      *** USERS ****
    // Holds all routes related to projects. This may be moved into its own file later
    // to make it easier to manage.

    // Gets user id by session
    app.post(route_enum.get.user, function (req, res) {

        // Confirm that all required fields are there
        if (v.isEmpty(req.session.session_id)) {
            var error = v.isEmpty(req.body.session_id);
            console.log(error);
            res.send(error);
            return;
        }
    });


    app.use(myMid);

// launch ======================================================================
app.listen(port);
//app.listen(port, host); The host part means that it's required in order for the server to respond!!!
console.log('The magic happens on port ' + port);
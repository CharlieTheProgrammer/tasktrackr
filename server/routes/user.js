// Imports ======================================================================
const { validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const { passport, appDB } = require('../server');
const { v } = require('../validations.js');
const route_enum = require('./routeEnumeration');

// Router Config ===============================================================
var express = require('express');
var app = express.Router();


//      *** USERS ****
// Holds all routes related to projects. This may be moved into its own file later
// to make it easier to manage.


app.post(route_enum.login, v.loginValidators, (req, res, next) => {

    const errors= validationResult(req).formatWith(v.errorFormatter);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        var errs = errors.array();
        res.status(401).json(errs)
        return;
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            res.status(401).json(err)
        }

        if (user) {
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
    const errors= validationResult(req).formatWith(v.errorFormatter);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        var errs = errors.array();
        res.status(400).json(errs)
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


app.post(route_enum.isAuthenticated, function(req, res) {
    if (req.isAuthenticated()) {
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
});

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

module.exports = app;
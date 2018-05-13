// Imports ======================================================================
const { validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const { passport, appDB } = require('../server');
const { v } = require('../validations.js');
const route_enum = require('./routeEnumeration');


// Router Config ===============================================================
var express = require('express');
var app = express.Router();

//      *** PROJECTS ****
// Holds all routes related to projects. This may be moved into its own file later
// to make it easier to manage.

// Add new project
app.post(route_enum.new.project, v.newProjectValidators, function (req, res) {
    // Check for validation errors
    const errors= validationResult(req).formatWith(v.errorFormatters.newProjectFailures);

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
    const errors= validationResult(req).formatWith(v.errorFormatters.genericFailure);

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
    const errors= validationResult(req).formatWith(v.errorFormatters.genericFailure);

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

module.exports = app;
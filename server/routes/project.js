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
    // res.send(200);
    // return;

    appDB.insertNewProject(req.body.project_name, req.user.user_id, req.body.created_date, function (error, response) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            console.log("Inserted new project: " + req.body.project_name);
            res.json({ newProjectID: response.newID });
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
    // res.send(200);
    // return;

    appDB.updateProject(req.body.project_id, req.body.project_name, req.user.user_id, function (error, response) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json(response);
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
    // res.send(200);
    // return;

    appDB.hideProject(req.body.project_id, req.user.user_id, function (error, response) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json(response);
        }
    });
});


// Get a list of user's projects
app.post(route_enum.get.projectList, function (req, res) {
    if (!req.user.user_id) {
        res.send(500)
        return;
    }

    appDB.getProjectList(req.user.user_id, function (error, response) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            console.log(response);
            res.json(response);
        }
    });
});

module.exports = app;
// Imports ======================================================================
const { validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const { passport, appDB } = require('../server');
const { v } = require('../validations.js');
const route_enum = require('./routeEnumeration');


// Router Config ===============================================================
var express = require('express');
var app = express.Router();

//      *** Entries ****

// Add a entry
app.post(route_enum.new.entry, v.newEntryValidators, function (req, res) {
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

    var params = {
        project_id : req.body.project_id,
        start_time: req.body.start_time,
        entry_date: req.body.entry_date,
        user_id: req.user.user_id
    }

    appDB.insertNewEntry(params, function (error, response) {
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
app.post(route_enum.update.entry, function (req, res) {
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

    // Creating an object for this one since there are too many parameters.
    var params = {
        entry_id: req.body.entry_id,
        category_id: req.body.category_id,
        entry_description: req.body.entry_description,
        end_time: req.body.end_time,
        total_time: req.body.total_time,
        user_id: req.user.user_id
    }

    // If a value is not provided, it will be set to null.
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            if (params[key] === "") {
                params[key] = null;
            }
        }
    }
    // res.send(200)
    // return;

    appDB.updateEntry(params, function (error, response) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            console.log("Entry successfully updated");
            res.json(response);
        }
    });
});

// All user entries
app.post(route_enum.get.allUserEntries, function (req, res) {
    // Doesn't have validation because req.user.user_id is set internally and trusted
    appDB.getEntriesByUser(req.user.user_id, function (error, response) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json(response);
        }
    });
});

// Get all entries - Maybe this should be part of load project below.
app.post(route_enum.get.entries, function (req, res) {
    // Doesn't have validation because req.user.user_id is set internally and trusted
    appDB.getCategories(req.user.user_id, function (error, response) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            console.log("Callback was triggered\n" + response);
            res.json(response);
        }
    });
});

// Get Project. Project mainly consists of the table entries.
app.post(route_enum.get.project, function (req, res) {
    if (!req.body.project_id) {
        res.send(500);
        console.log("Missing project ID");
        return;
    };

    appDB.getEntriesByProject(req.body.projectID, function (error, response) {
        if (error) {
            res.send(500);
        } else {
            console.log("Got entries for project ID: " + req.body.projectID);
            res.json(response);
        }
    });
});


module.exports = app;
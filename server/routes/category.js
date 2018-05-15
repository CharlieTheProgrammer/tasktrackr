// Imports ======================================================================
const { validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const { passport, appDB } = require('../server');
const { v } = require('../validations.js');
const route_enum = require('./routeEnumeration');


// Router Config ===============================================================
var express = require('express');
var app = express.Router();

//      *** Categories ****

// Add a category
app.post(route_enum.new.category, v.newCategoryValidators, function (req, res) {
    // Validate req
    if (!req.user.user_id) {
        res.send(500);
        return;
    }

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

    appDB.insertNewCategory(req.body.category_name, req.user.user_id, function (error, response) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json(response);
        }
    });
});

// Delete a category
app.post(route_enum.delete.category, v.deleteCategoryValidator, function (req, res) {
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

    appDB.hideCategory(req.body.category_id, req.user.user_id, function (error, response) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json(response);
        }
    });
});

// Update a category name
app.post(route_enum.update.category, v.updateCategoryValidators, function (req, res) {
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

    appDB.updateCategory(req.body.category_id, req.body.new_category_name, req.user.user_id, function (error, response) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            console.log("Updated a category.");
            res.json(response);
        }
    });
});

// Get all categories
app.post(route_enum.get.categories, function (req, res) {
    //Validate user ID, which should be added by custom middleware once user is logged in.
    if (!req.user.user_id) {
        res.send(500)
        return;
    }
    // res.send(200);
    // return;

    appDB.getCategories(req.user.user_id, function (error, response) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json(response);
        }
    })
});

module.exports = app;
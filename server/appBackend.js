module.exports = function(app, passport, appDB, v) {

    var path = require('path');

    // Makes it easy to see which routes I have.
    let route_enum = {
        new : {
            project: '/new/project',
            category: '/new/category',
            entry: '/new/entry',
            user: '/new/user'
        },
        delete : {
            project: '/delete/project',
            category: '/delete/category',
            entry: '/delete/entry'
        },
        update : {
            project: '/update/project',
            category: '/update/category',
            entry: '/update/entry'
        },
        get : {
            project: '/get/project',
            projectList: '/get/projectlist',
            categories: '/get/categories',
            entries: '/get/entries',
            user: '/get/user'
        }
    };


    // Setup initial page
    app.get('/', function(req, res){
        res.render('home');
    });

    // Setup initial page
    app.get('/settings.html', function(req, res){
        res.render('settings');
    });

    // Test page
    app.get('/componentTest.html', function(req, res){
        res.render('componentTesting');
    });

    app.post('/login', function(req, res) {
        res.send("Logged in", 200);
    });


    app.get('/bye', function(req, res){
        res.render('bye');
    });
    // This passport shit is confusing AF. I'm just going to write my own middleware. *** and DONE!!! Noice.


    app.post('/testing', function(req, res) {
        console.log("Received request \n");

        appDB.insertNewCategory(1, null, function(error, response){
            if (error) {
                console.log(error);
                //res.sendStatus(500);
                res.status(500).send({'error': error });
            } else {
                res.sendStatus(response);
            }
        });
    });



    //      *** PROJECTS ****
    // Holds all routes related to projects. This may be moved into its own file later
    // to make it easier to manage.

    // Add new project
    app.post(route_enum.new.project, function(req, res) {
        console.log("Received request \n");
        // Validate project name -> this can be the same validation that is done upfront.
        // Break up validation into it's own file. This will make this part easy

        // Check tht required fields are there
        if (!req.body.project_name || !req.body.user_id || !req.body.created_date) {
            res.send("Missing values");
            return;
        }

        // This works, but is sloppy.
        if (v.isEmpty(req.body.project_name) || v.isEmpty(req.body.user_id) || v.isEmpty(req.body.created_date)) {
            var error = new Error();
            error.name = "Value Error"
            error.mesage = "Value must not be empty."
            res.send(error);
            return;
        }

        // ProjectNameError is an naming scheme that makes more sense here.
        if (v.hasProjectNameError(req.body.project_name)) {
            var error = v.hasProjectNameError(req.body.project_name);
            console.log(error);
            res.send(error);
            //res.sendStatus(200);
            return;
        };


        // Check created date. This needs to come from user's locale.
        if (v.hasDateFormatError(req.body.created_date)) {
            var error = v.hasDateFormatError(req.body.created_date);
            console.log(error);
            res.send(error);
            return;
        }

        // Check userID


        // Assuming validation is fine
        appDB.insertNewProject(req.body.project_name, req.body.user_id, req.body.created_date, function(error, response) {
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
    app.post(route_enum.update.project, function(req, res){
        // Validate project name - Use validation.js or similar

        // A couple of ways of solving this
        appDB.updateProject(req.body.projectID, req.body.projectName, function(error, response){
            if (error) {
                res.sendStatus(500);
            } else {
                console.log("Project name updated to: " + req.body.projectName);
                res.sendStatus(200);
            }
        });

        //  Or pass in the project ID from the front end. This is currently a struggle
        // because implementing a front end data model is harder than I thought.
        // TRY THIS ONE AFTER IMPLEMENTING FRONT END DATA MODEL
        // validate project id?
        //updateProject(req.body.project_id, req.body.project_name)

        // console.log("Updated project name to: " + req.body.projectName);
        // res.sendStatus(200);
    });

    // Delete project. This actually hides a project, but is exposed as 'deleting' to the end user.
    app.post(route_enum.delete.project, function(req, res){
        // Validation for project name here
        if (!req.body.projectID) {
            res.sendStatus(500);
            return;
        }

        //var projectID = appDB.getProjectIDByName(req.body.project_name);
        appDB.hideProject(req.body.projectID, function(error, response){
            if (error) {
                res.sendStatus(500);
            } else {
                console.log("Successfully deleted project.");
                res.sendStatus(200);
            }
        });
    });

    // Get a list of user's projects
    app.post(route_enum.get.projectList, function (req, res){
        // Validate user ID
        // if (!req.body.user_id) {
        //     res.send(500)
        //     return;
        // }

        appDB.getProjectList(req.body.user_id, function(error, response){
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
    app.post(route_enum.new.category, function(req, res){
        // Validate req
        if (!req.body.category_name || !req.body.user_id) {
            res.send(500);
            return;
        }

        appDB.insertNewCategory(req.body.category_name, req.body.user_id, function (error, response){
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
    app.post(route_enum.delete.category, function(req, res){
        // Validate req
        appDB.deleteCategory(req.body.categoryID, function(error, response) {
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
    app.post(route_enum.update.category, function(req, res){
        // Validate req
        appDB.updateCategory(req.body.categoryID, req.body.newCategoryName, function(error, response){
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
    app.post(route_enum.get.categories, function(req, res){
        // Validate req
        appDB.getCategories(req.body.user_id, function(error, response){
            if (error) {
                res.sendStatus(500);
            } else {
                console.log("Got categories for User ID: " + req.body.user_id);
                res.send(response);
            }
        })
    });


    //      *** Entries ****
    //app.post()
    // Add a entry
    app.post(route_enum.new.entry, function(req, res){

        appDB.insertNewEntry(req.body.project_id, req.body.start_time, req.body.entry_date, function(error, response){
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
    app.post(route_enum.delete.entry, function(req, res){
        // Don't have a function for this one yet
    });

    // Update entry
    app.post(route_enum.update.entry, function(req, res){
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

        appDB.updateEntry(entryData, function(error, response){
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                console.log("Entry successfully updated");
                res.sendStatus(200);
            }
        });
    });

    // Get all entries - Maybe this should be part of load project below.
    app.post(route_enum.get.entries, function(req, res){

        //appDB.getCategories(1);
        appDB.getCategories(1, function(error, response){
            if (error){
                //console.log(error);
                res.sendStatus(500);
            } else {
                console.log("Callback was triggered\n" + response);
                res.send(response);
            }
        });
    });

    // Get Project. Project mainly consists of the table entries.
    app.post(route_enum.get.project, function(req, res){
        if (!req.body.projectID) {
            res.send(500);
            console.log("Missing project ID");
            return;
        };

        appDB.getEntriesByProject(req.body.projectID, function(error, response){
            if (error) {
                res.send(500);
            } else {
                console.log("Got entries for project ID: " + req.body.projectID);
                res.send(response);
            }
        });
    });

    // I attempted to prevent DRY, but it didn't work. res is undefined or unreferenced and error occurs.
    var genericCallback = function(error, response){
        if (error){
            this.res.sendStatus(500);
        } else {
            this.res.send(response);
        }
    }


    //      *** USERS ****
    // Holds all routes related to projects. This may be moved into its own file later
    // to make it easier to manage.

    // Create a new user
    app.post(route_enum.new.user, function(req, res){
        if (Object.keys(req.body).length === 0) {
            res.send(500);
            return;
        }

        // Confirm that all required fields are there
        if (v.isEmpty(req.body.user_first_name)) {
            var error = v.isEmpty(req.body.user_first_name);
            console.log(error);
            res.send(error);
            return;
        }

        if (v.isEmpty(req.body.user_last_name)) {
            var error = v.isEmpty(req.body.user_last_name);
            console.log(error);
            res.send(error);
            return;
        }

        if (v.isEmpty(req.body.user_login)) {
            var error = v.isEmpty(req.body.user_login);
            console.log(error);
            res.send(error);
            return;
        }

        if (v.isEmpty(req.body.user_password)) {
            var error = v.isEmpty(req.body.user_password);
            console.log(error);
            res.send(error);
            return;
        }

        if (v.isEmpty(req.body.user_email)) {
            var error = v.isEmpty(req.body.user_email);
            console.log(error);
            res.send(error);
            return;
        }

        var newUser = {
            user_first_name: req.body.user_first_name,
            user_last_name: req.body.user_last_name,
            user_login: req.body.user_login,
            user_password: req.body.user_password,
            user_email: req.body.user_email
        };

        // If validation passes, then insert into DB.
        appDB.createNewUser(newUser, function(error, response){
            if (error) {
                res.send(500);
            } else {
                console.log("Created new login for: " + req.body.user_first_name + " " + req.body.user_last_name);
                res.send(response);
            };
        });

    });

    // Gets user id by session
    app.post(route_enum.get.user, function(req, res){

        // Confirm that all required fields are there
        if (v.isEmpty(req.session.session_id)) {
            var error = v.isEmpty(req.body.session_id);
            console.log(error);
            res.send(error);
            return;
        }

        //
    });
}
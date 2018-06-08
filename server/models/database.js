"use strict"
module.exports = {DataAPI};

/**
 * Main goal with this file is to
 * 1. Handle all dabatase interactions
 * 2. Provide an API/DAL to the rest of the program.
 *
 */

function DataAPI() {
    // What attributes will this object have?
    const sqlite3 = require('sqlite3').verbose();
    var db;

    // What will this object do? What can be done to this object?
    this.initDB = function(path) {
        if (!path) {
            throw new error("Database path must be provided,");
        }

        db = new sqlite3.Database(path, (err) => {
            if (err){
                console.error("Problem opening file " + path + "\n");
                throw new Error(err);
            } else {
                console.log('Connected to ' + path + ' SQLite database.\n');
                db.exec('PRAGMA foreign_keys = ON;', function(error){
                    if (error){
                        console.error("Pragma statement didn't work.")
                    }
                });
            }
        });
    }

    // Execute SQL - This is a private function
    var runQuery = function(sql, parameters, _callback) {
        // Check that all arguments are supplied
        if (typeof _callback !== 'function') {
            console.error("Callback parameter must be a function.");
            return Error();
        }

        if (arguments.length < 2) {
            console.error("Missing parameters.");
            _callback("Missing parameters.");
        }

        if (typeof sql !== 'string') {
            console.error("sql parameter must be a string.");
            _callback("sql parameter must be a string.");
        }

        console.log(sql);

        // Make Query
        db.run(sql, parameters, function(error){
            if (error) {
                console.error("An error has occurred: \n" + error);
                _callback(error);
            } else {
                console.log("Query executed successfully");
                console.log("Last modified row: " + this.lastID);
                console.log("Number of rows affected: " + this.changes);

                _callback(null, {
                    newID: this.lastID,
                    rowChanges: this.changes
                });
            }
        });
    }

    var getQuery = function(sql, parameters, _callback){
        // Check that all arguments are supplied
        if (typeof _callback !== 'function') {
            console.error("Callback parameter must be a function.");
            return Error();
        }

        if (arguments.length < 3) {
            console.error("Missing parameters.");
            _callback("Missing parameters.");
        }

        if (typeof sql !== 'string') {
            console.error("sql parameter must be a string.");
            _callback("sql parameter must be a string.");
        }


        console.log(sql);

        // Make Query
        db.get(sql, parameters, function(error, row) {
            if (error) {
                new Error("An error has occurred: \n" + error);
                _callback(error);
            } else {
                console.log("Query executed successfully");
                _callback(null, row);
            }
        });
    }

    var getAllQuery = function(sql, parameters, _callback){
        // Check that all arguments are supplied
        if (typeof _callback !== 'function') {
            console.error("Callback parameter must be a function.");
            return Error();
        }

        if (arguments.length < 3) {
            console.error("Missing parameters.");
            _callback("Missing parameters.");
        }

        if (typeof sql !== 'string') {
            console.error("sql parameter must be a string.");
            _callback("sql parameter must be a string.");
        }

        console.log(sql);

        // Make Query
        db.all(sql, parameters, function(error, rows){
            if (error) {
                console.error("An error has occurred: \n" + error);
                _callback(error);
            } else {
                console.log("Query executed successfully");
                _callback(null, rows);
            }
        });
    };



    // Update FK Dependencies when adding a category to a specified project.
    // Going to ginore this for now and say that a user can only add categories
    // and each category will be applicable to all project. Future plans, include
    // adding category per project.
    var insertProject_CategoryRow = function(project_id, category_id, _callback) {
        // Also need to update the Projects_Categories table.
        // When inserting category name
        let sql = 'INSERT INTO Projects_Categories (project_id, category_id) '
        sql += 'VALUES (?, ?)';

        runQuery(sql, [project_id, category_id], _callback);
    };


    // Project DB Actions

    // User Creates a new Project
    /**
     *
     * @param {string} project_name
     */
    this.insertNewProject = function(project_name, user_id, date_created, _callback) {
        let sql = 'INSERT INTO Projects (project_name, user_id, date_created) ';
        sql += 'VALUES (?, ?, ?)';

        runQuery(sql, [project_name, user_id, date_created], _callback);
    };


    // Deletes a Project
    /**
     * Deleting should only be done as an administrative task.
     * @param {integer} project_id
     */
    // this.deleteProject = function(project_id, user_id, _callback) {
    //     let sql = 'DELETE FROM Projects '
    //     sql += 'WHERE project_id = ? AND user_id = ?';

    //     runQuery(sql, [project_id, user_id], _callback);
    // };

    // User Updates a Project Name
    /**
     *
     * @param {integer} project_id
     * @param {string} project_name
     */
    this.updateProject = function(project_id, project_name, user_id, _callback) {
        let sql = 'UPDATE Projects '
        sql += 'SET project_name =  ? '
        sql += 'WHERE project_id = ? AND user_id = ?';

        runQuery(sql, [project_name, project_id, user_id], _callback);
    };

    // Hide Project
    /**
     *
     * @param {integer} project_id
     */
    this.hideProject = function(project_id, user_id, _callback) {
        let sql = 'UPDATE Projects '
        sql += 'SET hidden = 1 '
        sql += 'WHERE project_id = ? AND user_id = ?;';

        runQuery(sql, [project_id, user_id], _callback);
    };

    // this.isProjectHidden = function(project_id, user_id, _callback){
    //     let sql = 'SELECT hidden '
    //     sql += 'FROM Projects '
    //     sql += 'WHERE project_id = ? AND user_id = ?;'

    //     runQuery(sql, [project_id, user_id], _callback);
    // }

    // Get one Project row from DB
    /**
     * Dunno what I'm doing here. Skipping for now.
     * @param {integer} project_id
     */
    // this.getProjectRowByID = function(project_id, _callback) {
    //     let sql = 'SELECT * '
    //     sql += 'FROM Projects '
    //     sql += 'WHERE project_id = ?';

    //     getQuery(sql, project_id, _callback);
    // }

    // this.getProjectIDByName = function(project_name, _callback){
    //     let sql = 'SELECT project_id '
    //     sql += 'FROM Projects '
    //     sql += 'WHERE project_name = ? '

    //     getQuery(sql, project_name, _callback);
    // }

    this.getProjectList = function(userID, _callback) {
        let sql = 'SELECT project_id, project_name '
        sql += 'FROM Projects '
        sql += 'WHERE user_id = ? AND hidden <> 1 '

        getAllQuery(sql, userID, _callback);
    }


    // Categories DB Actions

    // User Creates a Category
    /**
     *
     * @param {string} category_name
     */
    this.insertNewCategory = function(category_name, user_id, _callback) {
        let sql = 'INSERT INTO Categories (category_name, user_id) ';
        sql += 'VALUES (?, ?)';

        runQuery(sql, [category_name, user_id], _callback);
    };


    // User Deletes a Category - This actually hides a category
    /**
     *
     * @param {integer} category_id
     */
    this.hideCategory = function(category_id, user_id, _callback) {
        let sql = 'UPDATE Categories '
        sql += 'SET hidden = 1 '
        sql += 'WHERE category_id = ? AND user_id = ?';

        runQuery(sql, [category_id, user_id], _callback);
    };


    // User Updates a Category
    /**
     *
     * @param {integer} category_id
     * @param {string} new_category_name
     */
    this.updateCategory = function(category_id, new_category_name, user_id, _callback) {
        let sql = 'UPDATE Categories '
        sql += 'SET category_name = ? '
        sql += 'WHERE category_id = ? AND user_id = ?'

        runQuery(sql, [new_category_name, category_id, user_id], _callback);
    };

    // Get categories
    /**
     * Initially wanted to assign categories on a per project basis, but decided to add that later and instead
     * go with the simpler option of assigning categories to a user.
     * @param {string} user_id
     */
    this.getCategories = function(user_id, _callback) {
        let sql = 'SELECT  category_id, category_name, hidden '
        sql += 'FROM Categories '
        sql += 'WHERE user_id = ? '

       getAllQuery(sql, user_id, _callback);
    };





    // Entries DB Actions

    // User starts timer - will insert partial information
    /**
     *
     * @param {string} start_time - Format should be HH:MM
     * @param {string} entry_date - Format should be DD/MM/YYYY
     */
    this.insertNewEntry = function(params, _callback) {
        let sql = 'INSERT INTO Entries (project_id, start_time, entry_date, user_id) '
        sql += 'VALUES (?, ?, ?, ?) '

        runQuery(sql, [
            params.project_id,
            params.start_time,
            params.entry_date,
            params.user_id
            ],
             _callback);
    };


    // User updates entry
    /**
     *
     * @param {integer} entry_id
     * @param {string} entry_description
     */
    this.updateEntry = function(params, _callback) {
        let sql = 'UPDATE Entries '
        sql += 'SET category_id = ?, '
        sql +=     'entry_description = ?, '
        sql +=     'end_time = ?, '
        sql +=     'total_time = ? '
        sql += 'WHERE entry_id = ? AND user_id = ? '

        runQuery(sql, [
            params.category_id,
            params.entry_description,
            params.end_time,
            params.total_time,
            params.entry_id,
            params.user_id
            ],
            _callback);
    };


    /**
     *
     * @param {integer} project_id
     */
    this.getEntriesByProject = function(project_id, _callback){
        let sql = 'SELECT * '
        sql += 'FROM Entries '
        sql += 'WHERE project_id = ? '
        sql += 'ORDER BY entry_id DESC'

        getAllQuery(sql, project_id, _callback);
    };

    this.getEntriesByUser = function(user_id, _callback) {
        let sql = 'SELECT entry_id, project_id, category_id, entry_date, entry_description, start_time, end_time, total_time '
        sql += 'FROM v_EntriesAndProjects '
        sql += 'WHERE user_id = ?'

        getAllQuery(sql, user_id, _callback)
    }



    // Users DB Actions

    // User Info Lookup
    this.findUserByLogin = function(user_login, _callback) {
        let sql = 'SELECT user_id, user_login '
        sql += 'FROM Users '
        sql += 'WHERE user_login = ? '

        getQuery(sql, user_login, _callback);
    };

    this.validatePassword = function(user_login, user_password, _callback) {
        let sql = 'SELECT user_password '
        sql += 'FROM Users '
        sql += 'WHERE user_login = ? '
        sql += 'AND user_password = ?'

        getQuery(sql, [user_login, user_password], _callback)
    };

    this.findUserById = function(user_id, _callback) {
        let sql = 'SELECT user_id, user_login '
        sql += 'FROM Users '
        sql += 'WHERE user_id = ? '

        getQuery(sql, user_id, _callback);
    };

    this.findUserbyEmail = function(email, _callback) {
        let sql = 'SELECT user_id '
        sql += 'FROM Users '
        sql += 'WHERE user_email = ? '

        email = email.toLowerCase()

        getQuery(sql, email, _callback)
    }


    // Create New User
    this.createNewUser = function(params, _callback) {
        let sql = 'INSERT INTO Users(user_first_name, user_last_name, user_login, user_password, user_email) '
        sql += 'VALUES (?, ?, ?, ?, ?) '

        params.email = params.email.toLowerCase()

        // Is this a good time to hash the password? When should this be hashed?
        // We may also want to lowercase the values here if queries are case sensitive
        runQuery(sql, [
            params.user_first_name,
            params.user_last_name,
            params.login,
            params.password,
            params.email] ,
            _callback);
    };

    // Add Reset Token to User
    this.setResetToken = function(user_email, token, _callback) {
        let sql = 'UPDATE Users '
        sql += 'SET pwd_reset_token = ? '
        sql += 'WHERE user_email = ?'

        runQuery(sql, [token, user_email], _callback)
    }

    // This should only get called after user has submitted a new valid password
    this.getResetToken = function(token, _callback) {
        let sql = 'SELECT user_id '
        sql += 'FROM Users '
        sql += 'WHERE pwd_reset_token = ? '

        getQuery(sql, token, _callback)

        this.clearResetToken(token, function(error, response){
            console.log(error)
            console.log(response)
        })
    }

    this.clearResetToken= function(token, _callback) {
        let sql = 'UPDATE Users '
        sql += 'SET pwd_reset_token = null '
        sql += 'WHERE pwd_reset_token = ? '

        runQuery(sql, token, _callback)
    }

    this.setNewPassword = function(password, user_id, _callback) {
        let sql = 'UPDATE Users '
        sql += 'SET user_password = ? '
        sql += 'WHERE user_id = ? '

        runQuery(sql, [password, user_id], _callback)
    }

    // Set Session ID. For Logging Out function, we will simply pass in an empty string.
    this.setSessionID = function(user_login, session_id, _callback) {
        let sql = 'UPDATE Users '
        sql += 'SET session_id = ? '
        sql += 'WHERE user_login = ? '

        runQuery(sql, [session_id, user_login], _callback);
    };

    // Get User ID by Session
    this.getUserIdBySession = function(session_id, _callback) {
        let sql = 'SELECT user_id '
        sql += 'FROM Users '
        sql += 'WHERE session_id = ? '

        getQuery(sql, session_id, _callback);
    };

};
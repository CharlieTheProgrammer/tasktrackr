// authentication.js

// This is my own custom middleware used to authenticate users and their requests

module.exports = function(appDB) {

    var module = {};

    // This might be better written as a page
    module.logIn = function(req, res, next) {
        // Validate the user's login and password. If good, then write session id to database, if bad, then return an error
        var user_login = req.body.username;
        var password = req.body.password;
        var sessionID = req.sessionID;

        if (!user_login || !password || !sessionID) {
            res.send(401);
        }

        appDB.findUserByLogin(user_login, function(error, match){
            if (error) {
                console.log('findUserByLogin: ' + error);
                res.send(401);
                return;
            };

            if (!match) {
                console.log('Login Failed due to bad username');
                res.send(401);
                return;
            };

            var user_id = match.user_id;

            appDB.validatePassword(user_login, password, function(error, response){
                if (!response){
                    console.log('Incorrect password.');
                    res.send(401);
                    return;
                };
                console.log('Login was successful');

                // Write session ID to the database
                // Need to get userID first
                appDB.setSessionID(user_login, sessionID, function(error, response){
                    if (error) {
                        console.log("Error occurred writing session id to DB.");
                        res.send(500);
                        return;
                    }

                    // Will the scoping work out here?
                    console.log(user_id);

                    // If all good, proceed
                    next();
                });
            });
        });
    };

    // This might be better written as a page
    module.logOut = function(req, res, next) {
        // Find the session id and 'delete' it from db; ie overwrite it with an empty string.
        var sessionID = "";
        var user_login = req.body.user_login;   // Using the login is safer for this query to guess because user IDs are sequential.

        appDB.setSessionID(user_login, sessionID, function(error, response){
            if (error || !response) {
                console.log("Error occurred clearing session id from DB.");
                res.send(500);
                return;
            }

            // Will the scoping work out here?
            console.log(user_id);

            // If all good, proceed
            next();
        });

        // What if the user never clicks on the log out button? This should be acceptable. As long as they have the cookie,
        // they can access things without going in through the login page
    };


    // Should apply to all requests that aren't on the login page
    module.validateRequest = function(req, res, next) {
        var sessionID = req.sessionID;

        // If no session ID is found, redirect user to login pa ge
        if (!sessionID) {
            res.redirect('/login');
        };

        // If cookie session id is found, use it to look up the user.
        appDB.getUserIdBySession(sessionID, function(error, response){
            if (error || !response) {
                console.log("Error occurred validating the request.")
            };

            // Set the user id on the req object. This will be used by all queries internally.
            if (response.user_id) {
                req.userID = response.user_id;
                next();
                return;
            };

            // Else, End it
            console.log("Error occurred validating the request.")
            res.send(401);
            return;
        });
    };

    return module;
};
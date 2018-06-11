// config/passport.js
var bcrypt = require('bcrypt');

// load all the things we need
const LocalStrategy   = require('passport-local').Strategy;
const ERRS = require('../../common/error_handling/errors')

// expose this function to our app using module.exports
module.exports = function(passport, appDB) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session. Saves shit to the session.
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user. Reads shit from the session.
    passport.deserializeUser(function(id, done) {
        appDB.findUserByLogin(id, function(error, response){
            if (!response) {
                return done(null, false);
            } else {
                console.log(response);
                return done(null, response);
            }
        });
    });


    passport.use(new LocalStrategy(function(user_login, password, done) {
        // Authenticate Request
        if (!user_login || !password) {
            console.log("Missing credentials.");
            return done(null, false);
        }


        // Method used to find user
        appDB.findUserByLogin(user_login, function(error, match){
            if (error) {
                console.log('findUserByLogin: ' + error);
                return done(error);
            };

            if (!match) {
                console.log('Login Failed due to bad username')
                return done(null, false, ERRS.USER.USERNAME.LOGIN.NO_MATCH)
            };

            appDB.validatePassword(user_login, password, function(error, response){
                if (error) {
                    console.log(error);
                };

                if (!response){
                    // console.log('Incorrect password.');
                    // return done(null, false, ERRS.USER.PASSWORD.LOGIN.NO_MATCH);
                    console.log('Login Failed due to bad username')
                    return done(null, false, ERRS.USER.USERNAME.LOGIN.NO_MATCH)
                };

                if (response) {
                    console.log(response)
                    console.log(password)

                    bcrypt.compare(password, response.user_password, function(err, res) {
                        if (res) {
                            return done(null, user_login);
                        }

                        console.log('Incorrect password.');
                        return done(null, false, ERRS.USER.PASSWORD.LOGIN.NO_MATCH);
                    })
                }
            });
        });
    }));
};
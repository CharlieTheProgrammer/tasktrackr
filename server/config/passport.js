// config/passport.js

// load all the things we need
const LocalStrategy   = require('passport-local').Strategy;

// load up the user model
//var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport, appDB) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        appDB.findUserById(id, function(error, response){
            if (!response) {
                return done(null, false);
            }
            return done(null, response)
        });
    });


    passport.use(new LocalStrategy(function(user_login, password, done) {
        // Method used to find user
        appDB.findUserByLogin(user_login, function(error, match){
            if (error) {
                console.log('findUserByLogin: ' + error);
                return done(error);
            };

            if (!match) {
                console.log('Login Failed due to bad username')
                return done(null, false, {message: 'Login Failed due to bad username'})
            };

            appDB.validatePassword(user_login, password, function(error, response){
                if (error) {
                    console.log(error);
                };

                if (!response){
                    console.log('Incorrect password.');
                    return done(null, false, {message: 'Incorrect password.'});
                };
                console.log('Over here');
                return done(null, user_login);
            });
        });
    }));
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
/**
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

        });

    }));
*/
};
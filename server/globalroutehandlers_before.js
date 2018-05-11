
module.exports = [function(req, res, next){
    // If there is a user name that is stored via passport (req.user), use that to get the user ID and
    // store it on the req.
    var auth = req.isAuthenticated();
    console.log(auth);

    // Both of these below need to run after passport has serialized the data back into the session
    // req.session.reload(function(err) {
    //     // session updated
    //     if (err) {
    //         console.log("Error when loading sessions")
    //         console.log(err.stack);
    //     }
    // })

    // if (req.user && !req.session.user_id) {
    //     next('route');
    //     return;
    //     appDB.findUserByLogin(req.user, function(error, response){
    //         console.log(error);
    //         console.log(response);
    //         req.session.user_id = response.user_id;
    //         req.session.save(function(err) {
    //             if (err) {
    //                 console.log("Error when saving sessions")
    //                 console.log(err);
    //             }
    //         });
    //         next();
    //     });
    // }
    next();
},
function(req, res, next) {
    console.log("This is the last middleware in my global route handlers to run.");
    next();
}]
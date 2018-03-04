/**
 * The purpose of this file is to centralize my error validing for
 * all of the inputs
 */

const validator = require('validator');

// Common ===========================================

// Dates
module.exports.hasDateFormatError = function(date){
    var regex = new RegExp(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/);

    if (!validator.matches(date, regex)) {
        var error = new Error();
        error.name = "Date Error"
        error.message = "Date format must be MM/DD/YYYY.";
        return error;
    }

    return false;
};

// Empty fields
module.exports.isEmpty = function(string){
    if (validator.isEmpty(string)) {
        var error = new Error();
        error.name = "Value Error"
        error.mesage = "Value must not be empty."
        return error;
    }
}

// Users ============================================

// User Login

    // Length: Min 8 - Max 50
module.exports.hasUsernameError = function(username) {
    if (!validator.isLength(username, {min: 8, max:50})) {
        var error = new Error();
        error.name = "Login Error"
        error.message = "Login must be between 8 and 50 characters."
        return error;
    }

    // Alphanumeric
    if (!validator.isAlphanumeric(username)) {
        var error = new Error();
        error.name = "Login Error"
        error.message = "Login must only contains letters and numbers."
        return error;
    }

    return false;
};

// User Password
    // Length: Min 10 - Max 50
module.exports.hasPasswordError = function(password) {
    if (!validator.isLength(password, {min: 8, max:50})) {
        var error = new Error();
        error.name = "Login Error"
        error.message = "Password must be between 8 and 50 characters."
        return error;
    }

    // Complexity ?
    return false;
};



// User Name - Both first and last
    // Length - Min 1 - Max 30
module.exports.hasFirstNameError = function(name){
    if (!validator.isLength(name, {min: 1, max: 30})) {
        var error = new Error();
        error.name = "Name Error";
        error.message = "First and last name fields must be between 1 and 30 characters in length.";
        return error;
    }

    // Alpha
    if (!validator.isAlpha(name)) {
        var error = new Error();
        error.name = "Name Error";
        error.message = "First and last name fields must be between 1 and 30 characters in length.";
        return error;
    }

    return false;
};

// User E-Mail
    // Is e-mail
module.exports.hasEmailError = function(email) {
    if (!validator.isEmail(email)) {
        var error = new Error();
        error.name = "Email error";
        error.message = "Email is invalid.";
        return error;
    }

    return false;
};

// Projects =======================================

// Project Name
    // Length Min 1 - Max 50
module.exports.hasProjectNameError = function(projectName) {
    if (!validator.isLength(projectName, {min: 1, max: 50})) {
        var error = new Error();
        error.name = "Project Error";
        error.message = "Project name length must be between 1 and 50 characters.";
        return error;
    }

    // Letters, numbers, apostrophes
    var regex = new RegExp(/^[a-zA-Z ']*$/)
    if (!validator.matches(projectName, regex)) {
        var error = new Error();
        error.name = "Project Error";
        error.message = "Project name must only contain letters, numbers, spaces, and apostrophes.";
        return error;
    }

    return false;
};
// Date Created
// See Common section




// Categories ====================================

// Category (name)
    // Length min 1 - max 20
module.exports.hasCategoryNameError = function(category){
    if (!validator.isLength(category, {min: 1, max: 20})) {
        var error = new Error();
        error.name = "Category Error";
        error.message = "Category name length must be between 1 and 20 characters.";
        return error;
    }

    return false;
};



// Entries =======================================

// Entry Date
// See Common section

// Description
    // Length Min 0 - Max 300
module.exports.hasEntryDescriptionError = function(entryDescription){
    if (!validator.isLength(entryDescription, {min: 1, max: 300})) {
        var error = new Error();
        error.name = "Entry Error";
        error.message = "Entry description max length is 300 characters."
        return error;
    }

    return false;
};

// Time - Start, End, and Total Time
    // Custom ?
module.exports.hasTimeFormatError = function(time){
    //Hours, minutes, and seconds, 12-hour clock:
    var regex = new RegExp(/^(1[0-2]|0?[1-9]):([0-5]?[0-9]):([0-5]?[0-9])(●?[AP]M)?$/)
    if (!validator.matches(time, regex)) {
        var error = new Error();
        error.name = "Entry Error"
        error.message = "Entry time is invalid."
        return error;
    }

    return false;
};

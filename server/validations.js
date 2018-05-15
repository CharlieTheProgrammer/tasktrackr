const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// Object with all the validation checks
const v = {
    signupValidators: [
        check('email')
            .isEmail().withMessage('Enter a valid email address.'),

        check('username')
            .isLength({ min:1 }).withMessage('Login is a required field.')
            .isAlphanumeric().withMessage('Login must be alphanumeric.'),

        check('password')
            .isLength({ min:8 }).withMessage('Password must be at least 8 characters in length.')
            .matches('[0-9]').withMessage('Password must contain at least 1 number.')
            .matches('[a-z]').withMessage('Password must contain at least 1 lowercase letter.')
            .matches('[A-Z]').withMessage('Password must contain at least 1 uppercase letter.')
                .custom((value, {req, loc, path}) => {
                    if (value !== req.body.confirmPassword) {
                        // throw error if passwords do not match
                        throw new Error("Passwords don't match");
                    } else {
                        return value;
                    }
                })
    ],
    loginValidators: [
        check('username')
            .isLength({ min:1 }).withMessage('Login is a required field.'),

        check('password')
            .isLength({ min:1 }).withMessage('Password is a required field.')
    ],
    newProjectValidators: [
        check('project_name')
            .trim()
            .isLength({ min:1, max: 50 }).withMessage('Project name must be between 1 and 50 characters.')
            .matches("^[a-zA-Z 0-9']*$")
                .withMessage('Project name must only contain letters, numbers, spaces, and apostrophes.'),

        check('created_date')
            .isLength({ min:1 }).withMessage('Internal Error: Created date is required.')
            .matches(/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/)
                .withMessage('Date format must be MM/DD/YYYY.'),
    ],
    updateProjectValidator: [
        check('project_name')
            .trim()
            .isLength({ min:1, max: 50 }).withMessage('Project name must be between 1 and 50 characters.')
            .matches("^[a-zA-Z 0-9']*$")
                .withMessage('Project name must only contain letters, numbers, spaces, and apostrophes.'),

        check('project_id')
            .isInt().withMessage('Internal Error: Project ID must be a number.')

    ],
    deleteProjectValidators: [
        check('project_id')
            .isInt().withMessage('Internal Error: Project ID must be a number.')
    ],
    newCategoryValidators: [
        check('category_name')
            .trim()
            .isLength({min: 1, max:20}).withMessage('Category name must be between 1 and 20 characters.')
            .matches('^[a-zA-Z0-9 ]+$').withMessage('Category name must only contain letters numbers and spaces.')
    ],
    deleteCategoryValidator: [
        check('category_id')
            .isInt().withMessage('Internal Error: Category ID must be a number.')
    ],
    updateCategoryValidators: [
        check('category_id')
            .isInt().withMessage('Internal Error: Category ID must be a number.'),

        check('new_category_name')
            .trim()
            .isLength({min: 1, max:20}).withMessage('Category name must be between 1 and 20 characters.')
            .matches('^[a-zA-Z0-9 ]+$').withMessage('Category name must only contain letters numbers and spaces.')
    ],
    newEntryValidators: [
        check('project_id')
            .exists().withMessage('Internal Error: Project ID is required.')
            .isInt().withMessage('Internal Error: Project ID must be a number.'),

        check('start_time')
            .exists().withMessage('Internal Error: Start time is required.')
            .matches('^(1[0-2]|0?[1-9]):([0-5]?[0-9])[ ]([AP]?M)?$')
                .withMessage('Internal Error: Start time must be in HH:MM AM/PM format'),

        check('entry_date')
            .exists().withMessage('Internal Error: Entry date is required.')
            .matches(/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/)
                .withMessage('Internal Error: Date format must be MM/DD/YYYY.')
    ],
    // This on is tricky since it conditionally updates only the parts that are not empty.
    // Need to find out if I can add conditionals to the checking below so that certain checks
    // only apply if a field is not empty.
    updateEntryValidators: [
        check('entry_id')
            .exists().withMessage('Internal Error: Entry ID is required.')
            .isInt().withMessage('Internal Error: Entry ID must be a number'),
        check('category_id')
            .exists().withMessage('Internal Error: Category ID is required.')
            .isInt().withMessage('Internal Error: Category ID must be a number'),
        check('entry_description')
            .exists().withMessage('Internal Error: Entry description is required.'),
        check('total_time')
            .exists().withMessage('Internal Error: Total time is required.')
            // .custom((value, {req, location, path}) => {
            //     if (value !== '') {
            //         // run additional validation
            //         check(path.toString())
            //             .matches('^(1[0-2]|0?[1-9]):([0-5]?[0-9]):([0-5]?[0-9])(?[AP]M)?$')
            //             .withMessage('Internal Error: Time format is invalid.')
            //     } else {
            //         console.log(value)
            //         console.log(location)
            //         console.log(path)
            //         return value;
            //     }
            // })
    ],
    foundErrors: function(req, res, errorFormatter, statusCode) {
        statusCode = statusCode || 200;

        const errors= validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            var errs = errors.array();
            res.status(statusCode).json(errs)
            return true;
        }
    },
    errorFormatters: {
        signupFailures: ({location, msg, param, value, nestedErrors}) => {
            return {type: "Error", name: "Signup Failure", message: msg}
        },
        loginFailures: ({location, msg, param, value, nestedErrors}) => {
            return {type: "Error", name: "Login Failure", message: msg}
        },
        newProjectFailures: ({location, msg, param, value, nestedErrors}) => {
            return {type: "Error", name: "New Project Failure", message: msg}
        },
        genericFailure: ({location, msg, param, value, nestedErrors}) => {
            return {type: "Error", name: "Generic Failure", message: msg}
        },
    }
}

module.exports = { v }
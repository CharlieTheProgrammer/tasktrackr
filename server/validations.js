const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const ERRS = require('../common/error_handling/errors');

// Object with all the validation checks
const v = {
    signupValidators: [
        check('email')
            .isEmail().withMessage(ERRS.USER.EMAIL.DEFAULTS.EMAIL_ONLY),

        check('username')
            .isLength({ min:1 }).withMessage(ERRS.USER.USERNAME.SIGNUP.FIELD_REQUIRED)
            .isAlphanumeric().withMessage(ERRS.USER.USERNAME.SIGNUP.ALPHANUMERIC_ONLY),

        check('password')
            .isLength({ min:8 }).withMessage(ERRS.USER.PASSWORD.SIGNUP.MINIMUM_LENGTH)
            .matches('[0-9]').withMessage(ERRS.USER.PASSWORD.SIGNUP.NUMBER_REQUIRED)
            .matches('[a-z]').withMessage(ERRS.USER.PASSWORD.SIGNUP.LOWERCASE_LETTER_REQUIRED)
            .matches('[A-Z]').withMessage(ERRS.USER.PASSWORD.SIGNUP.UPPERCASE_LETTER_REQUIRED)
                .custom((value, {req, loc, path}) => {
                    if (value !== req.body.confirmPassword) {
                        // throw error if passwords do not match
                        //throw new Error("Passwords don't match");
                        return ERRS.USER.PASSWORD.SIGNUP.PASSWORDS_NO_MATCH;
                    } else {
                        return value;
                    }
                })
    ],
    loginValidators: [
        check('username')
            .isLength({ min:1 }).withMessage(ERRS.USER.USERNAME.LOGIN.FIELD_REQUIRED),

        check('password')
            .isLength({ min:1 }).withMessage(ERRS.USER.PASSWORD.LOGIN.FIELD_REQUIRED)
    ],
    newProjectValidators: [
        check('project_name')
            .trim()
            .isLength({ min:1, max: 50 }).withMessage(ERRS.PROJECT.NAME.DEFAULTS.MINIMUM_LENGTH)
            .matches("^[a-zA-Z 0-9']*$")
                .withMessage(ERRS.PROJECT.NAME.DEFAULTS.BAD_FORMAT),

        check('created_date')
            .isLength({ min:1 }).withMessage(ERRS.PROJECT.CREATED_DATE.DEFAULTS.FIELD_REQUIRED)
            .matches(/^((0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/](19|20)?[0-9]{2})*$/)
                .withMessage(ERRS.PROJECT.CREATED_DATE.DEFAULTS.BAD_FORMAT),
    ],
    updateProjectValidator: [
        check('project_name')
            .trim()
            .isLength({ min:1, max: 50 }).withMessage(ERRS.PROJECT.NAME.DEFAULTS.MINIMUM_LENGTH)
            .matches("^[a-zA-Z 0-9']*$")
                .withMessage(ERRS.PROJECT.NAME.DEFAULTS.BAD_FORMAT),

        check('project_id')
            .isInt().withMessage(ERRS.PROJECT.ID.DEFAULTS.NUMBER_ONLY)

    ],
    deleteProjectValidators: [
        check('project_id')
            .isInt().withMessage(ERRS.PROJECT.ID.DEFAULTS.NUMBER_ONLY)
    ],
    newCategoryValidators: [
        check('category_name')
            .trim()
            .isLength({min: 1, max:20}).withMessage(ERRS.CATEGORY.NAME.DEFAULTS.BAD_LENGTH)
            .matches('^[a-zA-Z0-9 ]+$').withMessage(ERRS.CATEGORY.NAME.DEFAULTS.BAD_FORMAT)
    ],
    deleteCategoryValidator: [
        check('category_id')
            .isInt().withMessage(ERRS.CATEGORY.ID.DEFAULTS.NUMBER_ONLY)
    ],
    updateCategoryValidators: [
        check('category_id')
            .isInt().withMessage(ERRS.CATEGORY.ID.DEFAULTS.NUMBER_ONLY),

        check('new_category_name')
            .trim()
            .isLength({min: 1, max:20}).withMessage(ERRS.CATEGORY.NEW_NAME.DEFAULTS.BAD_LENGTH)
            .matches('^[a-zA-Z0-9 ]+$').withMessage(ERRS.CATEGORY.NEW_NAME.DEFAULTS.BAD_FORMAT)
    ],
    newEntryValidators: [
        check('project_id')
            //.exists().withMessage(ERRS.ENTRY.ID.DEFAULTS.NUMBER_ONLY)
            .isInt().withMessage(ERRS.PROJECT.ID.DEFAULTS.NUMBER_ONLY),

        check('start_time')
            //.exists().withMessage(ERRS.ENTRY.START_TIME.DEFAULTS.BAD_FORMAT)
            //.matches('^(1[0-2]|0?[1-9]):([0-5]?[0-9])[ ]([AP]?M)?$')
            .isISO8601().withMessage(ERRS.ENTRY.START_TIME.DEFAULTS.BAD_FORMAT),

        check('entry_date')
            //.exists().withMessage(ERRS.ENTRY.ENTRY_DATE.DEFAULTS.BAD_FORMAT)
            .matches(/^((0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/](19|20)?[0-9]{2})*$/)
                .withMessage(ERRS.ENTRY.ENTRY_DATE.DEFAULTS.BAD_FORMAT)
    ],
    // This on is tricky since it conditionally updates only the parts that are not empty.
    // Need to find out if I can add conditionals to the checking below so that certain checks
    // only apply if a field is not empty.
    updateEntryValidators: [
        check('entry_id')
            //.exists().withMessage('Internal Error: Entry ID is required.')
            .isInt().withMessage(ERRS.ENTRY.ID.DEFAULTS.NUMBER_ONLY),
        check('category_id')
            .exists().withMessage(ERRS.CATEGORY.ID.DEFAULTS.NUMBER_ONLY),
            //.isInt().withMessage('Internal Error: Category ID must be a number'),
        //check('entry_description')
          //  .exists().withMessage(ERRS.ENTRY.),
        check('total_time')
            .exists().withMessage(ERRS.ENTRY.TOTAL_TIME.DEFAULTS.NUMBER_ONLY)
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
    errorFormatter: ({location, msg, param, value, nestedErrors}) => {
        return msg
    },
}

module.exports = { v }
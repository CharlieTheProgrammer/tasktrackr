const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const Validate = {
    newAccount: function(req, res, next) {
        check('email')
        .isLength({ min: 1 }).withMessage('Email is a required field')
        .isEmail().withMessage('Enter a valid email address');

        next();
    }
}

module.exports = { Validate }
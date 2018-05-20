/*
    A class object to standarize error messages.
*/

/*
    title: Name of the error. Is displayed to the end user.
    message - simple sentence stating error. Meant to be displayed to the end user
    details (optional) - This can be as detailed as I want to make it. Info is not meant for end user.
    extension (optional) - This will hold a json object with custom information
*/

/*
    Object signature is [FIELD CATEGORY][FIELD][CONTEXT][ERROR CODE]

    CONTEXT can be thought of route. it is primarily composed of default error
    codes. However, there are fields that require different validations depending
    on the context. For example, username and password is a field that appears
    on the login and signup page. Therefore, there isn't set of default error codes.
    Instead, the codes are organized by login and signup contexts.

*/

    var CATEGORY_ENUM = ['USER', 'ENTRY', 'CATEGORY', 'PROJECT', 'NETWORK']

    // These two are shortcuts so that 1, less typing, and 2, easy to change
    var TYPE_ENUM = {
        1: 'Info',    // Information that may be displayed to the end user.
        2: 'Warn',    // I probably won't use this one, but listing it here for future purposes
        3: 'Error',   // Something has gone wrong, but user can recover.
        4: 'Fatal'    // A condition that the user cannot recover from.
    }
    var TITLE_ENUM = {
        1: "Signup Error",
        2: "Login Error",
        3: "Projects Error",
        4: "Category Error",
        5: "Entry Error",
        6: "Network Error"
    }

const ERRS = {
        USER: {
            USERNAME: {
                SIGNUP: {
                    FIELD_REQUIRED: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[1],
                        message: "Login is a required field.",
                    },
                    ALPHANUMERIC_ONLY: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[1],
                        message: "Login must be alphanumeric field.",
                    }
                },
                LOGIN: {
                    FIELD_REQUIRED: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[2],
                        message: "Login is a required field.",
                    },
                },
            },
            PASSWORD: {
                SIGNUP: {
                    FIELD_REQUIRED: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[1],
                        message: "Password is a required field.",
                    },
                    ALPHANUMERIC_ONLY: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[1],
                        message: "Password must be alphanumeric.",
                    },
                    NUMBER_REQUIRED: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[1],
                        message: "Password must contain at least 1 number.",
                    },
                    LOWERCASE_LETTER_REQUIRED: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[1],
                        message: "Password must contain at least 1 lowercase letter.",
                    },
                    UPPERCASE_LETTER_REQUIRED: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[1],
                        message: "Password must contain at least 1 uppercase letter.",
                    },
                    MINIMUM_LENGTH: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[1],
                        message: "Password must be at least 8 characters in length.",
                    },
                    PASSWORDS_NO_MATCH: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[1],
                        message: "Passwords don't match",
                    }
                },
                LOGIN: {
                    FIELD_REQUIRED: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[2],
                        message: "Password is a required field.",
                    }
                }
            },
            EMAIL: {
                DEFAULTS: {
                    EMAIL_ONLY: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[2],
                        message: "Enter a valid email address"
                    }
                }
            }
        },
        ENTRY: {
            ID: {
                DEFAULTS: {
                    NUMBER_ONLY: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[5],
                        message: "Internal Error: Entry ID must be a number."
                    }
                }
            },
            ENTRY_DATE: {
                DEFAULTS: {
                    BAD_FORMAT: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[5],
                        message: "Internal Error: Date must be in dd/mm/yyyy format."
                    }
                }
            },
            START_TIME: {
                DEFAULTS: {
                    BAD_FORMAT: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[5],
                        message: "Internal Error: Start time must be in HH:MM AM/PM format."
                    }
                }
            },
            END_TIME: {
                DEFAULTS: {
                    BAD_FORMAT: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[5],
                        message: "Internal Error: End time must be in HH:MM AM/PM format."
                    }
                }
            },
            TOTAL_TIME: {
                DEFAULTS:{
                    NUMBER_ONLY: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[5],
                        message: "Internal Error: Total time must be a number."
                    }
                }
            }
        },
        CATEGORY: {
            NAME: {
                DEFAULTS: {
                    BAD_LENGTH: {
                        type: TYPE_ENUM[1],
                        title: TITLE_ENUM[4],
                        message: "Category name must be between 1 and 20 characters."
                    },
                    BAD_FORMAT: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[4],
                        message: "Category name must only contain letters numbers and spaces."
                    }
                }
            },
            ID: {
                DEFAULTS: {
                    NUMBER_ONLY: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[4],
                        message: "Internal Error: Category ID must be a number."
                    }
                }
            },
            NEW_NAME: {
                DEFAULTS: {
                    BAD_LENGTH: {
                        type: TYPE_ENUM[1],
                        title: TITLE_ENUM[4],
                        message: "Category name must be between 1 and 20 characters."
                    },
                    BAD_FORMAT: {
                        type: TYPE_ENUM[3],
                        title: TITLE_ENUM[4],
                        message: "Category name must only contain letters numbers and spaces."
                    }
                }
            },
        },
        PROJECT: {
            NAME: {
                DEFAULTS: {
                    MINIMUM_LENGTH: {
                        type: TYPE_ENUM[1],
                        title: TITLE_ENUM[3],
                        message: "Project name must be between 1 and 50 characters."
                    },
                    BAD_FORMAT: {
                        type: TYPE_ENUM[1],
                        title: TITLE_ENUM[3],
                        message: "Project name must only contain letters, numbers, spaces, and apostrophes."
                    }
                }
            },
            CREATED_DATE: {
                DEFAULTS: {
                    FIELD_REQUIRED: {
                        type: TYPE_ENUM[1],
                        title: TITLE_ENUM[3],
                        message: "Internal Error: Created date is required."
                    },
                    BAD_FORMAT: {
                        type: TYPE_ENUM[1],
                        title: TITLE_ENUM[3],
                        message: "Internal Error: Date format must be MM/DD/YYYY."
                    }
                }
            },
            ID: {
                DEFAULTS: {
                    NUMBER_ONLY: {
                        type: TYPE_ENUM[1],
                        title: TITLE_ENUM[3],
                        message: "Internal Error: Project ID must be a number."
                    }
                }
            }
        }
    }

module.exports = ERRS
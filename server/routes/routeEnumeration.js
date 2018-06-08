// Makes it easy to see which routes I have.
module.exports = {
    new: {
        project: '/new/project',
        category: '/new/category',
        entry: '/new/entry',
        //user: '/new/user'
        user: '/signup'
    },
    delete: {
        project: '/delete/project',
        category: '/delete/category',
        entry: '/delete/entry'
    },
    update: {
        project: '/update/project',
        category: '/update/category',
        entry: '/update/entry'
    },
    get: {
        project: '/get/project',
        projectList: '/get/projectlist',
        categories: '/get/categories',
        entries: '/get/entries',
        allUserEntries: '/get/allUserEntries',
        user: '/get/user'
    },
    login: '/login',
    logout: '/logout',
    isAuthenticated: '/checksession',
    passwordResetRequest: '/passwordresetrequest',
    passwordReset: '/passwordreset'
};
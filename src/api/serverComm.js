import axios from 'axios'

const route_enum = {
    new: {
        project: '/new/project',
        category: '/new/category',
        entry: '/new/entry',
        loginAttempt: '/login'
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
        entries: '/get/entries'
    }
}

const utils = {
    getDate: function() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd<10){
            dd='0'+dd;
        }
        if (mm<10){
            mm='0'+mm;
        }
        var today = mm+'/'+dd+'/'+yyyy;

        return today;
    }
}

export const ServerComm = {
    methods: {
        createNewProject: function (newProjectName) {
            // We need the project name, user id, and the created date
            console.log("Server Comm: " + newProjectName)
            var createdDate = utils.getDate();

            axios.post(route_enum.new.project, {
                project_name: newProjectName,
                user_id: 202,                 // Need to get rid of this
                created_date: createdDate
            })
                .then(res => {
                    console.log(res);
                    var message = res.message;
                    var newRowID = res.newRowID;
                    // Use ref to set the value to an empty string
                    // Hide the modal
                    //$('#addProject').modal('hide');     // Not sure how to do this without jQuery yet.
                    // Pass in a callback. It will be used for loading project but that is BL and doesn't belong in this function

                    if (typeof _callback === 'function') {
                        _callback();
                    }
                })
                .catch(error => console.log(error));
        }
    }
}
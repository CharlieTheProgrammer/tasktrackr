export const ServerComm = {
    data: function () {
        return {
            // Makes it easy to see which routes I have.
            route_enum: {
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
        }
    },
    methods: {
        // ServerComm: {
        loadCategories: function () {
            this.projectCategories = [
                // This isn't a required field. User can set to blank.
                {
                    category_id: "",
                    category_name: "",
                    hidden: ""
                },
            ]

            var closure = this.projectCategories;

            // Load user's Categories into app
            $.ajax({
                type: "POST",
                url: this.route_enum.get.categories,
                data: { user_id: this.userID }
            }).done(function (data) {
                // Load project entries into app
                data.forEach(function (category) {
                    closure.push(category);
                });
            });
        },
        loadProjects: function (_callback) {
            // Empty out the current projects if we're reloading them.
            this.projects = [];
            var closure = this.projects;

            // Load user's list of projects
            $.ajax({
                type: "POST",
                url: this.route_enum.get.projectList,
                data: { user_id: this.userID }
            }).done(function (data) {
                // Load projects into app
                data.forEach(function (project) {
                    closure.push(project);
                });

                if (typeof _callback === 'function') {
                    _callback();
                }
            });
        },
        createNewProject: function (newProjectName) {
            // We need the project name, user id, and the created date
            console.log("Server Comm: " + newProjectName)
            var createdDate = this.getDate();

            $.ajax({
                type: "POST",
                url: this.route_enum.new.project,  // need to use route enum
                data: {
                    project_name: newProjectName,
                    user_id: 202,                 // Need to get rid of this
                    created_date: createdDate
                }
            }).done(function (response) {
                console.log(response);
                var message = response.message;
                var newRowID = response.newRowID;
                // Use ref to set the value to an empty string
                // Hide the modal
                //$('#addProject').modal('hide');     // Not sure how to do this without jQuery yet.
                // Pass in a callback. It will be used for loading project but that is BL and doesn't belong in this function

                if (typeof _callback === 'function') {
                    _callback();
                }
            })
        },
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
        //}
    }
}


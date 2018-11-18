import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// Don't have a place for this yet
let calculateTimeDiffinMins = function (startTime, endTime) {
    startTime = new Date(startTime)
    let totalTime = new Date(endTime)
    let timeDiff = new Date(totalTime.getTime() - startTime.getTime())

    return timeDiff / 1000 / 60
}

const store = new Vuex.Store({
    strict: false,
    state: {
        projectCategories: {
            0: {
                category_id: "",
                category_name: "",
                hidden: ""
            }
        },
        projects: {
            // Sample
            // 1: {
            //     project_name: "First One",
            //     entries: {
            //         1: {
            //             category_id: "1",
            //             entry_date: "11/20/2017",
            //             entry_description: "Sample entry",
            //             start_time: "10:22 AM",
            //             end_time: "11:00 AM",
            //             total_time: "130 mins",
            //         }
            //     }
            // }
        },
        userSettings: {
            // displayEndTime: {
            //     key: "displayEndTime",
            //     displayName: "", // String
            //     value: "", // Boolean, integer
            //     type: "", // Checkbox, dropdown, etc
            //     options: [], //-> for non-binary settings.
            // }
        },
        dashboard: {
            timestats: {
                timeSpentTodayOnAllProjects: 0,
                timeSpentTodayOnSelectedProject: 0,
                timeSpentOnAllProjects: 0,
                timeSpentOnSelectedProject: 0
            }
        },
        currentProjectId: false,
        isAuthenticated: false,
        testMode: FE_TEST_MODE
    },
    mutations: {
        // Check for existing state in local storage
        'INIT_STORE'(state) {
            if (localStorage.getItem('store')) {
                // Replace the state object with the stored item
                var storedState = JSON.parse(localStorage.getItem('store'))
                store.replaceState(Object.assign(store.state, storedState));
            }
        },

        // 'RESET_PROJECTS' (state) {
        //     Vue.set(state, projects, {} );
        // },
        // 'RESET_PROJECT_CATEGORIES' (state) {
        //     var initialState = {
        //         category_id: "",
        //         category_name: "",
        //         hidden: ""
        //     }

        //     Vue.set(state, projectCategories, initialState );
        // },
        // Login and signup
        'SET_IS_AUTHENTICATED'(state, isLoggedIn) {
            state.isAuthenticated = isLoggedIn;
        },
        // USER ===============================================================
        'LOAD_USER_SETTINGS'(state, settings) {
            settings = JSON.parse(settings)
            for (var setting in settings) {
                if (settings.hasOwnProperty(setting)) {
                    Vue.set(state.userSettings, settings[setting].key, settings[setting]);
                }
            }
        },
        'SET_USER_SETTING'(state, setting) {
            Vue.set(state.userSettings, setting.key, setting);
        },
        // CATEGORIES ==========================================================
        'GET_CATEGORIES'(state, list) {
            state.projectCategories = {
                0:
                {
                    category_id: "",
                    category_name: "",
                    hidden: ""
                }
            }

            for (var item in list) {
                Vue.set(state.projectCategories, list[item].category_id, list[item])
            }
        },
        'ADD_CATEGORY'(state, category) {
            if (!category.category_id) { return Error("Category ID is required") }
            if (!category.category_name) { return Error("Category Name is required") }
            if (!category.hidden === "") { return Error("Category Hidden must be an empty string") }

            Vue.set(state.projectCategories, category.category_id, category)
        },
        'UPDATE_CATEGORY'(state, category) {
            if (!category.category_id) { return Error("Category ID is required") }
            if (!category.new_category_name) { return Error("Category Name is required") }

            state.projectCategories[category.category_id].category_name = category.new_category_name;
        },
        'DELETE_CATEGORY'(state, category_id) {
            state.projectCategories[category_id].hidden = 1;
        },
        // STATS   =============================================================
        'LOAD_RAW_STATS'(state, data) {
            Vue.set(state, 'rawStats', data)
        },
        'UPDATE_DASHBOARD_TIMESTATS'(state, data) {
            /**
             * The shape of data should mimic either the root structure of Dashboard object
             * or a subset of it
             */

            // Loop over
            //Vue.set(state.dashboard, str, data. )
        },
        'UPDATE_TIME_SPENT_TODAY_ON_ALL_PROJECTS'(state, timeStat) {
            Vue.set(state.dashboard.timestats, 'timeSpentTodayOnAllProjects', timeStat)
        },
        'UPDATE_TIME_SPENT_TODAY_ON_SELECTED_PROJECT'(state, timeStat) {
            Vue.set(state.dashboard.timestats, 'timeSpentTodayOnSelectedProject', timeStat)
        },
        'UPDATE_TIME_SPENT_ON_ALL_PROJECTS'(state, timeStat) {
            Vue.set(state.dashboard.timestats, 'timeSpentOnAllProjects', timeStat)
        },
        'UPDATE_TIME_SPENT_ON_SELECTED_PROJECT'(state, timeStat) {
            Vue.set(state.dashboard.timestats, 'timeSpentOnSelectedProject', timeStat)
        },
        // ENTRIES =============================================================
        // Load entries
        'GET_ENTRIES'(state, table) {
            //state.projects = {};
            // Algorithm locates project object the entry belongs to and inserts entry under that project object.
            for (var entry in table) {
                var project_id = table[entry].project_id;

                // Hidden projects are not being returned. Skipping entries for hidden projects
                if (!state.projects[project_id]) {
                    continue
                }

                var key = table[entry].entry_id;
                var value = table[entry];
                //delete table[entry].entry_id;

                Vue.set(state.projects[project_id].entries, key, value)
            }
        },
        'UPDATE_ENTRY'(state, eventData) {
            var projectID = state.currentProjectId
            state.projects[projectID].entries[eventData.entry_id][eventData.fieldName] = eventData.value
        },
        'PUSH_ENTRY'(state, entry) {
            if (!entry.entry_id) {
                throw Error("Entry ID is required!");
                return;
            }

            Vue.set(state.projects[state.currentProjectId].entries, entry.entry_id, entry);
        },
        'COMPLETE_ENTRY'(state, total_time) {
            // Need to get the last entry in the project
            // Get the current project's entries' keys and get the last one.
            var currentProjectId = state.currentProjectId
            var keys = Object.keys(state.projects[currentProjectId].entries)
            var lastEntryId = keys[keys.length - 1]

            Vue.set(state.projects[currentProjectId].entries[lastEntryId], 'total_time', total_time)
        },
        // PROJECTS ============================================================
        // Loads all projects
        'SET_PROJECTS'(state, list) {
            //state.projects = {};  Do not do this, it causes bugs.
            Vue.set(state, "projects", {});

            for (var item in list) {
                Vue.set(state.projects, list[item].project_id, {
                    project_id: list[item].project_id,
                    project_name: list[item].project_name,
                    entries: {}
                })
            }
        },
        'SET_CURRENT_PROJECT_ID'(state, newProjectId) {
            state.currentProjectId = newProjectId;
        },
        'CREATE_PROJECT'(state, newProject) {
            if (!newProject.project_id) { return Error("Project ID is required") }
            if (!newProject.project_name) { return Error("Project Name is required") }

            Vue.set(state.projects, newProject.project_id, {
                project_name: newProject.project_name,
                project_id: newProject.project_id,
                entries: {}
            })
            // USE VUE.SET!!! Although the below works, it will not trigger any events since Vue cannot detect it
            // state.projects[newProject.project_id] = {
            //     project_name: newProject.project_name,
            //     project_id: newProject.project_id
            // }
        },
        'UPDATE_PROJECT_NAME'(state, project) {
            if (!project.project_id) { return Error("Project ID is required") }
            if (!project.project_name) { return Error("Project Name is required") }

            state.projects[project.project_id].project_name = project.project_name;
        },
        'DELETE_PROJECT'(state, project_id) {
            var projectsCopy = {};
            Object.assign(projectsCopy, state.projects)
            delete projectsCopy[project_id]
            Vue.set(state, "projects", projectsCopy)
        }
    },
    actions: {
        // USER MANAGEMENT =====================================================
        loginAttempt: function (context, userInfo) {
            return new Promise((resolve, reject) => {
                axios.post('/login', userInfo)
                    .then(res => {
                        this.commit('SET_IS_AUTHENTICATED', true);
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        logoutAttempt: function () {
            return new Promise((resolve, reject) => {
                axios.post('/logout')
                    .then(res => {
                        this.commit('SET_IS_AUTHENTICATED', false);
                        localStorage.setItem('store', null);
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        signup: function (context, user) {
            return new Promise((resolve, reject) => {
                axios.post('/signup', user)
                    .then(res => {
                        this.commit('SET_IS_AUTHENTICATED', true);
                        resolve(res);
                    })
                    .catch(error => reject(error));
            })
        },
        validSessionCheck: function () {
            return new Promise((resolve, reject) => {
                axios.post('/checksession')
                    .then(res => resolve(res))
                    .catch(error => reject(error))
            });
        },
        passwordResetRequest: function (context, emailAddress) {
            return new Promise((resolve, reject) => {
                axios.post('/passwordresetrequest', emailAddress)
                    .then(res => resolve(res))
                    .catch(error => reject(error))
            });
        },
        setNewPasswordAttempt: function (context, userInfo) {
            return new Promise((resolve, reject) => {
                axios.post('/passwordreset?token=' + userInfo.token, userInfo)
                    .then(res => resolve(res))
                    .catch(error => reject(error))
            });
        },
        // CATEGORIES ==========================================================
        //
        loadCategories: function () {
            console.log("Action: loadCategories");
            return new Promise((resolve, reject) => {
                axios.post('/get/categories')
                    .then(res => {
                        //console.log(res.data)
                        this.commit('GET_CATEGORIES', res.data);
                        resolve(res.data);
                    })
                    .catch(error => reject(error));
            });
        },
        addCategory: function (context, category_name) {
            console.log("Action: addCategory");
            return new Promise((resolve, reject) => {
                axios.post('/new/category', { category_name: category_name })
                    .then(res => {
                        var category = {
                            category_id: res.data.newID,
                            hidden: "",
                            category_name: category_name
                        }
                        this.commit('ADD_CATEGORY', category);
                        resolve(res.data);
                    })
                    .catch(error => reject(error));
            });
        },
        updateCategory: function (context, category) {
            console.log("Action: updateCategory");

            return new Promise((resolve, reject) => {
                axios.post('/update/category', category)
                    .then(res => {
                        this.commit('UPDATE_CATEGORY', category);
                        resolve(res);
                    })
                    .catch(error => reject(error));
            });
        },
        deleteCategory: function (context, category_id) {
            console.log("Action: deleteCategory");
            return new Promise((resolve, reject) => {
                axios.post('/delete/category', {
                    category_id: category_id,
                })
                    .then(res => {
                        this.commit('DELETE_CATEGORY', category_id);
                        resolve(res);
                    })
                    .catch(error => reject(error));
            });
        },
        // ENTRIES =============================================================
        loadAllEntries: function () {
            console.log("Action: loadAllEntries");
            return new Promise((resolve, reject) => {
                axios.post('/get/allUserEntries')
                    .then(res => {
                        this.commit('GET_ENTRIES', res.data);
                        resolve(res.data)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    });
            });
        },
        newEntry: function (context) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            var entry = {
                category_id: "",
                entry_id: null,
                entry_date: mm + '/' + dd + '/' + yyyy,
                entry_description: "",
                start_time: today.toISOString(),
                end_time: "",
                total_time: "",
                project_id: context.state.currentProjectId
            }

            return new Promise((resolve, reject) => {
                axios.post('/new/entry', entry)
                    .then(res => {
                        if (!res.data.newID) {
                            reject(res)
                        }

                        entry.entry_id = res.data.newID
                        this.commit('PUSH_ENTRY', entry);
                        resolve(res);
                    })
                    .catch(error => reject(error))
            })
        },
        updateEntry: function (context, event) {
            var eventData = {
                fieldName: event.target.dataset.cat,
                entry_id: event.target.dataset.entry_id,
                value: event.target.value
            }

            this.commit('UPDATE_ENTRY', eventData);

            // get entry
            var currentProjectId = context.state.currentProjectId;
            var entry = context.state.projects[currentProjectId].entries[eventData.entry_id]

            // console.log("Entry below should be the updated one, not the original entry")
            // console.log(entry)

            return new Promise((resolve, reject) => {
                axios.post('/update/entry', entry)
                    .then(res => {
                        console.log("Successfully updated entry in server.")
                        resolve(res.data);
                    })
                    .catch(error => {
                        // Need to come up with way of handling network loss, perhaps a message queue with a process
                        // that periodically tries to send the updates to the server.
                        console.log("Error saving entry to server.")
                        reject(error)
                    })
            });
        },
        completeEntry: function (context) {
            var date = new Date();
            var dateTime = date.toISOString();

            // Then get the current time and then do math.
            this.commit('COMPLETE_ENTRY', dateTime);
        },
        // PROJECTS ============================================================
        loadProjectList: function () {
            return new Promise((resolve, reject) => {
                console.log("Action: loadProjectList");
                axios.post('/get/projectlist')
                    .then(res => {
                        this.commit('SET_PROJECTS', res.data);
                        resolve(res.data);
                    })
                    .catch(error => reject(error));
            })
        },
        setCurrrentProjectId: function (context, newProjectId) {
            if (!newProjectId) {
                throw Error("Action requires project id.")
                return;
            }

            this.commit('SET_CURRENT_PROJECT_ID', newProjectId)
        },
        createProject: function (context, newProjectName) {
            console.log("Action: createProject");
            // When adding a project, a project ID is required and that can only come from the server.
            // For the meantime, projects cannot be created in offline mode. Later, I can make it so by
            // creating a temporary staging area.

            console.log(newProjectName);

            var createdDate = '01/01/2099'

            return new Promise((resolve, reject) => {
                axios.post('new/project', {
                    project_name: newProjectName,
                    created_date: createdDate
                })
                    .then(res => {
                        // Commit new project
                        this.commit('CREATE_PROJECT', {
                            project_id: res.data.newID,
                            project_name: newProjectName
                        });
                        resolve(res)
                    })
                    .catch(error => reject(error));
            })
        },
        updateProject: function (context, project) {
            console.log("Action: updateProject");

            return new Promise((resolve, reject) => {
                axios.post('/update/project', project)
                    .then(res => {
                        this.commit('UPDATE_PROJECT_NAME', project);
                        resolve(res);
                    })
                    .catch(error => reject(error));
            });
        },
        deleteProject: function (context, project_id) {
            console.log("Action: deleteProject");

            return new Promise((resolve, reject) => {
                axios.post('/delete/project', { project_id: project_id })
                    .then(res => {
                        this.commit('DELETE_PROJECT', project_id);
                        resolve(res);
                    })
                    .catch(error => reject(error));
            });
        },
        // SETTINGS ============================================================
        getUserSettings: function () {
            // This will fetch other settings from backend.
            console.log("Action: getOtherSettings");

            return new Promise((resolve, reject) => {
                axios.post('/get/usersettings')
                    .then(res => {
                        this.commit('LOAD_USER_SETTINGS', res.data);
                        resolve(res);
                    })
                    .catch(error => reject(error));
            });
        },
        setUserSettings: function (context, setting) {
            // This will send update to the backend then updata the state.
            console.log("Action: setUserSettings");
            // Since we're blobbing this information on the back end, the entire settings will be sent over
            this.commit('SET_USER_SETTING', setting)
            // One concern I have here is that code below may execute before commit.
            // In that case, the settings in backend would not reflect app state.

            return new Promise((resolve, reject) => {
                axios.post('/update/usersettings', { userSettings: JSON.stringify(context.state.userSettings) })
                    .then(res => {
                        // If a race condition occurs, I can verify here that state
                        // matches user supplied setting
                        resolve(res);
                    })
                    .catch(error => reject(error));
            });
        },
        // REPORTS =============================================================
        /**
         * requestInfo needs user_id, date for stats
         */
        getStats: function (context, requestInfo) {
            console.log("Action: getRawStats");

            return new Promise((resolve, reject) => {
                axios.post('/get/stats', requestInfo)
                    .then(res => {
                        this.commit('LOAD_RAW_STATS', res.data);
                        resolve(res);
                    })
                    .catch(error => reject(error));
            });
        },
        updateTimeStatsHandler: function ({ commit, dispatch }) {
            console.log('WHAT')
            dispatch('updateTimeSpentTodayOnAllProjects')
            dispatch('updateTimeSpentTodayOnSelectedProject')
            dispatch('updateTimeSpentOnAllProjects')
            dispatch('updateTimeSpentOnSelectedProject')
        },
        updateTimeSpentTodayOnAllProjects: function ({state}) {
            let timeSpentTodayOnAllProjects = 0
            let today = new Date(Date.now()).toISOString().split('T')[0]

            state.rawStats.forEach((entry) => {
                if (entry.total_time != null & entry.start_timeYMD == today) {
                    timeSpentTodayOnAllProjects += Math.round(calculateTimeDiffinMins(entry.start_time, entry.total_time))
                }
            })
            this.commit('UPDATE_TIME_SPENT_TODAY_ON_ALL_PROJECTS', timeSpentTodayOnAllProjects)
        },
        updateTimeSpentTodayOnSelectedProject: function ({state}) {
            let timeSpentTodayOnSelectedProject = 0
            let projectId = state.currentProjectId
            let today = new Date(Date.now()).toISOString().split('T')[0]

            state.rawStats.forEach((entry) => {
                if (entry.total_time != null & entry.project_id == projectId & entry.start_timeYMD == today) {
                    timeSpentTodayOnSelectedProject += Math.round(calculateTimeDiffinMins(entry.start_time, entry.total_time))
                }
            })
            this.commit('UPDATE_TIME_SPENT_TODAY_ON_SELECTED_PROJECT', timeSpentTodayOnSelectedProject)
        },
        updateTimeSpentOnAllProjects: function ({state}) {
            let timeSpentOnAllProjects = 0

            state.rawStats.forEach((entry) => {
                if (entry.total_time != null) {
                    timeSpentOnAllProjects += Math.round(calculateTimeDiffinMins(entry.start_time, entry.total_time))
                }
            })
            this.commit('UPDATE_TIME_SPENT_ON_ALL_PROJECTS', timeSpentOnAllProjects)
        },
        updateTimeSpentOnSelectedProject: function ({state}) {
            console.log('CALLED IT')
            let timeSpentOnSelectedProject = 0
            let projectId = state.currentProjectId

            state.rawStats.forEach((entry) => {
                if (entry.total_time != null & entry.project_id == projectId) {
                    timeSpentOnSelectedProject += Math.round(calculateTimeDiffinMins(entry.start_time, entry.total_time))
                }
            })
            this.commit('UPDATE_TIME_SPENT_ON_SELECTED_PROJECT', timeSpentOnSelectedProject)
        }
    },
    getters: {
        projects: function (state) {
            return state.projects;
        },
        project: function (state) {
            if (!state.currentProjectId) {
                return undefined;
            }
            return state.projects[state.currentProjectId];
        },
        projectCategories: function (state) {
            return state.projectCategories;
        },
        currentProjectId: function (state) {
            return state.currentProjectId;
        },
        isAuthenticated: function (state) {
            return state.isAuthenticated;
        },
        userSettings: function (state) {
            return state.userSettings;
        },
        stats: function (state) {
            return state.rawStats
        },
        timeStats: function (state) {
            return state.dashboard.timestats
        }
    }
})

export { store };
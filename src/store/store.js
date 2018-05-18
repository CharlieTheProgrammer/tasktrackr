import Vue from 'vue';
import Vuex from 'vuex';
import appcontrol from '../store/modules/appcontrol'

Vue.use(Vuex);

// export default new Vuex.Store({
//     modules: {
//         appcontrol
//     }
// })

import axios from 'axios';
import { ServerComm } from '../api/serverComm'
const store = new Vuex.Store({
//export default new Vuex.Store({
    state: {
        projectCategories: [
            {
                category_id: "",
                category_name: "",
                hidden: ""
            },
        ],
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
        userInfo: {
            currentProjectId: 1
        },
        isAuthenticated: false
    },
    mutations: {
        // Check for existing state in local storage
        'initStore' (state) {
            if (localStorage.getItem('store')) {
                // Replace the state object with the stored item
                var storedState = JSON.parse(localStorage.getItem('store'))
                console.log(storedState);
                store.replaceState(Object.assign(store.state, storedState));
            }
        },
        // Login and signup
        'SET_LOGGED_IN' (state, isLoggedIn) {
            state.isAuthenticated = isLoggedIn;
        },

        // Load categories
        'GET_CATEGORIES' (state, data) {
            console.log(data);
            state.projectCategories = [
                {
                    category_id: "",
                    category_name: "",
                    hidden: ""
                }
            ]

            for (var category in data) {
                state.projectCategories.push(data[category]);
            }
        },

        // Load all projects
        'GET_PROJECTLIST' (state, list) {
            //state.projects = {};  Do not do this, it causes bugs.

            for (var item in list) {
                Vue.set(state.projects, list[item].project_id, {project_name: list[item].project_name, entries: {}} )
            }
        },

        // Load entries
        'GET_ENTRIES' (state, table) {
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
        'UPDATE_ENTRY' (state, eventData) {
            var projectID = state.userInfo.currentProjectId
            state.projects[projectID].entries[eventData.entry_id][eventData.fieldName] = eventData.value
            //var entry_id = entry.entry_id
        },
        'PUSH_ENTRY' (state, entry) {
            if (!entry.entry_id) {
                throw Error("Entry ID is required!");
                return;
            }

            Vue.set(state.projects[state.userInfo.currentProjectId].entries, entry.entry_id, entry);
        },

        'SET_CURRENT_PROJECT_ID' (state, newProjectId) {
            state.userInfo.currentProjectId = newProjectId;
        },

        // Relating to Entries
        // Add entry
        // Update Entry ... and if we wanted to further break these down
            // Update entry category
            // Update entry description
            // Update end time and total time, although contextually, this occurs differently.

        // Relating to Project categories... I will mutate these here
        // Update category name
        // 'Delete a category' - actually just marks it as hidden.

        // Relating to Projects
        // Add a project
        'CREATE_PROJECT' (state, newProjectName) {
            // If an error occurs at the server, but not on the front end, how will I ensure the user's data
            // is not lost? Only thing I can think of at the moment is to add it to a
            // temporary area.

            // When adding a project, a project ID is required and that can only come from the server.
            // For the meantime, projects cannot be created in offline mode. Later, I can make it so by
            // creating a temporary staging area.

            // Add project to backend.
            console.log("create project mutation: ");
            console.log(newProjectName);
            ServerComm.methods.createNewProject(newProjectName);

                // Add project to data model. This will be a callback since project ID is needed.
        }

        // Edit a project name - Something that occurs on settings page

    },
    actions: {
        // Everything under here is basically everything under mutations
        setIsAuthenticated: function(context, isLoggedIn) {
            console.log("Action: setIsAuthenticated to " + isLoggedIn);
            if (typeof(isLoggedIn) !== 'boolean') {
                throw Error("Invalid value")
            }

            this.commit('SET_LOGGED_IN', isLoggedIn);
        },
        loginAttempt: function(context, username, password) {
            return new Promise((resolve, reject) => {
                axios.post('/login', {'username': username, 'password': password})
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        if (res.status === 200 && res.data.type !== "Error") {
                            this.commit('SET_LOGGED_IN', true);
                            resolve(res);
                        } else {
                            reject(res);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    });
            });
        },
        loadCategories: function() {
            console.log("Action: loadCategories");
            return new Promise((resolve, reject) => {
                axios.post('/get/categories')
                    .then(res => {
                        //console.log(res.data)
                        this.commit('GET_CATEGORIES', res.data);
                        resolve(res.data);
                    })
                    .catch(error => {
                        console.log(error)
                    });
                });
        },
        loadProjectList: function() {
            return new Promise((resolve, reject) => {
                console.log("Action: loadProjectList");
                axios.post('/get/projectlist')
                    .then(res => {
                        this.commit('GET_PROJECTLIST', res.data);
                        resolve(res.data);
                    })
                    .catch(error => {
                        reject(error);
                    })
                })
        },
        loadAllEntries: function() {
            console.log("Action: loadAllEntries");
            return new Promise((resolve, reject) => {
                axios.post('/get/allUserEntries')
                    .then(res => {
                        this.commit('GET_ENTRIES', res.data);
                        resolve(res.data)
                    })
                    .catch(error => console.log(error));
                });
        },
        newEntry: function(context) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd ='0' + dd;
            }

            if (mm < 10) {
                mm ='0' + mm;
            }

            var today = mm+'/'+dd+'/'+yyyy;
            var start_time = '01:10 PM'

            var entry = {
                category_id: 0,
                entry_id: null,
                entry_date: today,
                entry_description: "",
                start_time: start_time,
                end_time: "",
                total_time: "",
                project_id: context.state.userInfo.currentProjectId
            }

            return new Promise((resolve, reject) => {
                axios.post('/new/entry', entry)
                    .then(res => {
                        if (!res.data.newID) {
                            resolve(res)
                        }

                        entry.entry_id = res.data.newID
                        this.commit('PUSH_ENTRY', entry);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        },
        updateEntry: function(context, event) {
            var eventData = {
                fieldName: event.target.dataset.cat,
                entry_id: event.target.dataset.entry_id,
                value: event.target.value
            }

            this.commit('UPDATE_ENTRY', eventData);

            // get entry
            var currentProjectId = context.state.userInfo.currentProjectId;
            var entry = context.state.projects[currentProjectId].entries[eventData.entry_id]

            // console.log("Entry below should be the updated one, not the original entry")
            // console.log(entry)

            return new Promise((resolve, reject) => {
                axios.post('/update/entry', entry)
                    .then(res => {
                        console.log("Successfuly update entry in server.")
                        resolve(res.data);
                    })
                    .catch(err => {
                        // Need to come up with way of handling network loss, perhaps a message queue with a process
                        // that periodically tries to send the updates to the server.
                        console.log("Error saving entry to server.")
                        console.log(err)
                        reject(err)
                    })
            });
        },
        setCurrrentProjectId: function (context, newProjectId) {

            // const localProjectId = localStorage.getItem('currentProjectId');
            // // Local Storage	Function arg

            // // empty	not empty	use var
            // if (!localProjectId && newProjectId) {
            //     localStorage.setItem('currentProjectId', newProjectId);
            //     this.commit('SET_CURRENT_PROJECT_ID', newProjectId);
            //     return;
            // };
            // // not empty	not empty	use var
            // if (localProjectId && newProjectId) {
            //     localStorage.setItem('currentProjectId', newProjectId);
            //     this.commit('SET_CURRENT_PROJECT_ID', newProjectId);
            //     return;
            // };
            // // not empty	empty use local
            // if (localProjectId && !newProjectId) {
            //     console.log("Action: setCurrrentProjectId to " + localProjectId);
            //     this.commit('SET_CURRENT_PROJECT_ID', localProjectId)
            // } else {
            //     // empty	empty	This is an error condition
            //     console.error("setCurrrentProjectId Error")
            // }

            if (!newProjectId) {
                throw Error("Action requires project id.")
                return;
            }

            // console.log("Action: setCurrrentProjectId to " + newProjectId);
            this.commit('SET_CURRENT_PROJECT_ID', newProjectId)
        },

        createProject: function(context, newProjectName) {
            console.log("Action: createProject");
            this.commit('CREATE_PROJECT', newProjectName);
        }
    },
    getters: {
        projects: function(state) {
            return state.projects;
        },
        project: function(state) {
            if (!state.userInfo.currentProjectId) {
                return undefined;
            }
            return state.projects[state.userInfo.currentProjectId];
        },
        projectCategories: function(state) {
            return state.projectCategories;
        },
        currentProjectId: function(state) {
            return state.userInfo.currentProjectId;
        },
        isAuthenticated: function(state) {
            return state.isAuthenticated;
        }
    }
})

export { store };


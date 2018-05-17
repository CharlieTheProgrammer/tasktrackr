import axios from 'axios';
import Vue from 'vue';
import { ServerComm } from '../../api/serverComm'

const state = {
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
}


const mutations = {
    // Check for existing state in local storage
    'initStore' (state) {
        if (localStorage.getItem('store')) {
            // Replace the state object with the stored item
            var storedState = JSON.parse(localStorage.getItem('store'))
            console.log(storedState);
            this.$store.replaceState(Object.assign(state, storedState));
        }
    },
    // Login and signup
    'SET_LOGGED_IN' (state, isLoggedIn) {
        state.isAuthenticated = isLoggedIn;
    },

    // Load categories
    'GET_CATEGORIES' (state, data) {
        console.log(data);
        for (var category in data) {
            state.projectCategories.push(data[category]);
        }
    },

    // Load all projects
    'GET_PROJECTLIST' (state, list) {
        for (var item in list) {
            Vue.set(state.projects, list[item].project_id, {project_name: list[item].project_name, entries: {}} )
        }
    },

    // Load entries
    'GET_ENTRIES' (state, table) {
        // Algorithm locates project object the entry belongs to and inserts entry under that project object.
        for (var entry in table) {
            var project_id = table[entry].project_id;

            if (!state.projects[project_id]) {
                continue
            }

            var key = table[entry].entry_id;
            var value = table[entry];
            delete table[entry].entry_id;

            Vue.set(state.projects[project_id].entries, key, value)
        }
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

};

const actions = {
    // Everything under here is bassically everything under mutations
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
    // initAppData: function() {
    //     this.$store.dispatch()
    // },
    setCurrrentProjectId: function (context, newProjectId) {

        const localProjectId = localStorage.getItem('currentProjectId');
        // Local Storage	Function arg

        // empty	not empty	use var
        if (!localProjectId && newProjectId) {
            localStorage.setItem('currentProjectId', newProjectId);
            this.commit('SET_CURRENT_PROJECT_ID', newProjectId);
            return;
        };
        // not empty	not empty	use var
        if (localProjectId && newProjectId) {
            localStorage.setItem('currentProjectId', newProjectId);
            this.commit('SET_CURRENT_PROJECT_ID', newProjectId);
            return;
        };
        // not empty	empty use local
        if (localProjectId && !newProjectId) {
            console.log("Action: setCurrrentProjectId to " + localProjectId);
            this.commit('SET_CURRENT_PROJECT_ID', localProjectId)
        } else {
            // empty	empty	This is an error condition
            console.error("setCurrrentProjectId Error")
        }

        // console.log("Action: setCurrrentProjectId to " + newProjectId);
        // this.commit('SET_CURRENT_PROJECT_ID', newProjectId)
    },

    createProject: function(context, newProjectName) {
        console.log("Action: createProject");
        this.commit('CREATE_PROJECT', newProjectName);
    }
};

const getters = {
    projects: function() {
        return state.projects;
    },
    project: function() {
        if (!state.userInfo.currentProjectId) {
            return undefined;
        }
        return state.projects[state.userInfo.currentProjectId];

        // I find the below to be less readable than the above.
        //return state.userInfo.currentProjectId ? state.projects[state.userInfo.currentProjectId] : undefined
    },
    projectCategories: function() {
        return state.projectCategories;
    },
    currentProjectId: function() {
        return state.currentProjectId;
    },
    isAuthenticated: function() {
        return state.isAuthenticated;
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}
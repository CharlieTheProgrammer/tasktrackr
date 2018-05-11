<template>
  <div>
      <app-header :isAuthenticated="isAuthenticated"></app-header>
      <router-view></router-view>
    <div>
        <!-- <app-loginscreen :errorMsg="LoginScreen.errorMsg" :displayError="LoginScreen.displayError" v-if="true"></app-loginscreen> -->
        <!-- TIMER -->
         <!-- <section id="timerRow" class="py-4">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-6 col-md-6 d-flex justify-content-center align-items-center">
                        <app-timer></app-timer>
                    </div>
                    <div class="col-lg-6 col-md-6 d-flex justify-content-center align-items-center">
                        <app-controller></app-controller>
                    </div>
                </div>
            </div>
        </section> -->
    </div>
    <!-- <app-projectnav :currentProjectID="currentProjectID" :currentProjectName="currentProjectName" :projects="projects" v-if="true"></app-projectnav> -->

    <!-- <section class="">
        <button @click="loadCategories">Get Categories</button>
        <button @click="loadProjectList">Get Project List</button>
        <button @click="loadEntries">Load Saved Entries</button>
        <button @click="logState">Log State to Console</button>
        <a class="btn btn-primary" href="/login">Auth0 Login</a>
        <h3>Testing</h3>
        <p class="display-2">{{ userID }}</p>
        <ul v-for="(item, index) in projects" :key="index">
            <li>{{ item.project_name }}</li>
        </ul>
        <h1>Spacer</h1>
    </section> -->
    <footer class="footer">
      <div class="container text-center">
        <span class="text-muted">&copy; 2018 Charlie The Programmer</span>
      </div>
    </footer>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Login from './components/Login'
  import AppController from './components/AppController'
  import Timer from './components/Timer.vue'
  import ProjectNav from './components/project/ProjectNav.vue'
  import EntryContainer from './components/project/EntryContainer.vue'
  import Entry from './components/project/Entry.vue'

  import { MainBus } from './main'
  import { ServerComm } from './mixins/serverComm'

    import axios from 'axios'

export default {
    components: {
        'app-header': Header,
        'app-loginscreen': Login,
        'app-controller': AppController,
        'app-timer': Timer,
        'app-projectnav': ProjectNav
    },
    mixins: [ServerComm],
    data: function() {
        return {

        }
    },
    computed: {
        isAuthenticated: function() {
            return this.$store.getters.isAuthenticated;
        }
    },
    // beforeCreate: function() {
    //     var localProjectID = localStorage.getItem("currentProjectsID");

    //     if (localProjectID !== null || localProjectID !== undefined) {
    //         this.currentProjectID = localStorage.getItem("currentProjectID");
    //     }
    //     console.log(this.currentProjectID);
    // },
    // created: function() {
    //     window.onbeforeunload = function(){
    //         alert("Dave, I'm afraid I cannot do that.")
    //     };
    //     this.loadCategories();
    //     console.log(this.$route.query);


    //     MainBus.$on('getSharedState', (dataPoint) => {
    //         // Check if data point exists, if it doesn't send back error.
    //         if (this[dataPoint]) {
    //             MainBus.$emit('SharedStateUpdate', this[dataPoint]);
    //             return;
    //         }

    //         console.error(dataPoint + ": Does not exist.");
    //     });

    //     MainBus.$on('setSharedState', (dataPoint, value) => {
    //         // Check if data point exists, if it doesn't send back error.
    //         if (this[dataPoint]) {
    //             this[dataPoint] = value;
    //             MainBus.$emit('SharedStateUpdate', this[dataPoint]);
    //             return;
    //         }

    //         console.error(dataPoint + ": Does not exist.");
    //     });

    //     MainBus.$on('loginAttempt', (data) => {

    //         //this.LoginScreen.errorMsg = 'Login failedqweqwe';

    //         var closure = this.LoginScreen.errorMsg;

    //         // Login
    //         $.ajax({
    //             type: "POST",
    //             url: this.route_enum.new.loginAttempt,
    //             data: {
    //                 username: this.login,
    //                 password: this.password,
    //                 }
    //         }).done(function(response) {
    //             // if successful
    //             if (response == "OK") {
    //                 // Load Projects
    //                 this.loadProjects();

    //                 // Load Categories
    //                 console.log(this.projectCategories)
    //                 this.loadCategories();

    //                 // Load user data ???
    //                     // userID: 1,       THIS ONE I'M NOT SUPPOSE TO BE USING
    //                     // userFirstName: "Charlie",    IRRELEVANT FOR NOW
    //                     // userLastName: "O",           IRRELEVANT FOR NOW
    //                     // currentProjectID: 1,         CAN BE CHECKED LOCALLY
    //                     // currentProjectName: 'Project Nav Testing',   CAN BE CHECKED LOCALLY

    //                 // Need to figure out what else I need to load. I'll need to make other function calls here

    //                 console.log(this.projectCategories)
    //                 // turn off processing screen
    //             }

    //             // if login failed
    //                 // turn off processing screen
    //             // Show login failure error message
    //             // response.error or response.message from server

    //             //closure = error.msg;
    //             if (closure != '') {
    //                 this.LoginScreen.displayError = true;
    //             } else if (closure == '') {
    //                 this.LoginScreen.displayError = false;
    //             }
    //             // turn off processing screen.

    //         });
    //     });

    //     MainBus.$on('createNewProject', (newProjectName) => {
    //         this.createNewProject(newProjectName);
    //     });
    // },
    methods: {
        loadCategories: function() {
            this.$store.dispatch('loadCategories');

            // axios.get('/testing')
            //     .then(res => console.log(res))
            //     .catch(error => console.log(error));
        },
        loadProjectList: function() {
            this.$store.dispatch('loadProjectList');
        },
        loadEntries: function() {
            this.$store.dispatch('loadAllEntries');
        },
        logState: function() {
            console.log(this.$store.state);
        }
    },
}
</script>

<style>

/* * {
    border: 1px solid red;
} */

body, html {
    margin: auto;
    height: 100%;
}

/* .wrapper {
    margin-bottom: 4rem;
} */

.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    /* Set the fixed height of the footer here */
    height: 40px;
    line-height: 40px; /* Vertically center the text there */
    background-color: #f5f5f5;
  }

#entries {
    margin-bottom: 2rem;
}

/* If removed q,g,y letters will be cut off on text inputs */
input[type=text] {
    line-height: 1rem;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: inherit;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: inherit;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: inherit;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: inherit;
  }

/* TABLE/ENTRIES COLUMN CONTROLS */
  .table {
      table-layout: fixed;
  }

/* +++++ CUSTOM BOOTSTRAP EXTENSIONS +++++ */

/* Boostrap SM  */
@media (min-width: 576px) {
    .w-sm-2 {
        width: 2% !important;
    }

    .w-sm-3 {
        width: 3% !important;
    }

    .w-sm-4 {
        width: 4% !important;
    }

    .w-sm-5 {
        width: 5% !important;
    }

    .w-sm-8 {
        width: 8% !important;
    }

    .w-sm-10 {
        width: 10% !important;
    }

    .w-sm-20 {
        width: 20% !important;
    }

    .w-sm-40 {
        width: 40% !important;
    }

    .w-sm-75 {
        width: 75% !important;
    }

    .w-sm-100 {
        width: 100% !important;
    }

    .w-sm-120 {
        width: 120% !important;
    }
}

/* Boostrap MD  */
@media (min-width: 768px) {
    .w-md-5 {
        width: 5% !important;
    }
    .w-md-8 {
        width: 8% !important;
    }

    .w-md-10 {
        width: 10% !important;
    }

    .w-md-20 {
        width: 20% !important;
    }

    .w-md-40 {
        width: 40% !important;
    }

    .w-md-75 {
        width: 75% !important;
    }

    .w-md-100 {
        width: 100% !important;
    }
}

/* Bootstrap LG */
@media (min-width: 992px) {
    .w-lg-10 {
        width: 10% !important;
    }

    .w-lg-20 {
        width: 20% !important;
    }

    .w-lg-30 {
        width: 30% !important;
    }

    .w-lg-40 {
        width: 40% !important;
    }

    .w-lg-75 {
        width: 75% !important;
    }

    .w-lg-100 {
        width: 100% !important;
    }
}

/* Bootstrap XL */
@media (min-width: 1200px) {
    .w-xl-10 {
        width: 10% !important;
    }

    .w-xl-20 {
        width: 20% !important;
    }

    .w-xl-40 {
        width: 40% !important;
    }

    .w-xl-75 {
        width: 75% !important;
    }

    .w-xl-100 {
        width: 100% !important;
    }
}
</style>

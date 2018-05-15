<template>
    <div>
      <app-header :isAuthenticated="isAuthenticated"></app-header>
      <router-view></router-view>
    

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
    methods: {
        // loadCategories: function() {
        //     this.$store.dispatch('loadCategories');

        //     // axios.get('/testing')
        //     //     .then(res => console.log(res))
        //     //     .catch(error => console.log(error));
        // },
        // loadProjectList: function() {
        //     this.$store.dispatch('loadProjectList');
        // },
        // loadEntries: function() {
        //     this.$store.dispatch('loadAllEntries');
        // },
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

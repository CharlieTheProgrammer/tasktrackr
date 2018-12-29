<template>
  <div id="header">
    <!-- MAIN NAVIGATION -->
    <nav
        class="navbar"
        :class="headerBackgroundColor"
        >
        <div class="container-fluid">
            <router-link :to="calcRoute" tag="a" class="h3 mr-auto text-light">TaskTrackr</router-link>
            <button href="#" class="btn btn-secondary m-2" v-if="showGoBackButton" @click="$router.go(-1)">Go Back</button>
            <router-link to="/dashboard" tag="a" class="btn btn-dashboard m-2" v-if="isAuthenticated">Dashboard</router-link>
            <router-link to="/error" tag="a" class="btn btn-primary m-2" v-if="testMode">Error Page</router-link>
            <router-link to="/settings" tag="a" class="btn btn-outline-secondary btn-sm m-2 text-light" v-if="isAuthenticated">Settings</router-link>
            <router-link to="/login" class="btn btn-primary m-2 px-4" v-if="!isAuthenticated">Log In</router-link>
            <router-link to="/signup" id="signupBtn" class="btn btn-primary m-2 px-4" v-if="!isAuthenticated">Signup</router-link>
            <button href="#" class="btn btn-outline-secondary btn-sm m-2 text-light" @click.prevent="logout" v-else>Log Out</button>
            <router-link to="/docs" class="border border-secondary rounded-circle ml-2 px-2 text-warning">?</router-link>
        </div>
    </nav>

    <div>
        <app-notifications></app-notifications>
    </div>
  </div>
</template>

<script>
import notifications from './notifications/Notifications.vue'
import { ErrorsBus } from '../main'

    export default {
        props: {
            isAuthenticated: {
                type: Boolean,
                required: true
            }
        },
        components: {
            'app-notifications': notifications,
        },
        methods: {
            logout: function() {
                this.$store.dispatch('logoutAttempt')
                    .then(this.$router.push('/', () => window.location.reload()))
                    .catch(err => ErrorsBus.errorHandler(err));
            }
        },
        computed: {
            testMode: function() {
                return this.$store.state.testMode
            },
            headerBackgroundColor: function() {
                if (this.testMode) {
                    return 'bg-warning'
                }
            },
            calcRoute: function() {
                if (this.isAuthenticated) {
                    return '/ProjectSelect'
                } else {
                    return '/'
                }
            },
            showGoBackButton: function() {
                if (this.$route.path == '/home' || this.$route.path == '/') {
                    return false
                } else {
                    return true
                }
            }
        }
    }
</script>

<style scoped>
#header {
    background: #000428;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #004e92, #000428);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #004e92, #000428); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    -webkit-box-shadow: -3px 0px 20px 5px rgba(0,4,40,.8);
    -moz-box-shadow: -3px 0px 20px 5px rgba(0,4,40,.8);
    box-shadow: -3px 0px 20px 5px rgba(0,4,40,.8);
}

#signupBtn {
    background-color: rgba(248, 91, 60, 0.9);
    border-color: rgba(248, 91, 60, 0.9)
    }

.btn-dashboard {
    color: #fff;
    background-color: #20c997;
    border-color: #20c997;
}
</style>


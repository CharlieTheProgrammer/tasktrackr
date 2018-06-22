<template>
  <div>
    <!-- MAIN NAVIGATION -->
    <nav
        class="navbar navbar-dark"
        :class="headerBackgroundColor">
        <div class="container-fluid">
            <router-link :to="calcRoute" tag="a" class="h2 text-uppercase text-muted mr-auto">Project TT</router-link>
            <router-link to="/processing" tag="a" class="btn btn-primary m-2" v-if="testMode">Test Link</router-link>
            <button href="#" class="btn btn-secondary m-2" v-if="this.$route.path == '/settings'" @click="$router.go(-1)">Go Back</button>
            <router-link to="/settings" tag="a" class="btn btn-primary m-2" v-if="isAuthenticated && this.$route.path != '/settings'">Settings</router-link>
            <router-link to="/login" class="btn btn-primary m-2 px-4" v-if="!isAuthenticated">Log In</router-link>
            <router-link to="/signup" class="btn btn-secondary m-2 px-4" v-if="!isAuthenticated">Signup</router-link>
            <button href="#" class="btn btn-primary m-2" @click.prevent="logout" v-else>Log Out</button>
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
                } else {
                    return 'bg-dark'
                }
            },
            calcRoute: function() {
                if (this.isAuthenticated) {
                    return '/ProjectSelect'
                } else {
                    return '/'
                }
            }
        }
    }
</script>


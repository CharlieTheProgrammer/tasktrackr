<template>
   <div>
        <section class="container my-4">
            <div class="jumbotron w-75 mx-auto">
                <p class="h2 text-center py-2">Project TT Login</p>
                <p class="lead text-center">or <router-link to="/signup" tag="a">create a new account</router-link></p>
                <form class="w-50 mx-auto" action="/login" method="POST" enctype="x-www-form-urlencoded">
                    <div class="form-group">
                        <label>Login</label>
                        <input class="form-control" type="text" name="username" required v-model="username">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input class="form-control" type="password" name="password" required v-model="password">
                    </div>
                    <div class="d-flex justify-content-center align-content-center">
                        <button type="submit" class="text-center btn btn-success btn-lg my-3 w-50" @click.prevent="login">Login</button>
                    </div>
                    <div class="d-flex justify-content-center align-content-center mt-2">
                        <router-link to="/requestpasswordreset" tag="a">Forgot your password?</router-link>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import { ErrorsBus } from '../../main'

    export default {
        data: function() {
            return {
                username: null,
                password: null
            }
        },
        methods: {
            login: function() {
                var userInfo = {
                    username: this.username,
                    password: this.password
                }
                this.$store.dispatch('loginAttempt', userInfo)
                    .then(response => {
                        this.$router.push('Processing');
                    })
                    .catch(err => {
                        ErrorsBus.errorHandler(err)
                    })
            }
        }
    }
</script>

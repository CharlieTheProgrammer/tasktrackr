<template>
    <div>
        <section class="container my-4">
            <div class="jumbotron w-75 mx-auto">
                <div class="w-50 mx-auto">
                    <p class="h2 text-center py-2">Create an Account</p>
                    <p class="lead text-center">or <router-link to="/login" tag="a">sign into your new account</router-link></p>
                </div>
                <form class="w-50 mx-auto" method="POST">
                    <div class="form-group">
                        <label>Login</label>
                        <input class="form-control" type="text" name="username" required v-model="username">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input class="form-control" type="email" name="email" placeholder="email@example.com" v-model="email">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input class="form-control" type="password" name="password" required v-model="password">
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input class="form-control" type="password" name="confirmPassword" required v-model="confirmPassword">
                    </div>
                    <div class="d-flex justify-content-center align-content-center">
                        <button type="submit" class="text-center btn btn-success btn-lg my-3 px-4" @click.prevent="createNewAccount">Create New Account</button>
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
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            }
        },
        methods: {
            createNewAccount: function() {
                var userInfo = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    confirmPassword: this.confirmPassword
                }
                this.$store.dispatch('signup', userInfo)
                    .then(res => this.$router.push('processing'))
                    .catch(err => ErrorsBus.errorHandler(err))
            }
        }
    }
</script>


<template>
    <div>
        <section id="" class="container my-4">
            <div class="jumbotron w-75 mx-auto">
                <div class="w-50 mx-auto">
                    <p class="h2 text-center py-2">Create an Account</p>
                    <p class="lead text-center">or <router-link to="/login" tag="a">sign into your new account</router-link></p>
                </div>
                <form class="w-50 mx-auto" action="/signup" method="POST" enctype="x-www-form-urlencoded">
                    <div class="form-group">
                        <label>Login</label>
                        <input class="form-control" type="text" name="username" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input class="form-control" type="email" name="email" placeholder="email@example.com" >
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input class="form-control" type="password" name="password" required>
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input class="form-control" type="password" name="confirmPassword" required>
                    </div>
                    <div class="d-flex justify-content-center align-content-center">
                        <button type="submit" class="text-center btn btn-success btn-lg my-3 px-4" @click.prevent="createNewAccount">Create New Account</button>
                    </div>
                </form>
                <div v-if="displayError" v-for="msg in errorMsg">
                    <div class="text-danger" >{{ msg.message }}</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'

    export default {
        data: function() {
            return {
                displayError: true,
                errorMsg: null,
                username: null,
                password: null
            }
        },
        methods: {
            createNewAccount: function() {
                console.log(this.username + " " + this.password);
                axios.post('/signup', {'username': this.username, 'password': this.password})
                    .then(res => {
                            console.log(res);
                            console.log(res.data);
                            this.errorMsg = res.data;
                        })
                    .catch(error => console.log(error))
            }
        }
    }
</script>


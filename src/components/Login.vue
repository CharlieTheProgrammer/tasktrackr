<template>
   <div>
        <section id="" class="container my-4">
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
                </form>
                <div v-if="displayError" >
                    <div class="text-danger" v-for="msg in errorMsg">{{ msg.message }}</div>
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
            login: function() {
                console.log(this.username + " " + this.password);
                this.errorMsg = null;

                axios.post('/login', {'username': this.username, 'password': this.password})
                    .then(res => {
                        console.log(res);
                        console.log(res.data);

                        if (res.status === 200 && res.data.type !== "Error") {
                            this.$store.dispatch('setIsAuthenticated', true)
                            this.$router.push('QP');
                        } else {
                            this.errorMsg = res.data;
                        }
                    })
                    .catch(error => console.log(error))
            },

        }
    }
</script>

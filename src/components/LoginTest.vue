<template>
  <div>
    <!-- <section id="" class="container my-4">
        <div class="jumbotron w-75 mx-auto">
            <p class="h2 bg-light text-center py-2">Project TT Login</p>
            <form class="w-50 mx-auto">
                <div class="form-group">
                    <label>Login</label>
                    <input class="form-control" type="text" name="Login" id="login" v-model="login">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input class="form-control" type="password" name="password" id="password" v-model="password">
                </div>
                <div class="d-flex justify-content-center align-content-center">
                    <button type="submit" class="text-center btn btn-success btn-lg my-3 w-50" v-on:click.prevent="loginUser">Login</button>
                </div>
            </form>
            <div v-if="displayError">
                <div class="text-danger">{{ errorMsg }}</div>
            </div>
          </div>
    </section> -->
    <section id="" class="container my-4">
        <div class="jumbotron w-75 mx-auto">
            <p class="h2 bg-light text-center py-2">Testing create account</p>
            <form class="w-50 mx-auto">
                <div class="d-flex justify-content-center align-content-center">
                    <button type="submit" class="text-center btn btn-success btn-lg my-3 w-50" v-on:click.prevent="createUser">New User</button>
                    <button type="submit" class="text-center btn btn-success btn-lg my-3 w-50" v-on:click.prevent="tryLogin">Login</button>
                    <button type="submit" class="text-center btn btn-success btn-lg my-3 w-50" v-on:click.prevent="tryAuth">Auth</button>
                </div>
            </form>
            <div v-if="displayError">
                <div class="text-danger">{{ errorMsg }}</div>
            </div>
          </div>
    </section>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props: ['errorMsg', 'displayError'],
        data: function() {
            return {
                login: '',
                password: '',
                webAuth: null,
            }
        },
        methods: {
            loginUser: function() {

            },
            createUser: function() {
                axios.defaults.headers.post['Content-Type'] = 'application/json';

                var data = {
                        "client_id": "Yxui0xTgW1xrUC4gqniCOsH6K1P1tTPY",
                        "email": "testing@test.com",
                        "password": "test",
                        "connection": "Username-Password-Authentication",
                        "user_metadata": { plan: 'silver', team_id: 'a111' }
                }
                axios.post('https://projecttt.auth0.com/dbconnections/signup', data)
                    .then(res => console.log(res))
                    .catch(error => console.log(error.response));
            },
            tryLogin: function() {
                console.log(axios.defaults.headers.common)
                //axios.defaults.headers.common['Access-Control-Allow-Origin']= '*'

                axios.get('https://projecttt.auth0.com/authorize', {
                    params: {
                        "response_type": 'token',
                        "client_id" :'Yxui0xTgW1xrUC4gqniCOsH6K1P1tTPY',
                        "connection": '',
                        "redirect_uri": 'http://localhost:3000/testing',
                        "state": 1234567,
                    }
                })
                    .then(res => console.log(res))
                    .catch(error => console.log(error));
            },
        },
        mounted: function() {
            console.log(this.$route.query);
            console.log(this.$route);
        }
    }
</script>


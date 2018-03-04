<template>
  <div>
    <section id="" class="container my-4">
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
    </section>
  </div>
</template>

<script>
    import { MainBus } from '../main'
    import { ServerComm } from '../mixins/serverComm'

    export default {
        mixins: [ServerComm],
        props: ['errorMsg', 'displayError'],
        data: function() {
            return {
                login: '',
                password: '',
            }
        },
        methods: {
            loginUser: function() {
                // Check that login and password are not empty

                MainBus.$emit('loginAttempt', {
                    login: this.login,
                    password: this.password
                });

                // Turn on processing screen

            }
        },
    }
</script>


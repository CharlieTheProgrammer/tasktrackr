<template>
    <div>
        <section class="container my-5">
            <div class="jumbotron w-75 mx-auto">
                <p class="h2 text-center py-2">Request Password Reset</p>
                <p class="lead text-center">or <router-link to="/login" tag="a">return to login.</router-link></p>
                <form class="w-50 mx-auto" action="/passwordreset" method="POST" enctype="x-www-form-urlencoded">
                    <div class="form-group">
                        <label>Enter your email address.</label>
                        <input class="form-control" type="email" name="email" required v-model="email">
                    </div>
                    <div class="d-flex justify-content-center align-content-center">
                        <button type="submit" class="text-center btn btn-warning btn-lg my-3 w-50" @click.prevent="resetPassword">Reset Password</button>
                    </div>
                </form>
                <div v-if="display">
                    <p class="h5 text-center text-success py-2">Password Reset Successfully Sent.</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { ErrorsBus } from '../../main'

    export default {
        data: function() {
            return {
                email: '',
                display: false
            }
        },
        methods: {
            resetPassword: function() {
                this.$store.dispatch('passwordResetRequest', {email: this.email})
                    .then(res => this.display = true)
                    .catch(err => ErrorsBus.errorHandler(err))
            }
        }
    }
</script>
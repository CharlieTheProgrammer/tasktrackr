<template>
    <div>
        <section id="" class="container my-5">
            <div class="jumbotron w-75 mx-auto">
                <div class="w-50 mx-auto">
                    <p class="h2 text-center py-2">Enter new password</p>
                </div>
                <form class="w-50 mx-auto" method="POST">
                    <div class="form-group">
                        <label>Password</label>
                        <input class="form-control" type="password" name="password" required v-model="password">
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input class="form-control" type="password" name="confirmPassword" required v-model="confirmPassword">
                    </div>
                    <div class="d-flex justify-content-center align-content-center">
                        <button type="submit" class="text-center btn btn-success btn-lg my-3 px-4" @click.prevent="setNewPassword">Submit</button>
                    </div>
                </form>
                <div v-if="display">
                    <p class="h5 text-center text-success py-2">Password Successfully Reset. You may now log in.</p>
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
                password: "",
                confirmPassword: "",
                display: false
            }
        },
        methods: {
            setNewPassword: function() {
                var userInfo = {
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    token: this.$route.query.token
                }

                this.$store.dispatch('setNewPasswordAttempt', userInfo)
                    .then(res => {
                        this.display = true
                        // Clear out token
                    })
                    .catch(err => ErrorsBus.errorHandler(err))
            }
        }
    }
</script>
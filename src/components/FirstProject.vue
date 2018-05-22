<template>
    <!-- CREATE NEW PROJECT WELCOME SCREEN-->
    <section id="newProjectWelcome" class="container my-4" v-if="true">
        <div class="jumbotron ">
            <h1 class="display-3 text-center">Start Time Tracking Today</h1>
            <p class="lead text-center w-75 mx-auto">Project time trackers allows you to create projects, assign categories, and keep track of all your time spent.</p>
            <input type="text" name="projectName" id="projectName" class="form-control w-50 mx-auto" v-model="projectName">
            <div class="d-flex justify-content-center align-content-center w-100">
                <button class="text-center btn btn-success btn-lg my-3" v-on:click.prevent="createProject">Create your first project</button>
            </div>
          </div>
    </section>
</template>

<script>
import { ErrorsBus } from '../main'

    export default {
        data: function() {
            return {
                projectName: ''
            }
        },
        methods: {
            createProject: function() {
                this.$store.dispatch('createProject', this.projectName)
                    .then(res => this.$router.push('processing'))
                    .catch(err => ErrorsBus.errorHandler(err))
            }
        }
    }
</script>

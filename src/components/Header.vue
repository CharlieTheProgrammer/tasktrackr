<template>
  <div>
    <!-- MAIN NAVIGATION -->
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link to="/" tag="a" class="h2 text-uppercase text-muted mr-auto">Project TT</router-link>
            <button href="#" class="btn btn-primary m-2" data-toggle="modal" data-target="#addProject" v-if="true">Create Project</button>
            <router-link to="/processing" tag="a" class="btn btn-primary m-2">Test Link</router-link>
            <router-link to="/settings" tag="a" class="btn btn-primary m-2" v-if="isAuthenticated">Settings</router-link>
            <router-link to="/login" class="btn btn-primary m-2 px-4" v-if="!isAuthenticated">Log In</router-link>
            <button href="#" class="btn btn-primary m-2" @click.prevent="logout" v-else>Log Out</button>
        </div>
    </nav>

    <div>
        <app-alerts></app-alerts>
    </div>

    <!-- NEW PROJECT MODAL -->
    <div
        id="addProject"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        data-backdrop="static"
        >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add a New Project</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="projectName=''">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Enter a name for your new project.</p>
                <form id="newProjectForm" novalidate :class="{'was-validated': validated}">
                    <div class="form-group">
                        <label>Project Name</label>
                        <input type="text" name="project_name" id="projectName" class="form-control" required v-model="projectName" v-on:keyup="validated = true">
                        <div class="invalid-feedback">
                            Please provide a project name.
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-secondary mx-1" data-dismiss="modal" v-on:click="projectName=''">Close</button>
                        <button type="button" class="btn btn-primary mx-1" v-on:click="createNewProject">Save changes</button>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import alerts from "./myalerts.vue"
import { ErrorsBus } from '../main'

    export default {
        props: ['isAuthenticated'],
        components: {
            'app-alerts': alerts
        },
        data: function() {
            return {
                projectName: '',
                validated: false,
                loggedIn: false,
            }
        },
        methods: {
            createNewProject: function() {
                if (this.projectName !== '') {
                    this.$store.dispatch('createProject', this.projectName)
                        .catch(err => {
                            ErrorsBus.errorHandler(err)
                        })
                    this.projectName = '';
                } else if (this.projectName === '') {
                    this.validated = true;
                }
            },
            logout: function() {
                axios.post('/logout')
                    .then(res => {
                        console.log(res);
                        console.log(res.data);

                        if (res.status === 200 && res.data.type !== "Error") {
                            this.$store.dispatch('setIsAuthenticated', false)
                            this.$router.push('QP');
                        } else {
                            this.errorMsg = res.data;
                        }
                    })
                    .catch(error => console.log(error))
            }
        }
    }
</script>


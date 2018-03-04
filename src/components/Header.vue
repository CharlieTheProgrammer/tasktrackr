<template>
  <div>
    <!-- MAIN NAVIGATION -->
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <a href="/" class="h2 text-uppercase text-muted mr-auto">Project TT</a>
            <button href="#" class="btn btn-primary ml-auto m-2" data-toggle="modal" data-target="#addProject">Create Project</button>
            <a href="" class="btn btn-primary m-2">Settings</a>
        </div>
    </nav>

    <!-- NEW PROJECT MODAL -->
    <div id="addProject" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static">
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
                        <button type="button" class="btn btn-primary mx-1" v-on:click.prevent="createNewProject">Save changes</button>
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
    import { MainBus } from '../main'

    export default {
        data: function() {
            return {
                projectName: '',
                validated: false
            }
        },
        methods: {
            createNewProject: function() {
                if (this.projectName !== '') {
                    // call ServerComm
                    MainBus.$emit('createNewProject', this.projectName)
                    this.projectName = '';
                } else if (this.projectName === '') {
                    this.validated = true;
                }

                return;
            }
        }
    }
</script>


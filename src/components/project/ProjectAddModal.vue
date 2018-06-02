<template>
    <div>
        <!-- NEW PROJECT MODAL -->
        <div
            id="addProject"
            class="modal fade"
            :class="{show: isShown}"
            :style="{display: blockDisplay}"
            tabindex="-1"
            role="dialog"
            data-backdrop="static"
            >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add a New Project</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="projectName=''" @click.prevent="$emit('toggleModal')">
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
                                    Please provide a valid project name.
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-secondary mx-1" data-dismiss="modal" v-on:click="projectName=''" @click.prevent="$emit('toggleModal')">Close</button>
                                <button type="button" class="btn btn-primary mx-1" v-on:click.prevent="createNewProject">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ErrorsBus } from '../../main'

    export default {
        props: ['toggle'],
        data: function() {
            return {
                projectName: '',
                validated: false,
                isShown: false,
                blockDisplay: 'none'
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
            }
        },
        watch: {
            toggle: function() {
                if (!this.toggle) {
                    this.blockDisplay = 'none'
                } else {
                    this.blockDisplay = 'block'
                }

                this.isShown = !this.isShown;
                this.validated = false;
            }
        }
    }
</script>

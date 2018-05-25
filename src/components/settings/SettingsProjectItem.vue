<template>
    <div>
        <div class="row py-2 mx-4" >
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <input
                    class="h4 w-100"
                    type="text"
                    v-model="name"
                    :class="{
                    'border border-primary bg-light': !isDisabled,
                    'bg-transparent border-0': isDisabled,
                    }"
                    v-bind:disabled="isDisabled">
            </div>
            <div class="col-lg-6 col-sm-4">
                <button
                    class="btn btn-primary btn-sm mx-1"
                    v-on:click="onEdit()"
                    v-if="isDisabled">Edit</button>
                <button
                    class="btn btn-warning btn-sm mx-1"
                    v-else
                    v-on:click="onSave()">Save</button>
                <button
                    class="btn btn-danger btn-sm mx-1"
                    v-on:click="onDelete()">Delete</button>
            </div>
        </div>
    </div>
</template>


<script>
import { ErrorsBus } from '../../main'

    export default {
        props: ['project'],
        data: function() {
            return {
                name: this.project.project_name,
                isDisabled: true
            };
        },
        methods: {
            onEdit: function() {
                this.isDisabled = false;

            },
            onSave: function() {
                this.isDisabled = true;
                this.updateProject();
            },
            onDelete: function() {
                this.deleteProject();
            },
            addProject: function() {
                // Validate Project name here. This is where the errors file comes in.

                this.$store.dispatch('addProject', project_name)
                        .catch(err => {
                            ErrorsBus.errorHandler(err);
                        })
            },
            updateProject: function() {
                // Get Project name from input field.
                var project = {
                    project_id: this.project.project_id,
                    project_name: this.name
                }

                this.$store.dispatch('updateProject', project)
                        .catch(err => {
                            ErrorsBus.errorHandler(err);
                        })
            },
            deleteProject: function() {
                if (Number(this.project.project_id) === Number(this.$store.getters.currentProjectId)) {
                    var err = {
                        type: "Error",
                        title: "Projects Failure",
                        message: "A project that is in use cannot be deleted."
                    }

                    ErrorsBus.errorHandler(err)
                    return;
                }

                this.$store.dispatch('deleteProject', this.project.project_id)
                    .then(location.reload())
                    .catch(err => {
                        ErrorsBus.errorHandler(err);
                    })
            }
        }
    };
</script>


<template>
    <div>
        <!-- DELETION CONFIRMATION MODAL -->
        <div
            id="confirmDelete"
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
                        <h5 class="modal-title">Confirm Deletion</h5>
                        <button type="button" class="close" aria-label="Close" @click.prevent="$emit('resetDeleteConfirmationModal')">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete {{ thingToDelete.project_name || thingToDelete.category_name }}?</p>
                        <form id="newProjectForm">
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-secondary mx-1" @click.prevent="$emit('resetDeleteConfirmationModal')">Close</button>
                                <button type="button" class="btn btn-danger mx-1" v-on:click.prevent="confirmDeletion">Delete {{ thingToDelete.project_name || thingToDelete.category_name }}</button>
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
        props: ['toggle', 'thingToDelete', 'projectOrCategory'],
        data: function() {
            return {
                isShown: false,
                blockDisplay: 'none'
            }
        },
        methods: {
            confirmDeletion: function() {
                if (this.projectOrCategory === 'project') {

                    if (Number(this.thingToDelete.project_id) === Number(this.$store.getters.currentProjectId)) {
                        var err = {
                            type: "Error",
                            title: "Projects Failure",
                            message: "A project that is in use cannot be deleted."
                        }

                        ErrorsBus.errorHandler(err)
                        return;
                    }

                    this.$store.dispatch('deleteProject', this.thingToDelete.project_id)
                        .then( res => {
                            this.$emit('resetDeleteConfirmationModal');
                            location.reload(); // Don't recall why this is done. Check and maybe remove.
                        })
                        .catch(err => {
                            ErrorsBus.errorHandler(err);
                        })
                } else if (this.projectOrCategory === 'category') {
                    this.$store.dispatch('deleteCategory', this.thingToDelete.category_id)
                        .then(this.$emit('resetDeleteConfirmationModal'))
                        .catch(err => {
                            ErrorsBus.errorHandler(err);
                        })
                } else {
                   console.error("Delete modal received incorrect value.")
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
            }
        }
    }
</script>

<template>
    <div class="d-flex justify-content-center w-100">
        <!-- Project Nav -->
        <div class="container-fluid bg-light border">
            <div class="row justify-content-between align-items-center p-4 mx-xl-5">
                <p class="h3 font-weight-normal">{{ selectedProject.project_name }}</p>
                <button
                    class="btn btn-primary btn-sm"
                    data-toggle="modal"
                    data-target="#changeproject"
                    >Change Project</button>
            </div>
        </div>
        <hr>
        <!-- Popup Modal Window For Nav-->
        <div class="modal fade" id="changeproject" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Projects</h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            v-if="currentProjectID"
                            >
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Pick a project below</p>
                        <ul  v-for="(project, index) in projects" :key="index">
                            <li><button
                                    class="btn btn-sm btn-outline-info"
                                    data-dismiss="modal"
                                    @click="setCurrrentProjectId(index)"
                                    >{{ project.project_name }}</button>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                            v-if="!currentProjectID"
                            >Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['currentProjectID', 'projects'],
        methods: {
            setCurrrentProjectId: function(key) {
                console.log(key);
                this.$store.dispatch('setCurrrentProjectId', key);
                return;
            }
        }
    }
</script>

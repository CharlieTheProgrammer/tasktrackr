<template>
    <div>
        <!-- Popup Modal Window For Nav-->
        <div class="" id="changeproject" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Projects</h5>
                        <button
                            type="button"
                            class="close"
                            aria-label="Close"
                            v-if="currentProjectID"
                            >
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Select a project to work on</p>
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
        data: function() {
            return {

            }
        },
        methods: {
            setCurrrentProjectId: function(key) {
                console.log(key);
                this.$store.dispatch('setCurrrentProjectId', key);
                this.$router.push('home');
            }
        },
        computed: {
            projects: function() {
                return this.$store.getters.projects;
            },
            currentProjectID: function() {
                return this.$store.getters.currentProjectID;
            }
        }
    }
</script>


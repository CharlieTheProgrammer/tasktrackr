<template>
    <div>
        <!-- Popup Modal Window For Nav-->
        <div
            id="changeproject"
            class="modal fade"
            :class="{show: isShown}"
            :style="{display: blockDisplay}"
            tabindex="-1"
            role="dialog"
            >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Projects</h5>
                        <button
                            type="button"
                            class="close"
                            aria-label="Close"
                            v-if="currentProjectID"
                            @click.prevent="$emit('toggleModal')"
                            >
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Select a project to work on</p>
                        <ul  v-for="(project, index) in projects" :key="index">
                            <li><button
                                    class="btn btn-sm btn-outline-info"
                                    @click="setCurrrentProjectId(index)"
                                    >{{ project.project_name }}</button>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            v-if="!currentProjectID"
                            @click.prevent="$emit('toggleModal')"
                            >Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ErrorsBus } from '../../main'

    export default {
        props: {
            toggle: {
                type: Boolean,
                required: true
            }
        },
        data: function() {
            return {
                isShown: false,
                blockDisplay: 'none'
            }
        },
        methods: {
            setCurrrentProjectId: function(key) {
                console.log(key);
                this.$store.dispatch('setCurrrentProjectId', key);
                this.$router.push('home');
                this.$emit('toggleModal');
            }
        },
        computed: {
            projects: function() {
                return this.$store.getters.projects;
            },
            currentProjectID: function() {
                return this.$store.getters.currentProjectID;
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
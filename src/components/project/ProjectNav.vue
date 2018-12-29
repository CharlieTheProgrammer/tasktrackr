<template>
    <div class="d-flex justify-content-center w-100">
        <!-- Project Nav -->
        <div class="container-fluid bg-light border">
            <div class="row justify-content-between align-items-center p-4 mx-xl-5">
                <p class="h3 font-weight-normal">{{ selectedProject.project_name }}</p>
                <button
                    :class="classes"
                    data-toggle="modal"
                    data-target="#changeproject"
                    @click="clickAction"
                    >Change Project</button>
            </div>
        </div>
        <hr>
        <!-- Popup Modal Window For Nav-->
        <app-project-select-modal
            :toggle="toggle"
            :projects="projects"
            @toggleModal="toggle = !toggle"
            ></app-project-select-modal>
    </div>
</template>

<script>
import ProjectSelectModal from './ProjectSelectModal.vue'
import { TimerBus } from '../../main'

    export default {
        props: {
            selectedProject: {
                type: Object,
                required: true
            },
            projects: {
                type: Object,
                required: true
            }
        },
        components: {
            'app-project-select-modal': ProjectSelectModal
        },
        data: function() {
            return {
                toggle: false,
                classes: "btn btn-primary btn-sm",
                clickAction: this.default
            }
        },
        methods: {
            default: function() {
                this.toggle = !this.toggle
            },
            timerIsRunningWarning: function() {
                alert('Project cannot be changed while timer is running.')
            }
        },
        created: function() {
            var timer = TimerBus.getTimerData()

            if (timer.tInterval) {
                // Gray out Change Project button
                this.classes = "btn btn-secondary btn-sm"
                // Toggle alert action instead of modal
                this.clickAction = this.timerIsRunningWarning
            }

            TimerBus.$on('startTimer', () => {
                // Gray out Change Project button
                this.classes = "btn btn-secondary btn-sm"
                // Toggle alert action instead of modal
                this.clickAction = this.timerIsRunningWarning
            })

            TimerBus.$on('stopTimer', () => {
                // Reverse changes above
                this.classes = "btn btn-primary btn-sm"
                this.clickAction = this.default
            })
        }
    }
</script>
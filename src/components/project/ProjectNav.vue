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
                    @click="toggle = !toggle"
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

    export default {
        props: ['currentProjectID', 'selectedProject', 'projects'],
        components: {
            'app-project-select-modal': ProjectSelectModal
        },
        data: function() {
            return {
                toggle: false,
            }
        }
    }
</script>
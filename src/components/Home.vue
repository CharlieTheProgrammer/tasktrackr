<template>
    <div>
        <!-- TIMER -->
         <section id="timerRow" class="py-4">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-6 col-md-6 d-flex justify-content-center align-items-center">
                        <app-timer></app-timer>
                    </div>
                    <div class="col-lg-6 col-md-6 d-flex justify-content-center align-items-center">
                        <app-controller></app-controller>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <app-project></app-project>
        </section>
    </div>

</template>

<script>
    import AppController from './AppController'
    import Timer from './Timer.vue'
    import Project from './project/Project.vue'
    import FirstProjectWelcome from './FirstProject.vue'

    export default {
        components: {
            'app-controller': AppController,
            'app-timer': Timer,
            'app-project': Project,
            'app-firstprojectwelcome': FirstProjectWelcome
        }
    }
</script>

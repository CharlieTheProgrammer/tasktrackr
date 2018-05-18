<template>
    <div>
        <!-- <p v-if="!selectedProject">Select a project</p> -->

        <section>
            <app-project-nav :selectedProject="selectedProject" :projects="projects"></app-project-nav>
            <app-entry-container
                :selectedProject="selectedProject"
                :projectCategories="projectCategories"
                ></app-entry-container>
            <button @click="log">Console log projects</button>
        </section>
    </div>

</template>

<script>
    import ProjectNav from './ProjectNav.vue'
    import EntryContainer from './EntryContainer.vue'

    export default {
        components: {
            'app-project-nav': ProjectNav,
            'app-entry-container': EntryContainer
        },
        computed: {
            projects: function() {
                return this.$store.getters.projects;
            },
            selectedProject: function() {
                return this.$store.getters.project;
            },
            projectCategories: function() {
                return this.$store.getters.projectCategories;
            }
        },
        methods: {
            log: function() {
                console.log(this.projects);
            }
        },
        beforeRouteEnter: function(to, from, next) {
            if (this.$store.getters.isAuthenticated) {
                next();
            }
        }
    }
</script>

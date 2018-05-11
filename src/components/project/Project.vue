<template>
    <div>
        <h1>This is the Project Component</h1>
        <p>Import the project sub-components</p>
        <p v-if="!selectedProject">Select a project</p>

        <section>
            <app-project-nav :selectedProject="selectedProject" :projects="projects"></app-project-nav>
            <app-entry-container
                :projects="projects"
                :selectedProject="selectedProject"
                :categories="projectCategories"
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

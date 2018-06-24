<template>
    <div>
        <!-- <p v-if="!selectedProject">Select a project</p> -->

        <section>
            <app-project-nav :selectedProject="selectedProject" :projects="projects"></app-project-nav>
            <app-entry-container
                :selectedProject="selectedProject"
                :projectCategories="projectCategories"
                ></app-entry-container>
        </section>
    </div>

</template>

<script>
    import ProjectNav from './ProjectNav.vue'
    import EntryContainer from './EntryContainer.vue'
    import { TimerBus } from '../../main'
    import { ErrorsBus } from '../../main'

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
        beforeRouteEnter: function(to, from, next) {
            if (this.$store.getters.isAuthenticated) {
                next();
            }
        },
        created: function() {
            // This is when a new entry is made
            TimerBus.$on('startTimer', () => {
                this.$store.dispatch('newEntry')
                    .catch(err => {
                        ErrorsBus.$emit("ErrorEvent", err)
                    })
            })

            TimerBus.$on('TimerData', (timer) => {
                // Send dispatch to store
                this.$store.dispatch('completeEntry')
                    .catch(err => {
                        ErrorsBus.$emit("ErrorEvent", err)
                    })
            })
        },
        beforeDestroy: function() {
            TimerBus.$off('startTimer')
            TimerBus.$off('TimerData')
        }
    }
</script>

<template>
    <div>
        <h2 class="text-center py-4">Loading the Good Stuff</h2>
        <div class="loader mx-auto"></div>
    </div>
</template>

<script>
import { ErrorsBus } from '../main'

    export default {
        created: function() {
            var p1 = this.$store.dispatch('loadCategories');

            var p2 = this.$store.dispatch('loadProjectList');

            var p3 = this.$store.dispatch('loadAllEntries');
            var Vuee = this;

            Promise.all([
                    p1.catch(error => ErrorsBus.$emit("errorEvent", error)),
                    p2.catch(error => ErrorsBus.$emit("errorEvent", error)),
                    p3
                ])
                // If I catch all the errors above, the 'then' is triggered which is odd
                // since if all promises fail, 'then' should not be considered successful.
                // That's why .finally is available.
                // At any rate, resolving this issue by putting at leaving at least one error slip through.
                .then(values => {
                    console.log("All promises completed successfully.");

                    // This introduces an odd race condition. I keep getting a length of 0
                    //var projectsLength = Object.keys(Vuee.$store.getters.projects).length;

                    // If there isn’t a project, display the create project popup.
                    if (values[1].length === 0) {
                        console.log('Pushing to First Project Welcome')
                        Vuee.$router.push('FirstProject');
                    } else if (Vuee.$store.getters.currentProjectId ) {
                        // If there is a default project and it exists, load that.
                        console.log('Pushing to Project')
                        Vuee.$router.push('home');
                    } else {
                        // If there are projects, but no default show the select project screen.
                        console.log('Pushing to Project Select')
                        Vuee.$router.push('ProjectSelect');
                    }
                })
                .catch(error => {
                    console.log("Error occurred during loading");
                    // console.log(error);
                    ErrorsBus.$emit("errorEvent", error)
                })
        }
    }
</script>

<style>
    .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
    }

    /* Safari */
    @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
</style>

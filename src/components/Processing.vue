<template>
    <div>
        <h2 class="text-center py-4">Loading the Good Stuff</h2>
        <div class="loader mx-auto"></div>
    </div>
</template>

<script>
    export default {
        created: function() {
            var p1 = this.$store.dispatch('loadCategories');

            var p2 = this.$store.dispatch('loadProjectList');

            var p3 = this.$store.dispatch('loadAllEntries');

            Promise.all([p1, p2, p3])
                .then(values => {
                    console.log("All promises completed successfully.");
                    this.$router.push('firstproject');
                })
                .catch(error => {
                    console.log("Error occurred during loading");
                    console.log(error);
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

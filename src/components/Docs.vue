<template>
    <div class="pt-1" style="background-color: #CCC;">
        <!-- Highlight Project Creation -->
        <section class="my-5 container-fluid" style="background-color: #002B59;">
            <div class="row pb-4">
                <div class="col">
                    <h1 class="pt-4 text-light text-center">Create Many Projects</h1>
                </div>
                <div class="col d-sm-none d-lg-block"></div>
                <div class="w-100"></div>

                <div class="col">
                    <video
                        autoplay="true"
                        loop="true"
                        src="/img/Creating_Projects.mp4"
                        width="700px"
                        class="mx-auto d-block py-4"
                        ></video>
                </div>
                <div class="ml-4 pt-4 text-light col">
                    <p class="h5">To Create a Project</p>
                    <ol class="lead">
                        <li>Click on Settings in the top menu.</li>
                        <li>Click on the Add Project button.</li>
                        <li>Enter a project name and then click on the Save Changes button.</li>
                    </ol>
                    <div class="">

                    <p class="h5">To Edit a Project Name</p>
                    <ol class="lead">
                        <li>Click on Settings in the top menu.</li>
                        <li>Click on the Edit button.</li>
                        <li>Update the project name and then click on the Save button.</li>
                    </ol>
                    <p class="h5">To Delete a Project</p>
                    <ol class="lead">
                        <li>Click on Settings in the top menu.</li>
                        <li>Click on the Delete button. A pop-up will appear to confirm deletion.</li>
                    </ol>
                    </div>
                </div>
            </div>
        </section>

        <!-- Highlight Entry Categorizations -->
        <section class="my-5 mx-4" style="background-color: #004E92;">
            <div class="row pb-4">
                <div class="col">
                    <h1 class="pt-4 text-light text-center">Create Categories to Organize Tasks</h1>
                </div>
                <div class="col d-sm-none d-lg-block"></div>
                <div class="w-100"></div>

                <div class="col">
                    <video
                        autoplay="true"
                        loop="true"
                        src="/img/Creating_Categories.mp4"
                        width="700px"
                        class="mx-auto d-block py-4"
                        ></video>
                </div>
                <div class="ml-4 pt-4 text-light col">
                    <p class="h5">To Create a Category</p>
                    <ol class="lead">
                        <li>Click on Settings in the top menu.</li>
                        <li>Click on the Add Category button.</li>
                        <li>Enter a category name and then click on the Save Changes button.</li>
                    </ol>

                    <p class="h5">To Edit a Category Name</p>
                    <ol class="lead">
                        <li>Click on Settings in the top menu.</li>
                        <li>Click on the Edit button.</li>
                        <li>Update the category name and then click on the Save button.</li>
                    </ol>
                    <p class="h5">To Delete a Category</p>
                    <ol class="lead">
                        <li>Click on Settings in the top menu.</li>
                        <li>Click on the Delete button. A pop-up will appear to confirm deletion. <br> Existing entries with deleted category will continue to maintain the deleted category, but will disappear if another category is selected. Deleted category will not appear for new entries.</li>
                    </ol>
                </div>
            </div>
        </section>

        <!-- Usage -->
        <section class="my-5 container-fluid" style="background-color: #002B59;">
            <div class="row pb-4">
                <div class="col">
                    <h1 class="pt-4 text-light text-center">Simple To Use</h1>
                </div>
                <div class="col d-sm-none d-lg-block"></div>
                <div class="w-100"></div>

                <div class="col">
                    <video
                        autoplay="true"
                        loop="true"
                        src="/img/Using_Application.mp4"
                        width="700px"
                        class="mx-auto d-block py-4"
                        ></video>
                </div>
                <div class="ml-4 pt-4 text-light col">
                    <p class="h5">Working with Entries</p>
                    <ol class="lead">
                        <li>Click on the New Entry button to start the timer and insert a new entry.</li>
                        <li>Click on the Log Time button to complete the entry's end time. You can adjust the category and description at any time.</li>
                    </ol>
                    <p class="h5">Switching Projects</p>
                    <ol class="lead">
                        <li>Click on the Change Project button. This will bring up a pop-up with a list of your projects.</li>
                        <li>Click on the project to switch to it.</li>
                    </ol>
                </div>
            </div>
        </section>

        <!-- CREATE NEW PROJECT WELCOME SCREEN-->
        <section class="container pb-5 pt-3" v-if="!isAuthenticated">
            <div class="jumbotron">
                <h1 class="display-3 text-center">Start Time Tracking Today</h1>
                <p class="lead text-center w-75 mx-auto px-4">TaskTrackr allows you to create projects, assign categories, and keep track of all your time spent.</p>
                <div class="d-flex justify-content-center align-content-center w-100">
                    <router-link to="/signup" tag="a" class="text-center btn btn-success btn-lg my-3 w-50">Sign up</router-link>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
export default {
    computed: {
        isAuthenticated: function() {
            return this.$store.getters.isAuthenticated;
        }
    }
}
</script>


<style scoped>
li + li {
    margin: 1rem 0
}
</style>

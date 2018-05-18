<template>
    <div>
        <!-- Splash Page -->
        <section id="splash" class="text-light d-flex flex-column align-items-center justify-content-center">
            <div class="splash-content">
                <!-- <h1 class="display-4 text-center w-75 mx-auto mb-4">Project TT lets you easily keep track of time spent on projects</h1> -->
                <h1 class="display-2 text-center w-75 mx-auto mb-4">Project TT</h1>
                <p class="text-center lead">A simple web application for keeping track of time spent on projects</p>
                <!-- <p class="text-center lead">Project TT's timer, entry categorization, and reports enables you to organize and make the most of your time.</p> -->
            </div>
            <button class="btn btn-primary w-25">Learn More</button>
        </section>


        <!-- Attention Grabber -->
        <section class="bg-light">
            <h1>Attention grabber</h1>
            <p>Place a picture here of the application in use. Bonus points if you use a gif.</p>
        </section>

        <!-- Highlight Project Creation -->
        <section>
            <h1>Create Projects for your Needs</h1>
            <p>Show one image or a series of images like Trello, display create project pop-up and project selection</p>
        </section>

        <!-- Highlight Entry Categorizations -->
        <section>
            <h1>Create your own Categories</h1>
            <p>Add two images side by side, one of the settings page and another one for the entries</p>
        </section>


        <!-- Highlight Reports - eventually -->

        <!-- CREATE NEW PROJECT WELCOME SCREEN-->
        <section id="newProjectWelcome" class="container my-4" v-if="true">
            <div class="jumbotron ">
                <h1 class="display-3 text-center">Start Time Tracking Today</h1>
                <p class="lead text-center w-75 mx-auto">Project time trackers allows you to create projects, assign categories, and keep track of all your time spent.</p>
                <input type="text" name="projectName" id="projectName" class="form-control w-50 mx-auto" v-model="projectName">
                <div class="d-flex justify-content-center align-content-center w-100">
                    <button class="text-center btn btn-success btn-lg my-3" v-on:click.prevent="saveProject">Create your first project</button>
                </div>
            </div>
        </section>

        <footer class="footer">
            <div class="container text-center">
                <span class="text-muted">&copy; 2018 Charlie The Programmer</span>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                projectName: ''
            }
        }
    }
</script>


<style scoped>
    /* * {
    border: 1px solid red;
} */

#splash {
    background-image: linear-gradient(
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.3)
      ), url("/img/starrysky.jpg");
      /* background-image: url("/img/starrysky.jpg"); */
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
    height: 720px;
}

.splash-content {
    padding-bottom: 6rem;
}
</style>

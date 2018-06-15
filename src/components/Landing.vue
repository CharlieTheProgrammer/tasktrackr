<template>
    <div>
        <!-- Splash Page -->
        <section id="splash" class="text-light d-flex flex-column align-items-center justify-content-center">
            <div class="splash-content">
                <h1 class="display-2 text-center w-75 mx-auto mb-4">Project TT</h1>
                <p class="text-center lead">A simple web application for keeping track of time spent on projects and tasks</p>
            </div>
            <button class="btn btn-primary w-25">Learn More</button>
        </section>

        <!-- Attention Grabber -->
        <section class="my-4 mx-4" style="background-color: #E7EFF8;">
            <div class="pl-4 pt-4">
                <h1>Easy to Use</h1>
                <p>Simple functionality to create entries, log time, and categorize tasks.</p>
            </div>

                <video
                    autoplay="true"
                    loop="true"
                    src="/img/Using_Application.mp4"
                    width="600px"
                    class="mx-auto d-block py-4"
                    ></video>

        </section>

        <!-- Highlight Project Creation -->
        <section class="my-4" style="background-color: #002B59;">
            <div class="pl-4 pt-4 text-light">
                <h1>Create Projects</h1>
                <p>Create as many projects as you'd like. </p>
                <p>Show one image or a series of images like Trello, display create project pop-up and project selection</p>
            </div>

                <video
                    autoplay="true"
                    loop="true"
                    src="/img/Creating_Projects.mp4"
                    width="600px"
                    class="mx-auto d-block py-4"
                    ></video>
        </section>

        <!-- Highlight Entry Categorizations -->
        <section class="my-4 mx-4" style="background-color: #E7EFF8;">
            <div class="pl-4 pt-4">
                <h1>Create your own Categories</h1>
                <p>Organize your tasks.</p>
                <p>Add two images side by side, one of the settings page and another one for the entries</p>
            </div>

                <video
                    autoplay="true"
                    loop="true"
                    src="/img/Creating_Categories.mp4"
                    width="600px"
                    class="mx-auto d-block py-4"
                    ></video>
        </section>

        <!-- CREATE NEW PROJECT WELCOME SCREEN-->
        <section class="container my-4">
            <div class="jumbotron ">
                <h1 class="display-3 text-center">Start Time Tracking Today</h1>
                <p class="lead text-center w-75 mx-auto px-4">Project time trackers allows you to create projects, assign categories, and keep track of all your time spent.</p>
                <div class="d-flex justify-content-center align-content-center w-100">
                    <router-link to="/signup" tag="a" class="text-center btn btn-success btn-lg my-3 w-50">Sign up</router-link>
                </div>
            </div>
        </section>
    </div>
</template>



<style scoped>
#splash {
    background-image: linear-gradient(
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.3)
      ), url("/img/Optimized-starrysky.jpg");
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

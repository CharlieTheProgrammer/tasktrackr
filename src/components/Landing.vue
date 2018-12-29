<template>
    <div id="parent">
        <!-- Splash Page -->
        <section id="splash" class="text-light d-flex flex-column align-items-center justify-content-center pb-4">
            <div class="splash-content">
                <h1 class="display-2 text-center w-75 mx-auto mb-4">TaskTrackr</h1>
                <p class="text-center lead pb-4">A simple web application for keeping track of time spent on projects and tasks</p>
                <router-link to="/docs" class="btn btn-primary w-50 mx-auto d-block">Learn More</router-link>
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
    height: 100%;
}

.splash-content {
    padding-bottom: 4rem;
}

#parent {
    /* 100% height - footer height (fixed) - header height (dyn) */
    height: calc(100vh - 70px);
    /* border: 0px solid red; */
}
</style>

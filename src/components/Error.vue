<template>
    <div id="error">
        <!-- Splash Page -->
        <section id="splash" class="text-light d-flex flex-column align-items-center justify-content-center pb-4">
            <div class="splash-content">
                <h1 class="display-2 text-center w-75 mx-auto mb-4">Ohh no, something has gone wrong!</h1>
                <p class="text-center lead pb-4">404 Not Found: Page is gone and among the stars.</p>
                <router-link to="/" class="btn btn-primary w-50 mx-auto d-block">Let's try this again</router-link>
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

#error {
    /* 100% height - footer height (fixed) - header height (dyn) */
    height: calc(100vh - 40px - 70px);
    /* border: 0px solid red; */
}
</style>

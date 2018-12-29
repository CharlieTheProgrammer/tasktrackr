<template>
    <div>
        <div class="">
            <app-header :isAuthenticated="isAuthenticated"></app-header>
            <router-view></router-view>
        </div>
    <footer class="footer" :style="footerStyle">
        <div class="container text-center">
            <span :class="footerClasses" >&copy; 2018 Charlie The Programmer</span>
        </div>
    </footer>
  </div>
</template>

<script>
  import Header from './components/Header'

  import axios from 'axios'

export default {
    components: {
        'app-header': Header,
    },
    data: function() {
        return {

        }
    },
    computed: {
        isAuthenticated: function() {
            return this.$store.getters.isAuthenticated;
        },
        footerClasses: function() {
            if (this.$route.path == '/') {
                return 'text-light'
            } else {
                return 'text-dark'
            }
        },
        footerStyle: function() {
            if (this.$route.path == '/') {
                return 'position: fixed;'
            } else {
                return 'position: relative;'
            }
        }
    },
    methods: {
        logState: function() {
            console.log(this.$store.state);
        }
    },
}
</script>

<style scoped>
.footer {

    bottom: 0;
    width: 100%;
    /* Set the fixed height of the footer here */
    height: 40px;
    line-height: 40px; /* Vertically center the text there */
    /* background-color: #002B59;
    -webkit-box-shadow: -3px 0px 5px 0px rgba(0,4,40,1);
    -moz-box-shadow: -3px 0px 5px 0px rgba(0,4,40,1);
    box-shadow: -3px 0px 5px 0px rgba(0,4,40,1); */
  }
</style>


<style>

/* * {
    border: 1px solid red;
} */

body, html {
    margin: auto;
    height: 100%;
}

/* .wrapper {
    margin-bottom: 4rem;
} */


#entries {
    margin-bottom: 2rem;
}

/* If removed q,g,y letters will be cut off on text inputs */
input[type=text] {
    line-height: 1rem;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: inherit;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: inherit;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: inherit;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: inherit;
  }

/* TABLE/ENTRIES COLUMN CONTROLS */
  .table {
      table-layout: fixed;
  }

/* +++++ CUSTOM BOOTSTRAP EXTENSIONS +++++ */

/* Boostrap SM  */
@media (min-width: 576px) {
    .w-sm-2 {
        width: 2% !important;
    }

    .w-sm-3 {
        width: 3% !important;
    }

    .w-sm-4 {
        width: 4% !important;
    }

    .w-sm-5 {
        width: 5% !important;
    }

    .w-sm-8 {
        width: 8% !important;
    }

    .w-sm-10 {
        width: 10% !important;
    }

    .w-sm-20 {
        width: 20% !important;
    }

    .w-sm-40 {
        width: 40% !important;
    }

    .w-sm-75 {
        width: 75% !important;
    }

    .w-sm-100 {
        width: 100% !important;
    }

    .w-sm-120 {
        width: 120% !important;
    }
}

/* Boostrap MD  */
@media (min-width: 768px) {
    .w-md-5 {
        width: 5% !important;
    }
    .w-md-8 {
        width: 8% !important;
    }

    .w-md-10 {
        width: 10% !important;
    }

    .w-md-20 {
        width: 20% !important;
    }

    .w-md-40 {
        width: 40% !important;
    }

    .w-md-75 {
        width: 75% !important;
    }

    .w-md-100 {
        width: 100% !important;
    }
}

/* Bootstrap LG */
@media (min-width: 992px) {
    .w-lg-10 {
        width: 10% !important;
    }

    .w-lg-20 {
        width: 20% !important;
    }

    .w-lg-30 {
        width: 30% !important;
    }

    .w-lg-40 {
        width: 40% !important;
    }

    .w-lg-75 {
        width: 75% !important;
    }

    .w-lg-100 {
        width: 100% !important;
    }
}

/* Bootstrap XL */
@media (min-width: 1200px) {
    .w-xl-10 {
        width: 10% !important;
    }

    .w-xl-20 {
        width: 20% !important;
    }

    .w-xl-40 {
        width: 40% !important;
    }

    .w-xl-75 {
        width: 75% !important;
    }

    .w-xl-100 {
        width: 100% !important;
    }
}
</style>

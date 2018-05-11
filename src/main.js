import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes'
import axios from 'axios'

// This just imports the JS and Popper
import 'bootstrap';
// This one imports the styles
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store/store'
export const MainBus = new Vue();

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: routes
});

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true;

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
});


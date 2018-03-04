import Vue from 'vue'
import App from './App.vue'

// This just imports the JS and Popper
import 'bootstrap';
// This one imports the styles
import 'bootstrap/dist/css/bootstrap.min.css';

export const MainBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})

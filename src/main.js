import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes'
import axios from 'axios'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue);

// This just imports the JS and Popper
import 'bootstrap';
// This one imports the styles
import 'bootstrap/dist/css/bootstrap.min.css';

//import store from './store/store'
import { store } from './store/store'


Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: routes
});

store.subscribe((mutation, state) => {
	console.log("Mutation detected: Saving state locally.")
	localStorage.setItem('store', JSON.stringify(state));
})

// Axios Configuration  ========================================================
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true;


export const ErrorsBus = new Vue({
	methods: {
		errorHandler: function (event) {

			// check for axios error
			if (event.response.status && event.response.data) {
				// Check that data is an array
				event.response.data.forEach(error => {
					ErrorsBus.$emit("errorEvent", error)
				});
			}
			// I can add further code down here for errors generated from other sources.
			// This is also a good place to connect to an error logging API
		}
	}
});

export const TimerBus = new Vue();

new Vue({
	el: '#app',
	store: store,
	router: router,
	render: h => h(App),
	beforeCreate: function () {
		this.$store.commit('initStore');
	}
});


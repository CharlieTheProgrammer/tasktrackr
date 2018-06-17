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
//import 'bootstrap';
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
if (store.state.testMode) {
	axios.defaults.baseURL = 'http://localhost:3000'
	axios.defaults.withCredentials = true;
} else {
	axios.defaults.baseURL = 'http://kilowebdesigns.com'
}


export const ErrorsBus = new Vue({
	methods: {
		errorHandler: function (event) {
			var ORIGIN = {
				Axios: 'Axios',
				Axios_CommFailure: 'Axios_CommFailure',
				Axios_SingleError: 'Axios_SingleError',
				Axios_ErrorsArray: 'Axios_ErrorsArray',
				Internal: 'Internal'
			}

			try {
				if (!event.response && event.request) {
					event.Origin = ORIGIN.Axios_CommFailure
				}

				// Classifies event generated from frontend, that do not come in array format
				if (event.type && event.title && event.message) {
					event.Origin = ORIGIN.Internal
				}

				// Classifies event returned from backend that do not come in array format
				if (event.response && !Array.isArray(event.response.data)) {
					event.Origin = ORIGIN.Axios_SingleError
				}
				// Classifies event generated from backend that comes in array format, usually due to form validators
				if (Array.isArray(event.response.data)) {
					event.Origin = ORIGIN.Axios_ErrorsArray
				}
			} catch(e) {
				if (e instanceof TypeError) {
					// Ignore these
				} else {
					throw e
				}
			}

			switch(event.Origin) {
				// In this scenario Axios includes a request, but not a response.
				case (ORIGIN.Axios_CommFailure):
					// Generate message manually
					this.sendMessage({
						type: "Error",
						title: "Network Error",
						message: "Please check your internet connection."
					})
					break;
				// In this scenario, the server has returned multiple errors within an array
				case (ORIGIN.Axios_ErrorsArray):
					event.response.data.forEach(error => {
						this.sendMessage(error);
					})
					break;
				// In this scenario, a single error was generated from the BACKEND and needs to be displayed to user
				case (ORIGIN.Axios_SingleError):
					this.sendMessage(event.response.data)
					break;
				// In this scenario, a single error was created within the FRONTEND and needs to be displayed to user
				case (ORIGIN.Internal):
					this.sendMessage(event)
					break;
				default:
					this.sendMessage({
						type: "Error",
						title: "Unexpected Error",
						message: "Reload your browser."
					})
					console.log("Unhandled Event Found");
					console.log(event)
			}

			// I can add further code down here for errors generated from other sources.
			// This is also a good place to connect to an error logging API
		},
		addStacktoEvent: function(event, errorObj) {
			if (!errorObj.stack) {
				//throw new Error("Error object is missing stack.");
				return undefined;
			}

			if (!event.type || !event.title || !event.message) {
				throw new Error("Custom error object does not match format.");
				return undefined;
			}

			return event.extension.stack = errorObj.stack;
		},
		sendMessage: function(message) {
			if (!message.type || !message.title || !message.message) {
				console.error("Custom error object does not match format. \n Got the following instead");
				console.error(message);
				return;
			}
			ErrorsBus.$emit("errorEvent", message)
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
		this.$store.dispatch('validSessionCheck')
			.then(res => {
				this.$store.commit('INIT_STORE');
				this.$router.push('processing');
			})
			.catch(err => localStorage.setItem('store', null))
	}
});


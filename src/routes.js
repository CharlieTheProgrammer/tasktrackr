// import components
import Login from './components/Login.vue'
import Landing from './components/Landing.vue'
import Home from './components/Home.vue'
import Settings from './components/settings/Settings.vue'
import Signup from './components/Signup.vue'
import FirstProjectWelcome from './components/FirstProject.vue'
import QP from './components/QueryParser.vue'

// Create routes for each component
export const routes = [
    { path : '/', component: Landing },
    //{ path : '/landing', component: Landing },
    { path : '/login', component: Login },
    { path : '/settings', component: Settings },
    { path : '/signup', component: Signup },
    { path : '/firstproject', component: FirstProjectWelcome },
    { path : '/QP', component: QP },
    { path : '*', redirect: '/landing'}
];
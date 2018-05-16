// import components
import Login from './components/Login.vue'
import Landing from './components/Landing.vue'
import Home from './components/Home.vue'
import Settings from './components/settings/Settings.vue'
import Signup from './components/Signup.vue'
import FirstProjectWelcome from './components/FirstProject.vue'
import ProjectSelect from './components/project/ProjectSelect.vue'
import Processing from './components/Processing.vue'
import QP from './components/QueryParser.vue'

// Create routes for each component
export const routes = [
    { path : '/', component: Landing },
    { path : '/home', component: Home },
    { path : '/login', component: Login },
    { path : '/settings', component: Settings },
    { path : '/signup', component: Signup },
    { path : '/firstproject', component: FirstProjectWelcome },
    { path : '/ProjectSelect', component: ProjectSelect },
    { path: '/processing', component: Processing },
    { path : '/QP', component: QP },
    { path : '*', redirect: '/landing'}
];
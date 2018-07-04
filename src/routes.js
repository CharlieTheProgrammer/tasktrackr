// import components

// USER COMPONENTS
import Login from './components/userMgt/Login.vue'
import PasswordResetInit from './components/userMgt/PasswordResetInit.vue'
import PasswordNew from './components/userMgt/PasswordNew.vue'
import Signup from './components/userMgt/Signup.vue'

// OTHER
import Landing from './components/Landing.vue'
import Home from './components/Home.vue'
import Settings from './components/settings/Settings.vue'
import FirstProjectWelcome from './components/FirstProject.vue'
import ProjectSelect from './components/project/ProjectSelect.vue'
import Processing from './components/Processing.vue'
import Docs from './components/Docs.vue'

import { store } from './store/store'

// Common route guards
var authorizationCheck = (to, from, next) => {
    // Check if is authenticated
    // this.$store doesn't work because we're in context of Vue router, not Vue app.
    if (store.getters.isAuthenticated) {
        next();
    } else {
        next('/')
    }
}

// Create routes for each component
export const routes = [
    { path : '/', component: Landing },
    { path : '/docs', component: Docs },
    { path : '/login', component: Login},
    { path : '/requestpasswordreset', component: PasswordResetInit},
    { path : '/passwordreset', component: PasswordNew},
    { path : '/signup', component: Signup},
    { path : '/home', component: Home, beforeEnter: authorizationCheck},
    { path : '/settings', component: Settings, beforeEnter: authorizationCheck},
    { path : '/firstproject', component: FirstProjectWelcome , beforeEnter: authorizationCheck},
    { path : '/projectselect', component: ProjectSelect , beforeEnter: authorizationCheck},
    { path: '/processing', component: Processing , beforeEnter: authorizationCheck},
    { path : '*', redirect: '/'}
];
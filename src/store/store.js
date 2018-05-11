import Vue from 'vue';
import Vuex from 'vuex';

import appcontrol from '../store/modules/appcontrol'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        appcontrol
    }
})
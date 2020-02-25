import Vue from 'vue'
import App from './App'

import store from './store/index.js';

Vue.config.productionTip = false;

// 全局store
Vue.prototype.$store = store;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

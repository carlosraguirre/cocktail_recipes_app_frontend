import { BootstrapVue, IconsPlugin, BNavbar } from 'bootstrap-vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('b-navbar', BNavbar)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
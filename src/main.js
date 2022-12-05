import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from "axios";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://cocktailrolodex-production.up.railway.app/";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
import Vue from 'vue';
import VueRouter from 'vue-router';
import AdminLogin from '../views/AdminLogin.vue';
import Logout from "../views/Logout.vue";
import Rolodex from "../views/Rolodex.vue";
import 'bootstrap';

Vue.use(VueRouter)

const routes = [
  {
    path: '/AdminLogin',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/",
    name: "rolodex",
    component: Rolodex
  },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

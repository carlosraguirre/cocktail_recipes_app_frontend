import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Logout from "../views/Logout.vue";
import Rolodex from "../views/Rolodex.vue";
import 'bootstrap';

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
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

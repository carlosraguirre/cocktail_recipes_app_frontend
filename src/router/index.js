import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '../views/Landing.vue';
import Logout from "../views/Logout.vue";
import Rolodex from "../views/Rolodex.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/rolodex",
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

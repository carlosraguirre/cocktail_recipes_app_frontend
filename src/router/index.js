import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Logout from "../views/Logout.vue";
import MyRolodex from "../views/MyRolodex.vue";
import Welcome from "../views/Welcome.vue";
import 'bootstrap';

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "welcome",
    component: Welcome
  },
  {
    path: "/user/:id/myrolodex",
    name: "myrolodex",
    component: MyRolodex,
    // children: [
    //   {
    //     path: "myrolodex",
    //     name: "myrolodex",
    //     component: MyRolodex
    //   },
    // ]
  },
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
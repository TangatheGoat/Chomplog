import { createRouter, createWebHistory } from "vue-router";

import Home from "../view/pages/Home.vue";
import Login from "@/view/pages/Login.vue";
import Register from "@/view/pages/Register.vue";
import MainPage from "@/view/pages/MainPage.vue";
const Authorization = (to, from, next) => {
    const userLoggedIn = localStorage.getItem('loginToken')
    if (userLoggedIn) {
      next()
      return
    }
  }

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/MainPage", component: MainPage ,beforeEnter : Authorization},
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

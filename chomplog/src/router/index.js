import { createRouter, createWebHistory } from 'vue-router'

import Home from "../view/pages/Home.vue"
import Login from '@/view/pages/Login.vue'
import Register from '@/view/pages/Register.vue'

const routes =[
    {path: "/", component: Home},
    {path: "/login", component :Login},
    {path: "/register",component: Register}

]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  export default router
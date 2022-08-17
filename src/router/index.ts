import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("../view/Home/HomeView.vue")
    }
]

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
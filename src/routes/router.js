import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/pages/Home.vue";
import Login from "@/components/pages/Login.vue";
import NotFound from "@/components/pages/404.vue";
import store from "@/stores/store";

import routeAdmin from "@/routes/modules/routeAdmin";

let routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            title: `Beranda`,
            requiresAuth: true,
        },
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound,
    },
    {
        path: "/logout",
        name: "logout",
        beforeEnter: async (to, from, next) => {
            try {
                await store.dispatch("auth/signOut"); // memanggil action logout di auth.store.js
            } catch (error) {
                console.error("Logout failed", error);
            }
            next("/"); // redirect ke login atau halaman lain
        },
    },
];

routes = routes.concat(routeAdmin);

const router = createRouter({
    history: createWebHistory(),
    routes,
});

//Navigation Guards
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!store.getters.isAuth) {
            next({
                name: "login",
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;

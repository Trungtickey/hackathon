import { createRouter, createWebHistory } from "vue-router";
import Products from "../pages/ProductManager.vue";
import Users from "../pages/UserManager.vue";
// import NotFound from "../pages/NotFound.vue";
import Admin from "../pages/Dashboard.vue";

const routes = [
    {
        path: "/admin",
        Component: Admin,
        alias: "/",
        children: [
            { path: "", name: "dashboard", component: Admin },
            {
                path: "product-manager",
                name: "manager-product",
                component: Products,
            },
            {
                path: "user-manager",
                name: "manager-user",
                component: Users,
            },
        ],
    },

    // {
    //     path: "/:pathMatch(.*)*",
    //     name: "not-found",
    //     component: NotFound,
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router
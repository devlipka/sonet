import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/index",
            component: () => import("../views/Index.vue"),
            name: "user.index",
        },
        {
            path: "/page",
            component: () => import("../views/Page.vue"),
        },
        {
            path: "/users/login",
            component: () => import("../views/user/Login.vue"),
            name: "user.login",
        },
        {
            path: "/users/registration",
            component: () => import("../views/user/Registration.vue"),
            name: "user.registration",
        },
        {
            path: "/users/personal",
            component: () => import("../views/user/Personal.vue"),
            name: "user.personal",
        },
    ],
});

router.beforeEach((to, from, next) => {
    axios
        .get("/api/user")
        .then((res) => {
            console.log(res.data);
        })
        .catch((e) => {
            if (e.response.status === 401) {
                if (localStorage.getItem("x_xsrf_token") !== null) {
                    localStorage.removeItem("x_xsrf_token");
                }
            }
        });

    const token = localStorage.getItem("x_xsrf_token");

    if (!token) {
        if (to.name === "user.login" || to.name === "user.registration") {
            return next();
        } else {
            return next({
                name: "user.login",
            });
        }
    }

    if (
        to.name === "user.login" ||
        (to.name === "user.registration" && token)
    ) {
        return next({
            name: "user.personal",
        });
    }

    next();
});

export default router;

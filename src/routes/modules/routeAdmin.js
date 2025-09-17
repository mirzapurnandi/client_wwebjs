const routeAdmin = [
    {
        path: "/admins/users",
        meta: { requiresAuth: true },
        component: () => import("@/components/pages/admin/users/Index.vue"),
        children: [
            {
                path: "",
                name: "admins.users.data",
                component: () =>
                    import("@/components/pages/admin/users/Data.vue"),
                meta: { title: "Data User" },
            },
        ],
    },
    {
        path: "/admins/providers",
        meta: { requiresAuth: true },
        component: () => import("@/components/pages/admin/providers/Index.vue"),
        children: [
            {
                path: "",
                name: "admins.providers.data",
                component: () =>
                    import("@/components/pages/admin/providers/Data.vue"),
                meta: { title: "Data User" },
            },
        ],
    },
];

export default routeAdmin;

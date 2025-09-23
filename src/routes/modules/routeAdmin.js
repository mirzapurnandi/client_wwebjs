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
                meta: { title: "Data Provider" },
            },
            {
                path: ":id",
                name: "admins.providers.data.detail",
                component: () =>
                    import("@/components/pages/admin/providers/DataDetail.vue"),
                meta: { title: "Data Provider Detail" },
            },
            {
                path: ":id/insert",
                name: "admins.providers.data.detail.insert",
                component: () =>
                    import("@/components/pages/admin/providers/AddDetail.vue"),
                meta: { title: "Add Provider Detail" },
            },
        ],
    },

    {
        path: "/admins/routings",
        meta: { requiresAuth: true },
        component: () => import("@/components/pages/admin/routings/Index.vue"),
        children: [
            {
                path: "",
                name: "admins.routings.data",
                component: () =>
                    import("@/components/pages/admin/routings/Data.vue"),
                meta: { title: "Data Routing" },
            },
            {
                path: ":id",
                name: "admins.routings.data.detail",
                component: () =>
                    import("@/components/pages/admin/routings/DataDetail.vue"),
                meta: { title: "Data Routing Detail" },
            },
        ],
    },

    {
        path: "/admins/messages",
        meta: { requiresAuth: true },
        component: () => import("@/components/pages/admin/messages/Index.vue"),
        children: [
            {
                path: "single",
                name: "admins.messages.single",
                component: () =>
                    import("@/components/pages/admin/messages/Single.vue"),
                meta: { title: "Single Send Message" },
            },
            {
                path: "bulk",
                name: "admins.messages.bulk",
                component: () =>
                    import("@/components/pages/admin/messages/Bulk.vue"),
                meta: { title: "Bulk Send Messages" },
            },
        ],
    },
];

export default routeAdmin;

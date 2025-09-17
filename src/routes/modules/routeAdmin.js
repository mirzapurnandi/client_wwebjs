import AdminUserIndex from "@/components/pages/admin/users/Index.vue"
import AdminUserData from "@/components/pages/admin/users/Data.vue"

const routeAdmin = [
    {
        path: "/admins/users",
        meta: { requiresAuth: true },
        component: AdminUserIndex,
        children: [
            {
                path: "",
                name: "admins.users.data",
                component: AdminUserData,
                meta: { title: "Data User" },
            },
        ],
    }
];

export default routeAdmin;

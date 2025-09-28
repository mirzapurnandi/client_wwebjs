<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="#" class="brand-link">
            <img :src="adminLTELogo" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-light">WaSend</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <img :src="userLogo" class="img-circle elevation-2" alt="User Image">
                </div>
                <div class="info">
                    <a href="#" class="d-block">{{ authenticated.name }}</a>
                </div>
            </div>

            <!-- Sidebar Menu -->
            <sidebar-admin v-if="authenticated.level === 'admin'" />
            <sidebar-user v-else-if="authenticated.level === 'pengguna'" />
            <!--            <sidebar-user></sidebar-user>-->
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import SidebarAdmin from "@/components/pages/layouts/sidebars/SidebarAdmin.vue";
import SidebarUser from "@/components/pages/layouts/sidebars/SidebarUser.vue";

export default {
    data() {
        return {
            adminLTELogo: '/themes/dist/img/AdminLTELogo.png',
            userLogo: '/themes/dist/img/user2-160x160.jpg'
        };
    },

    computed: {
        ...mapState(['authenticated']),
        ...mapGetters(['isAuth'])
    },

    methods: {
        ...mapActions('auth', ['getUserLogin']),
    },
    created() {
        if (this.isAuth) {
            this.getUserLogin();
        }
    },

    components: {
        'sidebar-admin': SidebarAdmin,
        'sidebar-user': SidebarUser,
    }
}
</script>

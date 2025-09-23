<template>
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link " :class="{ active: isActive('/') }">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p> Dashboard Admin </p>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link :to="{ name: 'admins.users.data' }" class="nav-link "
                    :class="{ active: isActive('/admins/users') }">
                    <i class="nav-icon fas fa-users"></i>
                    <p> List User </p>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link :to="{ name: 'admins.providers.data' }" class="nav-link "
                    :class="{ active: isActive('/admins/providers') }">
                    <i class="nav-icon fas fa-anchor"></i>
                    <p> List Provider </p>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link :to="{ name: 'admins.routings.data' }" class="nav-link "
                    :class="{ active: isActive('/admins/routings') }">
                    <i class="nav-icon fas fa-truck"></i>
                    <p> List Routing </p>
                </router-link>
            </li>

            <li class="nav-item " :class="{ 'menu-open': isActive('/admins/messages') }">
                <a href="#" class="nav-link " :class="{ active: isActive('/admins/messages') }">
                    <i class="nav-icon far fa-envelope"></i>
                    <p>
                        Message
                        <i class="fas fa-angle-left right"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview">
                    <li class="nav-item">

                        <router-link :to="{ name: 'admins.messages.single' }" class="nav-link "
                            :class="{ active: isActive('/admins/messages/single') }">
                            <i class="far fa-circle nav-icon"></i>
                            <p>Single Send</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'admins.messages.bulk' }" class="nav-link "
                            :class="{ active: isActive('/admins/messages/bulk') }">
                            <i class="far fa-circle nav-icon"></i>
                            <p>Bulk Send</p>
                        </router-link>
                    </li>
                </ul>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)" @click="logout">
                    <i class="nav-icon far fa-circle text-info"></i>
                    <p>Logout</p>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'SidebarAdmin',
    methods: {
        ...mapActions('auth', ['signOut']),

        isActive(basePath) {
            const current = this.$route.path
            return current === basePath || current.startsWith(basePath + '/')
        },

        logout(e) {
            e.preventDefault();
            this.signOut().then(() => {
                this.$router.go('/');
            });

        },
    },
}
</script>
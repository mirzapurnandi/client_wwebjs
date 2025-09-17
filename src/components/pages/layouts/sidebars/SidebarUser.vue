<template>
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link " :class="{ active: isActive('/') }">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p> Dashboard Customer </p>
                </router-link>
            </li>

            <!--li class="nav-item">
                <router-link :to="{ name: 'customer.order.data' }" class="nav-link " :class="{ active: isActive('/customer/order') }">
                    <i class="nav-icon fas fa-book"></i>
                    <p> Order </p>
                </router-link>
            </li-->

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
    methods: {
        ...mapActions('auth', ['signOut']),

        isActive(path) {
            if (path === '/') return this.$route.path === '/';
            return this.$route.path.startsWith(path);
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
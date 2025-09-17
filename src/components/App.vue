<template>
    <div class="wrapper">
        <!-- Navbar -->
        <app-header v-if="isAuth" />
        <!-- /.navbar -->

        <!-- Sidebar Container -->
        <app-sidebar v-if="isAuth" />
        <!-- /.Sidebar Container -->

        <!-- Content Wrapper. Contains page content -->
        <router-view></router-view>
        <!-- /.content-wrapper -->

        <!-- Footer -->
        <app-footer v-if="isAuth" />
        <!-- /.Footer -->

        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
        <!-- /.control-sidebar -->
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Header from '../components/pages/layouts/Header.vue'
import Footer from '../components/pages/layouts/Footer.vue'
import Sidebar from '../components/pages/layouts/Sidebar.vue'
export default {
    computed: {
        ...mapState(['token']),
        ...mapGetters(['isAuth'])
    },
    components: {
        'app-header': Header,
        'app-footer': Footer,
        'app-sidebar': Sidebar
    }
}
</script>

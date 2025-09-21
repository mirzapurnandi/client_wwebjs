<template>
    <!-- Content Header (Page header) -->
    <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Data Routing</h1>
                    </div>
                    <div class="col-sm-6">
                        <breadcrumb></breadcrumb>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <!-- Main content -->
        <section class="content">
            <router-view></router-view>
            <!-- Default box -->
        </section> <!-- /.content -->
    </div> <!-- /.content-wrapper -->
</template>

<script>
import Breadcrumb from '../../layouts/Breadcrumb.vue'
export default {
    name: 'IndexAdminRouting',
    components: {
        'breadcrumb': Breadcrumb
    }
}
</script>

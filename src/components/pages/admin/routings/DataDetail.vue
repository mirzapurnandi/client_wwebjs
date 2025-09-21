<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Provider {{ providers?.name }}</h3> &nbsp;
            <router-link class="btn bg-gradient-primary btn-sm"
                :to="{ name: `admins.providers.data.detail.insert`, params: { id: providers?.id } }"> &nbsp; <i
                    class="fas fa-plus">
                </i>
                Create Data </router-link>
            <div class="card-tools">
                <div class="input-group input-group-sm" style="width: 150px;">
                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search">
                    <div class="input-group-append">
                        <button type="submit" class="btn btn-default">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="card-body table-responsive p-0 " :class="{ 'overlay-wrapper': this.processing }">
            <div class="overlay dark" v-if="this.processing">
                <i class="fas fa-3x fa-sync-alt fa-spin"></i>
            </div>
            <table class="table table-hover text-nowrap table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Data Sender</th>
                        <th>Backup?</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(val, index) in dataRoutingDetails" :key="index" :class="`provider_${val.id}`">
                        <td>{{ index + 1 }}</td>
                        <td>
                            {{ val.license_key }} <br>
                            <span :class="['badge', val.is_active ? 'badge-success' : 'badge-danger']">
                                {{ val.label }}
                            </span>
                        </td>
                        <td>
                            <span :class="['badge', val.is_backup ? 'badge-success' : 'badge-danger']">
                                {{ val.is_backup ? 'True' : 'False' }}
                            </span>
                        </td>
                        <td>
                            <span :class="['badge', val.status ? 'badge-success' : 'badge-danger']">
                                {{ val.status ? 'Active' : 'Disable' }}
                            </span>
                        </td>
                        <td>

                        </td>
                        <td class="text-right">
                            <a class="btn btn-primary btn-sm" href="#">
                                <i class="fas fa-folder">
                                </i>
                                SS
                            </a>&nbsp;
                            <a class="btn btn-warning btn-sm" href="#">
                                <i class="fas fa-pencil-alt">
                                </i>
                                Refresh
                            </a>&nbsp;
                            <a class="btn btn-info btn-sm" href="#">
                                <i class="fas fa-trash">
                                </i>
                                Info
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="card-footer clearfix">
            <ul class="pagination pagination-sm m-0 float-right">
                <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                    <a class="page-link" href="#" @click="getProviderDetails(pagination.current_page - 1)"> « </a>
                </li>

                <li v-for="page in pagination.last_page" :key="page" class="page-item"
                    :class="{ active: page === pagination.current_page }">
                    <a class="page-link" href="#" @click="getProviderDetails(page)"> {{ page }} </a>
                </li>

                <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                    <a class="page-link" href="#" @click="getProviderDetails(pagination.current_page + 1)">»</a>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
    name: "DataAdminProviderDetail",

    created() {
        this.getRoutingDetails({
            id: this.$route.params.id,
            page: this.$route.query.page || 1,
            user_id: this.$route.query.user_id,
        });
    },

    computed: {
        ...mapState(['processing']),
        ...mapGetters('routing', ['dataRoutingDetails', 'pagination'])
    },

    methods: {
        ...mapActions('routing', ['getRoutingDetails']),
    }

}
</script>

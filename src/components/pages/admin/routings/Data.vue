<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Data Routing</h3>
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
                        <th>User</th>
                        <th>Sender Name</th>
                        <th>Total</th>
                        <th>Backup</th>
                        <th>Delay</th>
                        <th>Type</th>
                        <th>Price per Message</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(val, index) in dataRoutings" :key="index" :class="`provider_${val.id}`">
                        <td>{{ index + 1 }}</td>
                        <td>
                            {{ val.user_name }} <br> {{ val.user_email }}
                        </td>
                        <td>{{ val.sender_name }}</td>
                        <td>{{ val.count }}</td>
                        <td>{{ val.backup }}</td>
                        <td>{{ val.delay }} detik</td>
                        <td>{{ val.type }}</td>
                        <td>{{ val.price_per_message }}</td>
                        <td>
                            <span :class="['badge', val.status ? 'badge-success' : 'badge-danger']">
                                {{ val.status ? 'Active' : 'Non-Active' }}
                            </span>

                        </td>
                        <td class="text-right">
                            <router-link class="btn btn-primary btn-sm"
                                :to="{ name: `admins.routings.data.detail`, params: { id: val.id }, query: { user_id: val.user_id } }">
                                &nbsp; <i class="fas fa-folder">
                                </i>
                                View</router-link> &nbsp;
                            <a class="btn btn-info btn-sm" href="#">
                                <i class="fas fa-pencil-alt">
                                </i>
                                Edit
                            </a>&nbsp;
                            <a class="btn btn-danger btn-sm" href="#">
                                <i class="fas fa-trash">
                                </i>
                                Delete
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="card-footer clearfix">
            <ul class="pagination pagination-sm m-0 float-right">
                <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                    <a class="page-link" href="#" @click="getProviderLists(pagination.current_page - 1)"> « </a>
                </li>

                <li v-for="page in pagination.last_page" :key="page" class="page-item"
                    :class="{ active: page === pagination.current_page }">
                    <a class="page-link" href="#" @click="getProviderLists(page)"> {{ page }} </a>
                </li>

                <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                    <a class="page-link" href="#" @click="getProviderLists(pagination.current_page + 1)">»</a>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
    name: "DataAdminRouting",

    created() {
        this.getRoutingLists(1);
    },

    computed: {
        ...mapState(['processing']),
        ...mapGetters('routing', ['dataRoutings', 'pagination'])
    },

    methods: {
        ...mapActions('routing', ['getRoutingLists']),
    }

}
</script>

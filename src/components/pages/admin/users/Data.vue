<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Data User</h3>
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
            <table class="table table-hover text-nowrap">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(user, index) in users" :key="index" :class="`user_${user.id}`">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.username }}</td>
                    <td>edit | hapus </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="card-footer clearfix">
            <ul class="pagination pagination-sm m-0 float-right">
                <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                    <a class="page-link" href="#" @click="getUserLists(pagination.current_page - 1)"> « </a>
                </li>

                <li v-for="page in pagination.last_page" :key="page" class="page-item" :class="{ active: page === pagination.current_page}">
                    <a class="page-link" href="#" @click="getUserLists(page)"> {{ page }} </a>
                </li>

                <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                    <a class="page-link" href="#" @click="getUserLists(pagination.current_page + 1)">»</a>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
export default {
    name: "DataAdminUser",

    created() {
        this.getUserLists(1);
    },

    computed: {
        ...mapState(['processing']),
        ...mapGetters('user', ['users', 'pagination'])
    },

    methods: {
        ...mapActions('user', ['getUserLists']),
    }

}
</script>

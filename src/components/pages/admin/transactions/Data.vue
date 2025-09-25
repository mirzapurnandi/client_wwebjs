<template>
    <div class="card card-info">
        <div class="card-header">
            <h3 class="card-title">Filter Data Transaction</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <div class="card-body " :class="{ 'overlay-wrapper': this.processing }">
            <form class="form-horizontal" @submit.prevent="filtering" method="POST">
                <div class="overlay dark" v-if="this.processing">
                    <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                </div>

                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Sender Name</label>
                    <div class="col-sm-10">
                        <select id="sender" v-model="selectedSender" class="form-control" @change="onSelectSender">
                            <option value="">-- Pilih Sender --</option>
                            <option v-for="item in dataRoutings" :key="item.id" :value="item">
                                {{ item.sender_name }} - {{ item.user_name }}
                            </option>
                        </select>
                        <span class="error invalid-feedback" v-if="errors.destination">
                            {{ errors.destination[0] }}
                        </span>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label"> </label>
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-warning">Filter</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-info">Re-Send Message</button>
        </div>
    </div>

    <div class="card card-success">
        <div class="card-header">
            <h3 class="card-title">Data Transaction</h3>
        </div>
        <div class="card-body table-responsive p-0 " :class="{ 'overlay-wrapper': this.processing }">
            <div class="overlay dark" v-if="this.processing">
                <i class="fas fa-3x fa-sync-alt fa-spin"></i>
            </div>
            <table class="table table-hover text-nowrap table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Destination</th>
                        <th>Content</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(val, index) in dataTransactions" :key="index" :class="`provider_${val.id}`">
                        <td>{{ index + 1 }}</td>
                        <td>{{ val.destination }}</td>
                        <td>{{ val.content }}</td>
                        <td class="text-right">
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
                    <tr v-if="!dataTransactions || dataTransactions.length === 0">
                        <td colspan="4" class="text-center text-muted">.:: Data kosong ::.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
export default {
    name: 'DataAdminTransaction',

    created() {
        this.CLEAR_ERRORS();
        this.getRoutingLists(1);
    },

    data() {
        return {
            selectedSender: "",
            form: {
                user_id: '',
                sender_name: '',
                file: null
            },
        }
    },

    computed: {
        ...mapState(['errors', 'processing']),
        ...mapState('transaction', ['dataTransactions', 'dataPagination']),
        ...mapGetters('routing', ['dataRoutings'])
    },

    methods: {
        ...mapActions('transaction', ['getDataTransaction']),
        ...mapActions('routing', ['getRoutingLists']),
        ...mapMutations(['CLEAR_ERRORS']),

        onSelectSender() {
            if (this.selectedSender) {
                this.form.user_id = this.selectedSender.user_id;
                this.form.sender_name = this.selectedSender.sender_name;
                /* this.getDataMessageTemp({
                    user_id: this.form.user_id
                }); */
            } else {
                this.form.user_id = "";
                this.form.sender_name = "";
            }
        },

        onFileChange(e) {
            this.form.file = e.target.files[0];
        },

        filtering() {
            alert('masuk');
        }
    }
}
</script>

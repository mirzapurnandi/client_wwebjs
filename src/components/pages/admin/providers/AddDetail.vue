<template>
    <div class="card card-info">
        <div class="card-header">
            <h3 class="card-title">Tambah Provider Detail</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form class="form-horizontal" v-on:submit="submit" method="POST">
            <div class="card-body " :class="{ 'overlay-wrapper': this.processing }">
                <div class="overlay dark" v-if="this.processing">
                    <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                </div>

                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Price</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control " :class="{ 'is-invalid': errors.price }" name="price"
                            v-model="providerDetail.price" id="price" placeholder="Masukan Price">
                        <span class="error invalid-feedback" v-if="errors.price">{{ errors.price[0] }}</span>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Expired (bulan)</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control " :class="{ 'is-invalid': errors.expired }"
                            name="price" v-model="providerDetail.expired" id="price" placeholder="Masukan Price">
                        <span class="error invalid-feedback" v-if="errors.expired">{{ errors.expired[0] }}</span>
                    </div>
                </div>

            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-info" @click.prevent="submit">Tambah</button>
                <!--<button type="submit" class="btn btn-default float-right">Cancel</button> -->
            </div>
        </form>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    name: "DataAdminAddProviderDetail",

    created() {
        this.CLEAR_ERRORS()
    },

    data() {
        return {
            providerDetail: {
                provider_id: this.$route.params.id,
                price: '',
                expired: '',
            },
        }
    },
    computed: {
        ...mapState(['errors', 'processing']),
    },
    methods: {
        ...mapActions('provider', ['createProviderDetail']),
        ...mapMutations(['CLEAR_ERRORS']),

        submit(e) {
            e.preventDefault();
            this.createProviderDetail(this.providerDetail).then(() => {
                this.$router.push({ name: 'admins.providers.data.detail', params: { id: this.$route.params.id } });
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Berhasil simpan Data",
                    showConfirmButton: false,
                    timer: 2000
                });
            }).catch((error) => {
                console.log(error);

                this.$swal({
                    icon: "error",
                    title: "Oops...",
                    text: error.data?.message ? error.data?.message : "Something went wrong!",
                });
            });
        }
    }
}
</script>
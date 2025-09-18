<template>
    <div class="card card-info">
        <div class="card-header">
            <h3 class="card-title">Tambah Provider Detail</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form class="form-horizontal">
            <div class="card-body " :class="{ 'overlay-wrapper': this.processing }">
                <div class="overlay dark" v-if="this.processing">
                    <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                </div>

                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Nama Kategori Produk</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control " :class="{ 'is-invalid': errors.name }" name="name"
                            v-model="category.name" id="name" placeholder="Masukan Nama Menu">
                        <span class="error invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</span>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Deskripsi</label>
                    <div class="col-sm-10">
                        <textarea class="form-control " :class="{ 'is-invalid': errors.description }" rows="3"
                            placeholder="Masukan Deskripsi Menu" id="description" spellcheck="false"
                            v-model="category.description"></textarea>
                        <span class="error invalid-feedback" v-if="errors.description">{{ errors.description[0]
                        }}</span>
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
    name: "Manager_AddCategory",

    created() {
        this.CLEAR_ERRORS()
    },

    data() {
        return {
            category: {
                name: '',
                description: '',
            },
        }
    },
    computed: {
        ...mapState(['errors', 'processing']),
    },
    methods: {
        ...mapActions('categoryManager', ['createCategory']),
        ...mapMutations(['CLEAR_ERRORS']),

        submit() {
            let form = new FormData();
            form.append('name', this.category.name);
            form.append('description', this.category.description);

            this.createCategory(form).then(() => {
                this.$router.push({ name: 'manager.category.data' });
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Berhasil simpan Data",
                    showConfirmButton: false,
                    timer: 2000
                });
            }).catch((error) => {
                if (error.status !== 422) {
                    if (error.status === 401) {
                        this.$router.push({ name: 'login' })
                    } else {
                        this.$swal({
                            icon: "error",
                            title: "Oops...",
                            text: error.data.message ? error.data.message : "Something went wrong!",
                        });
                    }
                }
            });
        }
    }
}
</script>
<template>
    <div class="card card-info">
        <div class="card-header">
            <h3 class="card-title">Single Send Message</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form class="form-horizontal" @submit.prevent="upload" method="POST">
            <div class="card-body " :class="{ 'overlay-wrapper': this.processing }">
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
                    <label for="customFile" class="col-sm-2 col-form-label">Upload File</label>
                    <div class="col-sm-10">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="customFile" @change="onFileChange">
                            <label class="custom-file-label" for="customFile">
                                {{ form.file ? form.file.name : "Choose file" }}
                            </label>
                        </div>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label"> </label>
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-warning">Upload</button>
                    </div>
                </div>

            </div>
        </form>
        <div class="card-footer">
            <button type="button" class="btn btn-info">Send Message</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
export default {
    name: 'BulkSendMessageAdmin',

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
        ...mapGetters('routing', ['dataRoutings'])
    },

    methods: {
        ...mapActions('message', ['uploadBulkMessage']),
        ...mapActions('routing', ['getRoutingLists']),
        ...mapMutations(['CLEAR_ERRORS']),

        onSelectSender() {
            if (this.selectedSender) {
                this.form.user_id = this.selectedSender.user_id;
                this.form.sender_name = this.selectedSender.sender_name;
            } else {
                this.form.user_id = "";
                this.form.sender_name = "";
            }
        },

        onFileChange(e) {
            this.form.file = e.target.files[0];
        },

        upload() {
            if (!this.form.file) {
                this.$swal({
                    icon: "warning",
                    title: "File belum dipilih!",
                });
                return;
            }

            let formUpload = new FormData();
            formUpload.append('user_id', this.form.user_id);
            // formUpload.append('sender_name', this.form.sender_name);
            formUpload.append('file', this.form.file);

            this.uploadBulkMessage(formUpload).then(() => {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Berhasil Upload File",
                    showConfirmButton: false,
                    timer: 500
                });
            }).catch((error) => {
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

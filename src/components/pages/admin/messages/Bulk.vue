<template>
    <div class="card card-info">
        <div class="card-header">
            <h3 class="card-title">Single Send Message</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <div class="card-body " :class="{ 'overlay-wrapper': this.processing }">
            <form class="form-horizontal" @submit.prevent="upload" method="POST">
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
                    <div class="col-sm-3">
                        <button type="submit" class="btn btn-warning">Upload</button>
                    </div>
                    <div class="col-sm-7">
                        <a href="/templates/TemplateBlasting.xlsx" download class="btn btn-success ml-3">
                            <i class="fas fa-file-excel"></i> Download Template
                        </a>
                    </div>
                </div>
            </form>
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-info" @click="confirmSend">Send Message</button>
        </div>
    </div>

    <div class="card card-success">
        <div class="card-header">
            <h3 class="card-title">Data Message Temp</h3>
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
                    <tr v-for="(val, index) in dataMessages" :key="index" :class="`provider_${val.id}`">
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
                    <tr v-if="!dataMessages || dataMessages.length === 0">
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
        ...mapState('message', ['dataMessages', 'dataPagination']),
        ...mapGetters('routing', ['dataRoutings'])
    },

    methods: {
        ...mapActions('message', ['uploadBulkMessage', 'getDataMessageTemp', 'sendBulkMessage']),
        ...mapActions('routing', ['getRoutingLists']),
        ...mapMutations(['CLEAR_ERRORS']),

        onSelectSender() {
            if (this.selectedSender) {
                this.form.user_id = this.selectedSender.user_id;
                this.form.sender_name = this.selectedSender.sender_name;
                this.getDataMessageTemp({
                    user_id: this.form.user_id
                });
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
                this.getDataMessageTemp({
                    user_id: this.form.user_id
                });
            }).catch((error) => {
                this.$swal({
                    icon: "error",
                    title: "Oops...",
                    text: error.data?.message ? error.data?.message : "Something went wrong!",
                });
            });
        },

        confirmSend() {
            this.$swal({
                title: "Kirim Pesan?",
                text: "Apakah Anda yakin ingin mengirim pesan ini?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, kirim!",
                cancelButtonText: "Batal",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.sendBulkMessage({
                        user_id: this.form.user_id,
                        sender_name: this.form.sender_name
                    }).then((result) => {
                        this.$swal({
                            position: "top-end",
                            icon: "success",
                            title: result.message,
                            showConfirmButton: false,
                            timer: 500
                        });
                    });
                }
            });
        },
    }
}
</script>

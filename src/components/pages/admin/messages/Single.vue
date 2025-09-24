<template>
    <div class="card card-info">
        <div class="card-header">
            <h3 class="card-title">Single Send Message</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form class="form-horizontal" v-on:submit="submit" method="POST">
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
                        <span class="error invalid-feedback" v-if="errors.destination">{{ errors.destination[0]
                        }}</span>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Destination</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control " :class="{ 'is-invalid': errors.destination }"
                            name="price" v-model="form.destination" id="price" placeholder="Masukan Price">
                        <span class="error invalid-feedback" v-if="errors.destination">{{ errors.destination[0]
                        }}</span>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Content</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" :class="{ 'is-invalid': errors.content }" rows="3"
                            placeholder="Enter ..." spellcheck="false" aria-label="Send Content" name="content"
                            v-model="form.content"></textarea>
                        <span class="error invalid-feedback" v-if="errors.content">{{ errors.content[0] }}</span>
                    </div>
                </div>

            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-info" @click.prevent="submit">Send</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
export default {
    name: 'SingleSendMessageAdmin',

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
                destination: '',
                content: ''
            },
        }
    },

    computed: {
        ...mapState(['errors', 'processing']),
        ...mapGetters('routing', ['dataRoutings'])
    },

    methods: {
        ...mapActions('message', ['sendSingleMessage']),
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

        submit(e) {
            e.preventDefault();
            this.sendSingleMessage(this.form).then(() => {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Berhasil Kirim Pesan",
                    showConfirmButton: false,
                    timer: 2000
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

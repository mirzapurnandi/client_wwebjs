<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Data Routing: <b>{{ routings?.sender_name }}</b></h3> &nbsp;
            <button class="btn bg-gradient-primary btn-sm" href="javascript:;" @click.prevent="openModalCreateEngine()">
                <i class="fas fa-plus"></i> Tambah Engine
            </button>

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
                            <a class="btn btn-primary btn-sm" href="#" @click.prevent="openModal(val.license_key)">
                                <i class="fas fa-folder">
                                </i>
                                Info
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!--div class="card-footer clearfix">
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
        </div-->

        <div class="modal fade" id="modal-add-engine" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title">Tambah Engine</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="submitEngine">
                            <!-- Provider -->
                            <div class="mb-3">
                                <label for="provider" class="form-label">Provider</label>
                                <select v-model="selectedProvider" class="form-control" @change="loadProviderDetails">
                                    <option value="">-- Pilih Provider --</option>
                                    <option v-for="prov in dataProviders" :key="prov.id" :value="prov.id">
                                        {{ prov.name }}
                                    </option>
                                </select>
                            </div>

                            <!-- Provider Detail (nested) -->
                            <div class="mb-3">
                                <label for="providerdetail" class="form-label">Provider Detail</label>
                                <select v-model="form.providerdetail_id" class="form-control"
                                    :disabled="!selectedProvider">
                                    <option value="">-- Pilih Provider Detail --</option>
                                    <option v-for="detail in providerDataDetails" :key="detail.id" :value="detail.id">
                                        {{ detail.description }} ({{ detail.label ?? '-' }})
                                    </option>
                                </select>
                            </div>

                            <!-- Is Backup -->
                            <div class="mb-3">
                                <label for="isbackup" class="form-label">Backup?</label>
                                <select v-model="form.is_backup" class="form-control">
                                    <option :value="false">Tidak</option>
                                    <option :value="true">Ya</option>
                                </select>
                            </div>

                        </form>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button class="btn btn-primary" @click="submitEngine">Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ModalProviderDetail id="modal-xl" title="Detail Provider" :instanceId="this.idInstanceActive"
        @refresh="refreshInstance" @qr="getQRInstance" @status="statusInstance" @redeploy="redeployInstance"
        @screenshot="getScreenshotInstance">
        <template #body>
            <div v-if="providerDetails">
                <p><strong>ID:</strong> {{ providerDetails.provider_detail.id }}</p>
                <p><strong>License Key:</strong> {{ providerDetails.provider_detail.license_key }}</p>
                <p><strong>Label:</strong> {{ providerDetails.provider_detail.label }}</p>
                <p><strong>Status:</strong>
                    <span
                        :class="['badge', providerDetails.provider_detail.is_active ? 'badge-success' : 'badge-danger']">
                        {{ providerDetails.provider_detail.is_active ? 'Active' : 'Disable' }}
                    </span>
                </p>
            </div>
            <div v-else>
                <i class="fas fa-spinner fa-spin"></i> Loading...
            </div>
            <div v-if="providerDetails?.qr_instance">
                <p><strong>QR Instance:</strong></p>
                <div v-html="providerDetails.qr_instance"></div>
            </div>
            <div v-if="providerDetails?.ss_instance">
                <p><strong>Screenshot Instance:</strong></p>
                <div v-html="providerDetails.ss_instance"></div>
            </div>
        </template>
    </ModalProviderDetail>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import ModalProviderDetail from "@/components/modals/ModalProviderDetail.vue";
export default {
    name: "DataAdminProviderDetail",
    components: { ModalProviderDetail },
    data() {
        return {
            idInstanceActive: null,
            form: {
                routing_id: this.$route.params.id,
                providerdetail_id: "",
                is_backup: false
            },
            selectedProvider: "",
            providerDataDetails: []
        }
    },

    created() {
        this.getRoutingDetails({
            id: this.$route.params.id,
            page: this.$route.query.page || 1,
            user_id: this.$route.query.user_id,
        });
    },

    computed: {
        ...mapState(['processing']),
        ...mapState('provider', ['providerDetails']),
        ...mapGetters("provider", ["dataProviders"]),
        ...mapGetters('routing', ['routings', 'dataRoutingDetails', 'pagination'])
    },

    methods: {
        ...mapActions('routing', ['getRoutingDetails', 'addEngine']),
        ...mapActions('provider', ['getProviderLists', 'getDataProviderDetails', 'getStatusProviderDetails', 'refreshProviderDetails', 'getQRProviderDetails', 'redeployProviderDetails', 'getScreenshotProviderDetails']),
        ...mapMutations('provider', ['CLEAR_PROVIDER_DETAIL']),

        async openModalCreateEngine() {
            try {
                await this.getProviderLists();
                $('#modal-add-engine').modal('show');
            } catch (err) {
                console.error("Gagal ambil detail:", err);
            }
        },

        async loadProviderDetails() {
            if (!this.selectedProvider) {
                this.providerDataDetails = [];
                this.form.providerdetail_id = "";
                return;
            }
            const details = await this.getDataProviderDetails(this.selectedProvider);
            this.providerDataDetails = details?.result?.result; // hasil API list detail provider
        },

        async submitEngine() {
            try {
                await this.addEngine(this.form);
                $("#modal-add-engine").modal("hide");
                await this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: "Engine berhasil ditambahkan",
                    showConfirmButton: false,
                    timer: 2000
                });
                await this.getRoutingDetails({
                    id: this.$route.params.id,
                    page: this.$route.query.page || 1,
                    user_id: this.$route.query.user_id,
                });
            } catch (err) {
                this.$swal({
                    icon: "error",
                    title: "Oops...",
                    text: err.data.message ? err.data.message : "Something went wrong!",
                });
                // console.error("Gagal simpan engine:", err);
            }
        },

        async openModal(id_instance) {
            this.idInstanceActive = id_instance;
            try {
                this.CLEAR_PROVIDER_DETAIL();
                $('#modal-xl').modal('show');
                await this.getStatusProviderDetails({
                    id_instance,
                });
            } catch (err) {
                console.error("Gagal ambil detail:", err);
            }
        },

        async refreshInstance() {
            this.CLEAR_PROVIDER_DETAIL();
            await this.refreshProviderDetails({
                id_instance: this.idInstanceActive
            });
        },

        getQRInstance() {
            this.CLEAR_PROVIDER_DETAIL();
            this.getQRProviderDetails({
                id_instance: this.idInstanceActive
            }).catch((err) => {
                console.log(err);
                this.$swal({
                    icon: "error",
                    title: "Oops...",
                    text: err.data.message ? err.data.message : "Something went wrong!",
                });
            });
        },

        async statusInstance() {
            this.CLEAR_PROVIDER_DETAIL();
            await this.getStatusProviderDetails({
                id_instance: this.idInstanceActive
            });
            await this.getDataProviderDetails(this.providerId);
        },

        async redeployInstance() {
            this.CLEAR_PROVIDER_DETAIL();
            await this.redeployProviderDetails({
                id_instance: this.idInstanceActive
            });
        },

        async getScreenshotInstance() {
            this.CLEAR_PROVIDER_DETAIL();
            await this.getScreenshotProviderDetails({
                id_instance: this.idInstanceActive
            });
        }
    }

}
</script>

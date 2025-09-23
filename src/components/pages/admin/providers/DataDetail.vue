<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Provider {{ providers?.name }}</h3> &nbsp;
            <router-link class="btn bg-gradient-primary btn-sm"
                :to="{ name: `admins.providers.data.detail.insert`, params: { id: providers?.id } }"> &nbsp; <i
                    class="fas fa-plus">
                </i>
                Create Data </router-link>
            &nbsp;
            <button class="btn bg-gradient-success btn-sm" @click="refreshPage">
                <i class="fas fa-refresh"></i> Refresh
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
                        <th>Nama</th>
                        <th>License Key</th>
                        <th>Info HP</th>
                        <th>Label</th>
                        <th>Deskripsi</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(val, index) in dataProviderDetails" :key="index" :class="`provider_${val.id}`">
                        <td>{{ index + 1 }}</td>
                        <td>{{ val.name }}</td>
                        <td>{{ val.license_key ?? '-' }}</td>
                        <td>{{ val.info_hp ?? '-' }}</td>
                        <td>{{ val.label ?? '-' }}</td>
                        <td>{{ val.description ?? '-' }}</td>
                        <td>
                            <span :class="['badge', val.is_active ? 'badge-success' : 'badge-danger']">
                                {{ val.is_active ? 'Active' : 'Disable' }}
                            </span>

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
            providerId: this.$route.params.id,
            idInstanceActive: null,
            idInstanceQR: null
        }
    },

    created() {
        this.getProvider(this.$route.params.id);
        this.getDataProviderDetails(this.$route.params.id);
    },

    computed: {
        ...mapState(['processing']),
        ...mapState('provider', ['providerDetails']),
        ...mapGetters('provider', ['providers', 'dataProviderDetails', 'pagination'])
    },

    methods: {
        ...mapActions('provider', ['getProvider', 'getDataProviderDetails', 'getStatusProviderDetails', 'refreshProviderDetails', 'getQRProviderDetails', 'redeployProviderDetails', 'getScreenshotProviderDetails']),
        ...mapMutations('provider', ['CLEAR_PROVIDER_DETAIL']),

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

        async getQRInstance() {
            this.CLEAR_PROVIDER_DETAIL();
            await this.getQRProviderDetails({
                id_instance: this.idInstanceActive
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
        },

        async refreshPage() {
            this.CLEAR_PROVIDER_DETAIL();
            await this.getDataProviderDetails(this.providerId);
        }
    }

}
</script>

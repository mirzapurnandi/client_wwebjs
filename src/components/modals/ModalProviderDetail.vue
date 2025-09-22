<template>
    <div class="modal fade" :id="id" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ title }}</h4>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <!-- slot untuk body -->
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>

                <!-- slot untuk footer -->
                <div class="modal-footer justify-content-between">
                    <slot name="footer">
                        <button type="button" class="btn btn-success" @click="onStatus">Status Instance</button>
                        <button type="button" class="btn btn-warning" @click="onRefresh">Refresh Instance</button>
                        <button type="button" class="btn btn-info" @click="getQR">Get QR Instance</button>
                        <button type="button" class="btn btn-danger" @click="reDeploy">Redeploy Instance</button>
                        <button type="button" class="btn btn-secondary" @click="screenShot">Get Screenshot</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalProviderDetail",
    props: {
        id: { type: String, required: true },
        title: { type: String, default: "Modal" }
    },
    methods: {
        onRefresh() {
            if (confirm("🚨 Apakah Anda yakin ingin melakukan Refresh Instance?")) {
                this.$emit("refresh");
            }
        },
        getQR() {
            this.$emit("qr"); // kirim ke parent
        },
        onStatus() {
            this.$emit("status"); // kirim ke parent
        },
        reDeploy() {
            if (confirm("🚨 Apakah Anda yakin ingin melakukan Redeploy Instance?\nTindakan ini dapat merestart ulang instance.")) {
                this.$emit("redeploy");
            }
        },
        screenShot() {
            this.$emit("screenshot"); // kirim ke parent
        }
    }
}
</script>

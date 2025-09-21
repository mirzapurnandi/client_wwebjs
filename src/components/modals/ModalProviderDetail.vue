<template>
    <div class="modal fade" :id="id" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
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
                        <button type="button" class="btn btn-warning" @click="onRefresh">Refresh Instance</button>
                        <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
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
            this.$emit("refresh"); // kirim ke parent
        }
    }
}
</script>

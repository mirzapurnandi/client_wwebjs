<template>
    <div class="login-page">
        <div class="login-box">
            <div class="card card-outline card-primary">
                <div class="card-header text-center">
                    <span class="h1"><b>P</b>urnandi</span>
                </div>
                <div class="card-body " :class="{ 'overlay-wrapper': this.processing }">
                    <div class="overlay dark" v-if="this.processing">
                        <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                        <div class="text-bold pt-2">Loading...</div>
                    </div>
                    <div class="alert alert-danger alert-dismissible" v-if="error_message !== ''">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h5><i class="icon fas fa-ban"></i> Alert!</h5>
                        {{ error_message }}
                    </div>

                    <p class="login-box-msg">Sign in</p>
                    <form v-on:submit="submitLogin" method="POST">
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" :class="{ 'is-invalid': errors.email }"
                                   placeholder="Email" v-model="data.email">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                            <span class="error invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</span>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" :class="{ 'is-invalid': errors.password }"
                                   placeholder="Password" v-model="data.password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                            <span class="error invalid-feedback" v-if="errors.password">{{ errors.password[0] }}</span>
                        </div>
                        <div class="row">
                            <div class="col-8"></div>
                            <div class="col-4">
                                <button type="submit" class="btn btn-primary btn-block" :disabled="this.processing">
                                    Sign In
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
export default {
    data() {
        return {
            data: {
                email: "",
                password: ""
            },
        };
    },

    created() {
        if (this.isAuth) {
            this.$router.push({ name: "home" });
        }
    },

    computed: {
        ...mapState(["errors", "processing"]),
        ...mapState('auth', {
            error_message: state => state.error_message
        }),
        ...mapGetters(["isAuth"])
    },

    methods: {
        ...mapActions('auth', ['submit']),
        ...mapMutations('auth', ['CLEAR_ERROR_MESSAGE']),
        ...mapMutations(['CLEAR_ERRORS']),

        submitLogin(e) {
            e.preventDefault();
            this.CLEAR_ERRORS();
            this.CLEAR_ERROR_MESSAGE();
            this.submit(this.data).then(() => {
                if (this.isAuth) {
                    this.CLEAR_ERRORS();
                    this.$router.go('/');
                }
            }).catch((error) => console.log(error));
        }
    },
};
</script>

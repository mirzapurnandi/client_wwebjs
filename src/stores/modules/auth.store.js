import api from "@/api.js";
import apiAuth from "@/apiAuth.js";

const state = () => ({
    error_message: ""
});

const mutations = {
    ERROR_MESSAGE(state, payload) {
        state.error_message = payload;
    },
    CLEAR_ERROR_MESSAGE(state) {
        state.error_message = "";
    },
};

const actions = {
    submit({ commit }, payload) {
        localStorage.setItem("token", null);
        commit("SET_TOKEN", null, { root: true });
        commit("SET_PROCESSING", true, { root: true });

        return new Promise((resolve, reject) => {
            api.post("/login", payload)
                .then((response) => {
                    const resp = response.data.result;
                    localStorage.setItem("token", resp.accessToken);
                    commit("SET_TOKEN", resp.accessToken, { root: true });
                    commit("ASSIGN_USER_AUTH", resp, { root: true });
                    resolve(response.data);
                })
                .catch((error) => {
                    const err = error.response.data;
                    commit("SET_ERRORS", err, { root: true });
                    commit("ERROR_MESSAGE", err.message);
                    reject(err);
                });
            commit("SET_PROCESSING", false, { root: true });
        });
    },

    refreshToken({commit}) {
        return new Promise((resolve, reject) => {
            api.post("/refresh")
                .then((response) => {
                    let resp = response.data.result;
                    localStorage.setItem("token", resp);
                    commit("SET_TOKEN", resp, { root: true });
                    resolve(response.data);
                })
                .catch((error) => {
                    let err = error.response.data;
                    commit("SET_ERRORS", err, { root: true });
                    reject(err);
                });
        });
    },

    signOut({ commit }) {
        return new Promise((resolve, reject) => {
            localStorage.setItem("token", null);
            commit("SET_TOKEN", null, { root: true });
            resolve();
            apiAuth.get("/logout").then((response) => {
                console.log("logout");
            });
        });
    },

    getUserLogin({ commit }) {
        return new Promise((resolve, reject) => {
            api.get("/me")
                .then((response) => {
                    let resp = response.data.result;
                    commit("ASSIGN_USER_AUTH", resp, {root: true});
                    resolve(resp);
                })
                .catch((error) => {
                    setTimeout(() => {
                        if (error.response.status === 403) {
                            localStorage.setItem("token", null);
                            commit("SET_TOKEN", null, {
                                root: true,
                            });
                            location.reload();
                        }
                        reject(error.response.data);
                    }, 2000);
                });
        });
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};

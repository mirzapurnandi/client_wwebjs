import api from "@/api.js";
import handleError from "@/utils/handleError";

const state = () => ({
    dataMessage: null,
});

const mutations = {
    ASSIGN_DATA_MESSAGE(state, payload) {
        state.dataMessage = payload;
    },
};

const actions = {
    sendSingleMessage({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("admin/message/send", payload)
                .then((response) => {
                    commit("ASSIGN_DATA_MESSAGE", response.data.result);
                    resolve(response.data);
                })
                .catch((error) => handleError(error, commit, reject));
        });
    },

    uploadBulkMessage({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("admin/message/upload", payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => handleError(error, commit, reject));
        });
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};

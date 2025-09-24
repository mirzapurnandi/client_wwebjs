import api from "@/api.js";
import handleError from "@/utils/handleError";

const state = () => ({
    dataMessage: null,
    dataMessages: [],
    dataPagination: {},
});

const mutations = {
    ASSIGN_MESSAGE(state, payload) {
        state.dataMessage = payload;
    },

    ASSIGN_DATA_MESSAGE(state, payload) {
        state.dataMessages = payload.result;
        state.dataPagination = {
            total: payload.total,
            current_page: payload.current_page,
            last_page: payload.last_page,
            per_page: payload.per_page,
            from: payload.from,
            to: payload.to,
        };
    },
};

const actions = {
    getDataMessageTemp({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("admin/message/list-temp", payload)
                .then((response) => {
                    commit("ASSIGN_DATA_MESSAGE", response.data.result);
                    resolve(response.data);
                })
                .catch((error) => handleError(error, commit, reject));
        });
    },

    sendSingleMessage({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.post("admin/message/send", payload)
                .then((response) => {
                    commit("ASSIGN_MESSAGE", response.data.result);
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

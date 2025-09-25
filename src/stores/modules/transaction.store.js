import api from "@/api.js";
import handleError from "@/utils/handleError";

const state = () => ({
    dataTransactions: [],
    dataPagination: {},
});

const mutations = {
    ASSIGN_MESSAGE(state, payload) {
        state.dataMessage = payload;
    },

    ASSIGN_DATA_TRANSACTION(state, payload) {
        state.dataTransactions = payload.result;
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
    getDataTransaction({ commit }, payload) {
        return new Promise((resolve, reject) => {
            api.get(`admin/transaction`, { params: payload })
                .then((response) => {
                    commit("ASSIGN_DATA_TRANSACTION", response.data.result);
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

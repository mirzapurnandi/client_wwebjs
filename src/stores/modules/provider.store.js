import api from "@/api.js";
import handleError from "@/utils/handleError";

const state = () => ({
    dataProvider: [],
    dataPagination: {}
});

const mutations = {
    ASSIGN_PROVIDER(state, payload) {
        state.dataUsers = payload.data;
        state.dataPagination = {
            total: payload.total,
            current_page: payload.current_page,
            last_page: payload.last_page,
            per_page: payload.per_page,
            from: payload.from,
            to: payload.to,
        }
    },
};

const actions = {
    getUserLists({ commit }, page = 1) {
        return new Promise((resolve, reject) => {
            api.get(`admin/provider?page=${page}`).then((response) => {
                commit("ASSIGN_PROVIDER", response.data.result);
                resolve(response.data);
            }).catch((error) => handleError(error, commit, reject));
        });
    },
};

const getters = {
    users: state => state.dataProvider,
    pagination: state => state.dataPagination,
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};

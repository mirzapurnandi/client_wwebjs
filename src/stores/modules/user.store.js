import api from "@/api.js";
import handleError from "@/utils/handleError";

const state = () => ({
    dataUsers: [],
    dataPagination: {}
});

const mutations = {
    ASSIGN_USER(state, payload) {
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
            api.get(`admin/user?page=${page}`).then((response) => {
                commit("ASSIGN_USER", response.data.result);
                resolve(response.data);
            }).catch((error) => handleError(error, commit, reject));
        });
    },
};

const getters = {
    users: state => state.dataUsers,
    pagination: state => state.dataPagination,
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};

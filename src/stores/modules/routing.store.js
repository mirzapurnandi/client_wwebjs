import api from "@/api.js";
import handleError from "@/utils/handleError";

const state = () => ({
    routings: null,
    dataRoutingDetail: [],
    dataRouting: [],
    dataPagination: {},
});

const mutations = {
    ASSIGN_ROUTING(state, payload) {
        state.routings = payload;
    },

    ASSIGN_DATA_ROUTING(state, payload) {
        state.dataRouting = payload.data;
        state.dataPagination = {
            total: payload.total,
            current_page: payload.current_page,
            last_page: payload.last_page,
            per_page: payload.per_page,
            from: payload.from,
            to: payload.to,
        };
    },

    ASSIGN_ROUTING_DETAIL(state, payload) {
        state.routings = payload.data;
        state.dataRoutingDetail = payload.detail.data;
        state.dataPagination = {
            total: payload.detail.total,
            current_page: payload.detail.current_page,
            last_page: payload.detail.last_page,
            per_page: payload.detail.per_page,
            from: payload.detail.from,
            to: payload.detail.to,
        };
    },
};

const actions = {
    getRouting({ commit }, id, page = 1, user_id = null) {
        return new Promise((resolve, reject) => {
            api.get(`admin/routing/${id}?page=${page}&user_id=${user_id}`)
                .then((response) => {
                    commit("ASSIGN_ROUTING", response.data.result);
                    resolve(response.data);
                })
                .catch((error) => handleError(error, commit, reject));
        });
    },

    getRoutingLists({ commit }, page = 1) {
        return new Promise((resolve, reject) => {
            api.get(`admin/routing?page=${page}`)
                .then((response) => {
                    commit("ASSIGN_DATA_ROUTING", response.data.result);
                    resolve(response.data);
                })
                .catch((error) => handleError(error, commit, reject));
        });
    },

    getRoutingDetails({ commit }, { id, page = 1, user_id }) {
        return new Promise((resolve, reject) => {
            api.get(`admin/routing/${id}`, {
                params: { page, user_id },
            })
                .then((response) => {
                    commit("ASSIGN_ROUTING_DETAIL", response.data.result);
                    resolve(response.data);
                })
                .catch((error) => handleError(error, commit, reject));
        });
    },

    addEngine({ dispatch, commit }, payload) {
        commit("SET_PROCESSING", true, { root: true });
        return new Promise((resolve, reject) => {
            api.post("admin/routing/add-engine", payload)
                .then((response) => {
                    commit("CLEAR_ERRORS", "", { root: true });
                    commit("SET_PROCESSING", false, { root: true });
                    dispatch("getRoutingLists").then(() => {
                        resolve(response.data);
                    });
                    resolve(response.data);
                })
                .catch((error) => handleError(error, commit, reject));
        });
    },
};

const getters = {
    routings: (state) => state.routings,
    dataRoutingDetails: (state) => state.dataRoutingDetail,
    dataRoutings: (state) => state.dataRouting,
    pagination: (state) => state.dataPagination,
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};

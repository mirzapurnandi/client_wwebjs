import api from "@/api.js";
import handleError from "@/utils/handleError";

const state = () => ({
    providers: null,
    dataProviderDetail: [],
    dataProvider: [],
    dataPagination: {},
});

const mutations = {
    ASSIGN_PROVIDER(state, payload) {
        state.providers = payload;
    },

    ASSIGN_DATA_PROVIDER(state, payload) {
        state.dataProvider = payload.data;
        state.dataPagination = {
            total: payload.total,
            current_page: payload.current_page,
            last_page: payload.last_page,
            per_page: payload.per_page,
            from: payload.from,
            to: payload.to,
        };
    },

    ASSIGN_PROVIDER_DETAIL(state, payload) {
        state.dataProviderDetail = payload.result;
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
    getProvider({ commit }, id) {
        return new Promise((resolve, reject) => {
            api.get(`admin/provider/${id}`)
                .then((response) => {
                    commit("ASSIGN_PROVIDER", response.data.result);
                    resolve(response.data);
                })
                .catch((error) => handleError(error, commit, reject));
        });
    },

    getProviderLists({ commit }, page = 1) {
        return new Promise((resolve, reject) => {
            api.get(`admin/provider?page=${page}`)
                .then((response) => {
                    commit("ASSIGN_DATA_PROVIDER", response.data.result);
                    resolve(response.data);
                })
                .catch((error) => handleError(error, commit, reject));
        });
    },

    getProviderDetails({ commit }, id) {
        return new Promise((resolve, reject) => {
            api.get(`admin/provider-detail/${id}`)
                .then((response) => {
                    commit("ASSIGN_PROVIDER_DETAIL", response.data.result);
                    resolve(response.data);
                })
                .catch((error) => handleError(error, commit, reject));
        });
    },
};

const getters = {
    providers: (state) => state.providers,
    dataProviderDetails: (state) => state.dataProviderDetail,
    dataProviders: (state) => state.dataProvider,
    pagination: (state) => state.dataPagination,
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};

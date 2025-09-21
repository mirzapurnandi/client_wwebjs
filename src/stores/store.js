import Vuex from "vuex";

import auth from "./modules/auth.store";
import user from "./modules/user.store";
import provider from "./modules/provider.store";
import routing from "./modules/routing.store";

const store = new Vuex.Store({
    modules: {
        auth,
        user,
        provider,
        routing,
    },

    state: {
        processing: false,
        token: localStorage.getItem("token") || null,
        errors: [],
        authenticated: [],
    },

    getters: {
        isAuth: (state) => state.token != null && state.token !== "null",
        token: (state) => state.token,
    },

    mutations: {
        SET_PROCESSING(state, payload) {
            state.processing = payload;
        },
        SET_TOKEN(state, payload) {
            state.token = payload;
        },
        SET_ERRORS(state, payload) {
            state.errors = payload;
        },
        CLEAR_ERRORS(state) {
            state.errors = [];
        },
        ASSIGN_USER_AUTH(state, payload) {
            state.authenticated = payload;
        },
    },
});

export default store;

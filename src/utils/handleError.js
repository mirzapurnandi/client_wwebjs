import store from "@/stores/store"

export default async function handleError(error, commit, reject) {
    if (error.response) {
        const response = await error.response.data;
        const status = await error.response.status;
        if (status === 401) {
            await store.dispatch("auth/signOut");
            localStorage.setItem("token", null);
            commit("SET_TOKEN", null, { root: true });
        } else if (status === 422) {
            commit("SET_ERRORS", response.errors, { root: true });
        } else if (status === 500) {
            commit("SET_ERRORS", response, { root: true });
        }
    }
    commit("SET_PROCESSING", false, { root: true });
    reject(response);
}

import axios from "axios";
import store from "@/stores/store";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use(async (config) => {
    const token = await store.getters.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 419) {
            try {
                await store.dispatch("auth/refreshToken");
                error.config.headers.Authorization = `Bearer ${store.getters.token}`;
                return axios(error.config);
            } catch (e) {
                await store.dispatch("auth/signOut");
            }
        }
        return Promise.reject(error);
    }
);

export default api;

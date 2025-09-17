import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true
});

// api.get("/sanctum/csrf-cookie");

export default api;

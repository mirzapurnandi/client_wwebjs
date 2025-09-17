// import api from "../api.js";
import api from "../api.js";

const getUser = async () => {
    try {
        const result = await api.get("/me");
        if (result.status === 200) {
            return result.data;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};

const logout = async () => {
    try {
        const result = await api.get("/logout");
        if (result.status === 200) {
            localStorage.setItem("token", null);
            return result;
        }
        return null;
    } catch (error) {
        localStorage.setItem("token", null);
        console.log(error);
    }
};

export const authService = {
    getUser,
    logout,
};

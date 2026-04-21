import { axiosAuth } from "./api";

// 1. CORREGIDO: Se quitó el "= async" extra
export const login = async (data) => {
    return await axiosAuth.post("/api/v1/Auth/login", data);
};

// 2. CORREGIDO: "Headers" se cambió a "headers" en minúscula
export const register = async (data) => {
    return await axiosAuth.post("/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" }    
    }); 
};

export const forgotPassword = async (email) => {
    return await axiosAuth.post("/auth/forgot-password", { email });
};

export const resetPassword = async (token, newPassword) => {
    return await axiosAuth.post("/auth/reset-password", { token, newPassword });
};

export const verifyEmail = async (token) => {
    return await axiosAuth.post("/auth/verify-email", { token });
};

export const updateUserRole = async (userId, roleName) => {
    return await axiosAuth.put(`/auth/users/${userId}/role`, { roleName });
};

export const getAllUsers = async () => {
    const { data } = await axiosAuth.get("/auth/users");
    return {users: data};
};
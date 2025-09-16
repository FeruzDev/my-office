import api from "../api/api";
import apiClient from "../api/api";


export const Login = async (userData) => {
    return api.post("auth/login", userData);
};

export const GetMe = async () => {
    const response = await apiClient.get("/auth/me") ;
    return response.data;
};

export const CheckPer = async () => {
    const response = await apiClient.get("/auth/me/permissions") ;
    return response.data;
};
export const CheckPerUser = async () => {
    const response = await apiClient.get("/role-permission/permissions_list") ;
    return response.data;
};
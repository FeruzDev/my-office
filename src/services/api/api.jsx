import axios from "axios";
export const API_PATH = "https://report-apis.absvision.ai/"
const apiClient = axios.create({
    baseURL: "https://report-apis.absvision.ai/",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
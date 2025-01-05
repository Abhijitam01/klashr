import { HttpService } from "../../../core/http";
export const useAuthenticationToken = () => {
    const LOCAL_STORAGE_TOKEN = 'ACCESS_TOKEN';
    const setToken = (token) => {
        if (token) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
            HttpService.api.setAccessToken(token);
        }
    };
    const removeToken = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        HttpService.api.setAccessToken(null);
    };
    const getToken = () => {
        return localStorage.getItem(LOCAL_STORAGE_TOKEN);
    };
    return {
        setToken,
        getToken,
        removeToken,
    };
};

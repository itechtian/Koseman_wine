import axios from "axios";
import StoreUtils from "../utils/baseUtils/StoreUtils";
// import router from "../router";



export const appClient = axios.create({
    baseURL:"https://kosmanwine.kosmanliqueur.com/api/v1",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});


appClient.interceptors.request.use(config => {
    config.headers.Authorization = StoreUtils.rootGetters(StoreUtils.getters.auth.getToken)
        ? "Bearer" + " " + StoreUtils.rootGetters(StoreUtils.getters.auth.getToken)
        : "Bearer" + " " + localStorage.token;
    // console.log(config.headers.Authorization)
    return config
})

export const apiClient = {
    appClient: appClient,
}



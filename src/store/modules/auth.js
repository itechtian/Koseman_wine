import AuthRequest from "../../model/request/authRequest";
import AuthService from "../../service/AuthService";
import {Toast} from "../../components/NotificationToast";
import router from "../../router";
import StoreUtils from "../../utils/baseUtils/StoreUtils";
import AppRequest from "../../model/request/appRequest";

export const state = {
    loading:false,
    token:null,
    isOTP:false,
    initiateEnrollment:[],
    completeEnrollment:[],
    screen:'screen1',
    user:null,

}
export const getters = {
    getEmail:(state)=> {
        return state.initiateEnrollment.customerEmail
    },

    getToken:(state) => {
        return state.token
    }

}
export const mutations = {
    updateLoading:(state, payload)=> {
        state.loading = payload
    },
    updateToken:(state, payload)=> {
        state.token = payload
    },
    updateUser:(state, payload)=> {
        state.user = payload
    },
    updateScreen:(state, payload)=> {
        state.screen = payload
    },
    updateIsOTP:(state, payload)=> {
        state.isOTP = payload
    },
    updateInitiateEnrollment:(state, payload)=> {
        state.initiateEnrollment = payload
    },
    updateCompleteEnrollment:(state, payload)=> {
        state.completeEnrollment = payload
    },

}
export const actions = {
    initiateEnrollment:({commit},payload = AuthRequest.initiateEnrollment) => {
        commit("updateLoading",true)
        return AuthService.initiateEnrollment(payload).then((response) => {
            commit("updateLoading",false)
            let responseData = response.data
            if(responseData.responseCode === "200"){
                localStorage.password = payload.customerPassword
                commit("updateInitiateEnrollment",responseData.data)
                Toast.fire({icon:'success', title:responseData.responseMessage}).then()
                commit("updateScreen", 'screen2')
            }else{
                Toast.fire({icon:'error', title:responseData.responseMessage}).then()
            }
        }).catch(e => {
            commit("updateLoading",false)
            Toast.fire({icon:'error', title:e}).then()
        })
    },

    sendOTP:({commit},payload = AuthRequest.sendOtp)=> {
        commit("updateIsOTP",true)
        return AuthService.sendOtp(payload).then(response => {
            commit("updateIsOTP",false)
            if(response.data.responseCode === "200"){
                Toast.fire({icon:'success', title:response.data.responseMessage})
            }else {
                Toast.fire({icon:'error', title:response.data.responseMessage})
            }
        }).catch(e => {
            commit("updateIsOTP",false)
            Toast.fire({icon:'error', title:e})
        })

    },

    completeEnrollment:({commit}, payload = AuthRequest.completeEnrollment) => {
        commit("updateLoading",true)
        return AuthService.completeEnrollment(payload).then(response => {
            commit("updateLoading",false)
            if(response.data.responseCode === "200"){
                localStorage.email = payload.customerEmail
                Toast.fire({icon:"success", title:response.data.responseMessage})
                 StoreUtils.dispatch(StoreUtils.actions.auth.login).then()
            }else{
                Toast.fire({icon:"error", title:response.data.responseMessage}).then()
            }
        }).catch(e => {
            commit("updateLoading",false)
            Toast.fire({icon:"error", title:e})
        })

    },

    login:({commit}, payload=AuthRequest.login) => {
        commit("updateLoading",true)
        if(localStorage.email){
            payload.customerEmail = localStorage?.email
            payload.customerPassword = localStorage?.password
        }
        return AuthService.login(payload).then(response => {
            commit("updateLoading",false)
            let responseData = response.data
            if(responseData.responseCode === 200){
              localStorage.clear()
              StoreUtils.dispatch(StoreUtils.actions.app.readCustomerCart).then()
              commit("updateUser", responseData.data)
              commit("updateToken", responseData.data.token)
              localStorage.customerId = responseData.data.customerId
              localStorage.token = responseData.data.token
              router.push({path:'/onepagecheckout/delivery/'}).then()
            }else{
                Toast.fire({icon:"error", title:responseData.responseMessage}).then()
            }
        }).catch(e => {
            commit("updateLoading",false)
            Toast.fire({icon:"error", title:e}).then()
        })
    },

    readCustomerById:({commit}, payload = AppRequest.readCustomerById) => {
        payload.customerId = localStorage.customerId
        return AuthService.readCustomerById(payload).then(response => {
            let responseData = response.data
            if(responseData.responseCode === 200){
                commit("updateUser", responseData.data)
            }
        })

    }

}
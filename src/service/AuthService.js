import {apiClient} from "./BaseService";

export default {
    initiateEnrollment(payload){
        return apiClient.appClient.post('/initiate-enrollment',payload)
    },

    sendOtp(payload){
        return apiClient.appClient.post('/resend-otp',payload)
    },

    completeEnrollment(payload){
        return apiClient.appClient.post('/complete-enrollment',payload)
    },

    login(payload){
        return apiClient.appClient.post('/login',payload)
    },
    readCustomerById(payload){
        return apiClient.appClient.post('/read-customer-by-id',payload)
    }
}
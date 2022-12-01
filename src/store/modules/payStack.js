import PaystackPop from "@paystack/inline-js";
import AppRequest from "../../model/request/appRequest";
import {Toast} from "../../components/NotificationToast";

export const state = {
    reference:null
}

export const mutations = {
    updateReference:(state,payload)=>{
        state.reference = payload
    }
}

export const actions = {
    payWithPaystack({commit},payload=AppRequest.payStackRequest) {
        const handler = PaystackPop.setup({
            amount: payload.amount,
            ref: payload.ref,
            key: payload.key,
            email:payload.email,
            currency: payload.currency,
            callback:function (response) {
                //this happens after the payment is completed successfully
                commit("updateReference",response.reference)
                // Make an AJAX call to your server with the reference to verify the transaction
            },
            onClose: function () {
                Toast.fire({text:'Transaction was not completed, window closed.',icon:'success'})
            }
        });
        handler.openIframe()
    }
}

import store from "../../store/index"

class StoreUtils {

    static actions = {
        app:{
            readCategories:"app/readCategories",
            readBrands:"app/readBrands",
            readProductsByCategoryId:"app/readProductsByCategoryId",
            readProductByBrandId:"app/readProductByBrandId",
            readCustomerCart:"app/readCustomerCart",
            createSubscription:"app/createSubscription",
            addToCart:"app/addToCart",
            readProductById:"app/readProductById",
            filterCartByProductId:"app/filterCartByProductId",
            updateCart:"app/updateCart",
            filterProduct:"app/filterProduct",
            readDeliveryStats:"app/readDeliveryStats",
            deleteCartItem:"app/deleteCartItem",
            updateCustomer:"app/updateCustomer",
            updateSelectedHistory:"app/updateSelectedHistory",
            readPaymentSystems:"app/readPaymentSystems",
            doPayment:"app/doPayment",
        },
        auth:{
            initiateEnrollment:"auth/initiateEnrollment",
            completeEnrollment:"auth/completeEnrollment",
            sendOTP:"auth/sendOTP",
            login:"auth/login",
            readCustomerById:"auth/readCustomerById"
        },
        payStack:{
            payWithPaystack:"payStack/payWithPaystack"
        }
    }

    static mutations = {
        app:{
            updateLoading:"app/updateLoading",
            updateBrands:"app/updateBrands",
            updateCategoryProducts:"app/updateCategoryProducts",
            updateBrandProducts:"app/updateBrandProducts",
            updateLoadingCategoryProduct:"app/updateLoadingCategoryProduct",
            updateLoadingBrandProduct:"app/updateLoadingBrandProduct",
            updateCurrentCategory:"app/updateCurrentCategory",
            updateCurrentBrand:"app/updateCurrentBrand",
            updateCart:"app/updateCart",
            updateLoadingSubscription:"app/updateLoadingSubscription",
            updateLoadingForCart:"app/updateLoadingForCart",
            updatePreCart:"app/updatePreCart",
            updateNewlyAddedToCart:"app/updateNewlyAddedToCart",
            updateIsNewlyAdded:"app/updateIsNewlyAdded",
            updateShowChangeAddressModal:"app/updateShowChangeAddressModal",
            updateFilterProduct:"app/updateFilterProduct",
            updateFilterIsLoading:"app/updateFilterIsLoading",
            updateDeliveryStats:"app/updateDeliveryStats",
            updateUserDeliveryChoice:"app/updateUserDeliveryChoice",
            updateDeletingCartLoading:"app/updateDeletingCartLoading",
            updateBaseOnPreviousSelections:"app/updateBaseOnPreviousSelections",
            updateAlternativeProducts:"app/updateAlternativeProducts",
            updateReadPayment:"app/updateReadPayment",
            updateReference:"payStack/updateReference"

        },
        auth:{
            updateLoading:"auth/updateLoading",
            updateIsOTP:"auth/updateIsOTP",
            updateInitiateEnrollment:"auth/updateInitiateEnrollment",
            updateCompleteEnrollment:"auth/updateCompleteEnrollment",
            updateScreen:"auth/updateScreen",
            updateToken:"auth/updateToken",
            updateUser:"auth/updateUser"
        },
        payStack:{
            updateReference:"payStack/updateReference"
        }
    }

    static getters ={
        app:{
            getCategories:"app/getCategories",
            getBrands:"app/getBrands",
            getCurrentCategories:"app/getCurrentCategories",
            getCurrentBrand:"app/getCurrentBrand",
            getCartLength:"app/getCartLength",
            getDeliveryStats:"app/getDeliveryStats",
            getAlternative:"app/getAlternative"
        },
        auth:{
            getEmail:"auth/getEmail",
            getToken:"auth/getToken"
        }
    }

    static dispatch(actionToDispatch, payload) {
        return store.dispatch(actionToDispatch, payload, { root: true });
    }

    static commit(mutationToCommit, payload) {
        return store.commit(mutationToCommit, payload, { root: true });
    }

    static rootGetters(getter, payload) {
        if (payload) {
            return store.getters[getter](payload);
        } else {
            return store.getters[getter];
        }
    }
}

export default StoreUtils



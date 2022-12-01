import {apiClient} from "./BaseService";

export default {
    readCategories(){
        return apiClient.appClient.get('/read-categories')
    },
    readBrands(){
        return apiClient.appClient.get('/read-brands')
    },
    readProductsByCategoryId(payload){
        return apiClient.appClient.post('/read-product-by-category-id',payload)
    },
    readProductsByBrandId(payload){
        return apiClient.appClient.post('/read-product-by-brand-id',payload)
    },
    readCart(payload){
        return apiClient.appClient.post('/read-cart-by-customer',payload)
    },
    subscription(payload){
        return apiClient.appClient.post('/create-subscription',payload)
    },
    addToCart(payload){
        return apiClient.appClient.post('/create-cart',payload)
    },
    updateCart(payload){
        return apiClient.appClient.post('/update-cart',payload)
    },
    readProductById(payload){
        return apiClient.appClient.post('/read-product-by-id',payload)
    },
    filterProductsByPrize(payload){
        return apiClient.appClient.post('/filter-product-by-selling-price',payload)
    },
    readDelivery(){
        return apiClient.appClient.get('/read-delivery')
    },

    deleteCart(payload){
        return apiClient.appClient.post('/delete-cart', payload)
    },

    updateCustomer(payload){
        return apiClient.appClient.post('/update-customer', payload)
    },

    readPayment(){
        return apiClient.appClient.get('read-payment-systems')
    },

    callDoPaymentApi(payload){
        return apiClient.appClient.post('/create-order',payload)
    }
}
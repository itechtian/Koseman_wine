class AppRequest {
    static readBrandProduct = {
        productBrandId:1
    }

    static readCategoryProduct = {
        productCategoryId: 1
    }

    static readCart = {
        cartCustomerId:null
    }

    static createSubscription = {
        subscriptionCustomerEmail:null
    }
    static createCart = {
        cartCustomerId:null,
        cartProductId:null,
        cartQuantity:null
    }
    static updateCart = {
        cartCustomerId:null,
        cartProductId:null,
        cartQuantity:null,
        cartId:null

    }

    static readProductById = {
        productId:null
    }

    static readCustomerById = {
        customerId:null
    }

    static filterProduct = {
        productMinSellingPrice:null,
        productMaxSellingPrice:null,
    }

    static deleteCart = {
        cartId:null
    }

    static updateCustomer = {
        customerFirstName:null,
        customerLastName:null,
        customerPhoneNo:null,
        customerEmail:null,
        customerAddress:null,
        customerState:null,
    }

    static orderRequest = {
        orderCustomerId:null,
        orderDeliveryId:null,
        orderTotalAmount:null,
        orderReference:null,
        orderSubTotalAmount:null,
        orderPaymentSystemId:null,
        orderDetailsFirstName:null,
        orderDetailsLastName:null,
        orderDetailsEmail:null,
        orderDetailsPhone:null,
        orderDetailsAddress:null,
        orderDetailsState:null,
    }

    static payStackRequest = {
        key:null,
        email:null,
        amount:null,
        currency:null,
        ref:null,
    }

}

export default AppRequest
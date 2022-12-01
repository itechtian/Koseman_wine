import AppService from "../../service/AppService";
import AppRequest from "../../model/request/appRequest";
import {Toast} from "../../components/NotificationToast";
import StoreUtils from "../../utils/baseUtils/StoreUtils";
import router from "../../router";
import Swal from "sweetalert2";

export const state = {
  categories:null,
  categoryProducts:null,
  loadingCategoryProduct:false,
  loadingBrandProduct:false,
  loadingSubscription:false,
  filterIsLoading:false,
  loadingForCart:false,
  brandProducts:[],
  brands:null,
  loading:false,
  cart:[],
  preCart:null,
  newlyAddedToCart:null,
  currentCategory:null,
  currentBrand:null,
  isNewlyAdded:null,
  showChangeAddressModal:false,
  filterProduct:null,
  deliveryStats:null,
  userDeliveryChoice:null,
  deletingCartLoading:false,
  alternativeProducts:null,
  baseOnPreviousSelections:null,
  readPayment:null
}

export const getters = {
    getCategories:(state)=> {
        return state.categories
    },
    getAlternative:(state)=> {
        return state.alternativeProducts
    },
    getCartLength:(state)=> {
        return state.cart.length
    },
    getCurrentCategories:(state)=> {
        return state.currentCategory
    },
    getCurrentBrand:(state)=> {
        return state.currentBrand
    },
    getBrands:(state) => {
        return state.brands
    },
    getDeliveryStats:(state) => {
        return state.deliveryStats
    }
}

export const mutations = {
    updateCategories:(state, payload) => {
      state.categories = payload
    },
    updateReadPayment:(state, payload) => {
      state.readPayment = payload
    },
    updateBaseOnPreviousSelections:(state, payload) => {
      state.baseOnPreviousSelections = payload
    },
    updateAlternativeProducts:(state, payload) => {
      state.alternativeProducts = payload
    },
    updateDeliveryStats:(state, payload) => {
      state.deliveryStats = payload
    },
    updateDeletingCartLoading:(state, payload) => {
      state.deletingCartLoading = payload
    },
    updateUserDeliveryChoice:(state, payload) => {
      state.userDeliveryChoice = payload
    },

    updateShowChangeAddressModal:(state, payload) => {
      state.showChangeAddressModal = payload
    },

    updateIsNewlyAdded:(state,payload) => {
        state.isNewlyAdded = payload
    },

    updateLoadingSubscription:(state, payload) => {
        state.loadingSubscription = payload
    },

    updateFilterIsLoading:(state, payload) => {
        state.filterIsLoading = payload
    },

    updateNewlyAddedToCart:(state, payload) => {
        state.newlyAddedToCart = payload
    },

    updatePreCart:(state, payload) => {
        state.preCart = payload
    },

    updateCart:(state,payload) => {
      state.cart = payload
    },

    updateBrands:(state, payload) => {
      state.brands = payload
    },

    updateCategoryProducts:(state, payload) => {
      state.categoryProducts = payload
    },

    updateBrandProducts:(state, payload) => {
      state.brandProducts = payload
    },

    updateLoading:(state, payload) => {
      state.loading = payload
    },

    updateLoadingCategoryProduct:(state, payload) => {
      state.loadingCategoryProduct = payload
    },

    updateCurrentCategory:(state, payload) => {
      state.currentCategory = payload
    },

    updateCurrentBrand:(state, payload) => {
      state.currentBrand = payload
    },

    updateLoadingBrandProduct:(state, payload) => {
      state.loadingBrandProduct = payload
    },

    updateLoadingForCart:(state, payload) => {
      state.loadingForCart = payload
    },

    updateFilterProduct:(state, payload) => {
      state.filterProduct = payload
    }

}

export const actions = {

  readCategories:({commit,state}) => {
    if(state.categories?.length < 1)commit("updateLoading", true)
    return AppService.readCategories().then((response) => {
        commit("updateLoading", false)
        let responseData = response.data
        commit("updateCategories", responseData)
        commit("updateCurrentCategory", responseData?.data[0]?.categoryName)
    })
  },

  readProductsByCategoryId:({commit},payload=AppRequest.readCategoryProduct) => {
    commit("updateLoadingCategoryProduct", true)
    return AppService.readProductsByCategoryId(payload).then((response) => {
        commit("updateLoadingCategoryProduct", false)
        let responseData = response.data
        commit("updateCategoryProducts", responseData)
    })
  },

  readProductByBrandId:({commit},payload=AppRequest.readBrandProduct) => {
    commit("updateLoadingBrandProduct", true)
    return AppService.readProductsByBrandId(payload).then((response) => {
        commit("updateLoadingBrandProduct", false)
        let responseData = response.data
        commit("updateBrandProducts", responseData)
    })
  },

  readBrands:({commit,state}) => {
    if(state.brands?.length < 1)commit("updateLoading", true)
    return AppService.readBrands().then((response) => {
        commit("updateLoading", false)
        let responseData = response.data
        commit("updateBrands", responseData)
        commit("updateCurrentBrand", responseData?.data[0]?.brandName)

    })
  },

  readCustomerCart:({commit,state},payload=AppRequest.readCart) => {
      payload.cartCustomerId = localStorage?.customerId
      if(state.cart?.length < 1)commit("updateLoading", true)
      return AppService.readCart(payload).then(response => {
          commit("updateLoading", false)
          let responseData = response.data
          if(responseData.responseCode === 200){
              commit("updateCart",responseData.data)
          }
      })
  },

  createSubscription:({commit},payload = AppRequest.createSubscription) => {
      commit("updateLoadingSubscription", true)
      return AppService.subscription(payload).then(response => {
          commit("updateLoadingSubscription", false)
          let responseData = response.data
          if(responseData.responseCode === 200){
              Toast.fire({icon:"success", text:responseData.responseMessage})
          }else{
              Toast.fire({icon:"error", text:responseData.responseMessage})
          }
      }).catch(e => {
          Toast.fire({icon:"error", text:e})
      })

  },

  addToCart:({commit}, payload = AppRequest.createCart) => {
      payload.cartCustomerId = localStorage.customerId
      payload.cartProductId = localStorage.productId
      commit("updateLoadingForCart",true)
      return AppService.addToCart(payload).then(response => {
          commit("updateLoadingForCart",false)
          let responseData =  response.data
          if(responseData.responseCode === 200){
              commit("updateNewlyAddedToCart",responseData.data)
              commit("updateIsNewlyAdded",responseData.responseMessage)
              StoreUtils.dispatch(StoreUtils.actions.app.readCustomerCart).then()
          }else if(responseData.responseCode === 300){
              router.push({path:'/user/login'}).then()
          }else{
              Toast.fire({text:responseData.responseMessage, icon:'error'})
          }
      })

  },

  updateCart:({commit}, payload = AppRequest.createCart) => {
      payload.cartCustomerId = localStorage.customerId
      payload.cartProductId = localStorage.productId
      commit("updateLoadingForCart",true)
      return AppService.updateCart(payload).then(response => {
          commit("updateLoadingForCart",false)
          let responseData =  response.data
          if(responseData.responseCode === 200){
              commit("updateNewlyAddedToCart",responseData.data)
              StoreUtils.dispatch(StoreUtils.actions.app.readCustomerCart).then()
          }
      })

  },

  readProductById:({commit},payload = AppRequest.readProductById)  => {
      payload.productId = localStorage.productId
      commit("updateLoading", true)
      return AppService.readProductById(payload).then(response => {
        commit("updateLoading", false)
        let responseData = response.data
        if(responseData.responseCode === 200){
            commit("updatePreCart", responseData.data)}
      })
  },

  filterProduct:({commit},payload = AppRequest.filterProduct) => {
      commit("updateFilterIsLoading", true)
      return AppService.filterProductsByPrize(payload).then(response => {
          commit("updateFilterIsLoading", false)
          let responseData  = response.data
          if(responseData.responseCode === 200){
              commit("updateFilterProduct", responseData)
          }else{
              Toast.fire({text:responseData.responseMessage, icon:'error'})
          }
      }).catch(e => {
          commit("updateFilterIsLoading", false)
          Toast.fire({text:e, icon:'error'})
      })
  },

    readDeliveryStats:({commit}) => {
      return AppService.readDelivery().then(response => {
          let responseData = response.data
          if(responseData.responseCode === 200){
              commit("updateDeliveryStats", responseData.data)
          }
      })
    },

    deleteCartItem:({commit}, payload = AppRequest.deleteCart)  => {
      commit("updateDeletingCartLoading", true)
        return AppService.deleteCart(payload).then(response => {
            commit("updateDeletingCartLoading", false)
            let responseData =  response.data
            if (responseData.responseCode === "200"){
                Swal.fire({icon:'success',text:responseData.responseMessage}).then()
                StoreUtils.dispatch(StoreUtils.actions.app.readCustomerCart)
            }
        })
    },

    updateCustomer({commit},payload = AppRequest.updateCustomer) {
        commit("updateLoading", true)
        return AppService.updateCustomer(payload).then(response => {
            commit("updateLoading", false)
            let responseData = response.data
            if(responseData.responseCode === "200"){
                StoreUtils.dispatch(StoreUtils.actions.auth.readCustomerById).then()
                Toast.fire({text:responseData.responseMessage, icon:'success'}).then()
                StoreUtils.commit(StoreUtils.mutations.app.updateShowChangeAddressModal, false)
            }else{
                Toast.fire({text:responseData.responseMessage, icon:'error'}).then()
                StoreUtils.commit(StoreUtils.mutations.app.updateShowChangeAddressModal, false)
            }
        }).catch(e => {
            commit("updateLoading", false)
            Toast.fire({text:e, icon:'error'}).then()
            StoreUtils.commit(StoreUtils.mutations.app.updateShowChangeAddressModal, false)
        })
    },

    updateSelectedHistory:({commit,state},payload)=> {
      if(!state.baseOnPreviousSelections.map(item => item).includes(payload)) {
          let data = [...state.baseOnPreviousSelections, ...[payload]]
          commit("updateBaseOnPreviousSelections", data)
      }
    },

    readPaymentSystems:({commit})=>{
      return AppService.readPayment().then(response => {
          let responseData = response.data
          if(responseData.responseCode === 200){
              commit("updateReadPayment", responseData.data)
          }
      })
    },

    doPayment:({commit},payload =  AppRequest.orderRequest) => {
      commit("updateLoading", true)
      return AppService.callDoPaymentApi(payload).then(response => {
          commit("updateLoading", false)
          let responseData = response.data
          if(responseData.responseCode === "200"){
              Toast.fire({text:responseData.responseMessage, icon:'success'})
              StoreUtils.dispatch(StoreUtils.actions.app.readCustomerCart).then()
          }
      }).catch(e => {
          commit("updateLoading", false)
          Toast.fire({text:e, icon:'error'})
      })
    }

}





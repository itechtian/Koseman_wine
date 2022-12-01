<template>
    <div :style="{width:'100%',backgroundColor:INFRASTRUCTURE.colors.shade4}" class="description-wrapper">
      <add-address-modal />
      <div class="check-out-process">
        <div :style="{backgroundColor: INFRASTRUCTURE.colors.primary}">
          <div class="description-title" :style="width >= 800 ? {marginLeft:INFRASTRUCTURE.spacing.app_default,marginRight:INFRASTRUCTURE.spacing.app_default}:{marginLeft:0,marginRight:0}">
              <div class="progress-bar">
                <section>
                  <span class="progress-bar-number">1</span>
                  <span class="">Confirm Amount</span>
                </section>
                <section>
                  <span class="progress-bar-number">2</span>
                  <span class="progress-bar-indicator" id="blocker-2-text">Choose Delivery Address</span>
                </section>
                <section>
                  <span class="progress-bar-number">3</span>
                  <span class="progress-bar-indicator">Payment Method</span>
                </section>
                <section>
                  <span class="progress-bar-number">4</span>
                  <span class="progress-bar-indicator">Pay</span>
                </section>
              </div>
          </div>
        </div>
      </div>
      <div v-if="cartItem.length > 0" class="description-hero" :style="width >= 800 ? {marginLeft:INFRASTRUCTURE.spacing.app_default,marginRight:INFRASTRUCTURE.spacing.app_default}:{marginLeft:0,marginRight:0}">
        <div class="description-hero-inner">
            <div class="card-upper">
              <div class="card-upper-inner">
                <div class="card-area-1" v-for="i in cartItem" :key="i.cartId" >
                  <div class="card-area-items">
                    <spinner-loader v-if="deleting" color="black" />
                    <img v-if="!deleting" @click="deleteItem(i.cartId)" src="../../../assets/Hicon/Outline/Delete.svg" class="delete"/>
                    <img :src="i.products.productImage" width="20"/>
                    <span>{{i.products.productName}}</span>

                  </div>
                  <div class="card-area-items">
                    <div class="base-btn">
                      <span @click="decrease(i)">-</span>
                      <span>{{i.cartQuantity}}</span>
                      <span @click="increase(i)">+</span>
                    </div>
                  </div>
                  <div class="card-area-items">
                    <span>₦{{formatAmount(i.products.productOfferPrice)}}</span>
                    <span>₦{{formatAmount(i.cartTotalAmount)}}</span>
                  </div>
                </div>
                <div class="card-upper">
                  <!--              <div class="blocker-div"></div>-->
                  <div class="card-area-set-2">
                    <div class="card-area-1-head">
                      <span class="change-address-text">Address Details</span>
                      <span class="change-address" @click="showModal">{{user?.customerAddress ? 'Change Address' : 'Add Address'}}</span>
                    </div>
                    <hr />
                    <div class="card-area-1-head">
                      <div class="card-area-1-inner">
                        <span class="user-name">{{user?.customerFirstName}} {{user?.customerLastName}}</span>
                        <span class="no-existing-address" v-if="!user?.customerAddress">No  existing address</span>
                        <span class="address-info" v-else>{{user?.customerAddress}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-upper">
                  <!--              <div class="blocker-div"></div>-->
                  <div class="card-area-set-2">
                    <div class="card-area-1-head">
                      <div class="debit" @click="paymentType = 'card'">
                        <img :src="checked" v-if="paymentType === 'card'"/>
                        <img :src="unchecked" v-else/>
                        <span class="card-checked">Debit Card</span>
                      </div>
                      <div class="card" @click="paymentType = 'transfer'">
                        <img :src="checked" v-if="paymentType === 'transfer'"/>
                        <img :src="unchecked" v-else/>
                        <span class="card-unchecked">Bank Account</span>
                      </div>
                    </div>
                    <div class="card-area-1-head">
                      <div class="card-area-1-inner" style="margin-left: 20px">
                        <span class="user-name">You are to pay</span><br />
                        <span class="price-info">₦{{ formatAmount((cartItem.map(item => Number(item.cartTotalAmount)).reduce((a,b) => a + b) * 7.5)  / 100 + cartItem.map(item => Number(item.cartTotalAmount)).reduce((a,b) => a + b) + deliveryFee) }}</span>
                      </div>
                      <img src="../../../assets/debit-card.svg" style="position: relative;right:0" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-area-2">
                 <div class="card-area-header" :style="{backgroundColor:INFRASTRUCTURE.colors.shade5,color:INFRASTRUCTURE.colors.primary,height:'57px'}">
                   <img src="../../../assets/basket.png" style="margin-left: 10px" />
                   <span>Cart Summary</span>
                 </div>
                 <div class="card-area-2-inner">
                  <section class="item-info">
                    <span>Subtotal</span>
                    <span>₦{{formatAmount(cartItem.map(item => Number(item.cartTotalAmount)).reduce((a,b) => a + b))}}</span>
                  </section>
                  <hr />
                  <section class="item-info">
                    <span>VAT (7.5)</span>
                    <span>7.5%</span>
                  </section>
                  <hr />
                  <section class="item-info">
                    <span>Delivery Fee</span>
                    <span>{{ formatAmount(deliveryFee) }}</span>
                  </section>
                  <hr />
                  <section class="item-info">
                    <span>Total</span>
                    <span>₦{{formatAmount((cartItem.map(item => Number(item.cartTotalAmount)).reduce((a,b) => a + b) * 7.5)  / 100 + cartItem.map(item => Number(item.cartTotalAmount)).reduce((a,b) => a + b) + deliveryFee)}}</span>
                  </section>
                  <hr />
                 <div style="text-align: right">
                    <base-button text="Make Payment" width="128px" @click="makePayment" />
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
      <div v-else class="description-hero" :style="width >= 800 ? {marginLeft:INFRASTRUCTURE.spacing.app_default,marginRight:INFRASTRUCTURE.spacing.app_default}:{marginLeft:0,marginRight:0}">
        <div class="description-hero-inner">
            <div class="card-upper" style="display: flex;justify-content: center">
              <h3>You have no products in your basket</h3>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import INFRASTRUCTURE from "../../../infrastruture";
import router from "../../../router";
import BaseButton from "../../../components/buttons/BaseButton";
import unchecked from "../../../assets/unchecked.svg"
import checked from "../../../assets/checked.svg"
import AddAddressModal from "../../../components/modals/AddAddressModal";
import {mapState} from "vuex";
import StoreUtils from "../../../utils/baseUtils/StoreUtils";
import {formatAmount} from "../../../functionComponents";
import AppRequest from "../../../model/request/appRequest";
import { BPG } from 'bizgem-sdk-node';
import logo from "../../../assets/logo.svg"
import Swal from "sweetalert2";
import spinnerLoader from "../../../components/loader/spinnerLoader";
// import PaystackPop from '@paystack/inline-js';
// import axios from "axios";

export default {
  name: "CheckOutView",
  components: {BaseButton,AddAddressModal,spinnerLoader},
  setup(){
    const width = innerWidth
    return{INFRASTRUCTURE,width,unchecked,checked,formatAmount}
  },
  data(){
    return{
      number:1,
      paymentType:'card',
      model:AppRequest,

    }
  },
  methods:{
    proceedToCheckOut(){
      router.push({name:"CHECKOUT"})
    },

    generateUUID() {
      let d = new Date().getTime();
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c) {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c==='x' ? r : (r&0x7|0x8)).toString(16);
      });
      return 'BZIGEM-'+uuid.toUpperCase();
    },

     makePayment(){
      if(this.user.customerAddress){
        if(this.paymentType === 'transfer'){
          this.payWithBankTransfer()
        }else{
          if(this.deliveryFee){this.payWithPaystack()}
          else{
            Swal.fire({text:"Please Select a Delivery Region", icon:'info'}).then(() => {
              StoreUtils.dispatch(StoreUtils.actions.app.readDeliveryStats)
              StoreUtils.commit(StoreUtils.mutations.app.updateShowChangeAddressModal, true)
            })
          }
        }
      }else{
        Swal.fire({text:"Please fill in your delivery details", icon:'info'})
      }

    },

    deleteItem(value){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.model.deleteCart.cartId = value
          StoreUtils.dispatch(StoreUtils.actions.app.deleteCartItem, this.model.deleteCart)
        }
      })

    },
     payWithPaystack() {
         this.model.payStackRequest.amount = ((this.cartItem.map(item => Number(item.cartTotalAmount)).reduce((a,b) => a + b) * 7.5)  / 100 + this.cartItem.map(item => Number(item.cartTotalAmount)).reduce((a,b) => a + b) + this.deliveryFee) * 100,
         this.model.payStackRequest.ref = this.generateUUID()
         this.model.payStackRequest.key = "pk_test_4ea52275496f327bc1ab4678d6021e94bc3b731e"
         this.model.payStackRequest.email = this.user.customerEmail
         this.model.payStackRequest.currency = "NGN"
         StoreUtils.dispatch(StoreUtils.actions.payStack.payWithPaystack, this.model.payStackRequest)
     },

    proceedPayment(){
      this.model.orderRequest.orderCustomerId = localStorage.customerId
      this.model.orderRequest.orderReference = this.reference
      this.model.orderRequest.orderDetailsEmail = this.user.customerEmail
      this.model.orderRequest.orderDetailsAddress = this.user.customerAddress
      this.model.orderRequest.orderDetailsFirstName = this.user.customerFirstName
      this.model.orderRequest.orderDetailsLastName = this.user.customerLastName
      this.model.orderRequest.orderDetailsPhone = this.user.customerPhoneNo
      this.model.orderRequest.orderSubTotalAmount = this.cartItem.map(item => Number(item.cartTotalAmount)).reduce((a,b) => a + b)
      this.model.orderRequest.orderTotalAmount = (this.cartItem.map(item => Number(item.cartTotalAmount)).reduce((a,b) => a + b) * 7.5)  / 100 + this.cartItem.map(item => Number(item.cartTotalAmount)).reduce((a,b) => a + b) + this.deliveryFee
      this.model.orderRequest.orderDetailsState = this.user.customerState
      this.model.orderRequest.orderPaymentSystemId = 2
      this.model.orderRequest.orderDeliveryId = 1
      StoreUtils.dispatch(StoreUtils.actions.app.doPayment, this.model.orderRequest)
    },


    payWithBankTransfer() {
          BPG.pay({
            publicKey: "PK-00000000080000000008-PROD-MJQYNZA0NYWNDG1MDAWTE2B8DD930D4C791A44CD5E04D2133755268485D2035F6E27F1F0FDAF292CDD86", //(required) your public key, this is gotten from dashboard
            fullName: this.user.customerFirstName, //(required) name of the person paying
            email: this.user.customerEmail, //(required) email of the person paying
            phoneNumber: this.user.customerPhoneNo, //(required) phone number of the person paying
            amount:1000,
            narration: "KosMan Wine Payment By Bank Transfer",//(required) description of the transaction
            reference: this.generateUUID(), //(optional) unique transaction identifier
            logo: logo, // (optional) logo url
            redirectUrl: "https://kosemanwine.com", // (optional) when the value is null it assumes the current url
            onCancel: this.onCancel, // (optional) the function to be triggered on a cancelled transaction
            onSuccess: this.onSuccess, // (optional) the function to be triggered on a successful transaction
            onFailure: this.onFailure // (optional) the function to be triggered on a failed transaction
          })
        },

        onFailure(data) {
          Swal.fire({text:data.responseMessage, icon:'error'})
        },

    showModal(){
        StoreUtils.commit(StoreUtils.mutations.app.updateShowChangeAddressModal, true)
        StoreUtils.dispatch(StoreUtils.actions.app.readDeliveryStats)
      },

    increase(obj){
      this.model.updateCart.cartId = obj.cartId
      this.model.updateCart.cartQuantity = Number(obj.cartQuantity) + 1
      StoreUtils.dispatch(StoreUtils.actions.app.updateCart, this.model.updateCart)
    },
    decrease(obj){
      this.model.updateCart.cartId = obj.cartId
      this.model.updateCart.cartQuantity = Number(obj.cartQuantity) - 1
      StoreUtils.dispatch(StoreUtils.actions.app.updateCart, this.model.updateCart)

    },
  },
  computed:{
    ...mapState({
      cartItem: state => state.app.cart,
      user:state => state.auth.user,
      newlyAdded:state => JSON.parse(JSON.stringify(state.app.newlyAddedToCart)),
      loading:state => state.app.loadingForCart,
      deliveryFee:state => state.app.userDeliveryChoice,
      deleting:state => state.app.deletingCartLoading,
      paymentSystem:state => state.app.readPayment,
      reference: state => state.payStack.reference
    }),

    totalAmount(){
      return formatAmount((this.cartItem.map(item => Number(item.cartTotalAmount)).reduce((a,b) => a + b) * 7.5)  / 100 + this.cartItem.map(item => Number(item.cartTotalAmount)).reduce((a,b) => a + b) + this.deliveryFee) * 100
    }
  },

  watch:{
    'reference'(){
        this.proceedPayment()
    }
  },
  mounted() {
    StoreUtils.dispatch(StoreUtils.actions.app.readPaymentSystems)
  }
}
</script>

<style scoped>
.description-wrapper{
  padding-bottom: 1%;
}
.price-info{
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  text-align: right;
  color: #403377;
}
.user-name{
  font-weight: 700;
  font-size: 18px;
  line-height: 29px;
  color: #000000;
}
.check-out-process{
  position: sticky;
  top: 0;
  z-index: 50;
}

.delete{
  cursor: pointer;
}

.delete:hover{
  transition: .5s ease;
  transform: scaleY(1.2);
}

.card-area-set-2-inner{
  width: 100%;
  border: solid;
  margin-left: 50px;
}

.change-address-text{
  color: #000000;
  font-weight: 500;
  font-size: 25px;
  padding-left: 50px;
}
.change-address{
  color: #A22C4D;
  font-size: 25px;
  font-weight: 800;
  padding-right: 50px;
  cursor: pointer;
}
.progress-bar-indicator{
  color: #000000;
}
.card-upper-inner{
  width: 65%;
  /*border: solid;*/
}
.progress-bar{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 85px;
}

.button-area{
  margin-top: 30px;
  margin-bottom: 30px;
  width:100%;
  text-align: right;
}

.description-hero-inner{
  height: auto;
}


.no-existing-address{
  font-size: 18px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  color: #B70F21;
  margin-bottom: 20px;
  cursor: pointer;
}
.debit{
  width: 50%;
  height: 66px;
  background: #403377;
  border-radius: 9px;
  display: flex;
  align-items: center;
  margin-left:20px;
  margin-top:20px;
  padding-left: 10px;
  gap: 10px;
  color: #FFFFFF;
}
.card{
  width: 50%;
  background: #F5F6F8;
  border-radius: 9px;
  padding-left: 10px;
  height: 66px;
  display: flex;
  align-items: center;
  margin-right:20px;
  margin-top:20px;
  color: #000000;
  gap: 10px;

}

.card-area-1-head{
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.card-area-2-inner{
  margin: 5%;
}

.card-area-1-inner{
  text-align: left;
  width: 100%;
  margin-left: 50px;
}

.card-area-2-inner section {
  margin-bottom: 20px;
}

.item-info{
  display: flex;
  justify-content: space-between;
}

.card-area-header{
  display: flex;
  align-items: center;
  gap: 20px;
}

.base-btn{
  height: 42px;
  width: 50%;
  border-radius: 100px;
  border: 1px solid #000000;
  background: transparent;
  display: flex;
  justify-content: space-around;
  align-items: center;

}

.card-area-items{
  display: flex;
  align-items: center;
  width: 100%;
  gap: 30px;
}

.card-upper{
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 5%;
}

.blocker-div{
  background: rgba(245, 246, 248, 0.58);
  position: absolute;
  width: 100%;
  height: 200px;
  top: 0;
}

.address-info{
  font-weight: 700;
  font-size: 18px;
  line-height: 29px;
  /* identical to box height */
  display: flex;
  align-items: center;
  color: #7F7F7F;
  margin-bottom: 20px;

}


.card-area-1{
  background: #FFFFFF;
  height: 70px;
  display: flex;
  width: 100%;
  /*margin-left: 1%;*/
  margin-bottom: 1%;
  /*padding: 1%;*/
  /*box-shadow: 0px 21.0867px 42.1733px -7.02889px rgba(39, 76, 119, 0.16);*/
  border-radius: 17px;
  /*margin: 10px;*/
}
.card-area-set-2{
  background: #FFFFFF;
  height: auto;
  width:  100%;
  justify-content: center;
  border: 1px solid #D9D9D9;
  align-items: center;
  flex-direction: column;
  /*box-shadow: 0px 21.0867px 42.1733px -7.02889px rgba(39, 76, 119, 0.16);*/
  border-radius: 17px;
}
.card-area-2{
  background: #FFFFFF;
  height: auto;
  width: 30%;
  border: 1px solid #D9D9D9;
  /*box-shadow: 0px 21.0867px 42.1733px -7.02889px rgba(39, 76, 119, 0.16);*/
  border-radius: 17px;
  position: sticky;
  top: 220px;
}

.progress-bar > section{
  width: auto;
  display: flex;
  gap: 10px;
  align-items: center;


}

.progress-bar-number{
  background: #403377;
  border: 3px solid #403377;
  color: #FFFFFF;
  border-radius: 6px;
  padding: 5px;
  width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blocker-unActive{
  background: #E5E5E5;
  border: 3px solid #E5E5E5;
}

@media (max-width:999px) {
  .card-upper{
    flex-direction: column;
  }
  .card-upper-inner{
    width: 100%;
  }
  .card-area-2{
    width: 100%;
  }
  .card-area-1-head{
   flex-direction: column;
  }

  .progress-bar{
    overflow: scroll;
    width: 700px;
    border: sienna solid;

  }


  .debit{
    width: 100%;
  }
  .card{
    width: 100%;
  }


}
</style>
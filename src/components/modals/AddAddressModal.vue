<template>
  <div class="modal-1" v-if="isShowing">
   <div class="card animate__animated animate__bounceIn">
     <div class="card-head">
       <h4 class="card-header-h">Fill in delivery details</h4>
     </div>
     <div class="close-area" :style="{background:INFRASTRUCTURE.colors.shade2_dim}">
       <div class="close-area-div">
         <img src="../../assets/info.svg" />
         <span class="close-area-span">All deliveries out of state would be wholesale only</span>
       </div>
       <img src="../../assets/close.svg" @click="close"/>
     </div>
     <hr/>
     <form class="form" @submit.prevent="updateUser" id="form">
      <div class="form-input-group">
        <div class="form-input-div">
          <label>First Name</label>
          <input class="form-input" placeholder="first name" id="customerFirstName" :value="user.customerFirstName" required/>
        </div>
        <div class="form-input-div">
          <label>Last Name</label>
          <input class="form-input"  placeholder="last name" id="customerLastName" :value="user.customerLastName" required/>
        </div>
      </div>
      <div class="form-input-group">
        <div class="form-input-div">
          <label>Phone Number</label>
          <input class="form-input" placeholder="phone number" id="customerPhoneNo" :value="user.customerPhoneNo" required/>
        </div>
        <div class="form-input-div">
          <label>Email Address</label>
          <input class="form-input" placeholder="email address" id="customerEmail" :value="user.customerEmail" required/>
        </div>
      </div>
      <div class="form-input-no_group">
        <div class="form-input-div-lg">
          <label>State Region</label>
          <select class="form-input-lg" id="address" @change="selectChoice" required>
            <option value="0">Please Select</option>
            <option  v-for="(i,index) in deliveryState" :key="index" :value="i.deliveryState + ' ' + i.deliveryFee">{{i.deliveryState}}</option>
          </select>
        </div>
      </div>
      <div class="form-input-no_group">
        <div class="form-input-div-lg">
          <label>Delivery Address</label>
          <input required type="text" class="form-input-lg" placeholder="Street Name/Apartment No." id="customerAddress" :value="user.customerAddress" />
        </div>
      </div>
      <div class="btn-area">
        <base-button text="Add Address" width="221px"  :loading="loading"/>
      </div>
     </form>
   </div>
  </div>
</template>

<script>
import INFRASTRUCTURE from "../../infrastruture";
import BaseButton from "../buttons/BaseButton";
import {mapState} from "vuex";
import StoreUtils from "../../utils/baseUtils/StoreUtils";
import AppRequest from "../../model/request/appRequest";
import Swal from "sweetalert2";
export default {
  name: "AddAddressModal",
  setup(){
    return {INFRASTRUCTURE}
  },
  data(){
    return{
      model:AppRequest.updateCustomer
    }
  },
  components:{
    BaseButton
  },
  methods:{
    close(){
      StoreUtils.commit(StoreUtils.mutations.app.updateShowChangeAddressModal, false)
    },
    updateUser(){
      let selectOpt = document.getElementById('address')
      let option = selectOpt.options[selectOpt.selectedIndex]
      this.model.customerState = option.value?.split(' ')[0]
      const form = document.getElementById('form')
      const form_input = form.querySelectorAll('input')
      for(let i = 0; i < form_input.length; i++){
        [this.model].map((item) => {Object.keys(item).forEach(key => {if(key === form_input[i].id){item[key] = form_input[i].value}})})
      }
      if(this.model.customerState === "0"){
        Swal.fire({
          text:"Please select your state",
          icon:"info"
        })
      }else{
        StoreUtils.dispatch(StoreUtils.actions.app.updateCustomer, this.model)
      }

    },
    selectChoice(){
      let selectOpt = document.getElementById('address')
      let option = selectOpt.options[selectOpt.selectedIndex]
      StoreUtils.commit(StoreUtils.mutations.app.updateUserDeliveryChoice, Number(option.value?.split(' ')[1]))
    }
  },
  computed:{
    ...mapState({
      isShowing:state => state.app.showChangeAddressModal,
      deliveryState: state => state.app.deliveryStats,
      user:state => state.auth.user,
      loading:state => state.app.loading

    })
  }
}
</script>

<style scoped>
.card-head{
  margin-left: 50px;
}
.form{
  margin: 20px;
}
.form-input-div{
  width: 50%;
}

.form-input-div-lg{
  width: 100%;
}

.close-area-span{
  font-weight: 400;
  font-size: 18px;
  line-height: 50px;
  /* or 250% */

  letter-spacing: -0.02em;

  color: #FFFFFF;

}

.close-area{
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
}
label{
  margin-bottom: 15px;
}
.close-area-div{
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: 50px;
}

.modal-1{
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.48);
  z-index: 1000;
  position: fixed;
  top: 0;
  display: flex;
  align-items: start;
  justify-content: center;
}

.form-input-group{
  display: flex;
  gap: 50px;
  margin: 20px;
}

.form-input-no_group{margin: 20px;}

.card-header-h{
  font-weight: 500;
  font-size: 22px;
  line-height: 38px;
  display: flex;
  align-items: center;
  color: #000000;
}

.card{
  background: #FFFFFF;
  width: 60%;
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  box-shadow: 0px 21.0867px 42.1733px -7.02889px rgba(39, 76, 119, 0.16);
  border-radius: 17px;
  margin:5% auto;
}

.form-input{
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.25);
  /*filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));*/
  border-radius: 10px;
  width: 100%;
  height: 50px;
  padding: 5px;
}

.form-input-lg{
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.25);
  /*filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));*/
  border-radius: 10px;
  width: 100%;
  height: 50px;
  padding: 5px;

}

.btn-area{margin: 20px;text-align: right;}

::placeholder{
   padding:5px
}
</style>
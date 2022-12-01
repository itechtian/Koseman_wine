<template>
  <div class="form-wrapper">
    <div>
      <img src="../../assets/logo2.svg" />
    </div>
    <span class="sign-up">Sign Up</span>
    <form v-if="currentScreen === 'screen1'" @submit.prevent="doInitiateEnrollment">
      <div class="form-input-group">
        <div>
          <label>First Name</label><br />
          <input type="text" required class="form-input-short" placeholder="" v-model="initiateEnrollmentModel.customerFirstName" />
        </div>
        <div>
          <label>Last Name</label><br />
          <input type="text" required class="form-input-short" v-model="initiateEnrollmentModel.customerLastName"  placeholder=""/>
        </div>
        <div >
          <label>Email Address</label><br />
          <input type="email" required class="form-input-short" v-model="initiateEnrollmentModel.customerEmail" placeholder="" />
        </div>
        <div>
          <label>Phone No</label><br />
          <input type="tel" required  class="form-input-short" v-model="initiateEnrollmentModel.customerPhoneNo" placeholder="01 567 xxxx"/>
        </div>
      </div>
      <div>
        <div>
          <label>Password</label><br />
          <input type="password" required v-model="initiateEnrollmentModel.customerPassword" autocomplete="off" class="form-input-long"  placeholder="xxxxxxxxxxxxxxxxxxxxxx"/>
        </div>
      </div>
      <div>
        <div>
          <label>Confirm Password</label><br />
          <input type="password" required v-model="initiateEnrollmentModel.customerPassword_confirmation" autocomplete="off" class="form-input-long" placeholder="xxxxxxxxxxxxxxxxxxxxxx"/>
        </div>
      </div>
      <div style="text-align: center">
        <base-button text="sign up" width="200px" :loading="loading"/>
      </div>
    </form>
    <form v-if="currentScreen === 'screen2'" @submit.prevent="completeEnrollment">
      <div>
        <div style="position:relative;">
          <label>OTP</label><br />
          <input maxlength="6" type="tel" autocomplete="off" class="form-input-long"  v-model="completeEnrollmentModel.customerOtp"/>
          <button class="otp" type="button" @click="resendOtp" :disabled="otpLoading">re-send <spinner-loader  v-if="otpLoading"/></button>
        </div>
      </div>
      <div style="text-align: center">
        <base-button text="complete Enrollment" width="200px" :loading="loading"/>
      </div>
    </form>


    <p>Proceed to <a href="/user/login">Login</a></p>
  </div>
</template>

<script>
import BaseButton from "../buttons/BaseButton";
import AuthRequest from "../../model/request/authRequest";
import {mapState} from "vuex";
import StoreUtils from "../../utils/baseUtils/StoreUtils";
import spinnerLoader from "../loader/spinnerLoader";

export default {
  name: "SignUpForm",
  components:{
    BaseButton,
    spinnerLoader
  },
  data(){
    return{
      initiateEnrollmentModel:AuthRequest.initiateEnrollment,
      completeEnrollmentModel:AuthRequest.completeEnrollment
    }
  },

  methods:{
    doInitiateEnrollment(){
      StoreUtils.dispatch(StoreUtils.actions.auth.initiateEnrollment, this.initiateEnrollmentModel)
    },
    completeEnrollment(){
      this.completeEnrollmentModel.customerEmail = this.initiateEnrollmentModel.customerEmail
      StoreUtils.dispatch(StoreUtils.actions.auth.completeEnrollment,this.completeEnrollmentModel)
    },
    resendOtp(){
      this.completeEnrollmentModel.customerEmail = this.initiateEnrollmentModel.customerEmail
      StoreUtils.dispatch(StoreUtils.actions.auth.sendOTP)
    }
  },
  computed:{
    ...mapState({
      loading:state => state.auth.loading,
      currentScreen:state => state.auth.screen,
      otpLoading:state => state.auth.isOTP
    })
  }
}
</script>

<style scoped>

.form-input-group{
  display: grid;
  grid-template-columns: repeat(2,2fr);
  /*margin-bottom: 40px;*/
  gap: 20px;
  width: 100%;
}

.otp{
  position:absolute;
  border-radius: 5px;
  background:#A22C4D;
  color: #FFFFFF;
  cursor: pointer;
  padding: 1%;
  right: 23px;
  top: 33px;
}

.form-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: auto;
  margin-bottom: 10%;
}

.sign-up{
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #0D1E32;
}

.form-input-short{
  height: 48px;
  width: 200px;
  border: none;
  border-bottom: solid;
  margin-bottom: 15px;
}
.form-input-long{
  height: 48px;
  width: 408px;
  border: none;
  border-bottom: solid;
  margin-bottom: 15px;

}

.form-input-short:focus{
  outline: none;
}
.form-input-long:focus{
  outline: none;
}

@media (max-width: 990px) {
  .form-wrapper{
    width: 100%;
    display: block;
    text-align: center;
  }

  .otp{
    right: 0;
    top: 45px;
  }
  .form-input-group{
    display: flex !important;
    /*margin-bottom: 40px;*/
    flex-direction: column;
    width: 100%;
  }
  label{
    display: flex;
    text-align: left;
  }

  form{
    padding: 2%;
  }

  .form-input-short{
    height: 48px;
    width: 100%;
    border: none;
    border-bottom: solid;
    margin-bottom: 15px;
  }
  .form-input-long{
    height: 48px;
    width: 100%;
    border: none;
    border-bottom: solid;
    margin-bottom: 15px;

  }

}

</style>
<template>
  <div class="form-wrapper">
    <div>
      <img src="../../assets/logo2.svg" />
    </div>
    <span class="sign-up">Login</span>
    <form @submit.prevent="login">
      <div>
        <div>
          <label>Email Address</label><br />
          <input type="email" required autocomplete="off" class="form-input-long" v-model="model.customerEmail"  placeholder=""/>
        </div>
      </div>
      <div>
        <div>
          <label>Password</label><br />
          <input required type="password" v-model="model.customerPassword" autocomplete="off" class="form-input-long" placeholder="xxxxxxxxx"/>
        </div>
      </div>
      <div style="text-align: center">
        <base-button text="Log in" width="200px"  :loading="loading"/>
      </div>
    </form>
    <p>Proceed to <a href="/user/signup">Sign up</a></p>

  </div>
</template>

<script>
import BaseButton from "../buttons/BaseButton";
import AuthRequest from "../../model/request/authRequest";
import StoreUtils from "../../utils/baseUtils/StoreUtils";
import {mapState} from "vuex";
export default {
  name: "LogInForm",
  components:{
    BaseButton
  },
  data(){
    return{
      model:AuthRequest.login
    }
  },
  methods:{
    login(){
      StoreUtils.dispatch(StoreUtils.actions.auth.login, this.model)
    }
  },
  computed:{
    ...mapState({
      loading:state => state.auth.loading
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

.form-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-height: 100vh;
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
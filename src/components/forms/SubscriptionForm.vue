<template>
 <div>
   <form class="subscription-form" @submit.prevent="doSubscription">
     <div>
       <input v-model="model.subscriptionCustomerEmail" type="email" class="subscription-input" placeholder="Type your email address" required />
     </div>
     <div>
      <subscription-button  text="Join Us" :loading="loading"/>
     </div>
   </form>
 </div>
</template>

<script>
import SubscriptionButton from "../buttons/SubscriptionButton";
import AppRequest from "../../model/request/appRequest";
import StoreUtils from "../../utils/baseUtils/StoreUtils";
import {mapState} from "vuex";
export default {
  name: "SubscriptionForm",
  components:{SubscriptionButton},
  data(){
    return{
      model:AppRequest.createSubscription
    }
  },
  methods:{
    doSubscription(){
      StoreUtils.dispatch(StoreUtils.actions.app.createSubscription, this.model)
    }
  },
  computed:{
    ...mapState({
      loading:state => state.app.loadingSubscription
    })
  }
}
</script>

<style scoped>
.subscription-input{
  width: 484px;
  height: 46px;
  padding-left: 9px;
  outline: none;
}
.subscription-form{
  display: flex;
  gap: 21px;
  z-index: 90000000;
}


::placeholder{
  font-size: 16px;
  line-height: 26px;
  color: #B3B3B3;
  padding: 9px;
}

@media (max-width: 999px) {
  .subscription-form{
    display: flex;
    flex-direction: column;
    gap: 21px;
    z-index: 90000000;
  }
  .subscription-input{
    width: 100%;
    height: 46px;
    padding-left: 0;
    outline: none;
  }
}
</style>
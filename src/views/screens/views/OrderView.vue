<template>
  <div>
    <div class="order-wrapper" :style="width >= 800 ? {marginLeft:INFRASTRUCTURE.spacing.app_default,marginRight:INFRASTRUCTURE.spacing.app_default}:{marginLeft:0,marginRight:0}">
      <div>
        <h5 class="order">Order Summary</h5>
      </div>
      <div class="order-nav">
        <section @click="activeNav = 'open_orders'" class="nav" :style="activeNav == 'open_orders' ? {borderBottom:'solid',borderBottomColor:INFRASTRUCTURE.colors.shade1}:null"><span>Open Orders (0)</span></section>
        <section @click="activeNav = 'cancelled_orders'" class="nav" :style="activeNav == 'cancelled_orders' ? {borderBottom:'solid',borderBottomColor:INFRASTRUCTURE.colors.shade1}:null"><span>Cancelled Orders (0)</span></section>
      </div>
      <div class="no_orders" v-if="activeNav == 'open_orders'">
        <p>No Open Orders Made</p>
      </div>
      <div class="no_orders" v-else>
        <p>No Cancelled Orders Made</p>
      </div>
    </div>

  </div>
</template>

<script>
import INFRASTRUCTURE from "../../../infrastruture";
import unchecked from "../../../assets/unchecked.svg";
import checked from "../../../assets/checked.svg";
import {formatAmount} from "../../../functionComponents";

export default {
  name: "OrderView",
  data(){
    return{
      activeNav:'open_orders'
    }
  },
  setup(){
    const width = innerWidth
    return{INFRASTRUCTURE,width,unchecked,checked,formatAmount}
  },
}
</script>

<style scoped>
.order-wrapper{
  /*border: 1px solid #D9D9D9;*/
  /*box-shadow: 0px 43px 86px -15px rgba(39, 76, 119, 0.16);*/
  border-radius: 36px;
  height: auto;
  margin: 2%;
}

.order-nav{
  border-top:solid #D9D9D9;
  border-bottom:solid #D9D9D9;
  display: flex;
  gap: 63px;
  padding-top: 2%;
  /*padding-left: 2%;*/
  cursor: pointer}

.order{
  font-weight: 800;
  font-size: 18px;
  /*line-height: 29px;*/
}

.nav{
padding-bottom: 1%;
}

.no_orders{
  height: 20vh;
  margin: 2%;
  text-align: center;
}
</style>
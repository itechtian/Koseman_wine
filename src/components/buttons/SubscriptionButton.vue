<template>
 <div>
   <button class="btn">{{text}} <spinner-loader v-if="loading" /></button>
 </div>
</template>

<script>
import spinnerLoader from "../loader/spinnerLoader";

export default {
  name: "SubscriptionButton",
  components:{spinnerLoader},
  props:['text', 'loading']
}
</script>

<style scoped>
.btn{
  width: 172px;
  height: 47px;
  border: 3px solid #FFFFFF;
  border-radius: 100px;
  box-sizing: border-box;
  background: transparent;
  color:#FFFFFF;
  cursor: pointer;
}
</style>
<template>
  <div>
    <button :disabled="loading" class="base-btn" :style="{backgroundColor:INFRASTRUCTURE.colors.shade2,width:width}">{{text}}  <spinner-loader v-if="loading" /></button>
  </div>
</template>

<script>
import INFRASTRUCTURE from "../../infrastruture";
import spinnerLoader from "../loader/spinnerLoader";
export default {
  name: "BaseButton",
  props:['text','width','loading'],
  components:{spinnerLoader},
  setup(){
    return {INFRASTRUCTURE}
  }
}
</script>

<style scoped>
.base-btn{
  height: 42.67px;
  border-radius: 100px;
  color: #FFFFFF;
  border: none;

}
</style>
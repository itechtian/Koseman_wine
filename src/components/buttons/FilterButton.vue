<template>
  <div>
    <button v-if="loading" class="filter-btn" :style="{backgroundColor:INFRASTRUCTURE.colors.shade1}"><spinner-loader  /></button>
    <button  v-else class="filter-btn" :style="{backgroundColor:INFRASTRUCTURE.colors.shade1}">{{text}}</button>
  </div>
</template>

<script>
import INFRASTRUCTURE from "../../infrastruture";
import spinnerLoader from "../loader/spinnerLoader";

export default {
  name: "FilterButton",
  props:['text','loading'],
  components:{spinnerLoader},
  setup(){
    return{INFRASTRUCTURE}
  }
}
</script>

<style scoped>
.filter-btn{
  width: 50px;
  height: 31px;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
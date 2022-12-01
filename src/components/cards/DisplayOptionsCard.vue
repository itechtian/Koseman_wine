<template>
    <div class="display-option-card">
      <div :style="{backgroundImage:`url(${Explore1_img})`,height:'152px',backgroundRepeat:'no-repeat',backgroundSize:'cover'}"></div>
      <div class="lower">
        <span>We offer great discounts</span>
      </div>
    </div>
</template>

<script>
import Explore1_img from "../../assets/explore_img1.png"
export default {
  name: "DisplayOptionsCard",
  setup(){
    return {Explore1_img}
  }
}
</script>

<style scoped>
.lower{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 26px auto;
}
.lower span {
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #2C2C26;
}
.display-option-card{
  width:50%;
  /*height: 220px;*/
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  /*box-shadow: 0px 20px 40px -6.67714px rgba(39, 76, 119, 0.16);*/
  border-radius: 16px;
}
</style>
<template>
  <div class="sign-up-wrapper">
    <div class="side-image" :style="{backgroundImage:`url(${image})`}">
    </div>
    <div class="side-form">
        <sign-up-form />
    </div>
  </div>
</template>

<script>
import SignUpForm from "../../components/forms/SignUpForm";
import image from "@/assets/signup-image.png"
import router from "../../router";
export default {
  name: "SignUpView",
  components:{SignUpForm},
  setup(){
    return {image}
  },
  mounted() {
    if(localStorage.customerId)router.push({path:'/user/login'})
  }
}
</script>

<style scoped>
.sign-up-wrapper{
  width: 100%;
  display: flex;
}
.side-image{
  height: 100vh;
  width: 650px;;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.side-form{
  margin: 1% auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 990px) {
  .side-image{
    display: none;
  }
  .side-form{
    width: 100%;
    height: auto;
  }
}
</style>
<template>
  <div class="log-in-wrapper">
    <div class="side-image" :style="{backgroundImage:`url(${image})`}">
    </div>
    <div class="side-form">
      <log-in-form />
    </div>
  </div>
</template>

<script>
import LogInForm from "../../components/forms/LogInForm";
import image from "@/assets/login-image.png"
export default {
  name: "LoginView",
  components:{
    LogInForm,
  },
  setup(){
    return {image}
  }
}
</script>

<style scoped>
.log-in-wrapper{
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
}

@media (max-width: 990px) {
  .side-image{
    display: none;
  }
  .side-form{
    width: 100%;
    margin-bottom: 10%;
  }
}
</style>
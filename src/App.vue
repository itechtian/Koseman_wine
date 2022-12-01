<template>
  <div v-if="!getLayout" class="splash">
    <img src="../src/assets/logo.svg" />
  </div>
  <app-layout class="app" v-if="getLayout === 'app'"></app-layout>
  <router-view v-else v-slot="{Component}">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
import AppLayout from "./views/screens/layout/AppLayout";
import StoreUtils from "./utils/baseUtils/StoreUtils";
export default {
  components:{AppLayout},
  computed: {
    getLayout() {
      return this.$route.meta.layout
    }
  },
  mounted() {
    setTimeout(() => {
      this.getLayout()
    },500)

    if(localStorage.customerId)StoreUtils.dispatch(StoreUtils.actions.auth.readCustomerById)
    StoreUtils.dispatch(StoreUtils.actions.app.readCustomerCart)
  }
}
</script>
<style>
body{
  scroll-behavior: smooth;
  transition: .5s linear;
}
.splash{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
 .app{
   box-sizing: border-box;
 }
 .col-3{
   width: 30%;
   margin: 0;
   padding: 0;

 }
 .col-4{
   width: 40%;
 }
 .col-6{
   width: 60%;
 }
 .col-8{
   width: 80%;
 }
 .col-12{
   width: 100%;
 }

/* transition */

.route-enter-from{
  opacity: 0;
//transform: translateX(100px);
}
.route-enter-active{
  transition: all 0.2s ease-in;
}

.route-leave-to{
  opacity: 0;
//transform: translateX(-100px);
}
.route-leave-active{
  transition: all 0.3s ease-out;
}
</style>

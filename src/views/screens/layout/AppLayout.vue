<template>
  <div>
    <Header />
    <main>
      <router-view v-slot="{Component}">
        <transition name="route" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
export default {
  name: "AppLayout",
  components:{Header,Footer},
}
</script>

<style scoped></style>
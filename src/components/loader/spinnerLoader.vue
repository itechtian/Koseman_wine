<template>
  <span class="spinner-border" :style="{color:color}"></span>
</template>

<script>
export default {
  name: "spinnerLoader",
  props:['color']
}
</script>

<style scoped>
.spinner-border {
  display: inline-block;
  width: .5rem;
  height: .5rem;
  vertical-align: text-bottom;
  border: 0.15em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spinner-border 0.30s linear infinite;
  animation: spinner-border 0.30s linear infinite;
  /*color: #A22C4D;*/
  color: #FFFFFF;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>
<template>
      <form class="form-div">
          <input type="text" class="search-form-input"/>
          <button class="search-btn" :style="{backgroundColor:INFRASTRUCTURE.colors.shade2,color:INFRASTRUCTURE.colors.primary}">Search</button>
      </form>
</template>

<script>
import INFRASTRUCTURE from "../../infrastruture";
export default {
  name: "SearchForm",
  setup(){
    return {INFRASTRUCTURE}
  },
}
</script>

<style scoped>

.form-div {
  position: relative;
  width: 100%;
  height: 45px;

}

.search-form-input{
  width: 100%;
  height: 45px;
  border: 1px solid #7F7F7F;
  border-radius: 100px;
  position: relative;

}

/*input{*/
/*  width: inherit;*/
/*  border-radius: inherit;*/
/*  height: inherit;*/
/*  position: absolute;*/
/*  margin: 0;*/
/*  padding: 0;*/
/*}*/


.search-btn{
  position: absolute;
  right: 0;
  top: 2px;
  bottom: 0;
  width: 120px;
  height: 45px;
  border-radius: 0px 100px 100px 0px;
  cursor: pointer;
  border: none;
  margin: 0;
  padding: 0;
}
</style>
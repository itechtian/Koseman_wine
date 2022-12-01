<template>
    <div class="form-wrapper">
      <form>
        <div class="form-div">
          <input type="text" class="search-form-div"/>
          <button class="search-btn" :style="{backgroundColor:INFRASTRUCTURE.colors.shade2,color:INFRASTRUCTURE.colors.primary}">Search</button>
        </div>
      </form>
    </div>
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
}

.form-wrapper{
  width: 100%;
}
.search-form-div{
  width: 100%;
  height: 45px;
  border: 1px solid #7F7F7F;
  border-radius: 100px;
  position: relative;
}

input{
  width: inherit;
  border-radius: inherit;
  height: inherit;
  position: absolute;
  padding: 0;
  margin: 0;
}

.search-btn{
  position: absolute;
  right: 0;
  top: 1px;
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
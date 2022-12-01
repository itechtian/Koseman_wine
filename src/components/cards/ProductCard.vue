<template>
    <div class="product-card" v-if="loadingCategoryProducts">
      <div>
       <img src="../../assets/skelentonWine.png"  style="transform: translateY(-10%)" class="wine"/>
       <div style="transform: translateY(-55%)">
          <p class="skeleton-text"></p>
          <p class="skeleton-text"></p>
        </div>
      </div>
    </div>
    <div class="product-card" v-if="loadingCategoryProducts">
      <div>
       <img src="../../assets/skelentonWine.png"  style="transform: translateY(-10%)" class="wine"/>
       <div style="transform: translateY(-55%)">
          <p class="skeleton-text"></p>
          <p class="skeleton-text"></p>
        </div>
      </div>
    </div>
    <div class="product-card" v-if="loadingBrandProducts">
     <img src="../../assets/skelentonWine.png"  style="transform: translateY(-10%)" class="wine"/>
      <div style="transform: translateY(-55%)">
        <p class="skeleton-text"></p>
        <p class="skeleton-text"></p>
      </div>
    </div>
    <div v-if="data?.length < 1 && !loadingCategoryProducts && !loadingBrandProducts">
      <p>Could not fetch any products here..</p>
    </div>
    <div :style="{transform:`scale(${scale})`,position:position, top:top}" v-else v-for="product in data" :key="product.productId" @click="toDescriptionPage(product)">
      <div class="product-card" v-if="!loadingCategoryProducts && !loadingBrandProducts"  @click="RouteToDescription">
      <img src="../../assets/discountBadge.svg" class="discount-badge" v-if="product.productDiscount > 0" />
      <img src="../../assets/product_card.svg" class="little_svg"  />
      <span class="discount-badge discount-badge-p">{{product.productDiscount}}%</span>
      <img :src="product.productImage" class="product-image"/>
      <div style="margin:1%;transform: translateY(-80%);display: flex;flex-direction: column;gap:5px;padding:2%">
        <span class="wine-name">{{product.productName}}</span>
        <span class="wine-prize" :style="{color:INFRASTRUCTURE.colors.shade1}">₦{{formatAmount(product.productSellingPrice)}}</span>
      </div>
    </div>
    </div>
</template>

<script>
// import BaseButton from "../buttons/BaseButton";
import INFRASTRUCTURE from "../../infrastruture";
import {formatAmount} from "../../functionComponents";
import {mapState} from "vuex";
import StoreUtils from "../../utils/baseUtils/StoreUtils";
import router from "../../router";
export default {
  name: "ProductCard",
  props:['data','scale','position','top'],
  components: {
    // BaseButton
  },
  setup() {
    return {INFRASTRUCTURE,formatAmount}
  },
  methods: {
    toDescriptionPage(obj){
      StoreUtils.commit(StoreUtils.mutations.app.updatePreCart, obj)
      router.push({path:`/wines/${obj.productSlug}/`}).then()
      localStorage.productId = obj.productId
      StoreUtils.dispatch(StoreUtils.actions.app.updateSelectedHistory, obj.productId)
    },
  },
  computed:{
    ...mapState({
      loadingBrandProducts:state => state.app.loadingBrandProduct,
      loadingCategoryProducts:state => state.app.loadingCategoryProduct,

    })
  },
  mounted() {}
}
</script>

<style scoped>

.product-image{
  transform: translateY(-20%);
  /*border: solid;*/
  width: 150px;
  height: 220px;
}
.little_svg{
  position: absolute;
  right: 20px;
  top: 10px;
}

.product-card{
  width: 200px;
  height: 250px;
  border: 1px solid #D9D9D9;
  border-radius: 17px;
  margin-bottom: 50px;
  position: relative;
  padding: 5px;
}

.product-card:hover{
  box-shadow: 0px 21px 42px -7.14528px rgba(39, 76, 119, 0.16);
  cursor: pointer;
}

.discount-badge-p{
  color: #FFFFFF;
  transform: rotate(90deg) translate(80%, 20%);
  position: relative;
}

.discount-badge{
  position: absolute;
  right: 50px;
  top: -3px;
}

.wine-name{
  color: #2C2C26;
  font-size: 16px;
}

.wine-prize{
  font-weight: 800;
  font-size: 18px;
}
.skeleton-text {
  width: 90%;
  height: 1.5rem;
  margin: 1%;
  border-radius: 0.25rem;
  background: #FFFFFF;
  animation: skeleton-loading 1s linear infinite alternate;
}

.wine{
  animation: fade-wine 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
@keyframes fade-wine {
  0% {
    opacity: 0.7
  }
  100% {
    opacity: 1;
  }
}

</style>
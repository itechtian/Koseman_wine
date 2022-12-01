<template>
  <div :style="{position: 'relative',top:' 80px',marginLeft:INFRASTRUCTURE.spacing.app_default}">
    <div class="my-animate" :style="{position: 'absolute', top:lineTop,left:lineLeft}">
    <span :style="{width:lineWidth,display: 'flex',flexDirection: 'column',justifyContent: 'center'}">
      <div>
        <div class="line" :style="{lineWidth}"></div>
        <div :style="{width:lineWidth,display:'flex',justifyContent: 'center',height:lineHeight,alignItems:'flex-end'}">
        <div class="circle">
          <img src="../../assets/cardIcon.svg" />
        </div>
      </div>
      </div>
    </span>
    <div class="main-card">
      <div class="product-card">
        <img src="../../assets/discountBadge.svg" class="discount-badge" v-if="productDiscount" />
        <span class="discount-badge discount-badge-p">{{productDiscount}}%</span>
        <div style="height:302px;justify-content:center;align-items:center;margin:1%;display: flex;flex-direction: column;gap:5px;padding:2%">
          <img :src="productImage" class="product-image"/>

          <span class="wine-name">{{wine_name}}</span>
          <span class="wine-prize" :style="{color:INFRASTRUCTURE.colors.shade1}">₦{{formatAmount(wine_prize)}}</span>
        </div>
    </div>

  </div>
  </div>
  </div>
</template>

<script>
import INFRASTRUCTURE from "../../infrastruture";
import {formatAmount} from "../../functionComponents";
// import StoreUtils from "../../utils/baseUtils/StoreUtils";
export default {
  name: "HeroCard",
  props:['lineWidth','lineHeight', 'productImage','lineTop','lineLeft','wine_name','wine_prize','productDiscount'],
  setup(){
    return {INFRASTRUCTURE,formatAmount}
  },
computed:{}
}
</script>

<style scoped>
.product-image{
  width: 93px;
  height: 130px;
}
.line{
  height: 0;
  z-index: -10000;
  border: 1px solid #FFFFFF;
  transform: rotate(90deg);
}

.wine-name{
  color: #2C2C26;
  font-size: 20px;
  width: 100%;
  text-align: left;
}

.wine-category{
  font-weight: 600;
  font-size: 8px;
  line-height: 12px;
  /* identical to box height */
  color: #7F7F7F;
  width: 100%;
  text-align: left;
}


.my-animate{
  animation: Anime 3.5s ease-in-out forwards infinite;
  transform-origin: 50% 0;
}

.discount-badge-p{
  color: #FFFFFF;
  transform: rotate(90deg) translate(80%, 50%);
  position: relative;
}

@keyframes Anime {
  0%{transform: rotate(5deg);}
  50%{transform: rotate(-1deg)}
  100%{transform: rotate(5deg);}

}
.discount-badge{
  position: absolute;
  right: 10px;
  top: -3px;
}
.circle{
  width: 50px;
  height: 50px;
  border-radius: 360px;
  background: #A22C4D;
  z-index: 10000;
  border: 7px solid #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wine-prize{
  font-weight: 800;
  font-size: 18px;
  width: 100%;
  text-align: left;
}


.main-card{
  width: 174px;
  height: 260px;
  background: #FFFFFF;
  border-radius: 10px;
  transform: translateY(-20%);
}

</style>
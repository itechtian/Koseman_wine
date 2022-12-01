<template>
  <div class="card-body">
    <div class="card-header" :style="{backgroundColor:INFRASTRUCTURE.colors.shade5,color:INFRASTRUCTURE.colors.primary}">
      <img src="../../assets/XMLID_209_.svg" />
      <span>Classic Choice!</span>
    </div>
    <div class="card_body">
      <div class="prize-area">
        <div>
          <span class="card-prize">₦{{item?.productOfferPrice !== '0.00' ? formatAmount(item?.productOfferPrice) : formatAmount(item?.productSellingPrice)}}</span>
          <span>Price per bottle</span>
        </div>
        <span class="card-prize-old" v-if="item?.productOfferPrice !== '0.00'">₦{{item?.productOfferPrice === '0.00' ? formatAmount(item?.productOfferPrice) : formatAmount(item?.productSellingPrice)}}</span>
      </div>
      <hr style="margin: 10px"/>
      <div v-if="newlyAdded && newlyAdded.cartQuantity > 0">
        <div class="base-btn" >
          <span @click="decrease">-</span>
          <span>{{newlyAdded.cartQuantity}}</span>
          <span @click="increase">+</span>
        </div>
        <span class="text">{{newlyAdded?.cartQuantity === "1" ? `(${newlyAdded?.cartQuantity} item added)` : `(${newlyAdded?.cartQuantity} item(s) added)`}}</span>
        <hr style="margin: 10px"/>
      </div>

      <div class="add-to-cart-div" v-else>
        <base-button width="100%" text="Add to cart" @click="addToCart" :loading="loading"/>
      </div>
    </div>
    <div class="card-bottom">
      <section>
        <img src="../../assets/bottle.svg" />
        <span>Shop for the best wines from our market place</span>
      </section>
      <section>
        <img src="../../assets/bus.svg" />
        <span>Confirm delivery address and location</span>
      </section>
      <section>
        <img src="../../assets/shop.svg" />
        <span>Delivery out of Enugu State are strictly wholesale</span>
      </section>
      <section>
        <img src="../../assets/basket.svg" />
        <span>Get your order delivered to your doorstep</span>
      </section>
    </div>
  </div>
</template>

<script>
import INFRASTRUCTURE from "../../infrastruture";
import BaseButton from "../buttons/BaseButton";
import {mapState} from "vuex";
import StoreUtils from "../../utils/baseUtils/StoreUtils";
import AppRequest from "../../model/request/appRequest";
import {formatAmount} from "../../functionComponents";
export default {
  name: "ProductDescriptionCard",
  components:{
    BaseButton,
  },
  setup(){
    return{INFRASTRUCTURE,formatAmount}
  },
  data(){
    return{
      number:1,
      model:AppRequest,
    }
  },
  methods:{
    addToCart(){
      this.model.createCart.cartQuantity = 1
      StoreUtils.dispatch(StoreUtils.actions.app.addToCart, this.model.createCart)
    },
    increase(){
      console.log(this.newlyAdded.cartQuantity)
      this.model.updateCart.cartId = this.newlyAdded.cartId
      this.model.updateCart.cartQuantity = Number(this.newlyAdded.cartQuantity) + 1
      StoreUtils.dispatch(StoreUtils.actions.app.updateCart, this.model.updateCart)
    },
    decrease(){
      this.model.updateCart.cartId = this.newlyAdded.cartId
      this.model.updateCart.cartQuantity = Number(this.newlyAdded.cartQuantity) - 1
      StoreUtils.dispatch(StoreUtils.actions.app.updateCart, this.model.updateCart)

    },
  },
  computed:{
    ...mapState({
      item:state => state.app.preCart,
      newlyAdded:state => JSON.parse(JSON.stringify(state.app.newlyAddedToCart)),
      loading:state => state.app.loadingForCart
    })
  }
}
</script>

<style scoped>
.card-body{
  width: 350px;
  height: 550px;
  background: #FFFFFF;
  /*border: 0.818713px solid #D9D9D9;*/
  box-shadow: 0px 22px 43px -7.14528px rgba(39, 76, 119, 0.16);
  border-radius: 17px;
}

.text{
  margin: 10px;

}

.card-header > span {
  font-weight: 700;
  font-size: 18px;
  line-height: 38px;
  color: #FFFFFF;
  margin-left: 10px;

}
.base-btn{
  height: 42.67px;
  border-radius: 100px;
  border: 1px solid #000000;
  background: transparent;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px;

}

.card-prize{
  font-weight: 800;
  font-size: 41px;
  line-height: 50px;
  /* identical to box height */

  display: flex;
  align-items: flex-end;

  color: #403377;
}

.card-prize-old{
  font-weight: 800;
  font-size: 19.4844px;
  line-height: 23px;
  display: flex;
  align-items: flex-end;
  text-decoration-line: line-through;
  color: #B3B3B3;
}

.prize-area{
  display: flex;
  align-items: center;
  margin: 10px;
}

.card-header{
  display: flex;
  padding: 10px;
  align-items: center;
}

.card-bottom{
  margin: 10px;
}

.add-to-cart-div{
  margin: 10px;
}

.card-bottom > section {
  display: flex;
  justify-content: space-around;
  gap: 5px;
  margin-bottom: 34px;
}
.card-bottom > section > span{
  padding: 0;
  width: 80%;
  margin: 0;
}
</style>
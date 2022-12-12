<template>
  <div>
  <div :style="{width:'100%',backgroundColor:INFRASTRUCTURE.colors.shade4}" class="description-wrapper">
    <div>
      <div  :style="{backgroundColor: INFRASTRUCTURE.colors.primary}">
      <div class="description-title" :style="width >= 800 ? {marginLeft:INFRASTRUCTURE.spacing.app_default,marginRight:INFRASTRUCTURE.spacing.app_default}:{marginLeft:0,marginRight:0}">
        <div class="description-title-inner">
          <div class="circle">
           <img src="../../../assets/cardIcon.svg" />
          </div>
          <span class="description-availability">{{item?.productQuantity}} bottles of this wine left in stock</span>
        </div>
      </div>
    </div>
    </div>
    <div class="description-hero">
      <div class="description-hero-inner">
        <img :src="item?.productImage" width="300" height="550"/>
        <div class="description-inner">
            <span class="product-category">Champagne</span>
            <span class="product-name">{{item?.productName}}</span>
            <span class="product-prize">₦{{ formatAmount(item?.productSellingPrice) }}</span>
            <br />
            <br />
            <div class="add-wishlist-div">
              <img src="../../../assets/Bookmark.svg" />
              <span class="add-wishlist">Add to Wishlist</span>
            </div>
            <br />
            <br />
            <div>
              <span class="description">Description:</span>
              <span class="description-content">{{item?.productDescription}}</span>
            </div>
            </div>
      </div>
      <product-description-card />
    </div>
  </div>
    <div :style="width >= 800 ? {marginLeft:INFRASTRUCTURE.spacing.app_default,marginRight:INFRASTRUCTURE.spacing.app_default}:{marginLeft:0,marginRight:0}" class="alternative-categories">
      <div style="margin-top:2%;margin-bottom: 5%">
        <span class="alternative-categories-text">Top list of alternatives</span>
      </div>
      <div class="alternative-categories-card">
        <product-card :data="categoryProducts"></product-card>
      </div>
    </div>
  </div>
</template>

<script>
import INFRASTRUCTURE from "../../../infrastruture";
import ProductDescriptionCard from "../../../components/cards/ProductDescriptionCard";
import {mapState} from "vuex";
import StoreUtils from "../../../utils/baseUtils/StoreUtils";
// import {Toast} from "../../../components/NotificationToast";
import ProductCard from "../../../components/cards/ProductCard";
import {formatAmount} from "../../../functionComponents";
import Swal from "sweetalert2";
export default {
  name: "ProductDescriptionView",
  components:{
    ProductDescriptionCard,
    ProductCard
  },
  setup(){
    const width = innerWidth
    return{INFRASTRUCTURE,width,formatAmount}
  },

  methods:{},

  computed:{
    ...mapState({
      item:state => state.app.preCart,
      newlyAdded:state => JSON.parse(JSON.stringify(state.app.newlyAddedToCart)),
      cartItem: state => state.app.cart,
      isNewlyAdded:state => state.app.isNewlyAdded,
      brandProduct:state => state.app.brandProducts,
      categoryProduct:state => state.app.categoryProducts,
    }),
    categoryProducts(){
      if(this.categoryProduct?.data.map(item => item.productId).includes(this.item?.productId)){
        const alternativeCategories = this.categoryProduct?.data.filter(objItem => {
          return objItem.productId !== this.item.productId
        });
        StoreUtils.commit(StoreUtils.mutations.app.updateAlternativeProducts, alternativeCategories)
      }
      return StoreUtils.rootGetters(StoreUtils.getters.app.getAlternative)

    },
  },
  watch: {
    'isNewlyAdded'() {
      Swal.fire({icon: 'success', text:this.isNewlyAdded}).then(() => {
        StoreUtils.commit(StoreUtils.mutations.app.updateIsNewlyAdded, null)
      })
    },

    'cartItem'() {
      if (this.cartItem.map(item => item.products?.productId).includes(this.item?.productId)){
        const newCartItem = this.cartItem?.filter(item => {
          return this.item.productId === item.products?.productId
        })
        StoreUtils.commit(StoreUtils.mutations.app.updateNewlyAddedToCart, newCartItem[0])
      }else{
        StoreUtils.commit(StoreUtils.mutations.app.updateNewlyAddedToCart, null)
      }
    }
  },
  mounted() {
    StoreUtils.dispatch(StoreUtils.actions.app.readProductById)
    StoreUtils.commit(StoreUtils.mutations.app.updateNewlyAddedToCart, null)
    StoreUtils.dispatch(StoreUtils.actions.app.readCustomerCart)
  }
}
</script>

<style scoped>
.add-wishlist-div{
  width: auto;
  display: flex;
  align-items: center;
  gap: 20px;
}
.alternative-categories-card{
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.description-inner{
  width: 100%;
  transform: translateX(-40%);
}
.alternative-categories-text{
  font-weight: 700;
  font-size: 36px;
  line-height: 47px;
  /* identical to box height */

  text-transform: capitalize;

  color: #000000;
}

.description-hero-inner{
  display: flex;
}
.add-to-cart-card{
  position: sticky;
  top: 0;
  border: solid;
}

.product-category{
  font-size: 30px;
  line-height: 41px;
  color: #7F7F7F;
}
.add-wishlist{
  font-size: 20px;
  line-height: 28px;
  display: flex;
  align-items: flex-end;
  text-decoration-line: underline;
  text-transform: capitalize;

  color: #403377;
}

.description-content{
  font-weight: 400;
  font-size: 18px;
  line-height: 29px;

  color: #000000;
}

.description{
  font-size: 32px;
  line-height: 38px;
  display: flex;
  align-items: flex-end;

  color: #1E1E1E;
}

.product-prize{
  font-size: 45.1455px;
  line-height: 54px;
  display: flex;
  align-items: flex-end;

  color: #403377;
}

.product-name{
  font-size: 30px;
  line-height: 51px;
  /* identical to box height */

  display: flex;
  align-items: flex-end;
  text-transform: uppercase;

  color: #2C2C26;
}

.circle{
  width: 50px;
  height: 50px;
  border-radius: 360px;
  background: #A22C4D;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.description-hero-inner{
  display: flex;
  width: 614px;
  /*gap: 20px;*/
}

.description-hero{
  display: flex;
  justify-content: space-evenly;
  padding: 39px;

}

.description-availability{
  color: #000000;
  font-size: 18px;
  line-height: 29px;
}

.description-wrapper{
  height: auto;
}

.description-title{
  height: 42px;
  padding-top: 21px;
  padding-bottom: 21px;

}

.description-title-inner{
  display: flex;
  align-items: center;
  width: 28%;
  justify-content: space-around;
  align-items: center;

}
</style>
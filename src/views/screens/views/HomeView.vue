<template>
  <div>
    <div>
      <div class="desktop-display">
        <hero-card  @click="toDescriptionPage(categoryProduct?.data[0])" :product-image="categoryProduct?.data[0]?.productImage" :product-discount="categoryProduct?.data[0]?.productDiscount" :wine_prize="categoryProduct?.data[0]?.productSellingPrice" :wine_name="categoryProduct?.data[0]?.productName" line-width="174px" line-height="55px" line-top="0" line-left="190px" />
        <hero-card @click="toDescriptionPage(categoryProduct?.data[1])" :product-image="categoryProduct?.data[1]?.productImage" :product-discount="categoryProduct?.data[1]?.productDiscount" :wine_prize="categoryProduct?.data[1]?.productSellingPrice" :wine_name="categoryProduct?.data[1]?.productName" line-width="174px" line-height="15px" line-top="0" line-left="0px"/>
      </div>
      <div class="caro">
        <div class="controls"></div>
        <div class="sliders" :style="{backgroundImage:`url(${slider1})`}"></div>
      </div>

    </div>
    <div class="home" :style="width >= 800 ? {marginLeft:INFRASTRUCTURE.spacing.app_default,marginRight:INFRASTRUCTURE.spacing.app_default}:{}">
      <div class="inner-home">
        <aside class="col-3 menu-area">
          <section>
            <span class="top-section">Product Categories</span>
            <ul class="product-nav">
              <li @click="readCategoryProduct(i)" v-for="i in getCategories?.data" :style="isCategoryIndex === i.categoryId ? {color:INFRASTRUCTURE.colors.shade1,textDecoration:'underline'}:null" :key="i.categoryId">{{i.categoryName}}</li>
            </ul>
          </section>
          <section>
            <span class="top-section">Filter By Price</span>
            <form @submit.prevent="doFilter" class="filter-form">
              <input v-model="max" type="range" id="filter-input" class="filter-input" max="40000" min="3000" />
              <div style="display: flex;gap:5px;align-items: center">
                <filter-button text="Filter" :loading="isFilterLoading" />
                <span style="font-size: 13px"> Price: ₦ 3,000 - ₦{{formatAmount(max)}}</span>
              </div>
            </form>
          </section>
          <section>
            <span class="top-section">Brands</span>
            <ul class="product-nav">
              <li @click="readBrandProduct(i)" v-for="i in getBrands?.data" :key="i.brandId" :style="isBrandIndex === i.brandId ? {color:INFRASTRUCTURE.colors.shade1,textDecoration:'underline'}:null">{{i.brandName}}</li>
            </ul>
          </section>
        </aside>
        <section class="col-12 product-area">
          <section class="product-section">
            <div class="product-section-inner">
              <span class="product-area-top" v-if="filteredProduct">List By Filter</span><br/>
              <span class="product-area-top" v-if="!filteredProduct">On sale</span><br/>
              <span>Discount Products</span>
            </div>
            <div class="product-card-area">
              <product-card v-if="filteredProduct" :data="filteredProduct?.data"/>
              <product-card v-else :data="categoryProduct?.data.filter(item => Number(item.productDiscount) > 0)"/>
            </div>
          </section>
          <section>
            <span class="product-area-top">Explore our classic options</span>
            <div class="display-product-card-area">
              <display-options-card />
              <display-options-card />
            </div>
          </section>
          <section class="product-section">
            <div class="product-section-inner">
              <span class="product-area-top" >Top list for {{getCurrentCategoryName}}</span><br/>
              <span>Updated every week</span>
            </div>
            <div class="product-card-area">
              <product-card :data="categoryProduct?.data"/>
            </div>
          </section>
          <section>
          <div class="product-section-inner">
            <span class="product-area-top">Top list for {{getCurrentBrandName}}</span>
          </div>
          <div class="product-card-area">
            <product-card :data="brandProduct?.data"/>
          </div>
        </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import INFRASTRUCTURE from "../../../infrastruture";
import HeroCard from "../../../components/cards/HeroCard";
import FilterButton from "../../../components/buttons/FilterButton";
import ProductCard from "../../../components/cards/ProductCard";
import DisplayOptionsCard from "../../../components/cards/DisplayOptionsCard";
import slider1 from "../../../assets/wine-tasting.png"
import StoreUtils from "../../../utils/baseUtils/StoreUtils";
import AppRequest from "../../../model/request/appRequest";
import {mapState} from "vuex";
import {formatAmount} from "../../../functionComponents";
import router from "../../../router";
const width = innerWidth
export default {
  name: 'Home',

  components: {HeroCard,FilterButton,ProductCard,DisplayOptionsCard},

  setup(){
    return {INFRASTRUCTURE,slider1,width,formatAmount}
  },

  data(){
    return{
      isBrandIndex:1,
      isCategoryIndex:1,
      brandModel:AppRequest.readBrandProduct,
      categoryModel:AppRequest.readCategoryProduct,
      max:0,
      min:3000,
      filterModel:AppRequest.filterProduct
    }
  },

  methods:{
    toDescriptionPage(obj){
      StoreUtils.commit(StoreUtils.mutations.app.updatePreCart, obj)
      router.push({path:`/wines/${obj.productSlug}/`}).then()
      localStorage.productId = obj.productId
      StoreUtils.dispatch(StoreUtils.actions.app.updateSelectedHistory, obj.productId)
    },
    doFilter(){
      this.filterModel.productMinSellingPrice = "3000"
      this.filterModel.productMaxSellingPrice = this.max
      StoreUtils.dispatch(StoreUtils.actions.app.filterProduct)
    },
    readBrandProduct(i){
      this.isBrandIndex = i.brandId
      StoreUtils.commit(StoreUtils.mutations.app.updateCurrentBrand,i.brandName)
      this.brandModel.productBrandId = this.isBrandIndex
      StoreUtils.dispatch(StoreUtils.actions.app.readProductByBrandId,this.brandModel)
    },
    readCategoryProduct(i){
      this.isCategoryIndex = i.categoryId
      StoreUtils.commit(StoreUtils.mutations.app.updateCurrentCategory,i.categoryName)
      this.categoryModel.productCategoryId = this.isCategoryIndex
      StoreUtils.dispatch(StoreUtils.actions.app.readProductsByCategoryId,this.categoryModel)
    }
  },

  computed:{
    ...mapState({
      brandProduct:state => state.app.brandProducts,
      categoryProduct:state => state.app.categoryProducts,
      filteredProduct:state => state.app.filterProduct,
      isFilterLoading:state => state.app.filterIsLoading

    }),

    getRandomOne(){
      return this.brandProduct?.data
    },
    getRandomTwo(){
      return this.categoryProduct
    },

    getCategories(){
      return StoreUtils.rootGetters(StoreUtils.getters.app.getCategories)
    },
    getCurrentCategoryName(){
      return StoreUtils.rootGetters(StoreUtils.getters.app.getCurrentCategories)
    },
    getCurrentBrandName(){
      return StoreUtils.rootGetters(StoreUtils.getters.app.getCurrentBrand)
    },
    getBrands(){
      return StoreUtils.rootGetters(StoreUtils.getters.app.getBrands)
    },
  },

  mounted() {
    StoreUtils.dispatch(StoreUtils.actions.app.readCategories)
    StoreUtils.dispatch(StoreUtils.actions.app.readBrands)
    StoreUtils.dispatch(StoreUtils.actions.app.readProductsByCategoryId)
    StoreUtils.dispatch(StoreUtils.actions.app.readProductByBrandId)
    StoreUtils.commit(StoreUtils.mutations.app.updateFilterProduct, null)
  }
}
</script>

<style scoped>
.wine-name{
  font-size: 5px;
}
.on-sale-card-div{
  display: flex;
  border: solid;
}

.on-sale-card{
  background: #FFFFFF;
  border: 0.28655px solid #D9D9D9;
  border-radius: 6.25212px;
}

.cardc{

}

.home{
  margin-top: 10px;
  min-height: 100vh;
}

.sliders{
  height: 574px;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.product-card-area{
  width:100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 7px;
  align-items: center;
  margin-top: 2%;
}

.display-product-card-area{
  display: flex;
  gap: 10px;
  margin-top: 1%;
  max-width: 100%;
}

.product-area-top{
  font-size: 36px;
  color: #000000;
}

#filter-input{
  width: 200px;
  background: #403377;
  height: 6px;
  transition: background 450ms ease-in;
  margin-bottom: 24px;


}
#filter-input::-webkit-slider-thumb {
  background: #403377 !important;
}

input[type='range']::-webkit-slider-runnable-track{
  background: #403377 !important;
}
section{
  margin-bottom: 65px;
}

.filter-form{
  margin-top: 38px;
}

.top-section{
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  /* identical to box height */
  color: #1E1E1E;
  margin-bottom: 38px;
}

.product-nav{
  list-style: none;
  padding: 0;
}

.product-nav > li{
  margin-bottom: 17px;
  color: #7F7F7F;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;

}

.menu-area{
  padding: 0;
  margin-top:20px;
  width: 274px;
  position: sticky;
  top: 5px;

}
.product-section-inner{
  /*position: sticky;*/
  /*top: 0;*/
  /*z-index: 999999;*/
  background: #FFFFFF;
  /*padding-top: 2%;*/
  padding-bottom: 2%;
  margin-bottom: 5%;
}

.product-area{
  padding: 0;
  margin-left:0;
  position: sticky;
  top: 200px;

}

.inner-home{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 51px;
}

.slider1{
  width: 100%;
  height: 65vh;
}
@media (max-width: 700px){
  .product-card-area{
    display: flex;
    gap: 15px;
    flex-direction: column;
    margin-top: 71px;
    max-width: 100%;
    justify-content: center;
    align-items: center;
  }
}


@media (max-width: 999px){
  .desktop-display{
    display: none;
  }
  .product-card-area{
    display: flex;
    gap: 15px;
    /*flex-direction: column;*/
    margin-top: 71px;
    max-width: 100%;
    justify-content: center;
    align-items: center;
  }

  .inner-home{
    display: block;
    overflow: hidden;
  }

  .product-area{
    width: 100%;
  }

  .menu-area{
    display: none;
  }
}
</style>

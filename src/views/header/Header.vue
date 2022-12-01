<template>
    <div class="header-wrapper-inner desktop-nav" :style="width >= 800 ? {backgroundColor:INFRASTRUCTURE.colors.primary,height:INFRASTRUCTURE.height.header}:{display:'none'}">
      <div class="header-div" :style="{height:'96px',display: 'flex',alignItems:'center'}">
        <div id="nav" class="nav" :style="{height:'50px',marginLeft:INFRASTRUCTURE.spacing.app_default,marginRight:INFRASTRUCTURE.spacing.app_default}">
          <div class="col-3"><router-link to="/"><img src="../../assets/logo.svg" /></router-link></div>
          <div class="col-3" style="width:100%;display: flex;">
            <search-form />
            <div class="col-3">
              <ul style="list-style: none;display: flex;gap: 10px">
                <router-link to="/onepagecheckout/delivery/">
                <li>
                  <img src="../../assets/Hicon/Outline/Buy3.svg" width="20" />
                  <span :style="{width:5,height:5,position:'relative',top:'-10px',right:'0px'}">{{getCartLength}}</span>
                </li>
                </router-link>
                <li style="display: flex;gap: 5px" @click="showDropDown">
                  <img src="../../assets/Hicon/Bold/ProfileCircle.svg" width="20"/>
                  <span v-if="username">{{username?.customerFirstName + ' ' +  username?.customerLastName}}</span>
                </li>
              </ul>
              <div class="drop-down hide" id="drop-down">
                <ul>
                  <li v-if="!username"><a href="user/login">Login</a></li>
                  <ul v-else>
                    <li>My orders</li>
                    <li>My WishList</li>
                    <li><a href="user/login">Log out</a></li>
                  </ul>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :style="{backgroundColor:INFRASTRUCTURE.colors.shade4}" class="bottom-header">
        <ul style="list-style: none;display: flex;gap: 63px;cursor: pointer">
          <router-link to="/"><li>Shop</li></router-link>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </div>
</template>

<script>
import INFRASTRUCTURE from "../../infrastruture";
import SearchForm from "../../components/forms/SearchForm";
import sticky from "../sticky";
import StoreUtils from "../../utils/baseUtils/StoreUtils";
import {mapState} from "vuex";
export default {
  name: "Header",
  setup(){
    const width = innerWidth
    return {INFRASTRUCTURE, width}
  },
  data(){
    return{
      isUpdate:'hide'
    }
  },
  components:{
    SearchForm
  },
  methods:{
    showDropDown(){
      const dropDown = document.getElementById('drop-down')
      if(this.isUpdate === 'hide'){
         dropDown.classList.remove('hide')
         dropDown.classList.add('show')
         this.isUpdate = 'show'
      }else{
        dropDown.classList.add('hide')
        dropDown.classList.remove('show')
        this.isUpdate = 'hide'
      }
    }
  },
  computed:{
    ...mapState({
      username:state => state.auth.user
    }),

    getCartLength(){
      return StoreUtils.rootGetters(StoreUtils.getters.app.getCartLength)
    }
  },
  mounted() {
    sticky.sticky()
  }
}
</script>

<style scoped>
.header-div{
  width: 100%;
}

#nav a.router-link-exact-active {
  color: #6C609E;
}

.show-dropdown:hover ~ .drop-down{
  display: none;
}

.show{
  display: block;
  transition: .5s ease-in;
}

.hide{
  display: none;
  transition: .5s ease-out;

}

.drop-down{
  position: absolute;
  background: #FFFFFF;
  top: 60px;
  width: 200px;
  transition: .5s ease-in;
  box-shadow: 0px 20.2109px 40.4219px -6.73698px #F6F6F6;
  border-radius: 10px;
}

.drop-down ul{
  list-style: none;
  padding: 0;
}

.drop-down li{
  padding: 15px;
}
.drop-down li:hover{
  text-decoration: underline;
}

a{
  color: #000000;

}

.bottom-header{
  display: flex;
  align-items: center;
  justify-content: center;
  /*height: 50px;*/
}

.bottom-header ul li {
  cursor: pointer;
}

.header-wrapper{
  display: flex;
  align-items: center;
  width: 100%;
  height: 146px;
  position: sticky;
  top: 0;
  z-index: 99999999;

}
.sticky{
  position: fixed;
}

a{
  text-decoration: none;
}

#nav{
  display: flex;
  justify-content: space-between;
}

.header-wrapper-inner{
  max-width: 100%;
  /*position: sticky;*/
  /*top: 0;*/
  z-index: 100;
}

.nav{
  display: flex;
  width: 100%;
}

.col-3 ul li{
  cursor: pointer;
}

@media (max-width: 999px) {
  .desktop-nav{
    display: none;
  }

}
</style>
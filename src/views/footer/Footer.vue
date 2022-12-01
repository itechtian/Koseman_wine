<template>
  <div class="footer">
    <div class="footer-1st-level">
      <div class="inner-footer-1st-level" :style="{backgroundColor:INFRASTRUCTURE.colors.shade5}" >
        <div class="nf" :style="width >= 800 ? {marginLeft:INFRASTRUCTURE.spacing.app_default,marginRight:INFRASTRUCTURE.spacing.app_default}:{marginLeft:0,marginRight:0}">
          <div class="footer-1st-level-div-1">
            <div class="inner-footer-1st-level-div-1">
              <div style="display: flex; flex-direction: column">
                <span class="inner-footer-1st-level-div-1-h3">A classy taste with a reliable supplier</span>
                <span class="inner-footer-1st-level-div-1-p">Get access to our high quality wines at discounted
                  rates, as we deliver to your door.</span>
              </div>
              <subscription-form />
            </div>
          </div>
          <div class="footer-1st-level-div-2">
              <img src="../../assets/icons/FULL_copy.png" class="FULL_copy" />
          </div>
        </div>
      </div>
    </div>
    <div :style="{backgroundColor:INFRASTRUCTURE.colors.shade4}" class="footer-2nd-level">
      <div class="inner-footer-2nd-level" :style="width >= 800 ? {marginLeft:INFRASTRUCTURE.spacing.app_default,marginRight:INFRASTRUCTURE.spacing.app_default}:{marginLeft:0,marginRight:0}">
        <h1>Our order and delivery process, to bring your order to your door-step</h1>
        <div class="inner-footer-2nd-level-div">
          <div class="col-4 inner-footer-2nd-level-div-inner">
            <img src="../../assets/icons/icon1.svg">
            <p style="width: 150px;font-size: 14px">Shop for the best wines from our market place</p>
          </div>
          <div class="col-4 inner-footer-2nd-level-div-inner">
            <img src="../../assets/icons/cart.svg">
            <p style="width: 150px;font-size: 14px">Add to cart to see as your selected items</p>
          </div>
          <div class="col-4 inner-footer-2nd-level-div-inner">
            <img src="../../assets/icons/bus.svg">
            <p style="width: 150px;font-size: 14px">Confirm delivery address and location</p>
          </div>
          <div class="col-4 inner-footer-2nd-level-div-inner">
            <img src="../../assets/icons/wallet.svg">
            <p style="width: 150px;font-size: 14px">proceed to payments for your selected wines</p>
          </div>
        </div>
      </div>
    </div>
    <div :style="{backgroundColor:INFRASTRUCTURE.colors.shade5}" class="footer-3rd-level">
      <div class="inner-footer-3rd-level">
        <img src="../../assets/footerLogo.svg" />
        <div>
          <ul class="footer-3rd-level-nav">
            <li>Home</li>
            <li>Shop</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div style="display: flex;justify-content: center">
          <ul class="footer-3rd-level-nav">
           <li> <img src="../../assets/social_icons/whatsapp.svg" /></li>
            <li><img src="../../assets/social_icons/facebook.svg" /></li>
            <li> <img src="../../assets/social_icons/twitter.svg" /></li>
            <li><img src="../../assets/social_icons/instagram.svg" /></li>
          </ul>
        </div>
        <p class="footer-3rd-level-p">© Copyright 2001-2022 All Rights Reserved. Kosman®</p>
      </div>
    </div>
  </div>
</template>

<script>
import INFRASTRUCTURE from "../../infrastruture";
import SubscriptionForm from "../../components/forms/SubscriptionForm";

export default {
  name: "Footer",
  components:{SubscriptionForm},

  setup(){
    const width = innerWidth
    return {INFRASTRUCTURE,width}
  }
}
</script>

<style scoped>
.footer{}

.inner-footer-1st-level-div-1{
  width: 100%;
}

.nf{
  display: flex;
}

.inner-footer-1st-level-div-1-p{
  font-weight: 400;
  font-size: 205%;
  line-height: 100%;
  color: #FFFFFF;
  margin-bottom: 20px;
}

.inner-footer-1st-level-div-1-h3{
  font-weight: 800;
  font-size:300%;
  line-height: 120%;
  color: #FFFFFF;
  margin-bottom: 20px;

}

.inner-footer-2nd-level-div-inner{
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: space-between;
  /*padding-right: 20px;*/
}

.inner-footer-2nd-level-div{
  width: 100%;
  justify-content: space-between;
  display: flex;
  gap: 25px;
  z-index: -100;
}

.inner-footer-1st-level{
  height: 374px;
  display: flex;
  width: 100%;
  /*z-index: -2;*/
  justify-content: center;
}

.footer-1st-level-div-1{
  width: 62%;
  display: flex;
  align-items: center;
}

.footer-1st-level-div-2{
  width: auto;
  display: flex;
  justify-content: flex-end;
}

.footer-1st-level-div-2 > div {
  display: flex;
  justify-content: flex-start;
  width: 70%;
}

.doRotate{
  animation: spinAnime ease 9s;
}

@keyframes spinAnime {
  100%{transform: rotate(360deg)}
}

.inner-footer-2nd-level{
  width: 100%;
}

.TopKraftMailerBox{
  transform: translateX(-57%);
  /*position: relative;*/
  /*border: solid navy;*/
}

.FULL_copy{
  transform: translate(0,-16%);
  z-index: 1;
  height: 444px;
  /*border: solid bisque;*/
  /*position: absolute;*/

}

.footer-1st-level{
  height: 448px;
  /*border: solid blue;*/
  display: flex;
  align-items: flex-end;
  /*border: solid rebeccapurple;*/
}

.footer-2nd-level{
  height: 320px;
  display: flex;
  align-items: center;
}
.footer-3rd-level{
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 247px;
}

.footer-3rd-level-p{
  color: #B3B3B3;
}

.footer-3rd-level-nav{
  list-style: none;
  display: flex;
  padding:0;
  gap: 72px;
}
li{margin: 0;}

.inner-footer-3rd-level{}

@media (max-width: 999px) {
  .inner-footer-1st-level-div-1{
    margin: 5%;
    width: 100%;
  }
  .footer-1st-level-div-1{
    width: 100%;
  }

  .inner-footer-2nd-level{
    padding: 5%;
  }

  .inner-footer-2nd-level > h1{
    font-size: 200%;
  }

  .inner-footer-3rd-level{
    margin: 5%;
    height: auto;
  }

  .footer-2nd-level{
    height:auto;
    display: flex;
    align-items: center;
  }

  .inner-footer-1st-level-div-1-h3{
    font-weight: 800;
    font-size:200%;
    line-height: 120%;
    color: #FFFFFF;
    margin-bottom: 20px;
  }

  .inner-footer-2nd-level-div-inner{
    display: flex;
    gap: 0;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    /*padding-right: 20px;*/
  }

  .inner-footer-1st-level-div-1-p{
    font-weight: 400;
    font-size: 105%;
    line-height: 100%;
    color: #FFFFFF;
    margin-bottom: 20px;
  }

  .footer{
    width: auto;
  }

  .footer-3rd-level-nav{
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding:0;
    gap: 10px;
  }

  .footer-1st-level-div-2{
    display: none;

  }

  .inner-footer-2nd-level-div{
    display: flex;
    flex-direction: column;
    /*border: solid red;*/
    gap: 0;
  }

  .footer-3rd-level{
    height: auto;
  }
}
</style>
import router from "../../router/index";

class RouterUtils {
  static routers = {
    auth:{
      signup:{
        path:"/user/signup",
        name:"SIGNUP"
      },
      login:{
        path:"/user/login",
        name:"LOGIN"
      },
    },
    appView:{
      home:{
        path: '/',
        name: 'HOME',
      },
      product:{
        path:'/wines/:product_slug',
        name:'PRODUCT'
      },
      check_out:{
        path:'/onepagecheckout/delivery/',
        name:'CHECKOUT'
      }
    }
  };

  static pageTitles = {
    DEFAULT: "KOSMAN WINE",
  };
  static navigateTo(targetRoute) {
    router.push({name: targetRoute}).then();
  }
  static goBack() {router.go(-1);}
}
export default RouterUtils;

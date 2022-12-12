import RouterUtils from "../../utils/baseUtils/RouterUtils";
export default [
    {
        path: RouterUtils.routers.appView.home.path,
        name: RouterUtils.routers.appView.home.name,
        meta: {layout:'app',authRequired:false},
        component:() => import(/* webpackChunkName: "about" */ '../../views/screens/views/HomeView')
    },
    {
        path: RouterUtils.routers.appView.product.path,
        name: RouterUtils.routers.appView.product.name,
        meta: {layout:'app',authRequired:false},
        component:() => import(/* webpackChunkName: "about" */ '../../views/screens/views/ProductDescriptionView')
    },
    {
        path: RouterUtils.routers.appView.check_out.path,
        name: RouterUtils.routers.appView.check_out.name,
        meta: {layout:'app',authRequired:false},
        component:() => import(/* webpackChunkName: "about" */ '../../views/screens/views/CheckOutView')
    },
    {
        path: RouterUtils.routers.appView.order_page.path,
        name: RouterUtils.routers.appView.order_page.name,
        meta: {layout:'app',authRequired:true},
        component:() => import(/* webpackChunkName: "about" */ '../../views/screens/views/OrderView')
    },
]
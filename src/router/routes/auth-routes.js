import RouterUtils from "../../utils/baseUtils/RouterUtils";
export default [
    {
        path:RouterUtils.routers.auth.signup.path,
        name:RouterUtils.routers.auth.signup.name,
        meta:{layout:'auth',authRequired: false},
        component:() => import(/* webpackChunkName: "about" */ '../../views/auth/SignUpView')

    },
    {
        path:RouterUtils.routers.auth.login.path,
        name:RouterUtils.routers.auth.login.name,
        meta:{layout:'auth',authRequired: false},
        component:() => import(/* webpackChunkName: "about" */ '../../views/auth/LoginView')

    },
]
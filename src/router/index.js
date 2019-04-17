import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
var constantRouterMap =[
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401.vue'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404.vue'),
        hidden: true
    },
    {
        path: '/500',
        component: () => import('@/views/error-page/500.vue'),
        hidden: true
    },

];
export default new Router({
    routes: constantRouterMap
})

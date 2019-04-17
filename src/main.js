import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import '@/common/js/global'//全局
import './promission'//这里进行路由后台获取的模拟
import 'element-ui/lib/theme-chalk/index.css';
import '@/common/css/index.less'


Vue.config.productionTip = false
Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

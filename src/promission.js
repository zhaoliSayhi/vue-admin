import router from './router'
// import { Message } from 'element-ui'
import axios from 'axios'
const _import = require('./router/_import_' + process.env.NODE_ENV) //获取组件的方法
import Layout from '@/views/layout' //Layout 是架构组件，不在后台返回，在文件里单独引入
import API from '@/api/router.js'

var getRouter; //用来获取后台拿到的路由

router.beforeEach((to, from, next) => {
  if (!getRouter) {
    if (!getObjArr('router')) {
      API.gerMenu({}).then(res => {
        getRouter = res.data.data.router;
        saveObjArr('router', getRouter);

        routerGo(to, next)
      })

    } else {
      getRouter = getObjArr('router'); //拿到路由
      routerGo(to, next)
    }
  } else {
    next()
  }

})

/**
 * 将路由数据传递给全局变量，做侧边栏菜单渲染工作
 * @param to
 * @param next
 */
function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter)
  router.addRoutes(getRouter) // 动态添加路由
  global.antRouter = router.options.routes.concat(getRouter); // 将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ to, replace: true })
}

/**
 * 路由存储
 * @param name
 * @param data
 */
function saveObjArr(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

/**
 * 获取路由
 * @param name
 * @returns {any}
 */
function getObjArr(name) {
  return JSON.parse(window.localStorage.getItem(name));
}

/**
 * 递归遍历后台传来的路由字符串，转换为组件对象
 * @param asyncRouterMap
 * @returns {*}
 */
function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {//Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  });

  return accessedRouters;
}

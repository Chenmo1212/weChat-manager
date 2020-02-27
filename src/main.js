// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import App from './App'
import router from './router'

// 引入element样式
import './scss/theme/index.css'
import 'element-ui/lib/theme-chalk/display.css';

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

/**
 * @param {to} 将要去的路由
 * @param {from} 出发的路由
 * @param {next} 执行下一步
 */
router.beforeEach((to,from,next)=>{
  // 如果直接跳转后台
  if(to.path === '/management' && from.path === '/'){
    // 前往登录页
    next('/login');
  } else if(to.path === '/management' && from.path === '/login'){
    // console.log('您还没有登录，请先登录');
    next();
  } else {
    next()
  }
});

// router.afterEach((to, from)=>{
//   console.log("路由跳转")
// });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

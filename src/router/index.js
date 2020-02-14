import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import management from '@/components/management/management'
import login from '@/components/login'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/',
      name: 'home',
      component: home,
      children: [{
        // 后台管理界面
        path: 'management',
        name: 'management',
        component: management
      },{
        // 登录界面
        path: 'login',
        name: 'login',
        component: login
      },
      ]
    },
  ]
})

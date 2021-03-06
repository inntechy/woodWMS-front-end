import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    // hidden: true,
    children: [{
      path: 'dashboard',
      meta: {
        title: '总览',
        icon: 'dashboard'
      },
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/inbound',
    component: Layout,
    redirect: '/inbound/qurry',
    name: 'inbound',
    meta: {
      title: '入库单',
      icon: 'inbound'
    },
    children: [
      {
        path: 'add',
        component: () => import('@/views/inbound/add/index'), // Parent router-view
        name: 'add',
        meta: {
          title: '新建入库单',
          icon: 'add'
        }
      },
      {
        path: 'qurry',
        component: () => import('@/views/inbound/qurry/index'), // Parent router-view
        name: 'qurry',
        meta: {
          title: '所有入库单',
          icon: 'inbound'
        }
      },
      {
        path: 'details',
        component: () => import('@/views/inbound/sigleInfo/index'),
        name: 'details',
        meta: {
          title: '入库单详情',
          icon: 'details'
        }
      }
    ]
  },

  {
    path: '/delivery',
    component: Layout,
    redirect: '/delivery/add',
    name: 'delivery',
    meta: {
      title: '送货单',
      icon: 'delivery'
    },
    children: [
      {
        path: 'add',
        component: () => import('@/views/delivery/add/index'), // Parent router-view
        name: 'dliveryAdd',
        meta: {
          title: '新建送货单',
          icon: 'add'
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


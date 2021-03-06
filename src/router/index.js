import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '案件类别', icon: 'dashboard' }
    }]
  },
  {
    path: '/trialTemplateManage',
    component: Layout,
    name: 'TrialTemplateManage',
    children: [
      {
        path: 'trialTemplateManage',
        name: 'TrialTemplateManage',
        component: () => import('@/views/TrialTemplateManage/index'),
        meta: { title: '审讯模版', icon: 'table' }
      },
      {
        path: 'question',
        name: 'Question',
        hidden: true,
        component: () => import('@/views/TrialTemplateManage/questionConfig'),
        meta: { title: '审讯模版', icon: 'table' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    name: 'form',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/form/index'),
        meta: { title: '模型管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/moduleManage',
    component: Layout,
    name: 'moduleManage',
    children: [
      {
        path: 'moduleManage',
        name: 'ModuleManage',
        component: () => import('@/views/form/moduleManage'),
        meta: { title: '模型类型管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/onlineChat',
    component: Layout,
    redirect: '/onlineChat/index',
    name: 'OnlineChat',
    meta: { title: '预览测试', icon: 'nested' },
    children: [
      {
        path: 'onlineChat',
        name: 'onlineChat',
        component: () => import('@/views/onlineChat/index'),
        meta: { title: '在线预览', icon: '' }
      },
      {
        path: 'onlineTest',
        name: 'onlineTest',
        component: () => import('@/views/onlineChat/onlineTest'),
        meta: { title: '在线测试', icon: '' }
      }
    ]
  },
  {
    path: '/dataAnalysis',
    redirect: '/dataAnalysis/dataAnalysis',
    name: 'DataAnalysis',
    component: Layout,
    children: [
      {
        path: 'dataAnalysis',
        component: () => import('@/views/dataAnalysis/dataAnalysis'),
        meta: { title: '数据统计', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

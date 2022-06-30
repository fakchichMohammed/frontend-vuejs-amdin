import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/author/register/index'),
    hidden: true
  },
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
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/groups',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Groups',
        component: () => import('@/views/groups/index'),
        meta: { title: 'Groups', icon: 'form' }
      }
    ]
  },
  {
    path: '/categories',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Categories',
        component: () => import('@/views/categories/index'),
        meta: { title: 'Categories', icon: 'form' }
      }
    ]
  },
  {
    path: '/articles',
    component: Layout,
    redirect: '/articles',
    name: 'Articles',
    meta: { title: 'Articles', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'add-article',
        name: 'add_article',
        component: () => import('@/views/author/articles/addForm'),
        meta: { title: 'Add article', icon: 'form' }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/list/index'),
        meta: { title: 'List', icon: 'list' }
      }
      /*
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      } */
    ]
  },
  {
    path: '/requests',
    component: Layout,
    redirect: '/requests/inbox',
    name: 'Requests',
    meta: {
      title: 'Requests',
      icon: 'nested'
    },
    children: [
      {
        path: 'inbox',
        component: () => import('@/views/publisher/requests/inbox/index'),
        name: 'Inbox',
        meta: { title: 'inbox' }
      },
      {
        path: 'reviewed',
        component: () => import('@/views/publisher/requests/reviewed/index'),
        name: 'Reviewed',
        meta: { title: 'reviewed' }
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

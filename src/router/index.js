import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/data-analyze',
    children: [
      {
        path: 'data-analyze',
        component: () => import('@/views/data-analyze/index'),
        name: 'DataAnalyze',
        meta: { title: '资源数据分析', icon: 'chart', affix: true }
      }
    ]
  },
  {
    path: '/hot',
    component: Layout,
    children: [
      {
        path: 'hot',
        component: () => import('@/views/hot/index'),
        name: 'hot',
        meta: { title: '热门排行', icon: 'list', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/resource-show',
    component: Layout,
    redirect: '/resource-show',
    alwaysShow: true, // will always show the root menu
    name: 'ResourceShow',
    meta: {
      title: '资源浏览',
      icon: 'eye',
      roles: ['admin', 'editor', 'teacher', 'student'] // you can set roles in root nav
    },
    children: [
      {
        path: 'WeiKe',
        component: () => import('@/views/resource-show/index'),
        name: 'WeiKe',
        meta: {
          title: '微课资源',
          type_id: 1,
          roles: ['admin', 'editor', 'teacher', 'student'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'Video',
        component: () => import('@/views/resource-show/index'),
        name: 'Video',
        meta: {
          title: '视频资源',
          type_id: 2,
          roles: ['admin', 'editor', 'teacher', 'student']
        }
      },
      {
        path: 'classical',
        component: () => import('@/views/resource-show/index'),
        name: 'classical',
        meta: {
          title: '精品课程',
          type_id: 4,
          roles: ['admin', 'editor', 'teacher']
        }
      },
      {
        path: 'papper',
        component: () => import('@/views/resource-show/index'),
        name: 'Papper',
        meta: {
          title: '技术文献',
          type_id: 5,
          roles: ['admin', 'editor', 'teacher', 'student']
        }
      },
      {
        path: 'satisfactory-classroom',
        component: () => import('@/views/resource-show/index'),
        name: 'SatisfactoryClassroom',
        meta: {
          title: '满意课堂',
          type_id: 6,
          roles: ['admin', 'editor', 'teacher']
        }
      },
      {
        path: 'assessment',
        component: () => import('@/views/resource-show/index'),
        name: 'Assessment',
        meta: {
          title: '专业评估',
          type_id: 3,
          roles: ['admin', 'editor', 'teacher']
        }
      },
      {
        path: 'communication',
        component: () => import('@/views/resource-show/index'),
        name: 'Communication',
        meta: {
          title: '院本交流',
          type_id: 7,
          roles: ['admin', 'editor', 'teacher']
        }
      },
      {
        path: 'project',
        component: () => import('@/views/resource-show/index'),
        name: 'Project',
        meta: {
          title: '院本课题',
          type_id: 8,
          roles: ['admin', 'editor', 'teacher']
        }
      }
    ]
  },
  {
    path: '/mosotech',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/mostech/index'),
        name: 'MosoTeach',
        meta: { title: '蓝墨资源', icon: 'link', roles: ['admin', 'editor', 'teacher', 'student'], noCache: true }
      }
    ]
  },
  {
    path: '/resource-manage',
    component: Layout,
    redirect: '/resource-manage/resource-my',
    alwaysShow: true, // will always show the root menu
    name: 'ResourceManage',
    meta: {
      title: '资源管理',
      icon: 'table',
      roles: ['admin', 'editor', 'teacher'] // you can set roles in root nav
    },
    children: [
      {
        path: 'resource-my',
        component: () => import('@/views/resource-manage/resource-my'),
        name: 'ResourceMy',
        meta: {
          title: '我的资源',
          roles: ['admin', 'editor', 'teacher'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'resource-check',
        component: () => import('@/views/resource-manage/resource-check'),
        name: 'ResourceOthers',
        meta: {
          title: '他人资源',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/about-me',
    component: Layout,
    redirect: '/about-me/my-favorate',
    alwaysShow: true, // will always show the root menu
    name: 'AboutMe',
    meta: {
      title: '与我有关',
      icon: 'user',
      roles: ['admin', 'editor', 'teacher', 'student'] // you can set roles in root nav
    },
    children: [
      {
        path: 'my-favorate',
        component: () => import('@/views/about-me/my-favorate'),
        name: 'MyFavorate',
        hidden: true,
        meta: {
          title: '我的偏好',
          roles: ['admin', 'editor', 'teacher', 'student'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'my-history',
        component: () => import('@/views/about-me/my-history'),
        name: 'MyHistory',
        meta: {
          title: '我的足迹'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'my-collect',
        component: () => import('@/views/about-me/my-collect'),
        name: 'MyCollect',
        meta: {
          title: '我的收藏',
          roles: ['admin', 'editor', 'teacher', 'student']
        }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        hidden: true,
        name: 'PagePermission',
        meta: {
          title: '角色权限设定',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        hidden: true,
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '资源审核权限管理',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: '学院办公自动化系统', icon: 'guide' }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
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

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

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
        meta: { title: '资源数据分析', icon: 'dashboard', affix: true }
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
        meta: { title: '热门排行', icon: 'documentation', affix: true }
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
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'WeiKe',
        component: () => import('@/views/resource-show/index'),
        name: 'WeiKe',
        meta: {
          title: '微课资源',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'Video',
        component: () => import('@/views/resource-show/index'),
        name: 'Video',
        meta: {
          title: '视频资源'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'classical',
        component: () => import('@/views/resource-show/index'),
        name: 'classical',
        meta: {
          title: '精品课程',
          roles: ['admin']
        }
      },
      {
        path: 'papper',
        component: () => import('@/views/resource-show/index'),
        name: 'Papper',
        meta: {
          title: '技术文献',
          roles: ['admin']
        }
      },
      {
        path: 'satisfactory-classroom',
        component: () => import('@/views/resource-show/index'),
        name: 'SatisfactoryClassroom',
        meta: {
          title: '满意课堂',
          roles: ['admin']
        }
      },
      {
        path: 'assessment',
        component: () => import('@/views/resource-show/index'),
        name: 'Assessment',
        meta: {
          title: '专业评估',
          roles: ['admin']
        }
      },
      {
        path: 'communication',
        component: () => import('@/views/resource-show/index'),
        name: 'Communication',
        meta: {
          title: '院本交流',
          roles: ['admin']
        }
      },
      {
        path: 'project',
        component: () => import('@/views/resource-show/index'),
        name: 'Project',
        meta: {
          title: '院本课题',
          roles: ['admin']
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
        component: () => import('@/views/icons/index'),
        name: 'MosoTeach',
        meta: { title: '蓝墨资源', icon: 'icon', roles: ['admin'], noCache: true }
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
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'resource-my',
        component: () => import('@/views/resource-manage/resource-my'),
        name: 'ResourceMy',
        meta: {
          title: '我的资源',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'resource-check',
        component: () => import('@/views/resource-manage/resource-check'),
        name: 'ResourceOthers',
        meta: {
          title: '他人资源',
          roles: ['admin']
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
      icon: 'international',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'my-favorate',
        component: () => import('@/views/about-me/my-favorate'),
        name: 'MyFavorate',
        meta: {
          title: '我的偏好',
          roles: ['admin'] // or you can only set roles in sub nav
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
          roles: ['admin']
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
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        hidden: true,
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
        meta: { title: '学院办公自动化系统', icon: 'link' }
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
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    hidden: true,
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    hidden: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
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

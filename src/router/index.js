import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import notpage from '@/views/404'
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
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const StaticRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
}, {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页',
      icon: 'dashboard',
      affix: true
    }
  }]
}, {
  path: '/basic',
  component: Layout,
  name: 'Basic',
  meta: {
    title: '基础资料',
    icon: 'component'
  },
  children: [{
    path: 'clerk',
    component: () => import('@/views/basic/clerk/index'),
    name: 'Clerk',
    meta: {
      title: '员工管理'
    }
  },{
    path: 'organizational',
    component: () => import('@/views/basic/organizational/index'),
    name: 'Organizational',
    meta: {
      title: '部门管理'
    }
  },{
    path: 'users',
    component: () => import('@/views/system/users/index'),
    name: 'Users',
    meta: {
      title: '用户管理'
    }
  }
  ]
}, {
  path: '/information',
  component: Layout,
  name: 'Information',
  meta: {
    title: '工资管理',
    icon: 'component'
  },
  children: [
    {
      path: 'salary',
      component: () => import('@/views/information/salary/index'),
      name: 'Salary',
      meta: {
        title: '工资表'
      }
    },{
      path: 'socialInsurance',
      component: () => import('@/views/information/socialInsurance/index'),
      name: 'SocialInsurance',
      meta: {
        title: '社保费-职工'
      }
    },{
      path: 'socialInsuranceLD',
      component: () => import('@/views/information/socialInsuranceLD/index'),
      name: 'SocialInsuranceLD',
      meta: {
        title: '社保费-劳务派遣'
      }
    },{
      path: 'providentFund',
      component: () => import('@/views/information/providentFund/index'),
      name: 'ProvidentFund',
      meta: {
        title: '公积金-职工'
      }
    },{
      path: 'providentFundLD',
      component: () => import('@/views/information/providentFundLD/index'),
      name: 'ProvidentFundLD',
      meta: {
        title: '公积金-劳务派遣'
      }
    },{
      path: 'enterpriseAnnuity',
      component: () => import('@/views/information/enterpriseAnnuity/index'),
      name: 'EnterpriseAnnuity',
      meta: {
        title: '企业年金'
      }
    }
  ]
}, {
  path: '/reportForm',
  component: Layout,
  name: 'ReportForm',
  meta: {
    title: '数据报表',
    icon: 'component'
  },
  children: [{
    path: 'projectEmployment',
    component: () => import('@/views/reportForm/projectEmployment/index'),
    name: 'ProjectEmployment',
    meta: {
      title: '项目用工报表'
    }
  },{
    path: 'laborDispatch',
    component: () => import('@/views/reportForm/laborDispatch/index'),
    name: 'LaborDispatch',
    meta: {
      title: '劳务派遣报表'
    }
  },{
    path: 'outsourcingServices',
    component: () => import('@/views/reportForm/outsourcingServices/index'),
    name: 'OutsourcingServices',
    meta: {
      title: '外包服务报表'
    }
  },{
    path: 'personnelStatus',
    component: () => import('@/views/reportForm/personnelStatus/index'),
    name: 'PersonnelStatus',
    meta: {
      title: '人员情况报表'
    }
  }
    /*,{
      path: 'unionDues',
      component: () => import('@/views/reportForm/unionDues/index'),
      name: 'UnionDues',
      meta: {
        title: '工会费报表'
      }
    },{
      path: 'individualIncomeTax',
      component: () => import('@/views/reportForm/individualIncomeTax/index'),
      name: 'IndividualIncomeTax',
      meta: {
        title: '个税报表'
      }
    }
    ,{
      path: 'housingProvidentFund',
      component: () => import('@/views/reportForm/housingProvidentFund/index'),
      name: 'HousingProvidentFund',
      meta: {
        title: '住房公积金报表'
      }
    },{
      path: 'annuity',
      component: () => import('@/views/reportForm/annuity/index'),
      name: 'Annuity',
      meta: {
        title: '年金报表'
      }
    }*/
  ]
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})

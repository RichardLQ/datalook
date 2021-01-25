// @ts-nocheck
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import resultsGeneral from '../components/rights/resultsGeneral.vue'//业绩通史数据
import oneDay from '../components/rights/oneDay.vue'//组员一日数据
// import oneDayData from '../components/conents/oneDayData.vue'//组员一日数据表格
import trackGradient from '../components/rights/trackGradient.vue'//组员跟踪梯度
import intentionDegree from '../components/rights/intentionDegree.vue'//意向度数据面板
import channelPerformance from '../components/rights/channelPerformance.vue'//渠道业绩查看
import grouPremium from '../components/rights/grouPremium.vue'//群保费数据面板



Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to: any): any {
  return VueRouterPush.call(this, to).catch(
    (    err: any) => err
    )
}
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'resultsGeneral',
        name:'resultsGeneral',
        component:resultsGeneral,
      },
      {
        path:'oneDay',
        name:'oneDay',
        component:oneDay
      },
      {
        path:'trackGradient',
        name:'trackGradient',
        component: trackGradient
      },
      {
        path:'intentionDegree',
        name:'intentionDegree',
        component: intentionDegree
      },
      {
        path:'channelPerformance',
        name:'channelPerformance',
        component: channelPerformance
      },
      {
        path:'grouPremium',
        name:'grouPremium',
        component: grouPremium
      },
    ]
  },
  {
    path: '/undefined',
     name: 'Home',
     component: Home,
   },
   {
    path: '/index/',
     name: 'Home',
     component: Home,
   },
   
  // {
  //  path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  /// mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

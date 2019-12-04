// 官方的原件
import Vue from 'vue'
import VueRouter from 'vue-router'
// 自訂的分頁元件
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'
import CustomerOrders from '@/components/pages/CustomerOrders'
import CustomerCheckout from '@/components/pages/CustomerCheckout'
import Orders from '@/components/pages/Orders'
import Coupon from '@/components/pages/Coupon'
import FrontDashboard from '@/components/pages/Front/Dashboard'

// 啟用Vue Router
Vue.use(VueRouter)

// 匯出
export default new VueRouter({
  routes: [
    {
      // 非定義的路徑導向 Login
      path: '*/',
      redirect: 'Login'
    },
    // {
    //   name: 'HelloWorld',
    //   path: '/',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true }
    // },
    {
      name: 'FrontDashboard', // 元件呈現的名稱
      path: '/FrontDashboard', // 對應的虛擬路徑
      component: FrontDashboard // 對應的元件
    },
    {
      name: 'Login', // 元件呈現的名稱
      path: '/Login', // 對應的虛擬路徑
      component: Login // 對應的元件
    },
    {
      name: 'Dashboard',
      path: '/admin',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'Product',
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon
        }
      ]
    },
    {
      name: 'Dashboard',
      path: '/',
      component: Dashboard,
      children: [
        {
          path: 'customer_orders',
          name: 'CustomerOrders',
          component: CustomerOrders
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout
        }
      ]
    }
  ]
})

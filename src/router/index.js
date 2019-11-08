// 官方的原件
import Vue from 'vue'
import VueRouter from 'vue-router'
// 自訂的分頁元件
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'
import CustomerOrders from '@/components/pages/CustomerOrders'

// 啟用Vue Router
Vue.use(VueRouter)

// 匯出
export default new VueRouter({
  routes: [
    {
      // 非定義的路徑導向 Login
      path: '*',
      redirect: 'Login'
    },
    // {
    //   name: 'HelloWorld',
    //   path: '/',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true }
    // },
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
        }
      ]
    }
  ]
})

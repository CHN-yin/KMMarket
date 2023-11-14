import { getLocalStorage } from '@/effect/StorageEffect'
import { createRouter, createWebHashHistory } from 'vue-router'

const isLogin = getLocalStorage('isLogin')

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/HomePage')
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: () => import(/* webpackChunkName: "search" */ '@/views/search/SearchPage')
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: () => import(/* webpackChunkName: "cart" */ '@/views/cart/CartPage')
  },
  {
    path: '/order',
    name: 'OrderPage',
    component: () => import(/* webpackChunkName: "order" */ '@/views/order/OrderPage')
  },
  {
    path: '/my',
    name: 'MyPage',
    component: () => import(/* webpackChunkName: "my" */ '@/views/my/MyPage')
  },
  {
    path: '/address',
    name: 'AddressPage',
    component: () => import(/* webpackChunkName: "address" */ '@/views/address/AddressPage')
  },
  {
    path: '/newAddress',
    name: 'NewAddressPage',
    component: () => import(/* webpackChunkName: "newAddress" */ '@/views/address/NewAddressPage')
  },
  {
    path: '/modifyAddress/:id',
    name: 'ModifyAddress',
    component: () => import(/* webpackChunkName: "newAddress" */ '@/views/address/ModifyAddressPage')
  },
  {
    path: '/pay/:id',
    name: 'PayPage',
    component: () => import(/* webpackChunkName: "pay" */ '@/views/pay/PayPage')
  },
  {
    path: '/shop/:id',
    name: 'ShopPage',
    component: () => import(/* webpackChunkName: "shop" */ '@/views/shop/ShopPage')
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import(/* webpackChunkName: "register" */ '@/views/register/RegisterPage'),
    beforeEnter (to, from, next) {
      isLogin ? next({ name: 'HomePage' }) : next()
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/LoginPage'),
    beforeEnter (to, from, next) {
      isLogin ? next({ name: 'HomePage' }) : next()
    }
  },
  {
    path: '/forget',
    name: 'ForgetPage',
    component: () => import(/* webpackChunkName: "forget" */ '@/views/forget/ForgetPage')
  },
  {
    path: '/changepwd/:id',
    name: 'ChangePwd',
    component: () => import(/* webpackChunkName: "forget" */ '@/views/forget/ChangePwd')
  },
  {
    path: '/replace',
    name: 'ReplacePage',
    component: () => import(/* webpackChunkName: "replace" */ '@/views/replace/ReplacePage')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!isLogin && (to.name !== 'LoginPage' && to.name !== 'RegisterPage' &&
  to.name !== 'ForgetPage' && to.name !== 'ChangePwd' && to.name !== 'HomePage')) {
    next({ name: 'HomePage' })
  } else {
    next()
  }
})

export default router

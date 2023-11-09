import { getLocalStorage, setLocalStorage } from '@/effect/StorageEffect'
import { createStore } from 'vuex'

// 全选、全不选逻辑
const setCartAllChecked = (state, payload, value) => {
  const { shopId } = payload
  const { productList } = state.cartList[shopId]
  for (const i in productList) {
    const product = productList[i]
    product.checked = value
  }
}
// shopId{ shopName: '', productList: { productId: { productInfo } } }
export default createStore({
  state: {
    cartList: getLocalStorage('cartList'),
    addressId: getLocalStorage('addressId')
  },
  getters: {
  },
  mutations: {
    // 添加或减少商品
    handleCartItem (state, payload) {
      const { shopId, shopName, productId, productInfo, num } = payload
      const shopInfo = state.cartList[shopId] || { shopId: '', shopName: '', productList: {} }
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count += num
      product.checked = true
      console.log(product)
      if (product.count <= 0) {
        product.count = 0
        product = ''
      }
      shopInfo.productList[productId] = product
      shopInfo.shopName = shopName
      shopInfo.shopId = shopId
      state.cartList[shopId] = shopInfo
      setLocalStorage('cartList', state.cartList)
    },
    // 商品的复选框
    activeChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.checked = !product.checked
      setLocalStorage('cartList', state.cartList)
    },
    // 商铺清空购物车
    handleAllClear (state, shopId) {
      state.cartList[shopId].productList = {}
      setLocalStorage('cartList', state.cartList)
    },
    // 商铺购物车全选
    handleAllChecked (state, payload) {
      setCartAllChecked(state, payload, true)
      setLocalStorage('cartList', state.cartList)
    },
    // 商铺购物车不全选
    handleAllCheckedNo (state, payload) {
      setCartAllChecked(state, payload, false)
      setLocalStorage('cartList', state.cartList)
    },
    // 提交订单清除当前商铺购物车
    clearCartData (state, shopId) {
      state.cartList[shopId].productList = {}
      setLocalStorage('cartList', state.cartList)
    },
    // 当前地址
    handleOptAppressId (state, id) {
      state.addressId = id
      setLocalStorage('addressId', state.addressId)
    }
  },
  actions: {
  },
  modules: {
  }
})

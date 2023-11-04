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

const setSession = state => {
  const { cartList } = state
  const { addressId } = state
  const cartListString = JSON.stringify(cartList)
  const addressIdString = JSON.stringify(addressId)
  sessionStorage.cartList = cartListString
  sessionStorage.addressId = addressIdString
}

const getSessionCartList = () => {
  try {
    const cartList = JSON.parse(sessionStorage.cartList)
    return cartList
  } catch (e) {
    return {}
  }
}
const getSessionAddresId = () => {
  try {
    const addressId = JSON.parse(sessionStorage.addressId)
    return addressId
  } catch (e) {
    return ''
  }
}

// shopId{ shopName: '', productList: { productId: { productInfo } } }
export default createStore({
  state: {
    cartList: getSessionCartList(),
    addressId: getSessionAddresId()
  },
  getters: {
  },
  mutations: {
    handleCartItem (state, payload) {
      const { shopId, shopName, productId, productInfo, num } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
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
      state.cartList[shopId] = shopInfo
      setSession(state)
    },
    activeChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.checked = !product.checked
      setSession(state)
    },
    handleAllClear (state, shopId) {
      state.cartList[shopId].productList = {}
      setSession(state)
    },
    handleAllChecked (state, payload) {
      setCartAllChecked(state, payload, true)
      setSession(state)
    },
    handleAllCheckedNo (state, payload) {
      setCartAllChecked(state, payload, false)
      setSession(state)
    },
    clearCartData (state, shopId) {
      state.cartList[shopId].productList = {}
      setSession(state)
    },
    handleOptAppressId (state, id) {
      state.addressId = id
      setSession(state)
    }
  },
  actions: {
  },
  modules: {
  }
})

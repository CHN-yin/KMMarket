import { useStore } from 'vuex'
import { computed } from 'vue'

export const useCartNumberEffect = (shopId) => {
  const store = useStore()
  const { cartList } = store.state

  // 购物车数量加减
  const handleCartItem = (shopId, shopName, productId, productInfo, num) => {
    store.commit('handleCartItem', { shopId, shopName, productId, productInfo, num })
  }

  // 购物车商品
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notNullProductsList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) notNullProductsList[i] = product
      console.log(notNullProductsList)
    }
    return notNullProductsList
  })

  // 订单商品
  const payProductList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notNullProductsList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0 && product.checked) notNullProductsList[i] = product
    }
    return notNullProductsList
  })

  // 店铺名字
  const shopName = computed(() => {
    const productList = cartList[shopId]?.shopName || ''
    return productList
  })

  // 购物车 数量 总价 全选
  const cartContent = computed(() => {
    const productList = cartList[shopId]?.productList
    const cartData = { count: 0, price: 0, allChecked: true }
    for (const i in productList) {
      const product = productList[i]
      cartData.count += product.count
      if (product.checked) cartData.price += (product.count * product.price)
      if (product.count > 0 && !product.checked) cartData.allChecked = false
    }
    cartData.price = cartData.price.toFixed(2)
    return cartData
  })

  return { cartList, handleCartItem, productList, shopName, cartContent, payProductList }
}

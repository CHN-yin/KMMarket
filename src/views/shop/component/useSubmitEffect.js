import { cartShow } from './CartComponent.vue'

// 提交订单逻辑
export const useSubmitEffect = (router, toastShow) => {
  const clickJumpPayPage = (cartContent, expressLimit) => {
    const message = '离商家起送价格还差 ￥' + (expressLimit - cartContent.price)
    cartContent.price >= expressLimit ? router.push({ name: 'PayPage' }) : toastShow(message, 3000)
    cartShow.value = false
  }
  return { clickJumpPayPage }
}

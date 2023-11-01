<template>
  <div class="mask">
    <template v-if="!loading">
      <div class="mask__content">
        <h3 class="mask__content__title">确认要离开收银台？</h3>
        <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
        <div class="mask__content__btns">
          <div
            class="mask__content__btn mask__content__btn--first"
            @click="() => handleConfirmOrder(true, addressId)">取消订单</div>
          <div class="mask__content__btn mask__content__btn--last"
            @click="() => handleConfirmOrder(false, addressId)">确认支付</div>
        </div>
      </div>
    </template>
    <template v-else>
      <LoadingComponent />
    </template>
    <ToastComponent v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '@/utils/request'
import { useCartNumberEffect } from '@/effect/CartListEffect'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import ToastComponent, { useToastEffect } from '@/components/toast/ToastComponent.vue'

// 确认订单逻辑
const usePromptEffect = (toastShow) => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  const shopId = route.params.id
  const data = reactive({ loading: false })
  const { shopName, payProductList } = useCartNumberEffect(shopId)

  const products = []
  for (const i in payProductList.value) {
    const product = payProductList.value[i]
    products.push({ id: product._id, num: product.count })
  }

  const handleConfirmOrder = async (isCanceled, addressId) => {
    try {
      data.loading = true
      const result = await post('/api/order', {
        addressId,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        store.commit('clearCartData', shopId)
        toastShow(isCanceled ? '支付失败' : '支付成功')
        setTimeout(() => { router.push({ name: 'OrderPage' }) }, 1000)
      }
    } catch (e) {
      console.log('error')
    }
  }
  const { loading } = toRefs(data)
  return { handleConfirmOrder, loading }
}

export default {
  name: 'PromptComponent',
  components: { LoadingComponent, ToastComponent },
  props: ['addressId'],
  setup () {
    const { show, toastMessage, toastShow } = useToastEffect()
    const { handleConfirmOrder, loading } = usePromptEffect(toastShow)
    return { handleConfirmOrder, loading, show, toastMessage }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
.mask{
  z-index: 3;
  position: fixed;
  left: 0;right: 0;
  top: 0;bottom: 0;
  background: rgba(0,0,0,0.50);
  &__content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 3.01rem;
    height: 1.57rem;
    border-radius: .04rem;
    background-color: $content__bgcolor;
    text-align: center;
    &__title{
      font-size: .18rem;
      color: $content__fontcolor;
      margin-top: .24rem;
    }
    &__desc{
      font-size: .14rem;
      color: $minus__color;
      margin: .08rem 0 .24rem;
    }
    &__btns{
      display: flex;
      justify-content: center;
    }
    &__btn{
      width: .8rem;
      line-height: .32rem;
      border-radius: .16rem;
      text-align: center;
      &--first{
        color: $btn2__color;
        border: 1px solid $btn2__color;
      }
      &--last{
        background: $btn2__color;
        border: 1px solid $btn2__color;
        color: $btn__fontcolor;
        margin-left: .24rem;
      }
    }
  }
}
</style>

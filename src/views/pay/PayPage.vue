<template>
  <div class="wrapper">
    <HeaderComponent />
    <ContentComponent :shopName="shopName" :expressPrice="expressPrice" :productList="payProductList" />
    <SubmitComponent :cartContent="cartContent" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import HeaderComponent from './component/HeaderComponent.vue'
import ContentComponent from './component/ContentComponent.vue'
import SubmitComponent from './component/SubmitComponent.vue'
import { useCartNumberEffect } from '@/effect/CartListEffect'

export default {
  name: 'PayPage',
  components: { HeaderComponent, ContentComponent, SubmitComponent },
  setup () {
    const route = useRoute()
    const { shopId } = route.params
    const { shopName, payProductList, cartContent, expressPrice } = useCartNumberEffect(shopId)
    return { shopId, shopName, payProductList, cartContent, expressPrice }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  bottom: 0;
  overflow: hidden;
}
</style>

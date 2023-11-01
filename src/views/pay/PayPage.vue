<template>
<div class="wrapper">
  <HeaderComponent />
  <ContentComponent :shopName="shopName" :productList="payProductList" />
  <SubmitComponent :cartContent="cartContent" />
</div>
</template>

<script>
import { useRoute } from 'vue-router'
import HeaderComponent from './component/HeaderComponent.vue'
import ContentComponent from './component/ContentComponent.vue'
import SubmitComponent from './component/SubmitComponent.vue'
import { useCartNumberEffect } from '@/effect/CartListEffect'

// 商品显示逻辑
const usePayEffect = () => {
  const route = useRoute()
  const shopId = route.params.id
  const { shopName, payProductList, cartContent } = useCartNumberEffect(shopId)
  return { shopId, shopName, payProductList, cartContent }
}

export default {
  name: 'PayPage',
  components: { HeaderComponent, ContentComponent, SubmitComponent },
  setup () {
    const { shopId, shopName, payProductList, cartContent } = usePayEffect()
    return { shopId, shopName, payProductList, cartContent }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #f8f8f8;
}
</style>

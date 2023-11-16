<template>
  <div class="content">
    <div class="content__btn" @click="handleBackBtn">回到商品列表</div>
    <ProductComponent :shopId="shopId" :shopName="shopName" :cartList="cartList" :list="searchList"
      :expressPrice="expressPrice" :handleCartItem="handleCartItem" v-show="JSON.stringify(searchList) !== '{}'" />
      <div class="content__null" v-show="JSON.stringify(searchList) === '{}'">- 店铺暂无此商品 -</div>
  </div>
</template>

<script>
import ProductComponent from './ProductComponent.vue'
import { useCartNumberEffect } from '@/effect/CartListEffect'

export default {
  name: 'SearchContentComponent',
  props: ['shopId', 'shopName', 'searchList', 'handleBackBtn', 'expressPrice'],
  components: { ProductComponent },
  setup () {
    const { handleCartItem, cartList } = useCartNumberEffect()
    return { handleCartItem, cartList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
.content {
  position: absolute;
  top: 1.49rem;bottom: .5rem;
  left: 0;right: 0;
  padding: 0 .18rem;
  background-color: $content__bgcolor;
  &__btn{
    border: 1px solid $border__bgcolor;
    background-color: $border__bgcolor;
    border-radius: .15rem;
    text-align: center;
    line-height: .3rem;
    font-size: .12rem;
  }
  &__null{
    text-align: center;
    color: #b1b1b1;
    margin-top: .5rem;
  }
}
</style>

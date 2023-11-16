<template>
  <div class="wrapper">
    <div class="header">
      <BackComponent class="back" />
      <img :src="data.productInfo.imgUrl" class="product__pic">
    </div>
    <div class="main">
      <div class="main__header">
        <div class="main__title">{{ data.productInfo.name }}</div>
        <div class="main__subtitle">
          <div class="main__subtitle__left">
            <span class="main__price">&yen;{{ data.productInfo.price }}</span>
            <span class="main__original">&yen;{{ data.productInfo.oldPrice }}</span>
          </div>
          <div class="main__subtitle__right">
            <div class="main__btn" v-show="!(data.cartProduct.count)"
              @click="handleNumberAdd">加入购物车</div>
            <div class="main__number" v-show="data.cartProduct.count">
              <span class="main__number__minus iconfont"
                @click="() =>handleCartItem(shopId, data.shopInfo.name, data.shopInfo.expressPrice,
                productId, data.productInfo, -1)">&#xe840;</span>
              <span class="main__number__num">
                {{ data.cartProduct.count || '' }}</span>
              <span class="main__number__plus iconfont"
                @click="() => handleCartItem(shopId, data.shopInfo.name, data.shopInfo.expressPrice,
                productId, data.productInfo, 1)">&#xe661;</span>
            </div>
          </div>
        </div>
      </div>
      <div class="main__prompt">
        <div class="main__prompt__item iconfont">
          &#xe60d; 支持7天无理由退货(一次性包装破损不支持)
        </div>
      </div>
      <RouterLink :to="`/shop/${shopId}`">
        <div class="main__shop">
          <span class="iconfont main__shop__icon">&#xe736;
            <span class="main__shop__name">{{ data.shopInfo.name }}</span>
          </span>
          <span class="iconfont main__shop__icon">&#xe666;</span>
        </div>
      </RouterLink>
    </div>
  </div>
  <CartComponent :shopName="data.shopInfo.name" :expressPrice="data.shopInfo.expressPrice"
  :expressLimit="data.shopInfo.expressLimit" />
</template>

<script>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '@/utils/request'
import BackComponent from '@/components/back/BackComponent.vue'
import CartComponent from '../shop/component/CartComponent.vue'
import { useCartNumberEffect } from '@/effect/CartListEffect'

const useDetailEffect = (shopId, productId) => {
  const { cartList, handleCartItem } = useCartNumberEffect()

  const shopURL = '/api/shop/' + shopId
  const productURL = '/api/shop/product/' + productId
  const data = reactive({
    shopInfo: {},
    productInfo: {},
    cartProduct: cartList?.[shopId]?.productList?.[productId] || []
  })

  const handleShopInfo = async () => {
    const result = await get(shopURL)
    if (result?.data) {
      data.shopInfo = result.data
    }
  }
  const handleProductInfo = async () => {
    const result = await get(productURL)
    if (result?.data) {
      result.data.forEach(item => { data.productInfo = item })
    }
  }
  const handleNumberAdd = () => {
    handleCartItem(shopId, data.shopInfo.name, data.shopInfo.expressPrice, productId, data.productInfo, 1)
    location.reload()
  }
  handleShopInfo()
  handleProductInfo()
  return { data, cartList, handleCartItem, handleNumberAdd }
}

export default {
  name: 'DetailPage',
  components: { CartComponent, BackComponent },
  setup () {
    const route = useRoute()
    const { shopId, productId } = route.params
    const { data, cartList, handleCartItem, handleNumberAdd } = useDetailEffect(shopId, productId)
    return { shopId, productId, data, cartList, handleCartItem, handleNumberAdd }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixins.scss';

.back {
  position: absolute;
  top: .16rem;
  left: .16rem;
}

.wrapper {
  overflow-y: auto;
  background-color: $border__bgcolor;
}

.header {
  width: 100%;
  height: 3.5rem;

  .product__pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.main {
  &__header {
    width: 100%;
    padding: .1rem;
    background-color: $content__bgcolor;
    border-bottom-left-radius: .15rem;
    border-bottom-right-radius: .15rem;
  }

  &__title {
    font-size: .16rem;
    color: $content__fontcolor;
    @include ellipsis2;
  }

  &__subtitle {
    display: flex;
    justify-content: space-between;
    margin-top: .1rem;
  }

  &__price {
    font-size: .2rem;
    font-weight: bold;
    color: $price__fontcolor;
  }

  &__original {
    font-size: .12rem;
    color: $original__fontcolor;
    text-decoration: line-through;
    margin-left: .1rem;
  }

  &__btn {
    font-size: .12rem;
    padding: .05rem .1rem;
    color: $content__bgcolor;
    text-align: center;
    border-radius: 1rem;
    background-color: $btn2__color;
  }

  &__prompt {
    background-color: #f9f9f9;
    border-radius: .1rem;
    margin-top: .1rem;
    padding: .1rem;

    &__item {
      font-size: .12rem;
      color: #9a9a9a;
    }
  }

  &__shop{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: .5rem;
    border-radius: .1rem;
    padding: 0 .1rem;
    margin-top: .1rem;
    color: $content__fontcolor;
    background-color: $content__bgcolor;
    &__name{
      font-size: .14rem;
    }
  }

  &__number {
    line-height: .23rem;

    &__minus,
    &__plus {
      display: inline-block;
      font-size: .23rem;
      vertical-align: top;
    }

    &__minus {
      color: $minus__color;
      margin-right: .06rem;
    }

    &__plus {
      color: $btn__color;
      margin-left: .06rem;
    }

    &__num {
      display: inline-block;
      font-size: .14rem;
      color: $content__fontcolor;
    }
  }
}
</style>

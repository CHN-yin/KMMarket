<template>
  <template v-if="!loading">
    <div class="wrapper">
      <div class="header">我的全部购物车</div>
      <!-- 购物车为空时显示提示 -->
      <div class="shopCart" v-if="Object.keys(cartShopList).length === 0"
      @scroll="handelTopScroll">
        <div class="prompt">
          <div class="prompt__icon iconfont">&#xe61b;</div>
          <div class="prompt__title">购物车空空如也</div>
          <div class="prompt__describe">更多好物等亲发现呢！快去逛逛吧！</div>
          <RouterLink :to="{ name: 'HomePage' }">
            <div class="prompt__btn">去逛逛</div>
          </RouterLink>
        </div>
      </div>
      <!-- 购物车不为空时 -->
      <div class="shopCart" v-if="Object.keys(cartShopList).length > 0"
        @scroll="handelTopScroll">
        <template v-for="item in cartShopList" :key="item">
          <div class="shop">
            <div class="shop__title">{{ item.shopName }}</div>
            <div class="product">
              <template v-for="(product) in item.productList" :key="product.id">
                <div class="product__item" v-if="product.count > 0">
                  <img :src="product.imgUrl" class="product__pic">
                  <div class="product__detli">
                    <div class="product__detli__title">{{ product.name }}</div>
                    <div class="product__detli__price">
                      <span><span class="yen">&yen;</span>{{ product.price }} x {{ product.count }}</span>
                      <span class="product__detli__price__total"><samp class="yen">&yen;</samp>{{ (product.price * product.count).toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div class="total">
            </div>
          </div>
        </template>
      </div>
    </div>
  </template>
  <template v-else>
    <LoadingComponent />
  </template>
  <ToTopComponent @click="handelTopClick" v-if="showToTop" />
  <DockerComponent :dockerId = 1 />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useCartNumberEffect } from '@/effect/CartListEffect'
import ToTopComponent, { useToTopEffect } from '@/components/totop/ToTopComponent.vue'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import DockerComponent from '@/components/docker/DockerComponent.vue'

// 购物车列表逻辑
const useCartListEffect = () => {
  const { cartList } = useCartNumberEffect()
  const cartData = reactive({ cartShopList: {}, loading: true })
  for (const i in cartList) {
    const cartLists = cartList[i].productList
    if (Object.keys(cartLists).length > 0) {
      cartData.cartShopList[i] = cartList[i]
    }
  }
  setTimeout(() => { cartData.loading = false }, 700)
  const { cartShopList, loading } = toRefs(cartData)
  return { cartShopList, loading }
}
export default {
  nameL: 'CartPage',
  components: { DockerComponent, ToTopComponent, LoadingComponent },
  setup () {
    const contentName = '.shopCart'
    const { handelTopScroll, handelTopClick, showToTop } = useToTopEffect(contentName)
    const { cartShopList, loading } = useCartListEffect()
    return { handelTopScroll, handelTopClick, showToTop, cartShopList, loading }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
.wrapper{
  position: absolute;
  top: 0;
  left: 0;
  bottom: .49rem;
  right: 0;
  background-color: #f8f8f8;
}
.header{
  height: .44rem;
  line-height: .44rem;
  font-size: .16rem;
  color: $content__fontcolor;
  background-color: $content__bgcolor;
  text-align: center;
}
.shopCart{
  position: absolute;
  top: .44rem;
  left: 0;
  right: 0;
  bottom: 0;
  padding: .16rem .18rem;
  overflow-y: scroll;
  }
  // 购物车为空样式
.prompt{
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 2rem;
  background-color: $content__bgcolor;
  border-radius: .1rem;
  box-shadow: 0 4px 8px 0 rgba(159, 161, 162, 0.32);
  overflow: hidden;
  &__icon{
    font-size: .7rem;
    color: #ced6e0;
    margin: .18rem 0 .14rem;
  }
  &__title{
    font-size: .14rem;
    color: $content__fontcolor;
  }
  &__describe{
    font-size: .12rem;
    color: $original__fontcolor;
    margin: .06rem 0;
  }
  &__btn{
    width: 1.2rem;
    line-height: .4rem;
    background-color: $btn__color;
    border-radius: .5rem;
    font-size: .14rem;
    text-align: center;
    color: $btn__fontcolor;
  }
}
 // 购物车不为空样式
.shop{
  border-radius: .04rem;
  background-color: $content__bgcolor;
  padding: .16rem .16rem;
  margin-bottom: .16rem;
  &__title{
    font-size: .16rem;
    color: $content__fontcolor;
  }
  .product{
    &__item{
      display: flex;
      margin-top: .16rem;
    }
    &__pic{
      width: .46rem;
      height: .46rem;
      object-fit: contain;
    }
    &__detli{
      flex: 1;
      margin-left: .16rem;
      &__title{
        font-size: .14rem;
        color: $content__fontcolor;
        margin-bottom: .06rem;
      }
      &__price{
        font-size: .14rem;
        color: $price__fontcolor;
        line-height: .2rem;
        .yen{
          font-size: .12rem;
        }
        &__total{
          float: right;
          color: #000;
        }
      }
    }
  }
}
.total{
  position: relative;
  height: .28rem;
  line-height: .28rem;
  text-align: center;
  font-size: .14rem;
  color: $original__fontcolor;
  background-color: $search__bgcolor;
  margin-top: .22rem;
  .iconfont{
    position: absolute;
    bottom: -.02rem;
    padding-left: .08rem;
  }
  }
</style>

<template>
  <div class="mask" v-if="cartShow && cartContent.count > 0" @click="handleCartShow()"></div>
  <div class="cart">
    <div class="product" v-if="cartShow && cartContent.count > 0">
      <div class="product__header" >
        <div class="product__header__all">
          <span
          class="product__header__all__icon iconfont icon-checked"
          @click="() => handleAllChecked(shopId)"
          v-html="cartContent.allChecked ? '&#xe618;' : '&#xe63e;'"
          ></span>全选
        </div>
        <div class="product__header__clear iconfont"
        @click="() => handleAllClear(shopId)">
             &#xe60f;清空购物车</div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="cartShow && item.count > 0">
          <div class="iconfont icon-checked"
          @click="() => activeChecked(shopId, item._id)"
          v-html="item.checked ? '&#xe618;' : '&#xe63e;'"></div>
          <img :src="item.imgUrl" class="product__pic">
          <div class="product__detil">
            <div class="product__detil__title">{{item.name}}</div>
            <div class="product__detil__price">
              <span class="current">&yen;</span>{{item.price}}
              <span class="original">&yen;{{item.oldPrice }}</span>
            </div>
          </div>
          <div class="product__number">
            <span class="product__number__minus iconfont icon-reduce-btn"
            @click="() => handleCartItem(shopId, shopName, item._id, item, -1)">&#xe840;</span>
            <span class="product__number__num">{{item.count || 0}}</span>
            <span class="product__number__plus iconfont icon-add-btn"
            @click="() => handleCartItem(shopId, shopName, item._id, item, 1)">&#xe661;</span>
          </div>
        </div>
      </template>
      </div>
    <div class="check">
      <div class="check__icon"
      @click="handleCartShow()">
        <img class="check__icon__pic" src="http://www.dell-lee.com/imgs/vue3/basket.png">
        <div class="check__icon__tag" v-if="cartContent.count">{{handleCount}}</div>
        <div class="check__icon__omit" v-if="cartContent.count >= 99">+</div>
      </div>
      <div class="check__info" v-if="!cartContent.count">购物车是空的</div>
      <div class="check__info" v-if="cartContent.count">总计：
        <span class="check__info__totalprice">&yen; {{ cartContent.price }}</span>
      </div>
        <div class="check__btu" @click="() => clickJumpPayPage(cartContent.count)">去结算</div>
    </div>
      <ToastComponent v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useCartNumberEffect } from '@/effect/CartListEffect'
import ToastComponent, { useToastEffect } from '@/components/toast/ToastComponent.vue'

const cartShow = ref(false)

// 购物车逻辑
const useCartEffect = (shopId) => {
  const store = useStore()
  const { handleCartItem, productList, cartContent } = useCartNumberEffect(shopId)

  // 控制数量显示
  const handleCount = computed(() => {
    let count = cartContent.value.count
    if (count >= 99) count = 99
    return count
  })

  // 商品复选框
  const activeChecked = (shopId, productId) => {
    store.commit('activeChecked', { shopId, productId })
  }

  // 全选或不全选
  const handleAllChecked = (shopId) => {
    cartContent.value.allChecked === false ? store.commit('handleAllChecked', { shopId }) : store.commit('handleAllCheckedNo', { shopId })
  }

  // 清空
  const handleAllClear = (shopId) => {
    store.commit('handleAllClear', shopId)
    cartShow.value = false
  }

  return {
    cartContent, handleCount, productList, handleCartItem, activeChecked, handleAllChecked, handleAllClear
  }
}

// 点击显示购物车逻辑
const useCartShowEffect = (toastShow, cartContent) => {
  const handleCartShow = () => {
    cartContent.value.count ? cartShow.value = !cartShow.value : toastShow('购物车是空的')
  }
  return { handleCartShow, cartShow }
}

// 提交订单逻辑
const useSubmitEffect = (router, toastShow) => {
  const clickJumpPayPage = (allCount) => {
    allCount ? router.push({ name: 'PayPage' }) : toastShow('购物车是空的')
    cartShow.value = false
  }
  return { clickJumpPayPage }
}

export default {
  name: 'CartComponent',
  props: ['shopName'],
  components: { ToastComponent },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const shopId = route.params.id
    const { show, toastMessage, toastShow } = useToastEffect()
    const {
      cartContent, handleCount, productList, handleCartItem, activeChecked, handleAllChecked, handleAllClear
    } = useCartEffect(shopId)
    const { handleCartShow, cartShow } = useCartShowEffect(toastShow, cartContent)
    const { clickJumpPayPage } = useSubmitEffect(router, toastShow)

    return {
      shopId, show, toastMessage, cartContent, handleCount, productList, toastShow, cartShow, handleCartItem, activeChecked, handleAllChecked, handleAllClear, handleCartShow, clickJumpPayPage
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
@import '../../../style/mixins.scss';
@keyframes start {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
.mask{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;right: 0;
  background: rgba($color: #000000, $alpha: .5);
  z-index: 1;
}
.cart{
  overflow-y: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}
.check{
  bottom: .49rem;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $content__bgcolor;
  &__icon{
    position: relative;
    &__pic{
      width: .28rem;
      height: .26rem;
      object-fit: cover;
      margin: .12rem .32rem .12rem .24rem;
    }
    &__tag{
      position: absolute;
      top: .03rem;
      right: .23rem;
      width: .2rem;
      height: .2rem;
      background-color: $price__fontcolor;
      border-radius: .1rem;
      font-size: .12rem;
      color: #fff;
      text-align: center;
      line-height: .2rem;
      transform: scale(.6);
    }
    &__omit{
      position: absolute;
      top: -.16rem;
      right: .21rem;
      font-size: .12rem;
      font-weight: bold;
      color: $price__fontcolor;
    }
  }
  &__info{
      flex: 1;
      font-size: .12rem;
      color: $content__fontcolor;
      &__totalprice{
        position: absolute;
        font-weight: bold;
        font-size: .18rem;
        color: $price__fontcolor;
      }
    }
    &__btu{
      width: .98rem;
      background-color: $btn2__color;
      font-size: .14rem;
      color: #fff;
      text-align: center;
    }
}

.product{
  animation: start .5s;
  flex: 1;
  overflow-y: scroll;
  background-color: $content__bgcolor;
  max-height: 4rem;
  border-top-left-radius: .1rem;
    border-top-right-radius: .1rem;
  .icon-checked{
    font-size: .19rem;
    color: $btn__color;
    line-height: .5rem;
  }
  &__header{
    position: absolute;
    left: 0;
    right: 0;
    z-index: 999;
    height: .52rem;
    line-height: .52rem;
    font-size: .14rem;
    color: $content__fontcolor;
    background-color: $content__bgcolor;
    border-top-left-radius: .1rem;
    border-top-right-radius: .1rem;
    border-bottom: .01rem solid $border__bgcolor;
    &__all{
      float: left;
      margin-left: .18rem;
      &__icon{
        display: inline-block;
        line-height: .52rem !important;
        margin-right: .08rem;
        vertical-align: top;
      }
    }
    &__clear{
      font-size: .14rem;
      float: right;
      padding-right: .18rem;
    }
  }
  &__item{
    display: flex;
    position: relative;
    overflow: hidden;
    margin: 0 .18rem .16rem .16rem;
    &:nth-child(2){
      margin-top: .68rem;
    }
  }
  &__pic{
      display: block;
      width: .46rem;
      height: .46rem;
      object-fit: cover;
      margin: 0 0 0 .16rem;
    }
  &__detil{
    flex: 1;
    padding-left: .16rem;
    &__title{
      @include ellipsis;
      font-size: .14rem;
      font-weight: bold;
      color: $content__fontcolor;
    }
    &__price{
      font-size: .14rem;
      color: $price__fontcolor;
      margin: .08rem 0 0 0;
      .current{
        font-size: .1rem;
      }
      .original{
        display: inline-block;
        color: $original__fontcolor;
        font-size: .12rem;
        transform: scale(.9);
        text-decoration: line-through;
        margin-left: .06rem;
      }
    }
  }
  &__number{
    display: block;
    position: absolute;
    right: 0;
    line-height: .5rem;
    &__minus, &__plus{
      display: inline-block;
      font-size: .23rem;
      vertical-align: top;
    }
    &__minus{
      color: $minus__color;
      margin-right: .06rem;
    }
    &__plus{
      color: $btn__color;
      margin-left: .06rem;
    }
    &__num{
      display: inline-block;
      font-size: .14rem;
      color: $content__fontcolor;
    }
  }
}
</style>

<template>
  <template v-if="!loading">
    <div class="wrapper">
      <div class="header">我的订单</div>
      <!-- 订单为空 -->
      <div class="orders" @scroll="handelTopScroll" v-if="list.length <= 0">
        <div class="prompt">
          <div class="prompt__icon iconfont">&#xe8ff;</div>
          <div class="prompt__title">订单空空如也</div>
          <div class="prompt__describe">更多好物等亲发现呢！快去逛逛吧！</div>
          <RouterLink :to="{ name: 'HomePage' }">
            <div class="prompt__btn">去逛逛</div>
          </RouterLink>
        </div>
      </div>
      <!-- 订单不为空 -->
      <div class="orders" @scroll="handelTopScroll" v-if="list.length > 0">
        <div class="order" v-for="(item, index) in list" :key="index">
          <div class="order__title">
            {{ item.shopName }}
            <div class="order__state">
              {{ item.isCanceled ? '已取消' : '已下单' }}
            </div>
          </div>
          <div class="order__content">
            <div class="order__content__imgs">
            <template
            v-for="(innerItem, innerIndex) in item.products" :key="innerIndex">
              <img class="order__content__img" :src="innerItem.product.imgUrl"
              v-if="innerIndex <= 3">
            </template>
            </div>
            <div class="order__content__info">
              <div class="order__content__price">&yen;{{ item.totalPrice.toFixed(2) }}</div>
              <div class="order__content__count">共{{ item.totalNumber }}件</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <LoadingComponent />
  </template>
  <ToTopComponent @click="handelTopClick" v-if="showToTop" />
  <DockerComponent :dockerId="2" />
</template>

<script>
import { get } from '@/utils/request'
import { reactive, toRefs } from 'vue'
import ToTopComponent, { useToTopEffect } from '@/components/totop/ToTopComponent.vue'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import DockerComponent from '@/components/docker/DockerComponent.vue'

// 订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [], loading: true })
  const getOrderList = async () => {
    try {
      const result = await get('api/order')
      if (result?.errno === 0 && result?.data.length) {
        const orderList = result.data
        orderList.forEach(order => {
          const products = order.products || []
          let totalPrice = 0
          let totalNumber = 0
          products.forEach(productsItem => {
            totalPrice += ((productsItem?.product?.price * productsItem?.orderSales) || 0)
            totalNumber += (productsItem?.orderSales) || 0
          })
          order.totalPrice = totalPrice
          order.totalNumber = totalNumber
        })
        data.list = orderList
      }
      data.loading = false
    } catch (e) {
      console.log('api error')
    }
  }
  getOrderList()
  const { list, loading } = toRefs(data)
  return { list, loading }
}

export default {
  name: 'OrderPage',
  components: { DockerComponent, ToTopComponent, LoadingComponent },
  setup () {
    const contentName = '.orders'
    const { handelTopScroll, handelTopClick, showToTop } = useToTopEffect(contentName)
    const { list, loading } = useOrderListEffect()
    return { handelTopScroll, handelTopClick, showToTop, list, loading }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/decknull.scss';
.header{
  line-height: .44rem;
  background-color: $content__bgcolor;
  text-align: center;
  font-size: .16rem;
  color: $content__fontcolor;
}
.orders{
  position: absolute;
  top: .44rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  padding: .16rem .18rem;
  }
  .order{
    height: 1.1rem;
    border-radius: .04rem;
    background-color: $content__bgcolor;
    margin-bottom: .16rem;
    padding: .16rem;
    overflow: hidden;
    &__title{
      font-size: .16rem;
      color: $content__fontcolor;
      margin-bottom: .16rem;
    }
    &__state{
      float: right;
      font-size: .14rem;
      color: $original__fontcolor;
    }
    &__content{
      display: flex;
      justify-content: space-between;
      &__imgs{
        display: flex;
      }
      &__img{
        display: block;
        width: .4rem;
        height: .4rem;
        object-fit: cover;
        margin-right: .12rem;
      }
      &__price{
        font-size: .14rem;
        color: $price__fontcolor;
      }
      &__count{
        font-size: .12rem;
        color: $content__fontcolor;
        text-align: right;
        margin-top: .04rem;
      }
    }
  }
</style>

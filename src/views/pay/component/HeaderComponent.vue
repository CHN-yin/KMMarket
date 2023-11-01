<template>
  <div class="header">
    <BackComponent class="back" />
    <div class="header__title">确认订单</div>
    <div class="header__recipient" @click="handleAddressClick()" >
      <div class="header__recipient__info">
        <div class="header__recipient__title" v-if="!addressShow">选择收货地址</div>
        <div class="header__recipient__title" v-if="addressShow">收货地址</div>
        <div class="header__recipient__address">
          {{ addressOne.city }} {{ addressOne.department }} {{ addressOne.houseNumber }}
        </div>
        <div class="header__recipient__intel">
          <span>{{ addressOne.name }}</span>
          <span>{{ addressOne.phone }}</span>
        </div>
      </div>
      <div class="header__recipient__icon iconfont">&#xe687;</div>
    </div>
  </div>
  <EjectAddressComponent :maskShow="maskShow" :addressList="addressList"
  :clickShow="handleAddressClick" />
</template>

<script>
import EjectAddressComponent from '@/components/eject/EjectAddressComponent.vue'
import BackComponent from '@/components/back/BackComponent.vue'
import { useAddressEffect } from '@/effect/AddressEffect'
import { reactive, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'

// 选择地址逻辑
const useOptAddressEffect = () => {
  const store = useStore()
  const { addressList, addressOne, getAddressOne } = useAddressEffect()
  const data = reactive({ maskShow: false, addressShow: false })

  const handleAddressClick = () => {
    data.maskShow = !data.maskShow
  }

  const handleAddressOne = () => {
    const { addressId } = store.state
    if (addressId) {
      getAddressOne(addressId)
      data.addressShow = !data.addressShow
    }
  }
  const { maskShow, addressShow } = toRefs(data)
  return { maskShow, addressShow, addressList, addressOne, handleAddressClick, handleAddressOne }
}

export default {
  name: 'HeaderComponent',
  components: { BackComponent, EjectAddressComponent },
  setup () {
    const {
      maskShow, addressList, addressOne, addressShow,
      handleAddressClick, handleAddressOne
    } = useOptAddressEffect()
    watchEffect(() => { handleAddressOne() })
    return { maskShow, addressList, addressOne, addressShow, handleAddressClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
@import '../../../style/mixins.scss';
.header{
  height: 1.5rem;
  // text-align: center;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  .back{
    position: absolute;
    left: .18rem;
    margin-top: .16rem;
  }
  &__title{
    display: inline-block;
    width: 100%;
    font-size: .16rem;
    color: $btn__fontcolor;
    text-align: center;
    margin-top: .22rem;
  }
  &__recipient{
    z-index: 2;
    position: absolute;
    top: .75rem;
    left: .18rem;
    right: .18rem;
    display: flex;
    height: 1.11rem;
    border-radius: .04rem;
    background-color: $content__bgcolor;
    padding: .16rem;
    box-shadow: 0 4px 8px 0 rgba(159, 161, 162, 0.32);
    &__info{
      flex: 1;
    }
    &__title{
      font-size: .16rem;
      color: $content__fontcolor;
    }
    &__address{
      font-size: .14rem;
      color: $content__fontcolor;
      margin: .14rem 0 .06rem 0;
      @include ellipsis;
    }
    &__intel{
      font-size: .12rem;
      color: $minus__color;
      span + span{
        margin-left: .06rem;
      }
    }
    &__icon{
      font-size: .2rem;
      color: $minus__color;
      line-height: .79rem;
    }
  }
}
</style>

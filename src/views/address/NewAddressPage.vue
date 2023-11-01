<template>
  <div class="wrapper">
    <div class="header">
      <BackComponent class="back" />
      <span>新建收货地址</span>
      <span class="add" @click="postAddressList()">保存</span>
    </div>
    <div class="content">
      <div class="item">
        所在城市：
        <input type="text" class="item__input" placeholder="如××省××市××区"   v-model="city">
      </div>
      <div class="item">
        小区/大厦/学校：
        <input type="text" class="item__input" placeholder="如××小区"   v-model="department">
      </div>
      <div class="item">
        楼号-门牌号：
        <input type="text" class="item__input" placeholder="×号楼×层"   v-model="houseNumber">
      </div>
      <div class="item">
        收货人：
        <input type="text" class="item__input" placeholder="请填写收货人的姓名"   v-model="name">
      </div>
      <div class="item">
        联系电话：
        <input type="text" class="item__input" placeholder="请填写收货手机号"   v-model="phone">
      </div>
    </div>
  </div>
  <ToastComponent v-if="show" :message="toastMessage" />
</template>

<script>
import BackComponent from '@/components/back/BackComponent.vue'
import ToastComponent, { useToastEffect } from '@/components/toast/ToastComponent.vue'
import { useAddressEffect } from '@/effect/AddressEffect'

export default {
  name: 'NewAddresspage',
  components: { BackComponent, ToastComponent },
  setup () {
    const { show, toastMessage, toastShow } = useToastEffect()
    const {
      city, department, houseNumber, name, phone,
      postAddressList
    } = useAddressEffect(toastShow)
    return { city, department, houseNumber, name, phone, show, toastMessage, postAddressList }
  }
}
</script>

<style lang="scss" scoped>
@import './address.scss';
</style>

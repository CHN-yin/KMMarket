<template>
  <template v-if="!loading">
    <div class="wrapper">
      <div class="header">
        <BackComponent class="back" />
        <span>管理收货地址</span>
        <RouterLink :to="{ name: 'NewAddressPage' }">
          <span class="add">新建</span>
        </RouterLink>
      </div>
      <AddressListComponent :addressList="addressList" />
    </div>
  </template>
  <template v-else>
    <LoadingComponent />
  </template>
</template>

<script>
import BackComponent from '@/components/back/BackComponent.vue'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import AddressListComponent from './component/AddressListComponent.vue'
import { useAddressEffect } from '@/effect/AddressEffect'

export default {
  name: 'AddressPage',
  components: { BackComponent, AddressListComponent, LoadingComponent },
  setup () {
    const { addressList, loading } = useAddressEffect()
    return { addressList, loading }
  }
}
</script>

<style lang="scss" scoped>
@import './address.scss';
</style>

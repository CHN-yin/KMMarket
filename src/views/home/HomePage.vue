<template>
  <template v-if="!loading">
    <div class="wrapper" @scroll="handelTopScroll">
      <HeaderComponent
      :showSearch="showSearch"
      :navList="navList"
      :bannerList="bannerList"
      :addressShow="addressShow"
      :addressOne="addressOne"
      :clickShow="handleAddressClick"/>
      <NearbyComponent />
    </div>
  </template>
  <template v-else>
    <LoadingComponent />
  </template>
  <EjectAddressComponent :maskShow="maskShow" :addressList="addressList"
    :clickShow="handleAddressClick"/>
  <ToTopComponent @click="handelTopClick" v-if="showToTop" />
  <DockerComponent :dockerId = 0 />
</template>

<script>
import EjectAddressComponent from '@/components/eject/EjectAddressComponent.vue'
import ToTopComponent, { useToTopEffect } from '@/components/totop/ToTopComponent.vue'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import DockerComponent from '@/components/docker/DockerComponent.vue'
import HeaderComponent from './component/HeaderComponent.vue'
import NearbyComponent from './component/NearbyComponent.vue'
import { useAddressEffect } from '@/effect/AddressEffect'
import { reactive, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { get } from '@/utils/request'

// 获取头部内容
const useHeaderEffect = () => {
  const data = reactive({ navList: [], bannerList: [], loading: true })
  const getHeaderContent = async () => {
    const result = await get('/api/header')
    if (result?.errno === 0 && result?.data) {
      data.navList = result.data.nav
      data.bannerList = result.data.banner
    }
    data.loading = false
  }
  getHeaderContent()
  const { navList, bannerList, loading } = toRefs(data)
  return { navList, bannerList, loading }
}

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
      data.addressShow = true
    }
  }
  const { maskShow, addressShow } = toRefs(data)
  return { maskShow, addressShow, addressList, addressOne, handleAddressClick, handleAddressOne }
}

export default {
  name: 'HomePage',
  components: { HeaderComponent, NearbyComponent, DockerComponent, ToTopComponent, LoadingComponent, EjectAddressComponent },
  setup () {
    const contentName = '.wrapper'
    const {
      handelTopScroll, handelTopClick, showToTop, showSearch
    } = useToTopEffect(contentName)
    const { navList, bannerList, loading } = useHeaderEffect()
    const {
      maskShow, addressList, addressOne, addressShow,
      handleAddressClick, handleAddressOne
    } = useOptAddressEffect()
    watchEffect(() => { handleAddressOne() })
    return { handelTopScroll, handelTopClick, handleAddressClick, showToTop, showSearch, navList, bannerList, loading, maskShow, addressList, addressOne, addressShow }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style//variable.scss';
.wrapper{
  overflow-y: scroll;
}
</style>

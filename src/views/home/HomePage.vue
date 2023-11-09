<template>
  <NoLoginComponent :warnShow="data.warnShow" :handleWarnDelete="handleWarnDelete" />
  <div @click="handleWarnShow">
    <template v-if="!data.loading">
      <div class="wrapper" @scroll="handelTopScroll">
        <HeaderComponent :showSearch="showSearch" :navList="data.navList" :bannerList="data.bannerList"
          :addressShow="data.addressShow" :addressOne="addressOne" :clickShow="handleAddressClick" />
        <NearbyComponent />
      </div>
    </template>
    <template v-else>
      <LoadingComponent />
    </template>
    <EjectAddressComponent :maskShow="data.maskShow" :addressList="addressList" :clickShow="handleAddressClick" />
    <ToTopComponent @click="handelTopClick" v-if="showToTop" />
    <DockerComponent :dockerId=0 />
  </div>
</template>

<script>
import EjectAddressComponent from '@/components/eject/EjectAddressComponent.vue'
import ToTopComponent, { useToTopEffect } from '@/components/totop/ToTopComponent.vue'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import DockerComponent from '@/components/docker/DockerComponent.vue'
import HeaderComponent from './component/HeaderComponent.vue'
import NearbyComponent from './component/NearbyComponent.vue'
import NoLoginComponent from './component/NoLoginComponent.vue'
import { useAddressEffect } from '@/effect/AddressEffect'
import { reactive, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { get } from '@/utils/request'
import { getLocalStorage } from '@/effect/StorageEffect'

const useHomeEffect = (isLogin, getAddressOne) => {
  const data = reactive({
    navList: [],
    bannerList: [],
    loading: true,
    warnShow: false,
    maskShow: false,
    addressShow: false
  })

  // 获取头部内容
  const getHeaderContent = async () => {
    const result = await get('/api/header')
    if (result?.errno === 0 && result?.data) {
      data.navList = result.data.nav
      data.bannerList = result.data.banner
    }
    data.loading = false
  }

  // 用户是否登录验证
  if (!isLogin) data.warnShow = !data.warnShow
  const handleWarnDelete = () => {
    data.warnShow = !data.warnShow
  }
  const handleWarnShow = () => {
    if (isLogin) return
    if (data.warnShow) return data.warnShow
    data.warnShow = !data.warnShow
  }

  // 选择地址逻辑
  const store = useStore()
  const handleAddressClick = () => {
    if (isLogin) data.maskShow = !data.maskShow
  }
  const handleAddressOne = () => {
    const { addressId } = store.state
    if (addressId && isLogin) {
      getAddressOne(addressId)
      data.addressShow = true
    }
  }

  watchEffect(() => { getHeaderContent() })
  watchEffect(() => { handleAddressOne() })
  return { data, handleWarnShow, handleWarnDelete, handleAddressClick }
}

export default {
  name: 'HomePage',
  components: {
    HeaderComponent, NearbyComponent, DockerComponent, ToTopComponent, LoadingComponent, EjectAddressComponent, NoLoginComponent
  },
  setup () {
    const contentName = '.wrapper'
    const isLogin = getLocalStorage('isLogin')
    const { addressList, addressOne, getAddressOne } = useAddressEffect()
    const {
      data, handleWarnShow, handleWarnDelete, handleAddressClick
    } = useHomeEffect(isLogin, getAddressOne)
    const {
      handelTopScroll, handelTopClick, showToTop, showSearch
    } = useToTopEffect(contentName)
    return {
      data, showToTop, showSearch, addressList, addressOne, handelTopScroll, handelTopClick, handleAddressClick, handleWarnDelete, handleWarnShow
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style//variable.scss';

.wrapper {
  overflow-y: scroll;
}
</style>

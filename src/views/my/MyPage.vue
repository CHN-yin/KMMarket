<template>
  <template v-if="!loading">
    <div class="wrapper">
      <HeaderComponent :infoList="infoList" />
      <ListComponent />
    </div>
  </template>
  <template v-else>
      <LoadingComponent />
  </template>
    <DockerComponent :dockerId="3" />
</template>

<script>
import { reactive, toRefs, watchEffect } from 'vue'
import { get } from '@/utils/request'
import HeaderComponent from './component/HeaderComponent.vue'
import ListComponent from './component/ListComponent.vue'
import DockerComponent from '@/components/docker/DockerComponent.vue'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'

// 获取用户信息
const useUserInfo = () => {
  const data = reactive({ infoList: {}, loading: true })
  const getUserInfo = async () => {
    const result = await get('/api/user/info')
    if (result?.errno === 0 && result?.data) {
      data.infoList = result.data
    }
    data.loading = false
  }
  watchEffect(() => { getUserInfo() })
  const { infoList, loading } = toRefs(data)
  return { infoList, loading }
}

export default {
  name: 'MyPage',
  components: { HeaderComponent, ListComponent, DockerComponent, LoadingComponent },
  setup () {
    const { infoList, loading } = useUserInfo()
    return { infoList, loading }
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
  background-color: $content__bgcolor;
  overflow-y: scroll;
}
</style>

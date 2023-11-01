<template>
  <div class="wrapper">
    <HeaderComponent :infoList="infoList" />
    <ListComponent />
  </div>
  <DockerComponent :dockerId="3" />
</template>

<script>
import { reactive, toRefs, watchEffect } from 'vue'
import { get } from '@/utils/request'
import HeaderComponent from './component/HeaderComponent.vue'
import ListComponent from './component/ListComponent.vue'
import DockerComponent from '@/components/docker/DockerComponent.vue'

// 获取用户信息
const useUserInfo = () => {
  const data = reactive({ infoList: {} })
  const getUserInfo = async () => {
    const result = await get('/api/user/info')
    if (result?.errno === 0 && result?.data) {
      data.infoList = result.data
    }
  }
  watchEffect(() => { getUserInfo() })
  const { infoList } = toRefs(data)
  return { infoList }
}

export default {
  name: 'MyPage',
  components: { HeaderComponent, ListComponent, DockerComponent },
  setup () {
    const { infoList } = useUserInfo()
    return { infoList }
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

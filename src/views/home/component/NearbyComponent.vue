<template>
  <div class="nearby">
    <div class="nearby__title">精选店铺</div>
    <template v-if="!loading">
      <RouterLink v-for="item in nearbyList" :key="item._id" :to="`/shop/${item._id}`">
        <ShopCompoent :item="item" :lineShow="true" />
      </RouterLink>
    </template>
    <template v-else>
      <SkeletonComponent />
    </template>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '@/utils/request'
import SkeletonComponent from '@/components/loading/SkeletonComponent'
import ShopCompoent from '@/components/shop/ShopCompoent.vue'

// 获取附近门铺
const useNearbyList = () => {
  const nearbyList = ref([])
  const loading = ref(true)
  const URL = '/api/shop/hot-list'

  const getNearbyList = async () => {
    try {
      const result = await get(URL)
      if (result?.errno === 0 && result?.data.length) {
        nearbyList.value = result.data
      }
      setTimeout(() => {
        loading.value = false
      }, 200)
    } catch (e) {
      console.log('errno')
    }
  }
  return { nearbyList, getNearbyList, loading }
}

export default {
  name: 'NearbyComponent',
  components: { ShopCompoent, SkeletonComponent },
  setup () {
    const { nearbyList, getNearbyList, loading } = useNearbyList()
    getNearbyList()
    return { nearbyList, loading }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';

.nearby {
  padding: 0 .18rem;
  margin-bottom: .5rem;
  background-color: $content__bgcolor;

  &__title {
    font-size: .18rem;
    padding: .16rem 0 .14rem 0;
    color: $content__fontcolor;
    font-weight: bold;
  }
}
</style>

<template>
  <template v-if="!loading">
    <div class="wrapper">
      <SearchComponent />
      <ShopCompoent :item="item" :lineShow="false" class="shop"/>
      <ContentComponent :shopName="item.name"/>
      <CartComponent :shopName="item.name"/>
    </div>
  </template>
  <template v-else>
    <LoadingComponent />
  </template>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, toRefs, watchEffect } from 'vue'
import { get } from '@/utils/request'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import ShopCompoent from '@/components/shop/ShopCompoent.vue'
import SearchComponent from './component/SearchComponent.vue'
import ContentComponent from './component/ContentComponent.vue'
import CartComponent from './component/CartComponent.vue'

// 请求店铺信息逻辑
const useShopItemEffect = () => {
  const route = useRoute()
  const shopId = route.params.id
  const URL = '/api/shop/' + shopId
  const data = reactive({ item: {}, loading: true })
  const getShopItem = async () => {
    const result = await get(URL)
    if (result?.errno === 0 || result.data) {
      data.item = result.data
    }
    data.loading = false
  }
  watchEffect(() => { getShopItem() })
  const { item, loading } = toRefs(data)
  return { item, loading }
}

export default {
  name: 'ShopPage',
  components: { SearchComponent, ShopCompoent, ContentComponent, CartComponent, LoadingComponent },
  setup () {
    const { item, loading } = useShopItemEffect()

    return { item, loading }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
.wrapper{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: $content__bgcolor;
  padding: 0 .18rem;
  overflow: hidden;
}
.shop{
  margin-bottom: .16rem;
}
</style>

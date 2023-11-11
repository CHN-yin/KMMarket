<template>
  <div class="content">
    <div class="nav">
      <div v-for="item in categories" :key="item.tab" @click="() => { handleNavClick(item.tab) }"
        :class="{ nav__item: true, 'nav__item--active': currentTab === item.tab }">{{ item.name }}</div>
    </div>
    <div class="product">
      <template v-if="!loading">
        <ProductComponent :shopId="shopId" :shopName="shopName" :cartList="cartList" :list="contentList"
          :handleCartItem="handleCartItem" />
      </template>
      <template v-else>
        <SkeletonComponent />
      </template>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { get } from '@/utils/request'
import { useCartNumberEffect } from '@/effect/CartListEffect'
import SkeletonComponent from '@/components/loading/SkeletonComponent'
import ProductComponent from './ProductComponent.vue'

const categories = [
  {
    name: '全部商品',
    tab: 'all'
  }, {
    name: '秒杀',
    tab: 'seckill'
  }, {
    name: '新鲜水果',
    tab: 'fruit'
  }, {
    name: '休闲食品',
    tab: 'snacks'
  }, {
    name: '时令蔬菜',
    tab: 'vegetable'
  }, {
    name: '蛋肉家禽',
    tab: 'meat'
  }
]
// 分类导航点击跳转逻辑
const useHandleNavClickEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleNavClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleNavClick }
}
// 发送请求获取商品内容逻辑
const useContenrListEffect = (currentTab, shopId) => {
  const URL = '/api/shop/' + shopId + '/products'
  const data = reactive({
    contentList: [],
    loading: true
  })
  const getContentList = async () => {
    data.loading = true
    const result = await get(URL, { tab: currentTab.value })
    if (result?.errno === 0 && result?.data) {
      data.contentList = result.data
    }
    setTimeout(() => {
      data.loading = false
    }, 500)
  }
  watchEffect(() => { getContentList() })
  const { contentList, loading } = toRefs(data)
  return { contentList, loading }
}

export default {
  name: 'ContentComponent',
  props: ['shopName'],
  components: { SkeletonComponent, ProductComponent },
  setup () {
    const rotue = useRoute()
    const shopId = rotue.params.id

    const { currentTab, handleNavClick } = useHandleNavClickEffect()
    const { contentList, loading } = useContenrListEffect(currentTab, shopId)
    const { handleCartItem, cartList } = useCartNumberEffect()

    return { currentTab, contentList, categories, cartList, shopId, loading, handleNavClick, handleCartItem }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
@import '../../../style/mixins.scss';

.content {
  display: flex;
  position: absolute;
  top: 1.49rem;
  bottom: .5rem;
  left: 0;
  right: 0;
  background-color: $content__bgcolor;
}

.nav {
  width: .76rem;
  overflow-y: auto;
  background-color: $search__bgcolor;
  text-align: center;

  &__item {
    color: $content__fontcolor;
    font-size: .14rem;
    line-height: .4rem;
    border-radius: .02rem;

    &--active {
      background-color: $content__bgcolor;
    }
  }
}

.product {
  flex: 1;
  overflow-y: auto;
  background-color: $content__bgcolor;
  padding: 0 .18rem 0 .16rem;
}
</style>

<template>
  <template v-if="!data.loading">
    <div class="wrapper">
      <div class="search">
        <BackComponent />
        <div class="search__content">
          <i class="iconfont icon-sousuo search__content__icon">&#xe752;</i>
          <input v-model="data.searchValue" class="search__content__input" placeholder="请输入商品名称搜索">
          <span class="search__content__btn" @click="handleSearchBtn">搜索</span>
        </div>
      </div>
      <ShopCompoent :item="data.item" :lineShow="false" class="shop" />
      <ContentComponent :shopName="data.item.name" :expressPrice="data.item.expressPrice"
      v-if="!data.searchShow" />
      <SearchContentComponent :shopName="data.item.name" :expressPrice="data.item.expressPrice"
      :shopId="shopId" :searchList="data.searchList" :handleBackBtn="handleBackBtn"
      v-if="data.searchShow" />
      <CartComponent :shopName="data.item.name" :expressLimit="data.item.expressLimit"
      :expressPrice="data.item.expressPrice" />
    </div>
  </template>
  <template v-else>
    <LoadingComponent />
  </template>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, watchEffect } from 'vue'
import { get, post } from '@/utils/request'
import BackComponent from '@/components/back/BackComponent.vue'
import LoadingComponent from '@/components/loading/LoadingComponent.vue'
import ShopCompoent from '@/components/shop/ShopCompoent.vue'
import SearchContentComponent from './component/SearchContentComponent.vue'
import ContentComponent from './component/ContentComponent.vue'
import CartComponent from './component/CartComponent.vue'

// 店铺信息及商品搜索逻辑
const useShopEffect = () => {
  const route = useRoute()
  const { shopId } = route.params
  const productURL = '/api/shop/' + shopId
  const searchURL = '/api/shop/' + shopId + '/search'
  const data = reactive({
    item: {}, searchList: {}, searchValue: null, searchShow: false, loading: true
  })

  const getShopItem = async () => {
    const result = await get(productURL)
    if (result?.errno === 0 || result.data) {
      data.item = result.data
    }
    data.loading = false
  }
  watchEffect(() => { getShopItem() })

  const handleSearchBtn = async () => {
    if (data.searchValue === null) return
    const result = await post(searchURL, {
      searchValue: data.searchValue
    })
    if (result?.data || result?.errno === 0) {
      data.searchList = result.data
      data.searchShow = true
    } else {
      data.searchList = {}
      data.searchShow = true
    }
  }

  const handleBackBtn = () => {
    data.searchShow = !data.searchShow
  }
  return { data, shopId, handleSearchBtn, handleBackBtn }
}

export default {
  name: 'ShopPage',
  components: { BackComponent, ShopCompoent, ContentComponent, CartComponent, LoadingComponent, SearchContentComponent },
  setup () {
    const { data, shopId, handleSearchBtn, handleBackBtn } = useShopEffect()

    return { data, shopId, handleSearchBtn, handleBackBtn }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';

.wrapper {
  bottom: 0;
  background-color: $content__bgcolor;
  padding: 0 .18rem;
}

.search {
  display: flex;
  padding: .16rem 0;

  &__content {
    flex: 1;
    display: flex;
    height: .32rem;
    border-radius: .16rem;
    background-color: $search__bgcolor;

    &__icon {
      width: .43rem;
      font-size: .16rem;
      color: $search__fontcolor;
      text-align: center;
      line-height: .32rem;
    }

    &__input {
      flex: 1;
      outline: none;
      border: none;
      background: none;
      font-size: .14rem;
      color: $content__fontcolor;

      &::placeholder {
        color: $content__fontcolor;
      }
    }

    &__btn {
      width: .5rem;
      border-radius: .15rem;
      margin: .03rem;
      font-size: .12rem;
      text-align: center;
      line-height: .26rem;
      background-color: $btn2__color;
    }
  }
}

.shop {
  margin-bottom: .16rem;
}
</style>

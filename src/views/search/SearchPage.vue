<template>
  <div class="wrapper">
    <div class="header">
      <BackComponent />
      <div class="search">
        <input type="text" class="search__input" v-model="data.searchValue" placeholder="请搜索附近的商家">
        <span class="search__btn" @click="handelSearchClick">搜索</span>
      </div>
    </div>
    <div class="content">
      <template v-if="data.searchShow">
        <div class="content__title" v-show="data.message !== null">{{ data.message }}</div>
        <div class="content__title" v-show="data.message === null">请输入搜索内容</div>
      </template>
      <template v-if="!data.searchShow">
        <RouterLink v-for="item in data.shopList" :key="item._id" :to="`/shop/${item._id}`">
          <ShopCompoent :item="item" :lineShow="true" />
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<script>
import { post } from '@/utils/request'
import { reactive } from 'vue'
import BackComponent from '@/components/back/BackComponent.vue'
import ShopCompoent from '@/components/shop/ShopCompoent.vue'

const useSearchEffect = () => {
  const data = reactive({
    searchValue: null,
    searchShow: true,
    shopList: {},
    message: null
  })
  const handelSearchClick = async () => {
    if (data.searchValue === null) return
    const result = await post('/api/shop/search', {
      searchValue: data.searchValue
    })
    if (result?.data && result?.errno === 0) {
      data.shopList = result.data
      data.searchShow = false
    } else {
      data.message = result.message
      data.searchShow = true
    }
  }
  return { data, handelSearchClick }
}

export default {
  name: 'SearchPage',
  components: { BackComponent, ShopCompoent },
  setup () {
    const { data, handelSearchClick } = useSearchEffect()
    return { data, handelSearchClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';

.wrapper {
  bottom: 0;
}

.header {
  display: flex;
  align-items: center;
  padding: .1rem;
}

.search {
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid $btn2__color;
  border-radius: .5rem;
  font-size: .16rem;

  &__input {
    flex: 1;
    height: .2rem;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0 .1rem;
    font-size: .14rem;
  }

  &__input::placeholder {
    color: $search__fontcolor;
  }

  &__btn {
    width: .55rem;
    height: .32rem;
    line-height: .32rem;
    text-align: center;
    background-color: $btn2__color;
    border-radius: .15rem;
    margin: .02rem;
  }
}

.content {
  position: absolute;
  top: .58rem;
  bottom: 0;
  right: 0;
  left: 0;
  padding: .16rem .16rem;
  background-color: $content__bgcolor;
  overflow-y: auto;

  &__title {
    text-align: center;
    font-size: .14rem;
    color: #b1b1b1;
  }
}
</style>

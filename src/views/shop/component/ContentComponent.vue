<template>
  <div class="content">
      <div class="nav">
        <div
        v-for="item in categories" :key="item.tab"
        @click="() => {handleNavClick(item.tab)}"
        :class="{nav__item: true, 'nav__item--active': currentTab === item.tab}"
        >{{item.name}}</div>
      </div>
      <div class="product">
        <template v-if="!loading">
          <div class="product__item" v-for="item in contentList" :key="item._id">
            <img :src="item.imgUrl" class="product__pic">
            <div class="product__detil">
              <div class="product__detil__title">{{ item.name }}</div>
              <div class="product__detil__sales">月售{{ item.sales }}</div>
              <div class="product__detil__price">
                <span class="current">&yen;</span>{{ item.price }}
                <span class="original">&yen;{{ item.oldPrice }}</span>
              </div>
            </div>
            <div class="product__number">
              <span class="product__number__minus iconfont icon-reduce-btn"
              @click="() => handleCartItem(shopId, shopName, item._id, item, -1)"
              v-if="cartList?.[shopId]?.productList?.[item._id]?.count">&#xe840;</span>
               <span class="product__number__num">
                {{ cartList?.[shopId]?.productList?.[item._id]?.count || '' }}</span>
              <span class="product__number__plus iconfont icon-add-btn"
              @click="() => handleCartItem(shopId, shopName, item._id, item, 1)">&#xe661;</span>
            </div>
          </div>
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
  components: { SkeletonComponent },
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
.content{
  display: flex;
  position: absolute;
  top: 1.49rem;
  bottom: .5rem;
  left: 0;
  right: 0;
  background-color: $content__bgcolor;
}
.nav{
  width: .76rem;
  overflow-y: scroll;
  background-color: $search__bgcolor;
  text-align: center;
  &__item{
    color: $content__fontcolor;
    font-size: .14rem;
    line-height: .4rem;
    border-radius: .02rem;
    &--active{
      background-color: $content__bgcolor;
    }
  }
}
.product{
  flex: 1;
  overflow-y: scroll;
  background-color: $content__bgcolor;
  padding: 0 .18rem 0 .16rem;
  &__item{
    display: flex;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid $border__bgcolor;
    margin: .12rem 0 0 0;
  }
  &__pic{
      display: block;
      width: .68rem;
      height: .68rem;
      object-fit: cover;
      margin-bottom: .12rem;
    }
  &__detil{
    flex: 1;
    padding-left: .16rem;
    margin-bottom: .12rem;
    &__title{
      @include ellipsis;
      font-size: .14rem;
      font-weight: bold;
      color: $content__fontcolor;
    }
    &__sales{
      font-size: .12rem;
      margin: .09rem 0;
      color: $content__fontcolor;
    }
    &__price{
      font-size: .14rem;
      color: $price__fontcolor;
      .current{
        font-size: .1rem;
      }
      .original{
        display: inline-block;
        color: $original__fontcolor;
        font-size: .12rem;
        transform: scale(.9);
        text-decoration: line-through;
        margin-left: .06rem;
      }
    }
  }
  &__number{
    position: absolute;
    right: 0;
    bottom: .12rem;
    line-height: .23rem;
    &__minus, &__plus{
      display: inline-block;
      font-size: .23rem;
      vertical-align: top;
    }
    &__minus{
      color: $minus__color;
      margin-right: .06rem;
    }
    &__plus{
      color: $btn__color;
      margin-left: .06rem;
    }
    &__num{
      display: inline-block;
      font-size: .14rem;
      color: $content__fontcolor;
    }
  }
}
.number--active{
  display: none;
}
</style>

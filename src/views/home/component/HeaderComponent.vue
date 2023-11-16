<template>
  <div class="header">
    <div class="position">
      <div class="position__address" @click="clickShow()">
        <i class="iconfont icon-dizhi">&#xe91b;</i>
        <span v-if="addressShow">{{ addressOne.department }}</span>
        <span class="position__btn" v-if="!addressShow">选择地址</span>
      </div>
      <i class="iconfont icon-xiaoxi">&#xe676;</i>
    </div>
    <!-- :class="{'search':!showSearch, 'search-active':showSearch } -->
    <RouterLink :to="{ name: 'SearchPage' }">
      <div class="search">
        <i class="iconfont icon-sousuo">&#xe752;</i>
        <samp class="search__title">山姆会员商店</samp>
      </div>
      <div class="search__top" v-if="showSearch">
        <div class="search">
          <i class="iconfont icon-sousuo">&#xe752;</i>
          <samp class="search__title">山姆会员商店</samp>
        </div>
      </div>
    </RouterLink>
    <BannerComponent :bannerList="bannerList" />
    <div class="nav">
      <div class="nav__item" v-for="(item, index) in navList" :key="index">
        <RouterLink :to="{ name: 'ReplacePage' }">
          <img class="nav__item__pic" :src="item.imgUrl">
          <samp class="nav__item__desc">{{ item.desc }}</samp>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import BannerComponent from './BannerComponent.vue'

export default {
  name: 'HeaderComponent',
  props: [
    'showSearch', 'navList', 'bannerList',
    'addressShow', 'addressOne', 'clickShow'
  ],
  components: { BannerComponent }
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
@import '../../../style/mixins.scss';

.header {
  background-color: $content__bgcolor;
  padding: 0 .18rem;
  margin-bottom: .1rem;
}

.position {
  position: relative;
  padding: .16rem .24rem 0 0;
  margin-bottom: .16rem;
  line-height: .22rem;
  font-size: .16rem;
  color: $content__fontcolor;
  @include ellipsis;

  &__btn {
    padding: 0.02rem .06rem;
    border-radius: .8rem;
    background-color: $btn2__color;
    font-size: .14rem;
    color: $btn__fontcolor;
  }

  .icon-dizhi {
    position: relative;
    font-size: .2rem;
    font-weight: bold;
    margin-right: .07rem;
    vertical-align: top;
  }

  .icon-xiaoxi {
    position: absolute;
    right: 0;
    top: .16rem;
    font-size: .2rem;
    vertical-align: top;
  }
}

.search {
  height: .32rem;
  background-color: $search__bgcolor;
  border-radius: .16rem;
  color: $search__fontcolor;

  .icon-sousuo {
    display: inline-block;
    font-size: .16rem;
    margin: .08rem .12rem .08rem .16rem;
  }

  &__title {
    font-size: .14rem;
    line-height: .16rem;
  }

  &-active {
    opacity: 1;
    color: transparent;
    height: .3rem;
  }
}

.search__top {
  z-index: 999;
  width: 100%;
  height: .44rem;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: $content__bgcolor;
  padding: .06rem .18rem 0;
}

.nav {
  display: flex;
  flex-wrap: wrap;

  &__item {
    width: 20%;
    margin-bottom: .16rem;

    &__pic {
      display: block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto .06rem;
    }

    &__desc {
      display: block;
      font-size: .12rem;
      color: $content__fontcolor;
      text-align: center;
    }
  }
}
</style>

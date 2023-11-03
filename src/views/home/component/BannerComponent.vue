<template>
  <div class="banner">
    <swiper-container loop="true" :autoplay="{ disableOnInteraction: false, delay: 5000 }"
    :pagination="true">
      <swiper-slide
      v-for="(item,index) in bannerList" :key="index">
        <img :src="item.imgUrl" class="banner__pic">
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script>
export default {
  name: 'BannerComponent',
  props: ['bannerList']
}
</script>

<style lang="scss" scoped>
.banner{
  height: 0;
  overflow: hidden;
  padding-bottom: 40%;
  margin: .12rem 0 .16rem 0;
  border-radius: .06rem;
  &__pic{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

<template>
  <div class="shop">
          <img class="shop__pic" :src="item.imgUrl" v-if="item.imgUrl" >
          <div class="shop__content">
            <div class="shop__content__title">{{ item.name }}</div>
            <div class="shop__content__tags">
              <samp class="shop__content__tag">月售{{ item.sales }}</samp>
              <samp class="shop__content__tag">起送¥{{ item.expressLimit }}</samp>
              <samp class="shop__content__tag">基础运费¥{{ item.expressPrice }}</samp>
            </div>
            <p class="shop__content__activity">{{ item.slogan }}</p>
            <div class="shop__content__line" v-if="lineShow"></div>
          </div>
        </div>
</template>

<script>
export default {
  name: 'ShopComponent',
  props: ['item', 'lineShow']
}
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';
.shop{
    display: flex;
    color: $content__fontcolor;
    font-size: .13rem;
    &__pic{
      width: .56rem;
      height: .56rem;
      margin-right: .16rem;
      object-fit: cover;
    }
    &__content{
      flex: 1;
      &__title{
        font-size: .16rem;
      }
      &__tags{
        margin: .08rem 0;
      }
      &__tag{
        margin-right: .16rem;
      }
      &__activity{
        color: $price__fontcolor;
      }
      &__line{
        border-bottom: 1px solid $border__bgcolor;
        margin: .12rem 0;
      }
    }
  }
</style>

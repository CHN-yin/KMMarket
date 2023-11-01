<template>
  <div class="search">
    <BackComponent />
    <div class="search__content">
      <i class="iconfont icon-sousuo search__content__icon" >&#xe752;</i>
      <input type="text" class="search__content__input" placeholder="请输入商品名称搜索">
    </div>
  </div>
</template>

<script>
import BackComponent from '@/components/back/BackComponent.vue'

export default {
  name: 'searchComponent',
  components: { BackComponent }
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
.search{
  display: flex;
  padding: .16rem 0;
  &__content{
    display: flex;
    flex: 1;
    height: .32rem;
    border-radius: .16rem;
    background-color: $search__bgcolor;
    &__icon{
      width: .43rem;
      font-size: .16rem;
      color: $search__fontcolor;
      text-align: center;
      line-height: .32rem;
    }
    &__input{
      flex: 1;
      outline: none;
      border: none;
      background: none;
      font-size: .14rem;
      color: $content__fontcolor;
      padding-right: .2rem;
      &::placeholder{
        color: $content__fontcolor;
      }
    }
  }
}
</style>

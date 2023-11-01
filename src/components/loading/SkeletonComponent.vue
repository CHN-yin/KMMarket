<template>
  <div class="skeleton">
    <div class="item" v-for="index in 3" :key="index">
      <div class="item__img">
        <span class="iconfont item__img__icon">&#xe6de;</span>
      </div>
      <div class="item__info">
        <div class="item__info__title"></div>
        <div class="item__info__sketch"></div>
        <div class="item__info__sketch"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonComponent'
}
</script>

<style lang="scss" scoped>
.item{
  display: flex;
  height: .96rem;
  &__img{
    width: .56rem;
    height: .56rem;
    line-height: .56rem;
    text-align: center;
    margin-right: .16rem;
    background-color: #f0f2f5;
    &__icon{
      font-size: .25rem;
      color: #dcdfe6;
    }
  }
  &__info{
    flex: 1;
    &__title{
      width: 50%;
      height: .25rem;
      border-radius: .04rem;
      background-color: #f0f2f5;
    }
    &__sketch{
      height: .20rem;
      margin: .08rem 0;
      border-radius: .04rem;
      background-color: #f0f2f5;
    }
  }
}
</style>

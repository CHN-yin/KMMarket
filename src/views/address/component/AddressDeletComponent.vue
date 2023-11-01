<template>
  <div class="delet" @click="() => delAddress(addressId)">
    <div class="iconfont delet__btn">&#xe67b;</div>
  </div>
</template>

<script>
export default {
  name: 'AddressDeletComponent',
  props: ['addressId', 'delAddress']
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
.delet{
  width: .45rem;
  height: .45rem;
  border-radius: 50%;
  background-color: #f3f3f3;
  box-shadow: 0 .02rem .08rem 0 $search__fontcolor;
  line-height: .45rem;
  margin: 1rem auto;
  text-align: center;
  &__btn{
    font-size: .3rem;
    color: $search__fontcolor;
  }
}
</style>

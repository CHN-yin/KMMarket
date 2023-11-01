<template>
  <div class="mask" v-if="maskShow" @click="clickShow()"></div>
  <div class="address" v-if="maskShow">
    <div class="address__header">选择收货地址</div>
    <div class="address__list">
      <template v-for="item in addressList" :key="item._id">
        <div class="address__item" @click="() => handleAddressId(item._id)">
          <div class="address__info" @click="clickShow()">
            <div class="address__info__title">
              <span class="address__info__name">{{ item.name }}</span>
              <span class="address__info__phone">{{ item.phone }}</span>
            </div>
            <div class="address__info__text">
              {{ item.city }} {{ item.department }} {{ item.houseNumber }}
            </div>
          </div>
          <RouterLink :to="`/modifyAddress/${item._id}`">
            <div class="iconfont address__btn">&#xe666;</div>
          </RouterLink>
        </div>
      </template>
    </div>
    <RouterLink :to="{ name: 'NewAddressPage' }">
      <div class="newaddress">新建收货地址</div>
    </RouterLink>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'EjectAddressComponent',
  props: ['maskShow', 'addressList', 'clickShow'],
  setup () {
    const store = useStore()
    const handleAddressId = (id) => {
      store.commit('handleOptAppressId', id)
    }
    return { handleAddressId }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixins.scss';
.mask{
  position: fixed;
  top: 0;bottom: 0;
  left: 0;right: 0;
  background: rgba($color: #000000, $alpha: .5);
  z-index: 3;
}
.address{
  z-index: 999;
  position: absolute;
  left: 0;right: 0;
  bottom: 0;
  font-size: .14rem;
  &__header{
    border-top-left-radius: .1rem;
    border-top-right-radius: .1rem;
    border-bottom: .01rem solid $border__bgcolor;
    background-color: #ffffff;
    height: .52rem;
    line-height: .52rem;
    text-align:center;
    font-size: .16rem;
    color: #333333;
  }
  &__list{
    overflow-y: scroll;
    height: 2.7rem;
    background-color: #ffffff;
    padding-bottom: .18rem;
  }
  &__item{
    display: flex;
    border-radius: .04rem;
    background-color: #f8f8f8;
    margin: .16rem .18rem 0;
  }
  &__info{
    width: 3rem;
    margin: .09rem 0 .09rem .08rem;
    &__title{
      margin-bottom: .04rem;
      color: $original__fontcolor;
    }
    &__text{
      color: $content__fontcolor;
      @include ellipsis;
    }
    &__name{
      margin-right: .33rem;
    }
  }
  &__btn{
    flex: 1;
    font-size: .2rem;
    color: $original__fontcolor;
    text-align: right;
    line-height: .55rem;
    padding: 0 .08rem;
  }
}
.newaddress{
  position: fixed;
  bottom: .35rem;
  left: 50%;right: 50%;
  transform: translateX(-50%);
  width: 1.5rem;
  height: .3rem;
  border-radius: 1rem;
  background-color: #0091ffbc;
  text-align: center;
  line-height: .3rem;
  font-size: .14rem;
  color: #ffffff;
}
</style>

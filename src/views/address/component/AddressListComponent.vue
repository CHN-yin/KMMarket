<template>
  <div class="content">
        <div class="title">我的收货地址</div>
        <template v-for="item in addressList" :key="item._id">
          <RouterLink :to="`/modifyAddress/${item._id}`" >
            <div class="cart">
              <div class="cart__info">
                <div class="cart__describe">
                  <span class="cart__name">{{ item.name }}</span>
                  <span class="cart__phone">{{ item.phone }}</span>
                </div>
                <div class="cart__address">
                  {{ item.city }} {{ item.department }} {{ item.houseNumber }}
                </div>
              </div>
                <div class="iconfont cart__btn">&#xe666;</div>
            </div>
          </RouterLink>
        </template>
      </div>
</template>

<script>

export default {
  name: 'AddressListComponent',
  props: ['addressList']
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
@import '../../../style/mixins.scss';
.content{
  overflow-y: scroll;
  position: absolute;
  top: .44rem;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f8f8f8 !important;
  padding: .16rem .18rem !important;
  margin: 0 !important;
}
.title{
  font-size: .14rem;
  color: $content__fontcolor;
  margin: 0 0 .12rem;
}
.cart{
  display: flex;
  border-radius: .04rem;
  background-color: $content__bgcolor;
  margin-bottom: .16rem;
  &__info{
    width: 2.6rem;
    margin: .18rem 0 .18rem .16rem;
  }
  &__describe{
    font-size: .14rem;
    color: $original__fontcolor;
    margin-bottom: .08rem;
  }
  &__name{
    margin-right: .66rem;
  }
  &__address{
    font-size: .14rem;
    color: $content__fontcolor;

    @include ellipsis2;
  }
  &__btn{
    flex: 1;
    font-size: .2rem;
    color: $original__fontcolor;
    text-align: right;
    line-height: .98rem;
    padding-right: .16rem;
  }
}
</style>

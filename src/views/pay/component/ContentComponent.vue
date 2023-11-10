<template>
  <div class="shopCart">
    <div class="shop">
      <div class="shop__title">{{ shopName }}</div>
        <div class="product">
          <div class="product__item" v-for="item in productList" :key="item.id">
            <img :src="item.imgUrl" class="product__pic">
            <div class="product__detli">
              <div class="product__detli__title">{{ item.name }}</div>
              <div class="product__detli__price">
                <span><span class="yen">&yen;</span>{{ item.price }} x {{ item.count }}</span>
                <span class="product__detli__price__total"><samp class="yen">&yen;</samp>{{ (item.price * item.count).toFixed(2) }}</span>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ContentComponent',
  props: ['shopName', 'productList']
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
.shopCart{
  z-index: 1;
  position: absolute;
  overflow-y: auto;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .49rem;
  }
.shop{
  border-radius: .04rem;
  background-color: $content__bgcolor;
  padding: .16rem .16rem;
  margin: .53rem .18rem 0;
  &__title{
    font-size: .16rem;
    color: $content__fontcolor;
  }
  .product{
    &__item{
      display: flex;
      margin-top: .16rem;
    }
    &__pic{
      width: .46rem;
      height: .46rem;
      object-fit: cover;
    }
    &__detli{
      flex: 1;
      margin-left: .16rem;
      &__title{
        font-size: .14rem;
        color: $content__fontcolor;
        margin-bottom: .06rem;
      }
      &__price{
        font-size: .14rem;
        color: $price__fontcolor;
        line-height: .2rem;
        .yen{
          font-size: .12rem;
        }
        &__total{
          float: right;
          color: #000;
        }
      }
    }
  }
}
.total{
  position: relative;
  height: .28rem;
  line-height: .28rem;
  text-align: center;
  font-size: .14rem;
  color: $original__fontcolor;
  background-color: $search__bgcolor;
  margin-top: .22rem;
  .iconfont{
    position: absolute;
    bottom: -.02rem;
    padding-left: .08rem;
  }
  }
</style>

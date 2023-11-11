<template>
  <div class="productItem" v-for="item in list" :key="item._id">
    <img :src="item.imgUrl" class="productItem__pic">
    <div class="productItem__detil">
      <div class="productItem__detil__title">{{ item.name }}</div>
      <div class="productItem__detil__sales">月售{{ item.sales }}</div>
      <div class="productItem__detil__price">
        <span class="current">&yen;</span>{{ item.price }}
        <span class="original">&yen;{{ item.oldPrice }}</span>
      </div>
    </div>
    <div class="productItem__number">
      <span class="productItem__number__minus iconfont icon-reduce-btn"
        @click="() => handleCartItem(shopId, shopName, item._id, item, -1)"
        v-if="cartList?.[shopId]?.productList?.[item._id]?.count">&#xe840;</span>
      <span class="productItem__number__num">
        {{ cartList?.[shopId]?.productList?.[item._id]?.count || '' }}</span>
      <span class="productItem__number__plus iconfont icon-add-btn"
        @click="() => handleCartItem(shopId, shopName, item._id, item, 1)">&#xe661;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductComponent',
  props: ['shopId', 'shopName', 'cartList', 'list', 'handleCartItem']
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
@import '../../../style/mixins.scss';
.productItem {
  display: flex;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid $border__bgcolor;
  margin: .12rem 0 0 0;

  &__pic {
    display: block;
    width: .68rem;
    height: .68rem;
    object-fit: cover;
    margin-bottom: .12rem;
  }

  &__detil {
    flex: 1;
    padding-left: .16rem;
    margin-bottom: .12rem;

    &__title {
      @include ellipsis;
      font-size: .14rem;
      font-weight: bold;
      color: $content__fontcolor;
    }

    &__sales {
      font-size: .12rem;
      margin: .09rem 0;
      color: $content__fontcolor;
    }

    &__price {
      font-size: .14rem;
      color: $price__fontcolor;

      .current {
        font-size: .1rem;
      }

      .original {
        display: inline-block;
        color: $original__fontcolor;
        font-size: .12rem;
        transform: scale(.9);
        text-decoration: line-through;
        margin-left: .06rem;
      }
    }
  }

  &__number {
    position: absolute;
    right: 0;
    bottom: .12rem;
    line-height: .23rem;

    &__minus,
    &__plus {
      display: inline-block;
      font-size: .23rem;
      vertical-align: top;
    }

    &__minus {
      color: $minus__color;
      margin-right: .06rem;
    }

    &__plus {
      color: $btn__color;
      margin-left: .06rem;
    }

    &__num {
      display: inline-block;
      font-size: .14rem;
      color: $content__fontcolor;
    }
  }
}
</style>

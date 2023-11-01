<template>
  <div class="docker">
    <ul>
      <li v-for="(item,index) in dockerList" :key="index"
        class="docker__item">
        <RouterLink :to="item.to" :class="{ 'docker__item--active': index === dockerId}">
          <div class="iconfont" v-html="item.icon"></div>
          <div class="docker__item__title">{{item.title}}</div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DockerComponent',
  props: ['dockerId'],
  setup () {
    const dockerList = [
      { icon: '&#xe679;', title: '首页', to: { name: 'HomePage' } },
      { icon: '&#xe63c;', title: '购物车', to: { name: 'CartPage' } },
      { icon: '&#xe601;', title: '订单', to: { name: 'OrderPage' } },
      { icon: '&#xe660;', title: '我的', to: { name: 'MyPage' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
.docker {
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -.01rem .01rem 0 $border__bgcolor;
    background-color: $content__bgcolor;

    &>ul {
        display: flex;
        list-style: none;
    }

    &__item {
        flex: 1;
        text-align: center;
        .iconfont {
            font-size: .20rem;
            padding: .07rem 0 .02rem 0;
        }

        &__title {
            font-size: .20rem;
            transform: scale(.5, .5);
            transform-origin: center top;
        }

        &--active {
            color: #1FA4FC;
        }
    }
}
a {
    display: block;
    height: .49rem;
    color: $content__fontcolor;
}
</style>

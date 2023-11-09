<template>
<div class="content">
  <div class="list">
    <template v-for="(item,index) in list" :key="index">
    <RouterLink :to="item.to">
      <div class="item">
        <span class="iconfont item__icon" v-html="item.icon"></span>
        <span class="item__title">{{ item.title }}</span>
        <span class="iconfont item__enter">&#xe666;</span>
      </div>
    </RouterLink>
    </template>
  </div>
  <div class="btn" @click="handelBtnClick()">退出登录</div>
</div>
</template>

<script>
import { removeLocalStorage } from '@/effect/StorageEffect'
import { RouterLink } from 'vue-router'

const useBtnEffect = () => {
  const handelBtnClick = () => {
    removeLocalStorage('addressId')
    removeLocalStorage('isLogin')
    removeLocalStorage('cartList')
    location.reload()
  }
  return { handelBtnClick }
}

export default {
  name: 'ListComponent',
  setup () {
    const list = [
      { icon: '&#xe600;', title: '我的钱包', to: { name: 'MyPage' } },
      { icon: '&#xe62c;', title: '我的地址', to: { name: 'AddressPage' } },
      { icon: '&#xe603;', title: '客服与帮助', to: { name: 'MyPage' } }
    ]
    const { handelBtnClick } = useBtnEffect()
    return { list, handelBtnClick }
  },
  components: { RouterLink }
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
.content{
  padding: 0 .18rem;
  margin: .77rem 0 .3rem;
}
.list{
  background-color: $content__bgcolor;
  box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
  border-radius: .08rem;
  margin-bottom: .3rem;
}
.item{
  line-height: .49rem;
  color: #262626;
  &__icon{
    vertical-align: top;
    font-size: .22rem;
    margin-left: .16rem;
  }
  &__title{
    font-size: .14rem;
    margin-left: .12rem;
  }
  &__enter{
    float: right;
    font-size: .1rem;
    color: #C2C4CA;
    margin-right: .16rem;
  }
}
.btn{
  line-height: .45rem;
  background-color: $btn__color;
  border-radius: .04rem;

  font-size: .16rem;
  color: $btn__fontcolor;
  letter-spacing: .005rem;
  text-align: center;
}
</style>

<template>
  <div class="header">
        <div class="myInfo">
            <img class="myInfo__head" :src="infoList.imgUrl">
          <div class="myInfo__title">
            <span class="myInfo__name">{{ infoList.nickname }}</span>
          </div>
          <div class="myInfo__id">ID: {{ infoList.username }}</div>
          <div class="myInfo__lien"></div>
          <div class="myInfo__list">
            <template v-for="(item, index) in myInfoList" :key="index">
              <div class="myInfo__tag">
                <div class="myInfo__tag__title">{{ item.value }}</div>
                <div class="myInfo__tag__number">{{ item.num }}</div>
              </div>
            </template>
          </div>
        </div>
        <!-- <div class="iconfont edit">&#xf132;</div> -->
      </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: ['infoList'],
  setup () {
    const myInfoList = [
      { value: '红包', num: 0 },
      { value: '优惠券', num: 0 },
      { value: '快马粒', num: 10 }
    ]
    return { myInfoList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
.header{
  position: relative;
  height: 2.3rem;
  padding: 0 .18rem;
  background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
}
.myInfo{
  z-index: 3;
  position: absolute;
  left: 50%;right: 50%;
  top: .9rem;
  transform: translate(-50%);
  width: 3.39rem;
  height: 2.03rem;
  background-color: $content__bgcolor;
  box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
  border-radius: .08rem;
  &__head{
    position: absolute;
    top: -.47rem;
    left: 1.23rem;
    width: .94rem;
    height: .94rem;
    border-radius: 50%;
    object-fit: cover;
  }
  &__title{
    position: relative;
    margin-top: .59rem;
    font-size: .24rem;
    color: #262628;
    letter-spacing: .0019rem;
    text-align: center;
    line-height: .36rem;
  }
  &__id{
    font-size: .14rem;
    color: #C1C0C9;
    text-align: center;
    margin-top: .02rem;
  }
  &__lien{
    border-bottom: .01rem solid $border__bgcolor;
    margin: .12rem 0;
  }
  &__list{
    display: flex;
    height: .64rem;
  }
  &__tag{
    flex: 1;
    text-align: center;
    &__title{
      font-size: .12rem;
      color: #C1C0C9;
      margin-bottom: .06rem;
    }
    &__number{
      font-size: .2rem;
      color: #262628;
    }
  }
}
.edit{
  position: absolute;
  top: .40rem;
  right: .21rem;
  font-size: .21rem;
  color: $content__bgcolor;
}
</style>

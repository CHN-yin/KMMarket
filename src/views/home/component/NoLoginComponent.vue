<template>
  <div class="warn" v-show="warnShow">
    <span class="warn__title">欢迎来到快马集市</span>
    <RouterLink :to="{ name: 'LoginPage' }">
      <span class="warn__golgin">去登录或注册</span>
    </RouterLink>
    <span class="warn__delete">
      <i class="iconfont warn__delete__icon" @click="handleWarnDelete">&#xe651;</i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'NoLoginComponent',
  props: ['warnShow', 'handleWarnDelete']
}
</script>

<style lang="scss" scoped>
@keyframes glide {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.warn {
  animation: glide .5s;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: .6rem;
  background-color: #1FA4FC;
  border-radius: .11rem;
  font-size: .16rem;

  &__title {
    flex: 1;
    color: #fff;
    letter-spacing: .01rem;
    margin-left: .16rem;
  }

  &__golgin {
    width: 1.5rem;
    color: #313132;
    text-decoration: underline;
  }

  &__delete {
    height: 100%;
    padding: .02rem .05rem 0 .1rem;

    &__icon {
      font-size: .2rem;
    }
  }
}</style>

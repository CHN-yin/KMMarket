<template>
  <div class="iconfont tab fadein">&#xe696;</div>
</template>

<script>

import { computed, reactive, toRefs } from 'vue'

export const useToTopEffect = (contentName) => {
  const data = reactive({ showToTop: false, showSearch: false })
  const handelTopScroll = (event) => {
    const searchTop = computed(() => {
      const width = document.documentElement.clientWidth || document.body.clientWidth
      const ratio = width / 375
      return (49 * ratio)
    })
    data.showToTop = event.target.scrollTop >= event.target.clientHeight
    data.showSearch = event.target.scrollTop >= searchTop.value
  }
  const handelTopClick = () => {
    const el = document.querySelector(contentName)
    el.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const { showToTop, showSearch } = toRefs(data)
  return { showToTop, showSearch, handelTopScroll, handelTopClick }
}

export default {
  name: 'ToTopComponent'
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
.tab{
  z-index: 9999;
  position: fixed;
  bottom: .85rem;
  right: .25rem;
  font-size: .35rem;
  color: $btn2__color;
}
.fadein {
  animation: fadein .5s;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

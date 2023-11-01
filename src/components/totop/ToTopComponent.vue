<template>
  <div class="iconfont tab"
  >&#xe696;</div>
</template>

<script>

import { reactive, toRefs } from 'vue'

export const useToTopEffect = (contentName) => {
  const data = reactive({ showToTop: false, showSearch: false })
  const handelTopScroll = (event) => {
    data.showToTop = event.target.scrollTop > 200
    data.showSearch = event.target.scrollTop >= 49
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
  position: fixed;
  bottom: .85rem;
  right: .25rem;
  font-size: .35rem;
  color: $btn2__color;
}
</style>

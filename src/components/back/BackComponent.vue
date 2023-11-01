<template>
  <div class="back">
    <div class="iconfont back__icon"  @click="handleBackClick">&#xe697;</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

// 点击回退逻辑
const useHandleBackClickEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'BackComponent',
  setup () {
    const { handleBackClick } = useHandleBackClickEffect()
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
.back{
  display: inline-block;
    position: relative;
    width: .29rem;
    height: .32rem;
    &__icon{
      position: absolute;
      top: 0;
      left: -.07rem;
      font-size: .32rem;
      color: #b6b6b6;
  }
}
</style>

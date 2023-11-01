<template>
<div class="toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'ToastComponent',
  props: ['message']
}
export const useToastEffect = () => {
  const toastData = reactive({ show: false, toastMessage: '' })
  const toastShow = (message, item = 2000) => {
    toastData.show = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.show = false
      toastData.toastMessage = ''
    }, item)
  }
  const { show, toastMessage } = toRefs(toastData)
  return { toastShow, show, toastMessage }
}
</script>

<style lang="scss" scoped>
.toast{
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: .10rem;
  font-size: .14rem;
  background-color: rgba(0,0,0,.7);
  border-radius: .05rem;
  color: #fff;
}
</style>

<template>
  <div class="submit">
    <div class="submit__actual">
      实付金额
      <span class="submit__actual__price">&yen;{{ cartContent.price }}</span>
    </div>
      <div class="submit__btn" @click="handleSubmitClick()">提交订单</div>
  </div>
  <PromptComponent v-show="showSubmitMask" :addressId="addressId"/>
  <ToastComponent v-if="show" :message="toastMessage" />
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import PromptComponent from './PromptComponent.vue'
import ToastComponent, { useToastEffect } from '@/components/toast/ToastComponent.vue'

// 控制提交订单逻辑
const useSubmitEffect = (toastShow) => {
  const store = useStore()
  const showSubmitMask = ref(false)
  const addressId = ref('')
  const handleSubmitClick = () => {
    addressId.value = store.state.addressId
    if (!addressId.value) return toastShow('请填写收货地址')
    showSubmitMask.value = !showSubmitMask.value
  }
  return { showSubmitMask, addressId, handleSubmitClick }
}

export default {
  name: 'SubmitComponent',
  props: ['cartContent'],
  components: { PromptComponent, ToastComponent },
  setup () {
    const { show, toastMessage, toastShow } = useToastEffect()
    const { showSubmitMask, addressId, handleSubmitClick } = useSubmitEffect(toastShow)
    return { handleSubmitClick, showSubmitMask, addressId, show, toastMessage }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/variable.scss';
.submit{
  z-index: 2;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  line-height: .49rem;
  background-color: $content__bgcolor;
  box-shadow: 0 -1px 1px 0 #F1F1F1;
  &__actual{
    flex: 1;
    font-size: .14rem;
    color: $content__fontcolor;
    margin-left: .24rem;
    &__price{
      vertical-align: top;
      margin-left: .05;
      font-size: .16rem;
    }
  }
  &__btn{
    width: .98rem;
    text-align: center;
    font-size: .14rem;
    color: $btn__fontcolor;
    background-color: $btn2__color;
  }
}
</style>

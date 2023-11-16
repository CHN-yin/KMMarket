<template>
  <div class="change">
    <BackComponent class="back" />
    <img class="change__head" src="../../../public/img/KMMarketLogo.png"/>
    <div class="change__input">
      <input class="change__input__content" placeholder="新密码" v-model="data.password">
    </div>
    <div class="change__input">
      <input class="change__input__content" placeholder="确认密码" v-model="data.chkPassword">
    </div>
    <div class="change__button" @click="handleChange">确定</div>
    <ToastComponent v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { patch } from '@/utils/request'
import BackComponent from '@/components/back/BackComponent.vue'
import ToastComponent, { useToastEffect } from '@/components/toast/ToastComponent.vue'
const useForgetErrect = (router, route, toastShow) => {
  const data = reactive({
    username: route.params.id,
    password: '',
    chkPassword: ''
  })
  const handleChange = async () => {
    if (!(/^.{6,}$/.test(data.password))) {
      return toastShow('密码至少需要六位')
    }
    if (data.password !== data.chkPassword) {
      return toastShow('密码不一样')
    }
    try {
      const result = await patch('/api/user/changepwd', {
        username: data.username,
        password: data.chkPassword
      })
      if (result?.errno !== 0) return toastShow(result.message)
      router.push({ name: 'LoginPage' })
    } catch (e) {
      toastShow('api error')
    }
  }
  return { handleChange, data }
}
export default {
  name: 'ChangePwd',
  components: { ToastComponent, BackComponent },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const { show, toastMessage, toastShow } = useToastEffect()
    const { handleChange, data } = useForgetErrect(router, route, toastShow)
    return { handleChange, data, show, toastMessage }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style//loginmodule.scss';
</style>

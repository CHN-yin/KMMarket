<template>
    <div class="register">
        <img class="register__head" src="../../../public/img/KMMarketLogo.png">
          <div class="register__input">
            <input class="register__input__content" placeholder="手机号" v-model="username">
          </div>
          <div class="register__input">
            <input class="register__input__content" type="password" placeholder="密码" v-model="password">
          </div>
          <div class="register__input">
            <input class="register__input__content" type="password" placeholder="确认密码" v-model="passwordAck">
          </div>

        <div class="register__button" @click="handelRegister">注册</div>
        <div class="register__links">
            <samp class="register__links__link" @click="handleLoginClick">已有账号去登陆</samp>
        </div>
    </div>
    <ToastComponent v-if="show" :message="toastMessage" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request'
import ToastComponent, { useToastEffect } from '@/components/toast/ToastComponent.vue'

// 注册逻辑区块
const useRegisterEffect = (toastShow) => {
  const router = useRouter()
  const URL = '/api/user/register'
  const data = reactive({ username: '', password: '', passwordAck: '' })
  const handelRegister = async () => {
    if (data.username === '' || data.password === '' || data.passwordAck === '') {
      return toastShow('注册信息不能为空')
    }
    if (!(/^1[3456789]\d{9}$/.test(data.username))) {
      return toastShow('手机号格式错误')
    }
    if (!(/^.{6,}$/.test(data.password))) {
      return toastShow('密码至少需要六位')
    }
    if (data.password !== data.passwordAck) {
      return toastShow('密码不一样')
    }
    try {
      const result = await post(URL, {
        username: data.username,
        password: data.password
      })
      if (result?.errno !== 0) { return toastShow('注册失败') }
      toastShow('注册成功', 1000)
      setTimeout(() => { router.push({ name: 'LoginPage' }) }, 1100)
    } catch (e) {
      toastShow('请求失败')
    }
  }
  const { username, password, passwordAck } = toRefs(data)
  return { username, password, passwordAck, handelRegister }
}
// 点击跳转登入页面逻辑区块
const useLgoinClickEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'LoginPage' })
  }
  return { handleLoginClick }
}

export default {
  name: 'RegisterPage',
  components: { ToastComponent },
  setup () {
    const { show, toastMessage, toastShow } = useToastEffect()
    const { username, password, passwordAck, handelRegister } = useRegisterEffect(toastShow)
    const { handleLoginClick } = useLgoinClickEffect()

    return { handleLoginClick, handelRegister, username, password, passwordAck, show, toastMessage }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style//loginmodule.scss';
</style>

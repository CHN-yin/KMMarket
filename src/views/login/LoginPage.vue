<template>
  <div class="login">
    <img class="login__head" src="../../../public/img/KMMarketLogo.png">
    <div class="login__input">
      <input class="login__input__content" placeholder="手机号" v-model="username">
    </div>
    <div class="login__input">
      <input class="login__input__content" placeholder="密码" type="password" v-model="password">
    </div>
    <div class="login__button" @click="handleLogin">登入</div>
    <div class="login__links">
      <samp class="login__links__link" @click="handleRegisterClick">立即注册</samp>
      <samp class="login__links__line">|</samp>
      <samp class="login__links__link" @click="handleForgetClick">忘记密码</samp>
    </div>
    <ToastComponent v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import ToastComponent, { useToastEffect } from '@/components/toast/ToastComponent.vue'
import { setLocalStorage } from '@/effect/StorageEffect'

// 登入逻辑区块
const useLgoninEffect = (toastShow, router) => {
  const URL = '/api/user/login'
  const data = reactive({ username: '', password: '' })
  const handleLogin = async () => {
    if (data.username === '' || data.password === '') {
      return toastShow('用户名或密码不能为空')
    }
    if (!(/^1[3456789]\d{9}$/.test(data.username))) {
      return toastShow('手机号格式错误')
    }
    try {
      const result = await post(URL, {
        username: data.username,
        password: data.password
      })
      if (result?.errno !== 0) return toastShow(result.message)
      setLocalStorage('isLogin', true)
      location.reload()
    } catch (e) {
      toastShow('请求错误')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

// 点击跳转注册/忘记密码页面逻辑区块
const useJumpClickEffect = (router) => {
  const handleRegisterClick = () => {
    router.push({ name: 'RegisterPage' })
  }
  const handleForgetClick = () => {
    router.push({ name: 'ForgetPage' })
  }
  return { handleRegisterClick, handleForgetClick }
}

export default {
  name: 'LoginPage',
  components: { ToastComponent },
  setup () {
    const router = useRouter()

    const { show, toastMessage, toastShow } = useToastEffect()
    const { username, password, handleLogin } = useLgoninEffect(toastShow, router)
    const { handleRegisterClick, handleForgetClick } = useJumpClickEffect(router)

    return { handleLogin, handleRegisterClick, handleForgetClick, username, password, show, toastMessage }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style//loginmodule.scss';
</style>

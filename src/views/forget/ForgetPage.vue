<template>
  <div class="forget">
    <BackComponent class="back" />
    <img class="forget__head" src="../../../public/img/KMMarketLogo.png"/>
    <div class="forget__input">
      <input class="forget__input__content" placeholder="手机号" v-model="data.username">
    </div>
    <div class="forget__input forget__input__code">
      <input class="forget__input__content forget__code" placeholder="验证码" v-model="data.code">
      <button id="btn" :class="{ forget__code__btn: true, 'forget__code__btn--active': data.codeBtnShow }" @click="handleCodeRandom">{{ data.codeBtnValue }}</button>
    </div>
    <div class="forget__button" @click="handleRorget">下一步</div>
    <ToastComponent v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import BackComponent from '@/components/back/BackComponent.vue'
import ToastComponent, { useToastEffect } from '@/components/toast/ToastComponent.vue'
import { post } from '@/utils/request'

const useForgetErrect = (router, toastShow) => {
  const data = reactive({
    username: '',
    code: undefined,
    newCode: '',
    codeBtnValue: '获取验证码',
    timerNumber: 60,
    codeBtnShow: false
  })
  let timer
  // 验证码按钮
  const handleCodeRandom = async () => {
    if (data.username === '') {
      return toastShow('请输入手机号')
    }
    if (!(/^1[3456789]\d{9}$/.test(data.username))) {
      return toastShow('手机号格式错误')
    }
    const result = await post('/api/user/code', {
      username: data.username
    })
    if (result.message === '用户不存在') return toastShow(result.message)
    timer = setInterval(() => {
      data.timerNumber--
      if (data.timerNumber > 0) {
        data.codeBtnValue = data.timerNumber + '秒重新发送'
      } else {
        data.timerNumber = 60
        data.codeBtnValue = '获取验证码'
        data.codeBtnShow = false
        document.getElementById('btn').disabled = false
        clearInterval(timer)
      }
    }, 1000)
    data.codeBtnShow = true
    if (data.newCode) data.newCode = ''
    for (let i = 0; i < 4; i++) {
      const id = Math.floor(Math.random() * 10)
      data.newCode += id
    }
    toastShow('验证码为 ' + data.newCode, 3000)
    document.getElementById('btn').disabled = true
  }
  // 确认按钮
  const handleRorget = () => {
    if (!(/^1[3456789]\d{9}$/.test(data.username))) {
      return toastShow('手机号格式错误')
    }
    if (data.code !== data.newCode) {
      return toastShow('验证错误')
    }
    router.push('/changepwd/' + data.username)
    clearInterval(timer)
  }
  return { handleRorget, handleCodeRandom, data }
}

export default {
  name: 'ForgetPage',
  components: { ToastComponent, BackComponent },
  setup () {
    const router = useRouter()
    const { show, toastMessage, toastShow } = useToastEffect()
    const { handleRorget, handleCodeRandom, data } = useForgetErrect(router, toastShow)
    return { handleRorget, handleCodeRandom, show, toastMessage, data }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style//loginmodule.scss';
</style>

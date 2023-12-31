import { createApp } from 'vue'
import App from './App.vue'
import { register } from 'swiper/element/bundle'
import router from './router'
import store from './store'
import './style/index.scss'
import VConsole from 'vconsole'

const vconsole = new VConsole()

const app = createApp(App)
app.use(store).use(router).use(register).use(vconsole).mount('#app')

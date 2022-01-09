import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/reset.css'
import '@/assets/font_3064823_ljl4v9okuv/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

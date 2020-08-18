import Vue from 'vue'
import ToggleButton from 'vue-js-toggle-button'
import VModal from 'vue-js-modal'
import store from '@/share/store'

const Click = require('vue-spark').default
import App from './App.vue'


Vue.config.productionTip = false

Vue.use(ToggleButton)
Vue.use(VModal)
Vue.use(Click())

const vue = new Vue({
  render: h => h(App),
  store,
}).$mount('#app')

try {
  (window as any).Yoxi = vue
} catch (error) {
  throw new Error(error)
}

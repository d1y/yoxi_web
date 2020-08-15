import Vue from 'vue'
import ToggleButton from 'vue-js-toggle-button'

const Click = require('vue-spark').default
import App from './App.vue'


Vue.config.productionTip = false

Vue.use(ToggleButton)
Vue.use(Click())

new Vue({
  render: h => h(App),
}).$mount('#app')

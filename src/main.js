import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'jquery-ui'
import { store } from './store/store.js'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

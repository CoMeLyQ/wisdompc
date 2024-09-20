import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$apiUrl = 'http://114.55.237.18:8086/';

new Vue({
  render: h => h(App),
}).$mount('#app')

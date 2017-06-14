import Vue from 'vue'
// import App from './components/app.vue'
import Layout from './layout/default.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  // router,
  template: '<Layout/>',
  components: { Layout }
})

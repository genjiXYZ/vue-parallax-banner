import Vue from 'vue'
import App from './App.vue'


import  parallaxBanner from 'vue-parallax-banner'
Vue.use(parallaxBanner)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

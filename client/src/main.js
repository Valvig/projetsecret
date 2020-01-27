import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VueSession from 'vue-session'
import Ads from 'vue-google-adsense'
 
Vue.use(require('vue-script2'))
 
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)
Vue.use(Ads.AutoAdsense, { adClient: '8847307314' })

// require Cookies
Vue.use(require('vue-cookies'))

Vue.use(VueSession)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

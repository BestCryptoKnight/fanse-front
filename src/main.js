import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import VueClipboard from 'vue-clipboard2'
import VueMask from 'v-mask'
import Misc from './plugins/Misc'

import "@/assets/scss/_theming.scss";
import i18n from './i18n'

import routes from './components/helpers/Router';
const router = new VueRouter({
  routes,
  mode: 'history'
});


Vue.use(Vuex)
import stores from './components/helpers/Store';
import './registerServiceWorker'

const store = new Vuex.Store(stores);
var rnd = Math.random();
console.log(rnd);

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueClipboard)
Vue.use(Misc);
Vue.use(VueMask);
Vue.use(VueReCaptcha, {
  siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
  loaderOptions: {
    autoHideBadge: true
  }
});

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')

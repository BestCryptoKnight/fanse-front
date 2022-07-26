import Vue from 'vue'
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

(function($){
  $(document).on('contextmenu', 'img', function() {
      return false;
  })
})(jQuery);

const store = new Vuex.Store(stores);
var rnd = Math.random();
console.log(rnd);
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueClipboard)
Vue.use(Misc);
Vue.use(VueMask);




new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')

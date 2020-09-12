import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { defineCustomElements } from '@ionic/pwa-elements/loader'; 
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBars);
Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ion-/]

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

defineCustomElements(window);

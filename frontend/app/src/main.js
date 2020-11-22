import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from "./router/router";
import "bootstrap/dist/css/bootstrap.css";
import '@/assets/css/main.css'
import Axios from 'axios';

import VueJWT from 'vuejs-jwt'

Axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

Vue.prototype.$axios = Axios
Vue.prototype.$jwt = VueJWT
Vue.config.productionTip = false


new Vue({
  router,
  Axios,
  Vuex,
  VueJWT,
  render: h => h(App),
}).$mount('#app')



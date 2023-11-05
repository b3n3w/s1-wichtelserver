import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import "bootstrap/dist/css/bootstrap.css";
import '@/assets/css/main.css'
import Axios from 'axios';
import vuetify from './plugins/vuetify';

Axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
Vue.prototype.$axios = Axios
Vue.config.productionTip = false


new Vue({
  router,
  Axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')



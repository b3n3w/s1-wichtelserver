import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import '@/assets/css/main.css'


const base = axios.create({
  baseURL: "http://localhost:3000"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

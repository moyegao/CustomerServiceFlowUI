// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'
//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios;
axios.defaults.baseURL = process.env.baseUrl;
import qs from	'qs'
Vue.prototype.$qs = qs;
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import App from './App'
// 引入js

import common from './assets/js/common.js'
import sea from '../src/assets/approval/js/sea.js'

Vue.prototype.$common = common;
Vue.prototype.$sea = sea;

Vue.config.productionTip = false;
import 'babel-polyfill'

//引入css
import './assets/css/map.css'
import './assets/css/common.css'
// import'./assets/css/test.css'

window.eventBus = new Vue();
window.eventBus2 = new Vue();
/* eslint-disable no-new */



new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

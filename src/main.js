import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './assets/global.css'; 
import router from './router'; // 引入路由配置

Vue.use(ElementUI);

new Vue({
  router, // 注册路由
  el: '#app',
  render: h => h(App)
});
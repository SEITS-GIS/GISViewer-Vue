import Vue from 'vue';
import VueRouter from 'vue-router';

import gd from './components/PluginGD.vue';
import arc from './components/PluginTest.vue';
import App from './App.vue';
import GisViewer from './plugin/index';

Vue.config.productionTip = false;
Vue.use(GisViewer);

Vue.use(VueRouter);
//定义路由
const routes = [
  {path: '', component: arc},
  {path: '/gd', component: gd},
  {path: '/arc', component: arc}
];

//创建 router 实例，然后传 routes 配置
const router = new VueRouter({
  mode: 'history',
  routes: routes
});
new Vue({
  router: router,
  render: (h) => h(App)
}).$mount('#app');

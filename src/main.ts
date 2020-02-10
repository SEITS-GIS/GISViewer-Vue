import Vue from "vue";
import App from "./App.vue";
import GisViewer from "./plugin/index";

Vue.config.productionTip = false;
Vue.use(GisViewer);

new Vue({
  render: h => h(App)
}).$mount("#app");

# gisviewer-vue

地图容器

## 安装

```js
npm install gisviewer-vue -S
```

## 使用

main.js

```js
import Vue from "vue";
import App from "./App.vue";
import GisViewer from "gisviewer-vue";
import "gisviewer-vue/lib/gis-viewer.css";

Vue.config.productionTip = false;
Vue.use(GisViewer);

new Vue({
  render: h => h(App)
}).$mount("#app");
```

App.vue

```vue
<template>
  <div id="app">
    <gis-viewer />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  height: 100vh;
}
</style>
```

### 配置

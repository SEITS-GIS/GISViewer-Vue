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

## 配置

### Props

|name|description|type|defalt|values|
|----|-----------|----|------|------|
|platform|地图平台|String|arcgis3D|arcgis2D<br>arcgis3D<br>dugis(百度内网)<br>mapabc(高德内网)<br>bmap(百度)<br>amap(高德)
|mapConfig|地图配置|object||

#### arcgis地图配置

|name|description|type|required|default|values|
|----|-----------|----|--------|-------|------|
|arcgis_api|本地arcgis js api地址|String|false|arcgis online上的最新api地址|
|theme|地图主题样式|String|false|light|light<br>dark<br>light-blue<br>dark-blue<br>light-green<br>dark-green<br>light-purple<br>dark-purple<br>light-red<br>dark-red

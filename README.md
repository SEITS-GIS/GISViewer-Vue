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

| name       | description | type   | defalt   | values                                                                                  |
| ---------- | ----------- | ------ | -------- | --------------------------------------------------------------------------------------- |
| platform   | 地图平台    | String | arcgis3D | arcgis2D<br>arcgis3D<br>dugis(百度内网)<br>mapabc(高德内网)<br>bmap(百度)<br>amap(高德) |
| map-config | 地图配置    | object |          | 依据 platform 不同有不同的配置内容                                                      |

#### arcgis 地图配置

| name       | description             | type   | required | default                         | values                                                                                                                        |
| ---------- | ----------------------- | ------ | -------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| arcgis_api | 本地 arcgis js api 地址 | String | false    | arcgis online 上的最新 api 地址 |
| theme      | 地图主题样式            | String | false    | light                           | light<br>dark<br>light-blue<br>dark-blue<br>light-green<br>dark-green<br>light-purple<br>dark-purple<br>light-red<br>dark-red |
| baseLayers | 底图                    | Array  | true     |

## Events

| name       | description  | parameters |
| ---------- | ------------ | ---------- |
| map-loaded | 地图创建完成 |

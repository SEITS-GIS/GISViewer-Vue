# gisviewer-vue

地图容器

## 安装

```js
npm install gisviewer-vue -S
```

## 使用

main.js

```js
import Vue from 'vue';
import App from './App.vue';
import GisViewer from 'gisviewer-vue';
import 'gisviewer-vue/lib/gis-viewer.css';

Vue.config.productionTip = false;
Vue.use(GisViewer);

new Vue({
  render: (h) => h(App)
}).$mount('#app');
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
  name: 'App'
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

| name              | description  | parameters |
| ----------------- | ------------ | ---------- |
| map-loaded        | 地图创建完成 |
| showGisDeviceInfo | 撒点点击事件 |

## 接口说明

### addoverlays 地图撒点接口

| name                | description                                   | type                                 | default                                                                                                                                                        |
| ------------------- | --------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultType         | 默认类型                                      | string                               |
| defaultSymbol       | 默认符号                                      | string                               |
| overlays            | 覆盖物属性                                    | object[]                             |
| 　 id               | 覆盖物编号, 用于按编号删除                    | string                               |
| 　 type             | 覆盖物类型, 用于按类型删除                    | string                               |
| 　 symbol           | 覆盖物符号                                    | object                               |
| 　　 type           | 覆盖物符号类型 2d 或 3d                       | string                               | point-2d/point-3d                                                                                                                                              |
| 　　 url            | 覆盖物符号地址                                | string                               |
| 　　 primitive      | 覆盖物的图元类型                              | string                               | 2D 图元："circle"，"square"， "cross"， "x"，"kite" ，"triangle"<br/>3D 图元："sphere"，"cylinder"， "cube"，"cone"，"inverted-cone"，"diamond"，"tetrahedron" |
| 　　 color          | 图元颜色                                      | number/string/number[]               |
| 　　 outline        | 图元边框                                      | object                               |
| 　　　 size         | 图元边框大小                                  | number                               |
| 　　　 color        | 图元边框颜色                                  | number/string                        |
| 　　 size           | 覆盖物大小                                    | Array<number/string>/ number/string; |
| 　　 anchor         | 覆盖物锚点                                    | string                               | "center"，"left"，"right"，"top"，"bottom"，"top-left"，"top-right"，"bottom-left"，"bottom-right"                                                             |
| 　　 rotation       | 旋转角度                                      | number[]                             | 在 point-3d 时可用，[x 轴角度, y 轴角度, z 轴角度]                                                                                                             |
| 　 geometry         | 覆盖物几何属性                                | object                               |
| 　　 x              | x 坐标                                        | number                               |
| 　　 y              | y 坐标                                        | number                               |
| 　　 z              | z 坐标                                        | number                               |
| 　 fields           | 覆盖物业务属性                                | object                               |
| 　 buttons          | 覆盖物弹出框的默认按钮，会覆盖 defaultButtons | object[]                             |
| autoPopup           | 是否自动显示弹出框, 只添加一个覆盖物时有效    | boolean                              | false                                                                                                                                                          |
| showPopup           | 点击后是否显示弹出框                          | boolean                              | false                                                                                                                                                          |
| defaultInfoTemplate | 配置 infoTemplate 需要显示的内容              | object                               |
| 　 title            | 标题                                          | string                               |
| 　 content          | 内容                                          | string                               |
| defaultButtons      | 弹出框的默认按钮                              | object[]                             |
| 　 label            | 按钮文本                                      | string                               |
| 　 type             | js 函数 mapFeatureClicked 的 type 参数        | string                               |
| showToolTip         | 是否显示飞行提示                              | boolean                              | false                                                                                                                                                          |
| toolTipContent      | 飞行提示内容                                  | string                               |

### deleteOverlays 删除撒点接口

### deleteAllOverlays 删除全部撒点接口

### addOverlaysCluster 点聚合接口

### deleteOverlaysCluster 删除点聚合接口

### deleteAllOverlaysCluster 删除全部点聚合接口

### addHeatMap 热力图接口

### deleteHeatMap 删除热力图接口

### showLayer 显示图层

| name  | description | type   | default |
| ----- | ----------- | ------ | ------- |
| label | 图层名称    | string |
| type  | 图层类型    | string |

### hideLayer 隐藏图层

| name  | description | type   | default |
| ----- | ----------- | ------ | ------- |
| label | 图层名称    | string |
| type  | 图层类型    | string |

### findFeature 查找定位

### setMapCenter 定位坐标

### setMapCenterAndLevel 定位坐标层级

### showJurisdiction()显示辖区

### hideJurisdiction()隐藏辖区

### showDistrictMask() 显示边界蒙层

| name     | description      | type    | default |
| -------- | ---------------- | ------- | ------- |
| name     | 区县名称         | string  |
| showMask | 是否显示外部蒙层 | boolean |

### hideDistrictMask() 显示边界蒙层

### setMapStyle()高德设置地图样式

### routeSearch()高德路径规划

### clearRouteSearch()清除路径规划

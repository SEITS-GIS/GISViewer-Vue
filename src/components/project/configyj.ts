export let GisConfig = {
  arcgis_api: 'http://localhost:8090/arcgis_js_api/library/4.14',
  //arcgis_api:
  //  'https://webapi.amap.com/maps?v=1.4.15&key=29dd04daa39aa33a7e2cdffa37ebec4d',
  //arcgis_api: 'http://128.64.130.247:8219/baidumap/jsapi/api.js',
  //arcgis_api: "http://128.64.151.245:8019/baidumap/jsapi/api.js",
  //arcgis_api: "http://localhost:8090/baidu/BDAPI.js",
  theme: 'dark', //dark,vec
  baseLayers: [
    {
      label: '深色',
      type: 'tiled',
      url: 'https://10.89.1.99/arcgis/rest/services/bj_xxb/MapServer',
      visible: true
    },
    {
      label: 'f12',
      url: 'https://10.89.1.99/arcgis/rest/services/dlbj_cd/MapServer',
      type: 'tiled',
      visible: true
    },
    {
      label: 'f13',
      url: 'https://10.89.1.99/arcgis/rest/services/bx/MapServer',
      type: 'tiled',
      visible: true
    }
  ],
  operationallayers: [
    // {
    //   label: 'fbd1333',
    //   url: 'https://10.89.1.99/arcgis/rest/services/sssb_dpt/MapServer',
    //   type: 'dynamic',
    //   visible: false
    // }
    // {
    //   label: '发布段0000',
    //   url:
    //     'http://10.31.214.201:6080/arcgis/rest/services/YJZH/ShangHai_HeatMap/MapServer/1',
    //   type: 'chengdi',
    //   visible: true,
    //   isCD: true,
    //   outFields: ['*'],
    //   renderer: {
    //     type: 'heatmap',
    //     colorStops: [
    //       {ratio: 0, color: 'rgba(255, 255, 255, 0)'},
    //       {ratio: 0.2, color: 'rgba(255, 255, 255, 1)'},
    //       {ratio: 0.5, color: 'rgba(255, 140, 0, 1)'},
    //       {ratio: 0.8, color: 'rgba(255, 140, 0, 1)'},
    //       {ratio: 1, color: 'rgba(255, 0, 0, 1)'}
    //     ],
    //     field: 'ID',
    //     blurRadius: 11,
    //     maxPixelIntensity: 3000,
    //     minPixelIntensity: 1
    //   }
    // }
    // {
    //   label: 'fbd1333',
    //   url: './config/fbd/pcs.json',
    //   type: 'json',
    //   visible: true
    // }
  ],
  options: {
    //for arcgis-2d
    center: [0, 0],
    zoom: 1,
    //viewMode: '3D',
    constraints: {
      rotationEnabled: false
    }
  }
};

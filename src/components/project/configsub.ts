export let GisConfig = {
  arcgis_api: 'http://localhost:8090/arcgis_js_api/library/4.14',
  //arcgis_api:
  //  'https://webapi.amap.com/maps?v=1.4.15&key=29dd04daa39aa33a7e2cdffa37ebec4d',
  //arcgis_api: 'http://128.64.130.247:8219/baidumap/jsapi/api.js',
  //arcgis_api: "http://128.64.151.245:8019/baidumap/jsapi/api.js",
  //arcgis_api: "http://localhost:8090/baidu/BDAPI.js",
  theme: 'custom', //dark,vec
  baseLayers: [
    {
      label: '地铁线路图',
      url:
        'http://10.31.214.201:6080/arcgis/rest/services/YJZH/ShangHai_Subway/MapServer',
      type: 'dynamic',
      visible: true,
      showBar: true,
      showFlow: true,
      popupTemplates: {
        0: {
          title: '',
          content: '{DES}<br/>进流量:{IN_FLX_NR}<br/>出流量:{OUT_FLX_NR}'
        },
        1: {
          title: '',
          content:
            '{NAME_1}<br/>昨日流量:{VOLUME_YESTERDAY}<br/>今日流量:{VOLUME_TODAY}'
        }
      }
    }
  ],
  operationallayers: [],
  options: {
    //for arcgis-2d
    center: [0, 0],
    zoom: 1,
    //viewMode: '3D',
    extent: {
      xmin: 145.69744474826544,
      ymin: 28.699899741351196,
      xmax: 149.69861261797826,
      ymax: 33.26927173678651,
      spatialReference: {wkid: 3857}
    },
    constraints: {
      rotationEnabled: false
    }
  }
};

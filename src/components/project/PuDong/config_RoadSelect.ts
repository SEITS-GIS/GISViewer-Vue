export let GisConfig = {
  arcgis_api: 'http://localhost:8090/arcgis_js_api_4',
  theme: 'dark', //dark,vec
  baseLayers: [
    {
      label: '深色',
      type: 'tiled',
      url:
        'http://115.28.88.187:6080/arcgis/rest/services/ZhongZhi/background_zz/MapServer',
      visible: true
    }
    // {
    //   label: '深色',
    //   type: 'webtiled',
    //   url: 'http://114.215.146.210:25003/v3/tile?z={level}&x={col}&y={row}',
    //   visible: true
    // }
  ],
  operationallayers: [
    // {
    //   label: '接驳线',
    //   type: 'dynamic',
    //   url:
    //     'http://172.30.30.1:6080/arcgis/rest/services/ShangHaiHarbour/ShangHai_jieboxian/MapServer',
    //   refreshInterval: 1,
    //   visible: true,
    //   outFields: ['*']
    // },
    // {
    //   label: '接驳线1',
    //   type: 'feature',
    //   url:
    //     'http://172.30.30.1:6080/arcgis/rest/services/ShangHaiHarbour/ShangHai_jieboxian/MapServer/1',
    //   refreshInterval: 1,
    //   visible: false,
    //   outFields: ['*'],
    //   popupTemplate: {
    //     title: '',
    //     content: '{FEATURENAME}'
    //   }
    // }
  ],
  options: {
    center: [121.24, 31.235],
    zoom: 12,
    //viewingMode: 'global',
    // ground: {opacity: 1},
    // alphaCompositingEnabled: true,
    // environment: {
    //   background: {
    //     type: 'color',
    //     color: [255, 255, 255]
    //   },
    //   starsEnabled: false,
    //   atmosphereEnabled: false
    // },
    //viewMode: '3D',
    constraints: {
      rotationEnabled: false,
      minZoom: 0
    }
    //for arcgis-3d
    // camera: {
    //   heading: 0,
    //   tilt: 9.15,
    //   position: {
    //     x: 105.508849,
    //     y: 22.581284,
    //     z: 7000000
    //   }
    // }
  }
};

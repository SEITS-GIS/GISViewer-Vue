export let GisConfig = {
  arcgis_api: 'http://localhost:8090/arcgis_js_api/library/4.14',
  theme: 'custom', //dark,vec
  baseLayers: [
    {
      label: '深色底图',
      type: 'tiled',
      url: 'https://10.31.214.248/server/rest/services/bj_dmd/MapServer',
      visible: true
    }
  ],
  operationallayers: [
    {
      label: '接驳线',
      type: 'dynamic',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_jieboxian/MapServer',
      refreshInterval: 1,
      visible: true,
      outFields: ['*'],
      popupTemplates: {
        '1': {
          title: '',
          content: '{FEATURENAME}'
        },
        '6': {
          title: '',
          content: '{FEATURENAME}'
        },
        '10': {
          title: '',
          content: '{FEATURENAME}'
        },
        '11': {
          title: '',
          content: '{FEATURENAME}'
        }
      }
    }
  ],
  options: {
    center: [0, 0],
    zoom: 1,
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

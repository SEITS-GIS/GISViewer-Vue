export let GisConfig = {
  arcgis_api: 'http://localhost:8090/arcgis_js_api/library/4.17',
  theme: 'dark', //dark,vec
  baseLayers: [
    {
      label: '深色',
      type: 'tiled',
      url:
        ' https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
      visible: true
    }
    // {
    //   label: '深色',
    //   type: 'webtiled',
    //   url: 'http://114.215.146.210:25003/v3/tile?z={level}&x={col}&y={row}',
    //   visible: true
    // },
    // {
    //   label: '深色',
    //   type: 'tiled',
    //   url: 'https://10.31.214.248/server/rest/services/bj_xxb/MapServer',
    //   visible: true
    // }
  ],
  operationallayers: [
    // {
    //   label: '点位',
    //   type: 'feature',
    //   outFields: ['*'],
    //   visible: false,
    //   url: 'https://10.31.214.248/server/rest/services/sssb_dpt/MapServer/1',
    //   legendEnabled: false,
    //   popupEnabled: false,
    //   minScale: 0,
    //   maxScale: 0,
    //   renderer: {
    //     type: 'simple', // autocasts as new SimpleRenderer()
    //     symbol: {
    //       type: 'picture-marker',
    //       url: 'assets/image/chedao.png',
    //       width: 30,
    //       height: 40
    //     }
    //   },
    //   labelingInfo: [
    //     {
    //       labelExpressionInfo: {
    //         expression: '$feature.DEVICEID'
    //       },
    //       useCodedValues: true,
    //       labelPlacement: 'above-center',
    //       symbol: {
    //         type: 'text', // autocasts as new TextSymbol()
    //         color: 'white',
    //         font: {
    //           // autocast as new Font()
    //           size: 12,
    //           weight: 'normal'
    //         }
    //       }
    //     }
    //   ],
    //   featureReduction: {
    //     type: 'cluster',
    //     clusterRadius: '100px',
    //     clusterMinSize: '50px',
    //     clusterMaxSize: '80px',
    //     labelingInfo: [
    //       {
    //         deconflictionStrategy: 'none',
    //         labelExpressionInfo: {
    //           expression: '$feature.cluster_count'
    //         },
    //         symbol: {
    //           type: 'text',
    //           color: 'red',
    //           yoffset: '30'
    //         },
    //         labelPlacement: 'center-center'
    //       }
    //     ]
    //   }
    // }
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
    center: [121.53, 31.17],
    zoom: 13,
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

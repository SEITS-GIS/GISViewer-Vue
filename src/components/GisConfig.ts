export let GisConfig = {
  arcgis_api: 'http://localhost:8090/arcgis_js_api/library/4.14',
  //arcgis_api:
  //  'https://webapi.amap.com/maps?v=1.4.15&key=29dd04daa39aa33a7e2cdffa37ebec4d',
  //arcgis_api: 'http://128.64.130.247:8219/baidumap/jsapi/api.js',
  //arcgis_api: "http://128.64.151.245:8019/baidumap/jsapi/api.js",
  //arcgis_api: "http://localhost:8090/baidu/BDAPI.js",
  theme: 'dark', //dark,vec
  baseLayers: [
    // {
    //   label: '发布段0000',
    //   url:
    //     'http://10.31.152.48:6080/arcgis/rest/services/ShangHaiHarbour/ShangHai_xzqh_simple/MapServer',
    //   type: 'dynamic',
    //   visible: true
    // }
    // {
    //   label: '深色',
    //   url: 'http://114.215.146.210:25003/v3/tile?z={level}&x={col}&y={row}',
    //   type: 'webtiled',
    //   visible: true
    // }
    // {
    //   label: '深色',
    //   type: 'tiled',
    //   url: 'https://10.89.1.99/arcgis/rest/services/bj_xxb/MapServer',
    //   visible: true
    // },
    // {
    //   label: 'f12',
    //   url: 'https://10.89.1.99/arcgis/rest/services/dlbj_cd/MapServer',
    //   type: 'tiled',
    //   visible: true
    // },
    // {
    //   label: 'f13',
    //   url: 'https://10.89.1.99/arcgis/rest/services/bx/MapServer',
    //   type: 'tiled',
    //   visible: true
    // }
    // {
    //   label: '浅色',
    //   type: 'tiled',
    //   url:
    //     'http://172.30.30.1:6080/arcgis/rest/services/ShangHai/ShangHai_base_mercator_new/MapServer',
    //   visible: true
    // },
    {
      label: '深色',
      type: 'tiled',
      url:
        'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
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
    {
      label: 'fbd1333',
      url: './config/fbd/pcs.json',
      type: 'json',
      visible: true
    }
    // {
    //   label: 'fbd123',
    //   url: './config/fbd/morph_ksl.json',
    //   type: 'json',
    //   visible: true,
    //   refreshInterval: 1,
    //   renderer: {
    //     type: 'unique-value', // autocasts as new UniqueValueRenderer()
    //     field: 'STATE',
    //     defaultSymbol: {
    //       type: 'simple-fill',
    //       color: 'rgba(100, 210, 121, 255)',
    //       outline: {color: '#696969', width: 1}
    //     }, // autocasts as new SimpleFillSymbol()
    //     uniqueValueInfos: [
    //       {
    //         value: 'free',
    //         symbol: {
    //           type: 'simple-fill', // autocasts as new SimpleFillSymbol()
    //           color: 'rgba(100, 210, 121, 255)'
    //         }
    //       },
    //       {
    //         // All features with value of "East" will be green
    //         value: 'jam',
    //         symbol: {
    //           type: 'simple-fill', // autocasts as new SimpleFillSymbol()
    //           color: 'red'
    //         }
    //       },
    //       {
    //         value: 'crowd',
    //         symbol: {
    //           type: 'simple-fill', // autocasts as new SimpleFillSymbol()
    //           color: 'yellow'
    //         }
    //       }
    //     ]
    //   }
    // }
    // {
    //   label: 'fbd',
    //   url:
    //     'http://172.30.30.1:6080/arcgis/rest/services/ShangHai/FBD_GD/MapServer',
    //   type: 'dynamic',
    //   visible: true
    // },
    // {
    //   label: '地铁1',
    //   url: 'http://localhost:8090/TGISViewer_v200/images/guozhanzhongxin.svg',
    //   type: 'picture',
    //   visible: true
    // },
    // {
    //   label: '地铁',
    //   url:
    //     'http://172.30.30.1:6080/arcgis/rest/services/ShangHaiHarbour/ShangHai_transportation/MapServer',
    //   type: 'dynamic',
    //   visible: false,
    //   popupTemplates: {
    //     2: {
    //       title: '12',
    //       content: '<div class="acc">{Name}1212---{SubwayName}</div>'
    //     },
    //     5: {
    //       title: '12',
    //       content: '<div class="acc">{Name}</div>'
    //     },
    //     10: {
    //       title: '12',
    //       content: '<div class="acc">{Name}</div>'
    //     },
    //     12: {
    //       title: '12',
    //       content: '<div class="acc">{Name}</div>'
    //     }
    //   }
    // },
    // {
    //   label: '发布段0000',
    //   url:
    //     'http://10.31.152.48:6080/arcgis/rest/services/ShangHaiHarbour/ShangHai_xzqh_simple/MapServer/0',
    //   type: 'feature',
    //   visible: false,
    //   labelsVisible: true,
    //   outFields: ['*'],
    //   renderer: {
    //     type: 'unique-value',
    //     field: 'Name',
    //     defaultSymbol: {
    //       type: 'simple-fill',
    //       style: 'solid',
    //       color: [255, 0, 0, 0.5],
    //       outline: {
    //         type: 'simple-line',
    //         style: 'solid',
    //         color: [110, 110, 110, 255],
    //         width: 2
    //       }
    //     },
    //     uniqueValueInfos: [
    //       {
    //         value: '闵行区',
    //         symbol: {
    //           type: 'simple-fill',
    //           style: 'solid',
    //           color: [0, 255, 51, 0.3],
    //           outline: {
    //             type: 'simple-line',
    //             style: 'solid',
    //             color: [110, 110, 110, 0.5],
    //             width: 2
    //           }
    //         }
    //       },
    //       {
    //         value: '普陀区',
    //         symbol: {
    //           type: 'simple-fill',
    //           style: 'solid',
    //           color: [34, 255, 122, 0.6],
    //           outline: {
    //             type: 'simple-line',
    //             style: 'solid',
    //             color: [110, 110, 110, 255],
    //             width: 2
    //           }
    //         }
    //       },
    //       {
    //         value: '奉贤区',
    //         symbol: {
    //           type: 'simple-fill',
    //           style: 'solid',
    //           color: [128, 0, 68, 0.4],
    //           outline: {
    //             type: 'simple-line',
    //             style: 'solid',
    //             color: [110, 110, 110, 255],
    //             width: 2
    //           }
    //         }
    //       }
    //     ]
    //   },
    //   labelingInfo: [
    //     {
    //       labelExpressionInfo: {
    //         expression: '$feature.FEATURETYP+",测试中文112,"'
    //       },
    //       //labelExpression: '1212',
    //       useCodedValues: false,
    //       labelPlacement: 'always-horizontal',
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
    //   ]
    // }
    // ,
    // {
    //   label: '匝道灯',
    //   url:
    //     'http://172.30.30.1:6080/arcgis/rest/services/ShangHaiHarbour/KuaiSuLu_device/MapServer/0',
    //   type: 'feature',
    //   visible: true,
    //   refreshInterval: 0.5,
    //   outFields: ['*'],
    //   popupTemplate: {
    //     title: '12',
    //     content:
    //       '<div><div class="acc">{BM_CODE}1212---{DEVICETYPE }</div></div>'
    //   },
    //   featureReduction: {
    //     type: 'cluster',
    //     clusterRadius: '100px',
    //     // {cluster_count} is an aggregate field containing
    //     // the number of features comprised by the cluster
    //     popupTemplate: {
    //       content: 'This cluster represents {cluster_count} earthquakes.',
    //       fieldInfos: [
    //         {
    //           fieldName: 'cluster_count',
    //           format: {
    //             places: 0,
    //             digitSeparator: true
    //           }
    //         }
    //       ]
    //     },
    //     clusterMinSize: '24px',
    //     clusterMaxSize: '60px',
    //     labelingInfo: [
    //       {
    //         deconflictionStrategy: 'none',
    //         labelExpressionInfo: {
    //           expression: '$feature.cluster_count'
    //         },
    //         symbol: {
    //           type: 'text',
    //           color: '#004a5d',
    //           font: {
    //             weight: 'bold',
    //             family: 'Noto Sans',
    //             size: '12px'
    //           }
    //         },
    //         labelPlacement: 'center-center'
    //       }
    //     ]
    //   }
    // }
    //,
    // {
    //   url: 'http://localhost:8888/geoserver/myMap/wms',
    //   type: 'wms',
    //   label: 'ceshi',
    //   sublayers: [
    //     {
    //       name: 'myMap:zadao' // name of the sublayer
    //     }
    //   ],
    //   imageFormat: 'image/png',
    //   version: '1.1.1'
    // }
  ],
  //gisServer: 'http://128.64.151.245:8019',
  options: {
    //for arcgis-2d
    //center: [0, 0],
    center: [121.24, 31.235],
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
      rotationEnabled: false
    }
    //mapStyle: 'amap://styles/darkblue' //设置地图的显示样式
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

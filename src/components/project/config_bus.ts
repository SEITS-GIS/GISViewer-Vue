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
      label: '虹桥商务区',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/ShangHai/ShangHai_Parking/MapServer/3',
      type: 'feature',
      visible: true,
      showLabels: true,
      outFields: ['*']
    },
    {
      label: '停车场-面',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/ShangHai/ShangHai_Parking/MapServer/0',
      type: 'feature',
      visible: true,
      outFields: ['*']
    },
    {
      label: '地铁线',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/ShangHai/ShangHai_Subway/MapServer/2',
      type: 'feature',
      showLabels: false,
      mode: 0,
      visible: true,
      outFields: ['*']
    },
    {
      label: '停车场-点',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/ShangHai/ShangHai_Parking/MapServer/1',
      type: 'feature',
      showLabels: false,
      mode: 0,
      visible: true,
      refreshInterval: 5,
      outFields: ['*'],
      renderer: {
        type: 'unique-value',
        field1: 'JWPT.PARK_STATUS_VW.STATUS',
        defaultSymbol: {
          type: 'picture-marker',
          url: 'images/mapIcons/icon_P_green.png',
          width: 24,
          height: 33,
          yoffset: 17
        },
        uniqueValueInfos: [
          {
            value: 'free',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'crowd',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'jam',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'saturation',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          }
        ]
      }
    },
    {
      label: '小停车场-点',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/ShangHai/ShangHai_Parking/MapServer/5',
      type: 'feature',
      showLabels: false,
      mode: 0,
      visible: true,
      refreshInterval: 5,
      outFields: ['*'],
      renderer: {
        type: 'unique-value',
        field1: 'JWPT.PARK_STATUS_VW.STATUS',
        defaultSymbol: {
          type: 'picture-marker',
          url: 'images/mapIcons/icon_P_green.png',
          width: 24,
          height: 33,
          yoffset: 17
        },
        uniqueValueInfos: [
          {
            value: 'free',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'crowd',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'jam',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'saturation',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          }
        ]
      }
    },
    {
      label: '大停车场-点',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/ShangHai/ShangHai_Parking/MapServer/4',
      type: 'feature',
      showLabels: false,
      mode: 0,
      visible: true,
      refreshInterval: 5,
      outFields: ['*'],
      renderer: {
        type: 'unique-value',
        field1: 'JWPT.PARK_STATUS_VW.STATUS',
        defaultSymbol: {
          type: 'picture-marker',
          url: 'images/mapIcons/icon_P_green.png',
          width: 24,
          height: 33,
          yoffset: 17
        },
        uniqueValueInfos: [
          {
            value: 'free',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'crowd',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'jam',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'saturation',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          }
        ]
      }
    },
    {
      label: 'P8',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/ShangHai/ShangHai_Parking/MapServer/6',
      type: 'feature',
      showLabels: false,
      mode: 0,
      visible: true,
      refreshInterval: 5,
      outFields: ['*'],
      renderer: {
        type: 'unique-value',
        field1: 'JWPT.PARK_STATUS_VW.STATUS',
        defaultSymbol: {
          type: 'picture-marker',
          url: 'images/mapIcons/icon_P_green.png',
          width: 24,
          height: 33,
          yoffset: 17
        },
        uniqueValueInfos: [
          {
            value: 'free',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'crowd',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'jam',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'saturation',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          }
        ]
      }
    },
    {
      label: '国展中心',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/ShangHai/ShangHai_Parking/MapServer/2',
      type: 'feature',
      visible: true,
      showLabels: false,
      outFields: ['*']
    },
    {
      label: '国展中心图层',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/ShangHai/ShangHai_Parking/MapServer/2',
      type: 'feature',
      visible: true,
      mode: 0,
      outFields: ['*']
    },
    {
      label: '地铁标注点',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/ShangHai/ShangHai_Subway/MapServer/1',
      type: 'feature',
      showLabels: false,
      mode: 0,
      refreshInterval: 5,
      visible: true,
      outFields: ['*'],
      renderer: {
        type: 'unique-value',
        field1: 'JWPT.RAILWAY_VOL_SATURATION.STATUS',
        defaultSymbol: {
          type: 'picture-marker',
          url: 'images/mapIcons/point_green.png',
          width: 36,
          height: 36,
          yoffset: 0
        },
        uniqueValueInfos: [
          {
            value: 'free',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/point_green.png',
              width: 36,
              height: 36,
              yoffset: 0
            }
          },
          {
            value: 'crowd',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/point_yellow.png',
              width: 36,
              height: 36,
              yoffset: 0
            }
          },
          {
            value: 'jam',
            symbol: {
              type: 'picture-marker',
              url: 'images/mapIcons/point_red.png',
              width: 36,
              height: 36,
              yoffset: 0
            }
          }
        ]
      }
    }
  ],
  options: {
    center: [-0.1595, -0.049285],
    zoom: 5
  }
};

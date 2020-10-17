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
      type: 'image',
      url: 'assets/mapIcons/JinBoHui/gzzx.svg',
      geometry: {x: -16775.35204963667, y: -4222.84795454},
      width: 618,
      height: 561,
      minScale: 16000
    },
    {
      type: 'image',
      url: 'assets/mapIcons/JinBoHui/flower.png',
      geometry: {x: -16465.35204963667, y: -4542.84795454},
      width: 282,
      height: 282,
      maxScale: 32000
    },
    {
      label: '接驳线', //需要修改
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_road/MapServer',
      type: 'dynamic',
      visible: true,
      popupTemplates: {
        1: {
          title: '',
          content:
            '<div>总班次：{BUSLINE_SHIFT}<br/>总乘客数：{FLOW}<br/>描述：{BUSLINE_DESC}</div>'
        },
        6: {
          title: '',
          content:
            '<div>总班次：{BUSLINE_SHIFT}<br/>总乘客数：{FLOW}<br/>描述：{BUSLINE_DESC}</div>'
        },
        8: {
          title: '',
          content:
            '<div>总班次：{BUSLINE_SHIFT}<br/>总乘客数：{FLOW}<br/>描述：{BUSLINE_DESC}</div>'
        },
        10: {
          title: '',
          content:
            '<div>总班次：{BUS_NUM}<br/>总乘客数：{PERSON_NUM}<br/>描述：{BUSLINE_DESC}</div>'
        },
        11: {
          title: '',
          content:
            '<div>总班次：{BUSLINE_SHIFT}<br/>总乘客数：{FLOW}<br/>描述：{BUSLINE_DESC}</div>'
        }
      }
    },
    {
      label: '虹桥商务区',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Parking/MapServer/3',
      type: 'feature',
      visible: true,
      outFields: ['*']
    },
    {
      label: '停车场-面',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Parking/MapServer/0',
      type: 'feature',
      visible: true,
      outFields: ['*']
    },
    {
      label: '地铁线',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Subway/MapServer/2',
      type: 'feature',
      visible: true,
      outFields: ['*'],
      popupTemplate: {
        title: '',
        content: '线路：${Name_chn}'
      }
    },
    {
      label: '停车场-点',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Parking/MapServer/1',
      type: 'feature',
      popupTemplate: {
        title: '',
        content:
          '描述：${PARK_DESC}<br/>总泊位数（大车）：${B_PARKNUM}<br/>总泊位数（小车）：${S_PARKNUM}<br/>总剩余泊位数（大车）：${B_REMAIN_PARKNUM}<br/>总剩余泊位数（小车）：${S_REMAIN_PARKNUM}<br/>泊位占用率（大车）：${B_PARKRATE}<br/>泊位占用率（小车）：${S_PARKRATE}<br/>预约到达率（大车）：${B_APPOINT_INRATE}<br/>预约到达率（小车）：${S_APPOINT_INRATE}'
      },
      visible: false,
      outFields: ['*'],
      renderer: {
        type: 'unique-value',
        field: 'JWPT.PARK_STATUS_VW.STATUS',
        defaultSymbol: {
          type: 'picture-marker',
          url: 'assets/mapIcons/icon_P_green.png',
          width: 24,
          height: 33,
          yoffset: 17
        },
        uniqueValueInfos: [
          {
            value: 'free',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'crowd',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'jam',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'saturation',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          }
        ]
      }
    },
    {
      label: '道路摄像机',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_devices/MapServer/0',
      type: 'feature',
      popupTemplate: {
        title: '',
        content: '描述：${FSTR_DESC}-${FSTR_SCENE}'
      },
      visible: true,
      outFields: ['*'],
      renderer: {
        type: 'unique-value',
        field: '摄像机.FEATURETYP',
        defaultSymbol: {
          type: 'picture-marker',
          url: 'assets/mapIcons/JinBoHui/icon_gis_sxj01.png',
          width: 24,
          height: 28,
          yoffset: 14
        },
        uniqueValueInfos: [
          {
            value: '0',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/JinBoHui/icon_gis_sxj02.png',
              width: 24,
              height: 28,
              yoffset: 14
            }
          },
          {
            value: '1',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/JinBoHui/icon_gis_sxj01.png',
              width: 24,
              height: 28,
              yoffset: 14
            }
          }
        ]
      }
    }
  ],
  options: {
    center: [-0.1595, -0.049285],
    zoom: 5,
    constraints: {
      rotationEnabled: false,
      minZoom: 0
    }
  }
};

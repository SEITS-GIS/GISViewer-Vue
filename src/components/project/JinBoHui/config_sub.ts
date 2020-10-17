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
        content: '线路：{Name_chn}'
      }
    },
    {
      label: '停车场-点',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Parking/MapServer/1',
      type: 'feature',
      visible: true,
      refreshInterval: 5,
      outFields: ['*'],
      popupTemplate: {
        title: '',
        content:
          '描述：{PARK_DESC}<br/>总泊位数（大车）：{B_PARKNUM}<br/>总泊位数（小车）：{S_PARKNUM}<br/>总剩余泊位数（大车）：{B_REMAIN_PARKNUM}<br/>总剩余泊位数（小车）：{S_REMAIN_PARKNUM}<br/>泊位占用率（大车）：{B_PARKRATE}<br/>泊位占用率（小车）：{S_PARKRATE}<br/>预约到达率（大车）：{B_APPOINT_INRATE}<br/>预约到达率（小车）：{S_APPOINT_INRATE}'
      },
      renderer: {
        type: 'unique-value',
        field: 'JWPT.PARK_STATUS_VW.STATUS',
        defaultSymbol: {
          type: 'picture-marker',
          url: 'assets/mapIcons/JinBoHui/icon_P_green.png',
          width: 24,
          height: 33,
          yoffset: 17
        },
        uniqueValueInfos: [
          {
            value: 'free',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/JinBoHui/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'crowd',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/JinBoHui/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'jam',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/JinBoHui/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'saturation',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/JinBoHui/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          }
        ]
      }
    },

    {
      label: '地铁标注点',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Subway/MapServer/1',
      type: 'feature',
      refreshInterval: 5,
      visible: true,
      outFields: ['*'],
      popupTemplate: {
        title: '',
        content:
          '地铁线：{LINE_DESC}<br/>地铁站：{STATION_DESC}<br/>进站人数：{FINT_IN}<br/>出站人数：{FINT_OUT}'
      },
      renderer: {
        type: 'unique-value',
        field: 'JWPT.RAILWAY_VOL_SATURATION.STATUS',
        defaultSymbol: {
          type: 'picture-marker',
          url: 'assets/mapIcons/JinBoHui/point_green.png',
          width: 36,
          height: 36,
          yoffset: 0
        },
        uniqueValueInfos: [
          {
            value: 'free',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/JinBoHui/point_green.png',
              width: 36,
              height: 36,
              yoffset: 0
            }
          },
          {
            value: 'crowd',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/JinBoHui/point_yellow.png',
              width: 36,
              height: 36,
              yoffset: 0
            }
          },
          {
            value: 'jam',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/JinBoHui/point_red.png',
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
    center: [-0.14532287775028, -0.0435806907338],
    zoom: 6,
    constraints: {
      rotationEnabled: false,
      minZoom: 0
    }
  }
};

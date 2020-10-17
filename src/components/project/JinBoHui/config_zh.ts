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
      label: '地铁线',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Subway/MapServer/2',
      type: 'feature',
      minScale: 144449,
      mode: 0,
      visible: true,
      outFields: ['*'],
      popupTemplate: {
        title: '',
        context: '线路：${Name_chn}'
      }
    },
    {
      label: '接驳线',
      type: 'dynamic',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_jieboxian/MapServer',
      refreshInterval: 1,
      visible: true,
      outFields: ['*'],
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
      label: '地铁标注点',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Subway/MapServer/1',
      type: 'feature',
      visible: true,
      maxScale: 32000,
      minScale: 128000,
      outFields: ['*'],
      popupTemplate: {
        title: '',
        content:
          '${LINE_DESC}<br/>地铁站：${STATION_DESC}<br/>进站人数：${FINT_IN}<br/>出站人数：${FINT_OUT}'
      },
      renderer: {
        type: 'unique-value',
        field: 'STATUS',
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
    },
    {
      label: '周边-地铁标注点',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Subway/MapServer/1',
      type: 'feature',
      mode: 0,
      minScale: 32000,
      visible: true,
      outFields: ['*'],
      definitionExpression:
        "地铁标注点.Name in ('徐泾东','诸光路','虹桥火车站')",
      popupTemplate: {
        title: '',
        content:
          '${LINE_DESC}<br/>地铁站：${STATION_DESC}<br/>进站人数：${FINT_IN}<br/>出站人数：${FINT_OUT}'
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
    },
    {
      label: '国展周边发布段',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/Kuaisulu_fbd_GZZB/MapServer',
      type: 'dynamic',
      refreshInterval: 1,
      visible: true,
      outFields: ['*'],
      popupTemplates: {
        '0': {
          title: '',
          content: '描述：${DES}'
        },
        '1': {
          title: '',
          content: '描述：${DES}'
        },

        '2': {
          title: '',
          content: '描述：${DES}'
        }
      }
    },
    {
      label: '发布段',
      type: 'dynamic',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/Kuaisulu_fbd/MapServer',
      refreshInterval: 1,
      visible: true,
      outFields: ['*'],
      popupTemplates: {
        '0': {
          title: '',
          content: '描述：${FSTR_DESC}'
        },
        '1': {
          title: '',
          content: '描述：${FSTR_DESC}'
        },
        '2': {
          title: '',
          content: '描述：${FSTR_DESC}'
        },
        '3': {
          title: '',
          content: '描述：${FSTR_DESC}'
        }
      }
    },
    {
      label: '国展周边地面道路',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_GZZX_dmfbd/MapServer/0',
      type: 'feature',
      visible: false,
      outFields: ['*'],
      refreshInterval: 5,
      maxScale: 0,
      minScale: 128000,
      popupTemplate: {
        title: '',
        context: '描述：${FSTR_DESC}'
      }
    },
    {
      label: '轮廓线',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/morph_yy_frame/MapServer/0',
      type: 'feature',
      maxScale: 32000,
      outFields: ['*']
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

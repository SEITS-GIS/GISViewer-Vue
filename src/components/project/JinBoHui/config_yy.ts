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
      label: '国展中心面',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Exhibition/MapServer',
      type: 'dynamic',
      outFields: ['*'],
      popupTemplates: {
        0: {
          title: '',
          content: '客流：{FSTR_VOLUME}'
        }
      }
    },
    {
      type: 'image',
      url: 'assets/mapIcons/JinBoHui/gzzx.svg',
      geometry: {x: -16775.35204963667, y: -4222.84795454},
      width: 618,
      height: 561,
      minScale: 8000
    },
    {
      type: 'image',
      url: 'assets/mapIcons/JinBoHui/flower.png',
      geometry: {x: -16465.35204963667, y: -4542.84795454},
      width: 282,
      height: 282,
      minScale: 64000,
      maxScale: 16000
    },
    {
      label: '国展中心点',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Parking/MapServer/2',
      type: 'feature',
      outFields: ['*'],
      maxScale: 128000,
      popupTemplate: {
        title: '',
        content: '客流：{FSTR_VOLUME}'
      },
      renderer: {
        type: 'simple',
        symbol: {
          type: 'picture-marker',
          url: 'assets/mapIcons/JinBoHui/flower.png',
          width: 32,
          height: 32
        }
      }
    },
    {
      label: '国展周边地面道路',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_GZZX_dmfbd/MapServer',
      type: 'dynamic',
      visible: true,
      maxScale: 0,
      minScale: 128000,
      popupTemplate: {
        title: '',
        content: '描述：{FSTR_DESC}'
      }
    },
    {
      label: '鹰眼发布段0',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/morph_yy/MapServer/0',
      type: 'feature',
      visible: true,
      outFields: ['*']
    },
    {
      label: '鹰眼发布段1',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/morph_yy/MapServer/1',
      type: 'feature',
      visible: true,
      outFields: ['*']
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
    }
  ],
  options: {
    center: [-0.14532287775028, -0.0435806907338],
    zoom: 5,
    constraints: {
      rotationEnabled: false,
      minZoom: 0
    }
  }
};

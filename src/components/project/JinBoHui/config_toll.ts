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
      refreshInterval: 5,
      minScale: 32000,
      popupTemplate: {
        title: '',
        content: '描述：{FSTR_DESC}'
      }
    },
    {
      label: '国展周边发布段',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/Kuaisulu_fbd_GZZB/MapServer',
      type: 'dynamic',
      refreshInterval: 5,
      visible: false,
      outFields: ['*'],
      popupTemplates: {
        '0': {
          title: '',
          content: '描述：{DES}'
        },
        '1': {
          title: '',
          content: '描述：{DES}'
        },

        '2': {
          title: '',
          content: '描述：{DES}'
        }
      }
    },
    {
      label: '发布段',
      type: 'dynamic',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/Kuaisulu_fbd/MapServer',
      refreshInterval: 5,
      visible: true,
      outFields: ['*'],
      popupTemplates: {
        '0': {
          title: '',
          content: '描述：{FSTR_DESC}'
        },
        '1': {
          title: '',
          content: '描述：{FSTR_DESC}'
        },
        '2': {
          title: '',
          content: '描述：{FSTR_DESC}'
        },
        '3': {
          title: '',
          content: '描述：{FSTR_DESC}'
        }
      }
    },
    {
      label: '收费站',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_shoufeizhan/MapServer/1',
      type: 'feature',
      visible: true,
      popupTemplate: {
        title: '',
        content: '描述：{FSTR_DESC}'
      },
      outFields: ['*'],
      renderer: {
        type: 'simple',
        symbol: {
          type: 'picture-marker',
          url: 'assets/mapIcons/JinBoHui/icon_toll_green.png',
          width: 24,
          height: 33,
          yoffset: 16
        }
      }
    },
    {
      label: '情报板',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/Kuaisulu_devices/MapServer/1',
      type: 'feature',
      visible: false,
      popupTemplate: {
        title: '',
        content: '描述：{FSTR_DESC}'
      },
      outFields: ['*'],
      renderer: {
        type: 'simple',
        symbol: {
          type: 'picture-marker',
          url: 'assets/mapIcons/JinBoHui/icon_qbb_green.png',
          width: 24,
          height: 33,
          yoffset: 16
        }
      }
    },
    {
      label: '摄像机',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/Kuaisulu_devices/MapServer/0',
      type: 'feature',
      visible: false,
      popupTemplate: {
        title: '',
        content: '描述：{FSTR_DESC}'
      },
      outFields: ['*'],
      renderer: {
        type: 'simple',
        symbol: {
          type: 'picture-marker',
          url: 'assets/mapIcons/JinBoHui/icon_camere_green.png',
          width: 24,
          height: 33,
          yoffset: 16
        }
      }
    },
    {
      label: '交通事故',
      url:
        'http://10.31.214.201:6080/arcgis/rest/services/YJZH/ShangHai_event/MapServer/0',
      type: 'feature',
      visible: true,
      refreshInterval: 1,
      outFields: ['*'],
      popupTemplate: {
        title: '',
        content: '{YJZH.EVENT.DEVICEDESC}'
      },
      renderer: {
        type: 'simple',
        symbol: {
          type: 'picture-marker',
          url: 'assets/mapIcons/JinBoHui/icon_event_red.png',
          width: 24,
          height: 33,
          yoffset: 16
        }
      }
    },
    {
      label: '轮廓线',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/morph_yy_frame/MapServer/0',
      type: 'feature',
      maxScale: 32000,
      visible: true
    }
  ],
  options: {
    center: [-0.14532287775028, -0.0405806907338],
    zoom: 6,
    constraints: {
      rotationEnabled: false,
      minZoom: 0
    }
  }
};

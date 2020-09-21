export let GisConfig = {
  arcgis_api: 'http://localhost:8090/arcgis_js_api/library/4.14',
  theme: 'custom', //dark,vec
  baseLayers: [
    {
      label: '深色底图',
      type: 'tiled',
      url: 'https://10.89.1.99/arcgis/rest/services/bj_xxb/MapServer',
      visible: true
    },
    {
      label: '道路',
      url: 'https://10.89.1.99/arcgis/rest/services/dlbj_cd/MapServer',
      type: 'tiled',
      visible: true
    },
    {
      label: '标线',
      url: 'https://10.89.1.99/arcgis/rest/services/bx/MapServer',
      type: 'tiled',
      visible: true
    },
    {
      label: '道路',
      url: 'https://10.89.1.99/arcgis/rest/services/dlbj_cd/MapServer',
      type: 'tiled',
      visible: true
    }
  ],
  operationallayers: [
    {
      label: '路网状况',
      type: 'dynamic',
      url:
        'http://10.31.214.201:6080/arcgis/rest/services/YJZH/KuaiSuLu_fbd/MapServer',
      refreshInterval: 1,
      visible: true,
      outFields: ['*'],
      popupTemplates: {
        '0': {
          title: '',
          content: '{FSTR_DESC}'
        },
        '1': {
          title: '',
          content: '{FSTR_DESC}'
        },
        '2': {
          title: '',
          content: '{FSTR_DESC}'
        },
        '3': {
          title: '',
          content: '{FSTR_DESC}'
        },
        '4': {
          title: '',
          content: '{FSTR_DESC}'
        },
        '5': {
          title: '',
          content: '{FSTR_DESC}'
        },
        '6': {
          title: '',
          content: '{FSTR_DESC}'
        },
        '7': {
          title: '',
          content: '{FSTR_DESC}'
        }
      }
    },
    {
      label: '交通事故',
      type: 'feature',
      url:
        'http://10.31.214.201:6080/arcgis/rest/services/YJZH/ShangHai_event/MapServer/0',
      refreshInterval: 1,
      visible: true,
      outFields: ['*'],
      popupTemplate: {
        title: '',
        content: '{YJZH.EVENT.DEVICEDESC}'
      },
      renderer: {
        type: 'simple', // autocasts as new SimpleRenderer()
        symbol: {
          type: 'picture-marker',
          url: 'assets/mapIcons/event.svg',
          width: 33,
          height: 33
        }
      }
    },
    {
      label: '市内水运',
      url:
        'http://10.31.214.201:6080/arcgis/rest/services/YJZH/ShangHai_ferryroutes/MapServer',
      type: 'dynamic',
      visible: true,
      popupTemplates: {
        '0': {
          title: '',
          content: '{FEATURENAM}'
        },
        '1': {
          title: '',
          content: '{FEATURENAM}'
        },
        '2': {
          title: '',
          content: '{FSTR_DESC}'
        },
        '3': {
          title: '',
          content: '{FSTR_DESC}'
        },
        '5': {
          title: '',
          content: '{FSTR_DESC}'
        },
        '6': {
          title: '',
          content: '{FSTR_DESC}'
        }
      }
    },
    {
      label: '机场',
      url:
        'http://10.31.214.201:6080/arcgis/rest/services/YJZH/ShangHai_Airport/MapServer',
      type: 'dynamic',
      visible: true
    },
    {
      label: '铁路客运',
      url:
        'http://10.31.214.201:6080/arcgis/rest/services/YJZH/ShangHai_Railway/MapServer',
      type: 'dynamic',
      visible: true
    },
    {
      label: '摄像机',
      url: 'https://10.89.1.99/arcgis/rest/services/sssb_dpt/MapServer',
      type: 'dynamic',
      visible: false,
      popupTemplates: {
        '1': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{位置}<br/>类型:{图层名}'
        },
        '2': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{位置}<br/>类型:{图层名}'
        },
        '3': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{位置}<br/>类型:{图层名}'
        },
        '4': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{位置}<br/>类型:{图层名}'
        },
        '6': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{位置}<br/>类型:{图层名}'
        },
        '7': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{位置}<br/>类型:{图层名}'
        },
        '8': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{位置}<br/>类型:{图层名}'
        },
        '9': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{位置}<br/>类型:{图层名}'
        },
        '10': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{位置}<br/>类型:{图层名}'
        },
        '12': {
          title: '',
          content: '描述:{DES}<br/>类型:{图层名}'
        },
        '13': {
          title: '',
          content: '描述:{DES}<br/>类型:{图层名}'
        },
        '14': {
          title: '',
          content: '描述:{DES}<br/>类型:{图层名}'
        },
        '15': {
          title: '',
          content: '描述:{DES}<br/>类型:{图层名}'
        },
        '16': {
          title: '',
          content: '描述:{DES}<br/>类型:{图层名}'
        },
        '17': {
          title: '',
          content: '描述:{DES}<br/>类型:{图层名}'
        },
        '19': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{DES}<br/>类型:{DEVTYPE}'
        },
        '20': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{DES}<br/>类型:{DEVTYPE}'
        },
        '21': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{DES}<br/>类型:{DEVTYPE}'
        },
        '22': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{DES}<br/>类型:{DEVTYPE}'
        },
        '24': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{DES}<br/>类型:{DEVTYPE}'
        },
        '25': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{DES}<br/>类型:{DEVTYPE}'
        },
        '27': {
          title: '',
          content: '路名:{LXMC}<br/>描述:{NAME}'
        },
        '28': {
          title: '',
          content: '路名:{LXMC}<br/>描述:{NAME}'
        },
        '29': {
          title: '',
          content: '路名:{LXMC}<br/>描述:{NAME}'
        },
        '30': {
          title: '',
          content: '路名:{LXMC}<br/>描述:{NAME}'
        },
        '31': {
          title: '',
          content: '路名:{LXMC}<br/>描述:{NAME}'
        },
        '33': {
          title: '',
          content: '路名:{ROADNAME }<br/>描述:{DES}<br/>类型:{DEVTYPE}'
        },
        '34': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{DES}<br/>类型:{DEVTYPE}'
        },
        '35': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{DES}<br/>类型:{DEVTYPE}'
        },
        '36': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{DES}<br/>类型:{DEVTYPE}'
        },
        '37': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{DES}<br/>类型:{DEVTYPE}'
        },
        '38': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{DES}<br/>类型:{DEVTYPE}'
        },
        '39': {
          title: '',
          content: '路名:{ROADNAME}<br/>描述:{DES}<br/>类型:{DEVTYPE}'
        }
      }
    }
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
    // {
    //   label: 'fbd1333',
    //   url: './config/fbd/pcs.json',
    //   type: 'json',
    //   visible: true
    // }
  ],
  options: {
    //for arcgis-2d
    center: [0, 0],
    zoom: 1,
    //viewMode: '3D',
    constraints: {
      rotationEnabled: false
    }
  }
};

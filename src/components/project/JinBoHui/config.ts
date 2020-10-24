export let GisConfig = {
  arcgis_api:
    'http://10.31.214.203:8994/arcgis_js_v414_api/arcgis_js_api/library/4.14',
  theme: 'custom', //dark,vec
  baseLayers: [
    {
      label: '深色底图',
      type: 'tiled',
      url:
        'http://10.31.214.201:6080/arcgis/rest/services/ShangHai/ShangHai_base_PurplishBlue/MapServer',
      visible: true
    }
  ],
  operationallayers: [
    {
      label: '国展中心面',
      url:
        'http://10.31.214.201:6080/arcgis/rest/services/JinBoHui/ShangHai_Exhibition/MapServer',
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
      url: 'assets/mapIcons/JinBoHui/flower.png',
      geometry: {x: 13502204.92578, y: 3658256.1152},
      width: 564,
      height: 564,
      minScale: 72224
    },
    {
      label: '国展中心点',
      url:
        'http://10.31.214.201:6080/arcgis/rest/services/JinBoHui/ShangHai_Parking/MapServer/2',
      type: 'feature',
      outFields: ['*'],
      maxScale: 144448,
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
      label: '巴士线路',
      url:
        'http://10.31.214.201:6080/arcgis/rest/services/JinBoHui/ShangHai_jieboxian/MapServer/10',
      type: 'feature',
      visible: true,
      outFields: ['*'],
      minScale: 0,
      maxScale: 0,
      popupTemplate: {
        title: '',
        content: '{BUS_NUM}<br/>总乘客数：{PERSON_NUM}<br/>描述：{BUSLINE_DESC}'
      }
    }
  ],
  options: {
    center: [121.2974, 31.1956],
    scale: 144448,
    constraints: {
      rotationEnabled: false,
      minZoom: 0
    }
  }
};

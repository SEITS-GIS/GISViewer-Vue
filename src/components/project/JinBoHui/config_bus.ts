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
      url: 'assets/mapIcons/JinBoHui/flower.png',
      geometry: {x: -16465.35204963667, y: -4542.84795454},
      width: 282,
      height: 282
    },
    {
      label: '巴士线路',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_jieboxian/MapServer/10',
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
    center: [-0.14532287775028, -0.0435806907338],
    zoom: 2,
    constraints: {
      rotationEnabled: false,
      minZoom: 0
    }
  }
};

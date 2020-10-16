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
      height: 561
    },
    {
      label: '巴士线路',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_jieboxian/MapServer/10',
      type: 'feature',
      visible: true,
      outFields: ['*'],
      minScale: 0,
      maxScale: 0
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

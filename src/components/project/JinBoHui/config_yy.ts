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
      label: '国展周边地面道路',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_GZZX_dmfbd/MapServer/0',
      type: 'feature',
      visible: true,
      outFields: ['*'],
      maxScale: 0,
      minScale: 128000
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

export let GisConfig = {
  arcgis_api: 'http://localhost:8090/arcgis_js_api/library/4.14',
  theme: 'dark', //dark,vec
  baseLayers: [
    {
      label: '深色',
      type: 'tiled',
      url: 'http://10.118.131.29/arcgis/rest/services/shmap_as/MapServer',
      visible: true
    }
  ],
  operationallayers: [
    {
      label: '发布段',
      type: 'dynamic',
      url:
        'http://10.118.24.58:6080/arcgis/rest/services/ZhongZhi/fbd_zz/MapServer',
      visible: true
    },
    {
      label: 'ksl_11',
      type: 'feature',
      url:
        'http://10.118.24.58:6080/arcgis/rest/services/ZhongZhi/fbd_zz/MapServer/0',
      visible: true,
      outFields: ['*'],
      refreshInterval: 5,
      minScale: 16000,
      maxScale: 0
    },
    {
      label: 'ksl_200',
      type: 'feature',
      url:
        'http://10.118.24.58:6080/arcgis/rest/services/ZhongZhi/fbd_zz/MapServer/1',
      visible: true,
      outFields: ['*'],
      refreshInterval: 5,
      minScale: 500000,
      maxScale: 32000
    },
    {
      label: 'dm_84_min',
      type: 'feature',
      url:
        'http://10.118.24.58:6080/arcgis/rest/services/ZhongZhi/fbd_zz/MapServer/2',
      visible: true,
      outFields: ['*'],
      refreshInterval: 5,
      minScale: 16000,
      maxScale: 0
    },
    {
      label: 'dm_84_2',
      type: 'feature',
      url:
        'http://10.118.24.58:6080/arcgis/rest/services/ZhongZhi/fbd_zz/MapServer/3',
      visible: true,
      outFields: ['*'],
      refreshInterval: 5,
      minScale: 15000,
      maxScale: 17000
    },
    {
      label: 'dm_84_1',
      type: 'feature',
      url:
        'http://10.118.24.58:6080/arcgis/rest/services/ZhongZhi/fbd_zz/MapServer/4',
      visible: true,
      outFields: ['*'],
      refreshInterval: 5,
      minScale: 500000,
      maxScale: 32000
    }
  ],
  options: {
    center: [121.59, 31.22],
    zoom: 2,
    constraints: {
      rotationEnabled: false,
      minZoom: 0
    }
  }
};

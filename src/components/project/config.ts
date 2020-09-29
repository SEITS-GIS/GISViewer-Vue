export let GisConfig = {
  arcgis_api: 'http://localhost:8090/arcgis_js_api/library/4.14',
  theme: 'dark', //dark,vec
  baseLayers: [
    // {
    //   label: '深色',
    //   type: 'tiled',
    //   url:
    //     'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
    //   visible: true
    // }
    {
      label: '深色',
      type: 'webtiled',
      url: 'http://114.215.146.210:25003/v3/tile?z={level}&x={col}&y={row}',
      visible: true
    }
  ],
  operationallayers: [],
  options: {
    center: [121.24, 31.235],
    zoom: 12,
    //viewingMode: 'global',
    // ground: {opacity: 1},
    // alphaCompositingEnabled: true,
    // environment: {
    //   background: {
    //     type: 'color',
    //     color: [255, 255, 255]
    //   },
    //   starsEnabled: false,
    //   atmosphereEnabled: false
    // },
    //viewMode: '3D',
    constraints: {
      rotationEnabled: false,
      minZoom: 0
    }
    //for arcgis-3d
    // camera: {
    //   heading: 0,
    //   tilt: 9.15,
    //   position: {
    //     x: 105.508849,
    //     y: 22.581284,
    //     z: 7000000
    //   }
    // }
  }
};

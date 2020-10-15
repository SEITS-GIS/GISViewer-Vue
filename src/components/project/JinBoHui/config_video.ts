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
      label: '接驳线',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_road/MapServer',
      type: 'dynamic',
      visible: true
    },
    {
      label: '虹桥商务区',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Parking/MapServer/3',
      type: 'feature',
      visible: true,
      showLabels: true,
      outFields: ['*']
    },
    {
      label: '停车场-面',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Parking/MapServer/0',
      type: 'feature',
      visible: true,
      showLabels: true,
      outFields: ['*']
    },
    {
      label: '地铁线',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Subway/MapServer/2',
      type: 'feature',
      mode: 1,
      showLabels: false,
      visible: true,
      outFields: ['*']
    },
    {
      label: '停车场-点',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_Parking/MapServer/1',
      type: 'feature',
      showLabels: false,
      visible: false,
      outFields: ['*'],
      renderer: {
        type: 'unique-value',
        field: 'JWPT.PARK_STATUS_VW.STATUS',
        defaultSymbol: {
          type: 'picture-marker',
          url: 'assets/mapIcons/icon_P_green.png',
          width: 24,
          height: 33,
          yoffset: 17
        },
        uniqueValueInfos: [
          {
            value: 'free',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'crowd',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'jam',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          },
          {
            value: 'saturation',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/icon_P_green.png',
              width: 24,
              height: 33,
              yoffset: 17
            }
          }
        ]
      }
    },
    {
      label: '道路摄像机',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_devices/MapServer/0',
      type: 'feature',
      mode: 0,
      visible: true,
      outFields: ['*'],
      renderer: {
        type: 'unique-value',
        field: 'FEATURETYP',
        defaultSymbol: {
          type: 'picture-marker',
          url: 'assets/mapIcons/JinBoHui/icon_gis_sxj01.png',
          width: 24,
          height: 28,
          yoffset: 14
        },
        uniqueValueInfos: [
          {
            value: '0',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/JinBoHui/icon_gis_sxj02.png',
              width: 24,
              height: 28,
              yoffset: 14
            }
          },
          {
            value: '1',
            symbol: {
              type: 'picture-marker',
              url: 'assets/mapIcons/JinBoHui/icon_gis_sxj01.png',
              width: 24,
              height: 28,
              yoffset: 14
            }
          }
        ]
      }
    }
  ],
  options: {
    center: [-0.1595, -0.049285],
    zoom: 5,
    constraints: {
      rotationEnabled: false,
      minZoom: 0
    }
  }
};

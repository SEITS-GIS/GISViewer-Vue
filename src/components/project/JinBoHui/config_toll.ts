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
      refreshInterval: 5,
      maxScale: 0,
      minScale: 128000,
      mode: 0,
      renderer: {
        type: 'unique-value',
        field: 'JWPT.HIST_FBD.FINT_STATUS',
        defaultSymbol: {
          type: 'esriSFS',
          style: 'esriSFSSolid',
          color: [85, 255, 0, 255],
          outline: {
            type: 'esriSLS',
            style: 'esriSLSSolid',
            color: [0, 25, 46, 255],
            width: 0
          }
        },
        uniqueValueInfos: [
          {
            value: '1',
            symbol: {
              type: 'esriSFS',
              style: 'esriSFSSolid',
              color: [85, 255, 0, 255],
              outline: {
                type: 'esriSLS',
                style: 'esriSLSSolid',
                color: [0, 25, 46, 255],
                width: 0
              }
            }
          },
          {
            value: '2',
            symbol: {
              type: 'esriSFS',
              style: 'esriSFSSolid',
              color: [255, 255, 0, 255],
              outline: {
                type: 'esriSLS',
                style: 'esriSLSSolid',
                color: [0, 25, 46, 255],
                width: 0
              }
            }
          },
          {
            value: '3',
            symbol: {
              type: 'esriSFS',
              style: 'esriSFSSolid',
              color: [255, 85, 0, 255],
              outline: {
                type: 'esriSLS',
                style: 'esriSLSSolid',
                color: [0, 25, 46, 255],
                width: 0
              }
            }
          }
        ]
      }
    },
    {
      label: '发布段',
      type: 'dynamic',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/Kuaisulu_fbd/MapServer',
      refreshInterval: 1,
      visible: true,
      outFields: ['*']
    },
    {
      label: '收费站',
      url:
        'http://10.31.214.197:6080/arcgis/rest/services/JinBoHui/ShangHai_shoufeizhan/MapServer/1',
      type: 'feature',
      visible: true,
      mode: 0,
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
      mode: 0,
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
      mode: 0,
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
      showLabels: false,
      maxScale: 32000,
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

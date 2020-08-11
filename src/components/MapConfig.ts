import axios from 'axios';
export default class MapConfig {
  public constructor() {}
  public mapConfig: any = {
    arcgis_api: '',
    //arcgis_api:
    //  'https://webapi.amap.com/maps?v=1.4.15&key=29dd04daa39aa33a7e2cdffa37ebec4d',
    //arcgis_api: 'http://128.64.130.247:8219/baidumap/jsapi/api.js',
    //arcgis_api: "http://128.64.151.245:8019/baidumap/jsapi/api.js",
    //arcgis_api: "http://localhost:8090/baidu/BDAPI.js",
    theme: 'dark', //dark,vec
    baseLayers: [
      {
        type: 'tiled',
        url:
          'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
        visible: false
      }
    ],
    operationallayers: [
      {
        label: '地铁1',
        url:
          'http://localhost:8090/TGISViewer_v200/images/mapIcons/JiaoWeiZhiHui/gzzx.svg',
        type: 'picture',
        visible: true
      },
      {
        label: '地铁',
        url:
          'http://172.30.30.1:6080/arcgis/rest/services/ShangHaiHarbour/ShangHai_transportation/MapServer',
        type: 'dynamic',
        visible: false,
        popupTemplates: {
          2: {
            title: '12',
            content: '<div class="acc">{Name}1212---{SubwayName}</div>'
          },
          5: {
            title: '12',
            content: '<div class="acc">{Name}</div>'
          },
          10: {
            title: '12',
            content: '<div class="acc">{Name}</div>'
          },
          12: {
            title: '12',
            content: '<div class="acc">{Name}</div>'
          }
        }
      },
      {
        label: '发布段',
        url:
          'http://172.30.30.1:6080/arcgis/rest/services/ShangHaiHarbour/shanghai_xzqh_simple/MapServer/0',
        type: 'feature',
        visible: false,
        labelsVisible: true,
        outFields: ['*'],
        renderer: {
          type: 'unique-value',
          field: 'Name',
          defaultSymbol: {
            type: 'simple-fill',
            style: 'solid',
            color: [255, 0, 0, 0.5],
            outline: {
              type: 'simple-line',
              style: 'solid',
              color: [110, 110, 110, 255],
              width: 2
            }
          },
          uniqueValueInfos: [
            {
              value: '闵行区',
              symbol: {
                type: 'simple-fill',
                style: 'solid',
                color: [0, 255, 51, 0.3],
                outline: {
                  type: 'simple-line',
                  style: 'solid',
                  color: [110, 110, 110, 0.5],
                  width: 2
                }
              }
            },
            {
              value: '普陀区',
              symbol: {
                type: 'simple-fill',
                style: 'solid',
                color: [34, 255, 122, 0.6],
                outline: {
                  type: 'simple-line',
                  style: 'solid',
                  color: [110, 110, 110, 255],
                  width: 2
                }
              }
            },
            {
              value: '奉贤区',
              symbol: {
                type: 'simple-fill',
                style: 'solid',
                color: [128, 0, 68, 0.4],
                outline: {
                  type: 'simple-line',
                  style: 'solid',
                  color: [110, 110, 110, 255],
                  width: 2
                }
              }
            }
          ]
        },
        labelingInfo: [
          {
            //labelExpressionInfo: {expression: '$feature.Name'},
            labelExpression: '[Name]',
            useCodedValues: true,
            labelPlacement: 'always-horizontal',
            symbol: {
              type: 'text',
              rightToLeft: false,
              color: [255, 255, 0, 0.85],
              verticalAlignment: 'baseline',
              horizontalAlignment: 'left',
              font: {
                size: 100,
                weight: 'bold'
              }
            }
          }
        ]
      }
      // ,
      // {
      //   label: '匝道灯',
      //   url:
      //     'http://172.30.30.1:6080/arcgis/rest/services/ShangHaiHarbour/KuaiSuLu_device/MapServer/0',
      //   type: 'feature',
      //   visible: true,
      //   refreshInterval: 0.5,
      //   outFields: ['*'],

      //   popupTemplate: {
      //     title: '12',
      //     content:
      //       '<div><div class="acc">{BM_CODE}1212---{DEVICETYPE }</div></div>'
      //   },
      //   featureReduction: {
      //     type: 'cluster',
      //     clusterRadius: '100px',
      //     // {cluster_count} is an aggregate field containing
      //     // the number of features comprised by the cluster
      //     popupTemplate: {
      //       content: 'This cluster represents {cluster_count} earthquakes.',
      //       fieldInfos: [
      //         {
      //           fieldName: 'cluster_count',
      //           format: {
      //             places: 0,
      //             digitSeparator: true
      //           }
      //         }
      //       ]
      //     },
      //     clusterMinSize: '24px',
      //     clusterMaxSize: '60px',
      //     labelingInfo: [
      //       {
      //         deconflictionStrategy: 'none',
      //         labelExpressionInfo: {
      //           expression: '$feature.cluster_count'
      //         },
      //         symbol: {
      //           type: 'text',
      //           color: '#004a5d',
      //           font: {
      //             weight: 'bold',
      //             family: 'Noto Sans',
      //             size: '12px'
      //           }
      //         },
      //         labelPlacement: 'center-center'
      //       }
      //     ]
      //   }
      // }
      //,
      // {
      //   url: 'http://localhost:8888/geoserver/myMap/wms',
      //   type: 'wms',
      //   label: 'ceshi',
      //   sublayers: [
      //     {
      //       name: 'myMap:zadao' // name of the sublayer
      //     }
      //   ],
      //   imageFormat: 'image/png',
      //   version: '1.1.1'
      // }
    ],
    gisServer: 'http://128.64.151.245:8019',
    options: {
      //for arcgis-2d
      center: [121.441, 31.159],
      zoom: 13,
      viewingMode: 'local',
      ground: {opacity: 0},
      alphaCompositingEnabled: true,
      environment: {
        background: {
          type: 'color',
          color: [255, 0, 0, 0.5]
        },
        starsEnabled: false,
        atmosphereEnabled: false
      }
      //viewMode: '3D'
      //mapStyle: 'amap://styles/darkblue' //设置地图的显示样式
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
    },
    bookmarks: [
      {
        name: 'china',
        camera: {
          heading: 0,
          tilt: 9.15,
          position: {
            x: 105.508849,
            y: 22.581284,
            z: 7000000
          }
        }
      }
    ]
  };
  public gdConfig: any = {
    arcgis_api:
      'https://webapi.amap.com/maps?v=1.4.15&key=29dd04daa39aa33a7e2cdffa37ebec4d',
    theme: 'custom', //dark,vec
    baseLayers: [{type: 'traffic', label: '路况', visible: false}],
    options: {
      center: [121.441, 31.159],
      zoom: 13,
      //viewMode: '3D'
      mapStyle: 'amap://styles/darkblue' //设置地图的显示样式
    }
  };
  public async mapLoaded(map: any) {
    console.log('Map Loaded.');

    // map.showDistrictMask({
    //   name: '徐汇区',
    //   showMask: true
    // });
    map.showStreet();
    // map.showJurisdiction();
    /* map.addOverlays({
      type: "police",
      defaultSymbol: {
        //symbol for 2d
        // type: "point-2d",
        // primitive: "square",
        // url: "assets/image/Anchor.png",
        // size: 20,
        // color: "red",
        // outline: {
        //   color: "white",
        //   size: 4
        // },
        // anchor: "top"

        //symbol for 3d
        type: "point-3d",
        primitive: "cube",
        color: "red",
        size: 20000,
        anchor: "bottom"
      },
      overlays: [{ id: "test001", geometry: { x: 121.418924, y: 31.157101 } }]
    }); */
    // map.addOverlays({
    //   type: "jingqing",
    //   defaultSymbol: {
    //     type: "point",
    //     url: "assets/image/Anchor.png",
    //     width: 50,
    //     height: 30,
    //   },
    //   overlays: [
    //     {
    //       id: "310113610000",
    //       geometry: { x: 121.3943501, y: 31.39351155 },
    //       fields: {
    //         jqId: "202004171434362492126666",
    //         jqTime: "2020-05-11 16:03:54",
    //         informerPhone: "15776038940",
    //         informer: null,
    //         jqType: "2101",
    //         jqSubType: null,
    //         carType: "CAR_TYPE_08",
    //         jqAddress: "（报班长）宝山 宝祁路788号门口",
    //         jqDescription:
    //           "土方车单车事故（拉断光纤线），人无事，不影响交通，周围没有用电影响，请民警到场处理。",
    //         longitude: null,
    //         latitude: null,
    //         roadId: "40149",
    //         crossId: null,
    //         roadName: "未知",
    //         crossName: "未知",
    //         duplicate: "0",
    //         invalid: "0",
    //         handleDeptId: "310113610000",
    //         handlePoliceId: "046230",
    //         handlePoliceName: "汪冰清",
    //         handleTime: 1587105378000,
    //         feedback: "1",
    //         createUser: null,
    //         createTime: 1587105353000,
    //         updateUser: null,
    //         updateTime: 1587106265000,
    //         jqNo: "202004171434362492126666",
    //         jqTypeDesc: "事故类",
    //         jqLevel: "02",
    //         jqLevelDesc: "三级",
    //         jqSubTypeDesc: null,
    //         carTypeDesc: "其他",
    //         deptId: "310113610000",
    //         deptName: "祁连派出所",
    //         areaId: "310113610000",
    //         areaName: "祁连派出所",
    //         handleDescription: "民警已到现场，遇到报警人，系单车事故，当场处理",
    //         jqStatus: "已反馈",
    //         jqStatusDesc: null,
    //         handleDeptName: "祁连派出所",
    //         pdId: "21001",
    //         jqSubTypeEntity: null,
    //         carTypeEntity: null,
    //         jqTypeEntity: null,
    //       },
    //     },
    //     {
    //       id: "310113750000",
    //       geometry: { x: 121.459135, y: 31.396139 },
    //       fields: {
    //         jqId: "202004171213229932213053",
    //         jqTime: "2020-05-11 16:03:54",
    //         informerPhone: "13817782369",
    //         informer: "陈宁宁",
    //         jqType: "2101",
    //         jqSubType: null,
    //         carType: "CAR_TYPE_02",
    //         jqAddress: "（报班长）宝山  铁山路（宝杨路—友谊路）  桥下",
    //         jqDescription:
    //           "路人：一人疑似骑自行车摔倒在地上，请民警到场处理。(已通知120到场，如不需要救护车，请民警电告120或110)",
    //         longitude: 121.459135,
    //         latitude: 31.396139,
    //         roadId: "80108",
    //         crossId: null,
    //         roadName: "铁山路",
    //         crossName: "铁山路/铁通路路口",
    //         duplicate: "0",
    //         invalid: "0",
    //         handleDeptId: "310113750000",
    //         handlePoliceId: "045644",
    //         handlePoliceName: "许郁",
    //         handleTime: 1587097003000,
    //         feedback: "1",
    //         createUser: null,
    //         createTime: 1587096974000,
    //         updateUser: null,
    //         updateTime: 1587097904000,
    //         jqNo: "202004171213229932213053",
    //         jqTypeDesc: "事故类",
    //         jqLevel: "02",
    //         jqLevelDesc: "三级",
    //         jqSubTypeDesc: null,
    //         carTypeDesc: "机动车与非机动车",
    //         deptId: "310113750000",
    //         deptName: "宝杨派出所",
    //         areaId: "310113750000",
    //         areaName: "宝杨派出所",
    //         handleDescription:
    //           "经了解，夫妻双方结伴骑自行车外出。一方下坡时操作不慎摔倒。人无大碍，未受伤 不需要民警处理。",
    //         jqStatus: "已反馈",
    //         jqStatusDesc: null,
    //         handleDeptName: "宝杨派出所",
    //         pdId: "21003",
    //         jqSubTypeEntity: null,
    //         carTypeEntity: null,
    //         jqTypeEntity: null,
    //       },
    //     },
    //   ],
    //   showPopup: true,
    //   autoPopup: false,
    //   defaultInfoTemplate: {
    //     title: "警情信息",
    //     content:
    //       '<div class="jq_table">\n    <div class="jq-msg">\n        <div>警情描述:</div>\n        <div>{jqDescription}</div>\n    </div>\n    <div class="jq-msg">\n        <div>警情类型:</div>\n        <div>{jqTypeDesc}</div>\n    </div>\n    <div class="jq-msg">\n        <div>警情地址:</div>\n        <div>{jqAddress}</div>\n    </div>\n    <div class="jq-msg">\n        <div>发生时间:</div>\n        <div>{jqTime}</div>\n    </div>\n    <div class="jq-msg">\n        <div>报警人:</div>\n        <div>{informer}</div>\n    </div>\n    <div class="jq-msg">\n        <div>联系方式:</div>\n        <div>{informerPhone}</div>\n    </div>\n    <div class="jq-msg">\n        <div>处置描述:</div>\n        <div>{handleDescription}</div>\n    </div>\n    <div class="jq-msg">\n        <div>警情状态:</div>\n        <div>{jqStatus}</div>\n    </div>\n</div>',
    //   },
    // });
    const result = await map.addOverlays({
      type: 'police',
      defaultSymbol: {
        //symbol for 2d
        type: 'point-2d',
        // primitive: "square",
        url: 'assets/image/Anchor.png',
        size: [50, 50],
        anchor: 'center'
        // color: "red",
        // outline: {
        //   color: "white",
        //   size: 4
        // },
        // anchor: "top"

        //symbol for 3d
        //type: "point-3d",
        //primitive: "cube",
        //color: "red",
        //size: 20000,
        //anchor: "bottom",
      },
      overlays: [
        {
          id: 'test001',
          geometry: {x: 121.418924, y: 31.157101},
          fields: {name: '测试2', featureid: '0002'}
        },
        {
          id: 'test002',
          geometry: {x: 121.318924, y: 31.157101},
          fields: {name: '测试3', featureid: '0003'}
        },
        {
          id: '1111',
          geometry: {
            paths: [
              [
                [121.31, 31.01],
                [121.2, 31.22],
                [121.1, 31.33],
                [121.45, 30.89]
              ]
            ]
          },
          symbol: {color: 'red'},
          fields: {name: '测试222', featureid: '0003'}
        },
        {
          id: '1113',
          geometry: {
            rings: [
              [
                [121.31, 31.01],
                [121.2, 31.22],
                [121.1, 31.33],
                [121.45, 30.89]
              ]
            ]
          },
          symbol: {color: 'red'},
          fields: {name: '测试222', featureid: '0003'}
        },
        {
          id: 'test003',
          geometry: {x: 121.418924, y: 31.257101},
          fields: {name: '测试4', featureid: '0001'}
        }
      ],
      showPopup: true,
      autoPopup: false,
      defaultInfoTemplate: {
        title: '1212',
        content: '<div class="accc">name:{name}</div>'
      },
      defaultButtons: [{label: '确认报警', type: 'confirmAlarm'}]
    });
  }
  public btn_test1(map: any) {
    map
      .routeSearch({
        start: {x: 121.31, y: 31.46},
        end: {x: 121.65, y: 31.125},
        model: 'car'
      })
      .then((e: any) => {
        console.log(e);
      });
    //let map = this.$refs.gisViewer as any;
    // axios.get('config/point1.json').then((res: any) => {
    //   map.addOverlaysCluster(res.data);
    // });
    // axios.get('config/point2.json').then((res: any) => {
    //   map.addOverlaysCluster(res.data);
    // });

    //axios.get("config/Jurisdiction/bsga_v2.geo.json").then((res: any) => {
    //map.addOverlaysCluster(res.data);
    //  console.log(res.data);
    //});
    //map.hideLayer({label: '匝道灯'});
    // map.findFeature({
    //   layerName: 'police',
    //   level: 16,
    //   ids: ['test003'],
    //   centerResult: true
    // });
    // map.hideLayer({type: 'traffic'});
    // map.showRoad({ids: [1]});
    // map.showDistrictMask({
    //   name: '徐汇区',
    //   showMask: true
    // });
  }
  public btn_test2(map: any) {
    //let map = this.$refs.gisViewer as any;
    var points = [];
    var x = 121.43;
    var y = 31.15;
    for (var i = 0; i < 100; i++) {
      var x1 = x + (Math.random() * 2 - 1) / 20;
      var y1 = y + (Math.random() * 2 - 1) / 20;
      var value = Math.floor(1000 * Math.random() + 1);
      var a = i % 2 == 0 ? '1' : '0';
      points.push({
        geometry: {x: x1, y: y1},
        fields: {desc: '上海体育馆停车场', totalSpace: value, type: a}
      });
    }
    var json = {
      points: points,
      options: {
        field: 'totalSpace',
        radius: '20',
        colors: [
          'rgb(255, 255, 255)',
          'rgb(206, 199, 25)',
          'rgb(255, 140, 27)',
          'rgb(246, 64, 64)'
        ],
        maxValue: 1000,
        minValue: 1,
        zoom: 15,
        renderer: {
          type: 'simple',
          symbol: {
            type: 'esriPMS',
            url: 'assets/image/Anchor.png',
            width: 64,
            height: 66,
            yoffset: 16
          }
        }
      }
    };
    map.addHeatMap(json);
    // map.addOverlays({
    //   type: 'police',
    //   defaultSymbol: {
    //     //symbol for 2d
    //     type: 'point-2d',
    //     // primitive: "square",
    //     url: 'assets/image/Anchor.png',
    //     width: 80,
    //     height: 90
    //     // color: "red",
    //     // outline: {
    //     //   color: "white",
    //     //   size: 4
    //     // },
    //     // anchor: "top"

    //     //symbol for 3d
    //     //type: "point-3d",
    //     //primitive: "cube",
    //     //color: "red",
    //     //size: 20000,
    //     //anchor: "bottom",
    //   },
    //   defaultZooms: [10, 20],
    //   overlays: [
    //     {
    //       id: 'test001',
    //       geometry: {x: 121.418924, y: 31.157101},
    //       fields: {name: '测试2', featureid: '0002'}
    //     },
    //     {
    //       id: 'test002',
    //       geometry: {x: 121.318924, y: 31.157101},
    //       fields: {name: '测试3', featureid: '0003'}
    //     },
    //     {
    //       id: 'test003',
    //       geometry: {x: 121.418924, y: 31.257101},
    //       fields: {name: '测试4', featureid: '0001'}
    //     }
    //   ],
    //   showPopup: true,
    //   autoPopup: false,
    //   defaultInfoTemplate: {
    //     title: '1212',
    //     content: '<div>name:{name}<br/><button>{name}</button></div>'
    //   },
    //   defaultButtons: [{label: '确认报警', type: 'confirmAlarm'}]
    // });
    // map.hideLayer({type: 'traffic'});
    // // map.showDistrictMask({
    // //   name: '徐汇区',
    // //   showMask: true
    // // });
    // map.locateStreet({id: '10003'});
    //map.deleteAllOverlaysCluster();
    map.findFeature({
      layerName: 'sxj1',
      level: 16,
      ids: ['31011300001310000003'],
      centerResult: true
    });
  }
  public btn_test3(map: any) {
    map.clearRouteSearch();
    //map.setMapStyle('amap://styles/darkblue');
    //map.locateStreet({id: '10013'});
    // map.showLayer({type: 'traffic'});
    // map.findLayerFeature({
    //   layerName: '地铁',
    //   level: 16,
    //   ids: ['12'],
    //   centerResult: true
    // });
    //map.hideLayer({label: '匝道灯'});
    //map.deleteHeatMap();
    map.deleteOverlaysCluster({types: ['sxj1']});
    //map.deleteAllOverlays();
    //map.deleteOverlays({ids: ['test001']});
    //map.hideLayer({ type: "traffic" });
    //map.setMapCenter({x: 121.12, y: 31.23});
    //map.setMapCenterAndLevel({
    //   x: 121.12,
    //   y: 31.23,
    //   level: 15
    // });
    //map.hideJurisdiction();
    //map.hideDistrictMask();
    // map.addOverlays({
    //   type: 'police',
    //   defaultSymbol: {
    //     url: 'assets/images/a.png',
    //     size: [32, 41],
    //     type: 'point'
    //   },
    //   overlays: [
    //     {
    //       id: 'test001',
    //       geometry: {
    //         x: 121.418924,
    //         y: 31.157101
    //       },
    //       fields: {
    //         name: '测试2',
    //         featureid: '0002'
    //       }
    //     },
    //     {
    //       id: 'abc',
    //       geometry: {
    //         path: [
    //           [121.31, 31.01],
    //           [121.2, 31.22],
    //           [121.1, 31.33],
    //           [121.45, 30.89]
    //         ]
    //       },
    //       fields: {
    //         name: '测试2',
    //         featureid: '0002'
    //       },
    //       symbol: {
    //         color: 'red'
    //       }
    //     },
    //     {
    //       id: 'abc22',
    //       geometry: {
    //         ring: [
    //           [121.31, 31.01],
    //           [121.2, 31.22],
    //           [121.1, 31.33],
    //           [121.45, 30.89]
    //         ]
    //       },
    //       fields: {
    //         name: '测试2',
    //         featureid: '0002'
    //       },
    //       symbol: {
    //         color: 'red'
    //       }
    //     },
    //     {
    //       id: 'abc112',
    //       geometry: {
    //         center: [121.36, 31.45],
    //         radius: 10000
    //       },
    //       fields: {
    //         name: '测试3',
    //         featureid: '00044'
    //       },
    //       symbol: {
    //         color: 'red',
    //         outline: {color: 'blue', width: 8}
    //       }
    //     },
    //     {
    //       id: 'test002',
    //       geometry: {
    //         x: 121.318924,
    //         y: 31.157101
    //       },
    //       fields: {
    //         name: '测试3',
    //         featureid: '0003'
    //       }
    //     },
    //     {
    //       id: 'test003',
    //       geometry: {
    //         x: 121.418924,
    //         y: 31.257101
    //       },
    //       fields: {
    //         name: '测试4',
    //         featureid: '0001'
    //       }
    //     }
    //   ],
    //   showPopup: true,
    //   autoPopup: false,
    //   defaultInfoTemplate: {
    //     title: '1212',
    //     content: 'name:{name}<br/><button>{name}</button>'
    //   },
    //   showToolTip: true,
    //   toolTipOption: {
    //     content: '{featureid}',
    //     xoffset: 0,
    //     yoffset: -6
    //   }
    // });
  }
}

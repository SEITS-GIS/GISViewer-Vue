import axios from 'axios';
import {GdConfig} from './GdConfig';
import {GisConfig} from './GisConfig';
export default class MapConfig {
  public constructor() {}
  private model_view: any;
  public mapConfig: any = GisConfig;
  public gdConfig: any = GdConfig;
  public async mapLoaded(map: any) {
    let _this = this;
    // map
    //   .addDgeneFusion({
    //     appendDomID: 'gisDiv',
    //     url: 'dgene2',
    //     outvideo: false,
    //     callback: (a: number, b: number) => {
    //       console.log(a, b);
    //     }
    //   })
    //   .then((e: any) => {
    //     console.log('载入成功', e.result);
    //     _this.model_view = e.result;
    //     map.showDgene({duration: 0});
    //     //_this.model_view.showVideoDom('HQtest147');
    //     //_this.model_view.showVideoDom('HQtest148');
    //   }); //载入3维模型

    //map.showLayer({label: 'fbd1333'});
    // console.log('Map Loaded.');
    // map.showDistrictMask({
    //   name: '徐汇区',
    //   showMask: true
    // });
    // map.showStreet();
    // map.showJurisdiction();
    let overStr = '';
    let points = {
      type: 'police',
      defaultVisible: true,
      defaultSymbol: {
        //symbol for 2d
        type: 'point',
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
          geometry: {x: 121.448924, y: 31.157101},
          fields: {name: '测试2', featureid: '0002'}
        },
        {
          id: 'test002',
          geometry: {x: 121.418924, y: 31.157101},
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
          id: 'test003',
          geometry: {x: 121.418924, y: 31.257101},
          fields: {name: '测试4', featureid: '0001'}
        }
        // {
        //   id: 'test001',
        //   geometry: {
        //     x: -14553.805845333449,
        //     y: -4237.1518463943485
        //   },
        //   fields: {name: '测试2', featureid: '0002'}
        // },
        // {
        //   id: 'test002',
        //   geometry: {
        //     x: -15553.805845333449,
        //     y: -4637.1518463943485
        //   },
        //   fields: {name: '测试3', featureid: '0003'}
        // },
        // {
        //   id: 'test003',
        //   geometry: {
        //     x: -25553.805845333449,
        //     y: -14637.1518463943485
        //   },
        //   fields: {name: '测试4', featureid: '0001'}
        // }
      ],
      showPopup: true,
      autoPopup: false,
      zooms: [0, 13],
      custom: {
        content:
          '<div style="background:red;width:100px">aaaa:<button>{name}</button></div>',
        zooms: [0, 16]
      },
      defaultInfoTemplate: {
        title: '1212',
        content: '<div class="accc">name:{name}</div>'
      },
      defaultButtons: [{label: '确认报警', type: 'confirmAlarm'}]
    };
    const result = await map.addOverlays(points);
  }
  public btn_test1(map: any) {
    // if (this.model_view) {
    //   this.model_view.newShowOut(
    //     {x: -34.06616800542628, y: 1351.7254831416005, z: 2620.9422016533167},
    //     {x: 106.22608293953024, y: 0, z: 107.42583747482},
    //     0.07
    //   );
    // }
    axios.get('config/a.json').then((res: any) => {
      //console.log(res.data.overlays);
      let points = {
        type: 'police',
        defaultVisible: true,
        defaultSymbol: {
          type: 'point',
          url: 'assets/image/Anchor.png',
          height: 29,
          width: 29
        },
        defaultTooltip: '{Name}',
        points: res.data.overlays,
        showPopup: true,
        autoPopup: false,
        defaultInfoTemplate: {
          title: '1212',
          content: '<div class="accc">name:{Name}</div>'
        }
      };
      //const result = map.addOverlaysCluster(points);
    });

    // var points = [];
    // var x = 0;
    // var y = 0;
    // for (var i = 0; i < 100; i++) {
    //   var x1 = x + (Math.random() * 202 + 60);
    //   var y1 = Math.floor(Math.random() * 100) % 2 == 0 ? 30 : 70;
    //   var value = Math.floor(900 * Math.random() + 1);
    //   var a = i % 2 == 0 ? '1' : '0';
    //   points.push({
    //     geometry: {x: x1, y: y1},
    //     fields: {desc: 'a', totalSpace: value, type: a}
    //   });
    // }
    // var json = {
    //   points: [],
    //   images: {
    //     geometry: {x: -14553.805845333449, y: -4137.1518463943485},
    //     width: 226,
    //     height: 100,
    //     url: 'http://localhost/HQ2.svg',
    //     center: {x: -14071.811607336222, y: -4342.546650737293},
    //     factor: 4
    //   },
    //   options: {
    //     field: 'totalSpace',
    //     radius: 13,
    //     maxValue: 1000,
    //     minValue: 1
    //   }
    // };
    // map.addHeatImage(json);
    // map.showMigrateChart();
    // map.startGeometrySearch({
    //   radius: 12000,
    //   showResult: true,
    //   clickHandle: (e: any) => {
    //     console.log(e);
    //   }
    // });
    //map.showMigrateChart();
    // map.addDrawLayer({
    //   layerUrls: './config/fbd/morph_ksl.json',
    //   label: '快速路'
    // });
    // map.addDrawLayer({
    //   layerUrls: './config/fbd/morph_fbd.json',
    //   label: '发布段'
    // });
    // map
    //   .routeSearch({
    //     start: {x: 121.31, y: 31.46}, //开始坐标
    //     end: {x: 121.65, y: 31.125}, //终点坐标
    //     model: 'car' //'walk',行走，'ride',骑行，'car',驾车
    //   })
    //   .then((e: any) => {
    //     console.log(e); //返回结果
    //   });

    map.showRoutePoint({
      points: [
        {geometry: {x: 121.484833713108, y: 31.398289116754}},
        {geometry: {x: 121.48158311632, y: 31.397524414063}},
        {geometry: {x: 121.479267578125, y: 31.396956108941}},
        {geometry: {x: 121.47724202474, y: 31.402427300348}},
        {geometry: {x: 121.475913357205, y: 31.405320638021}}
      ],
      showDir: true
    });
    map.showRoutePoint({
      points: [
        {geometry: {x: 121.475233832466, y: 31.405402832032}},
        {geometry: {x: 121.476502007379, y: 31.40251654731}},
        {geometry: {x: 121.478829752605, y: 31.396097547744}},
        {geometry: {x: 121.482015516494, y: 31.397426757813}},
        {geometry: {x: 121.485641276042, y: 31.398593478733}}
      ],
      showDir: true
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
    //map.showLayer({label: 'fbd123'});
    //let map = this.$refs.gisViewer as any;
    var points = [];
    var x = 121.43;
    var y = 31.15;
    for (var i = 0; i < 10000; i++) {
      var x1 = x + (Math.random() * 2 - 1) / 20;
      var y1 = y + (Math.random() * 2 - 1) / 20;
      var value = Math.floor(1000 * Math.random() + 1);
      var a = i % 2 == 0 ? '1' : '0';
      points.push({
        geometry: {x: x1, y: y1},
        fields: {
          desc: '上海体育馆停车场',
          totalSpace: value.toString(),
          type: a
        }
      });
    }
    var json = {
      points: points,
      options: {
        field: 'totalSpace',
        radius: '5',
        colors: [
          // 'rgb(255, 255, 255)',
          // 'rgba(206, 199, 25,0.5)',
          // 'rgba(255, 140, 27,0.5)',
          // 'rgba(246, 64, 64,0.5)'
          //'rgb(255, 255, 255)',
          'rgb(63, 63, 191)',
          'rgb(117,211,248)',
          'rgb(0, 255, 0)',
          'rgba(255,234,0)',
          'rgb(255,0,0)'
        ],
        maxValue: 100,
        minValue: 1,
        zoom: 13,
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
    let points2 = {
      type: 'police',
      defaultVisible: true,
      defaultSymbol: {
        //symbol for 2d
        type: 'point',
        // primitive: "square",
        url: 'assets/image/Anchor.png',
        size: [50, 50],
        anchor: 'center'
      },
      overlays: [
        {
          id: 'test001',
          geometry: {
            x: -14553.805845333449,
            y: -4237.1518463943485
          },
          fields: {name: '测试2', featureid: '0002'}
        },
        {
          id: 'test002',
          geometry: {
            x: -15553.805845333449,
            y: -4637.1518463943485
          },
          fields: {name: '测试3', featureid: '0003'}
        },
        {
          id: 'test003',
          geometry: {
            x: -25553.805845333449,
            y: -14637.1518463943485
          },
          fields: {name: '测试4', featureid: '0001'}
        }
      ],
      showPopup: true,
      autoPopup: false,
      iswgs: false,
      defaultInfoTemplate: {
        title: '1212',
        content: '<div class="accc">name:{name}</div>'
      },
      defaultButtons: [{label: '确认报警', type: 'confirmAlarm'}]
    };
    const result = map.addOverlays(points2);
    //map.showLayer({label: 'ceshi'});
    // map.hideLayer({type: 'traffic'});
    // // map.showDistrictMask({
    // //   name: '徐汇区',
    // //   showMask: true
    // // });
    // map.locateStreet({id: '10003'});
    //map.deleteAllOverlaysCluster();
    // map.findFeature({
    //   layerName: 'sxj1',
    //   level: 16,
    //   ids: ['31011300001310000003'],
    //   centerResult: true
    // });
    //map.restoreDegeneFsion();
    // map
    //   .startGeometrySearch({
    //     radius: 5000,
    //     showResult: true,
    //     clickHandle: (e: any) => {
    //       console.log(e);
    //     }
    //   })
    //   .then((res: any) => {
    //     console.log(res.result);
    //   });
    // if (this.model_view) {
    //   this.model_view.newHideOut(
    //     {x: -13.011890024929382, y: 250.93535559918166, z: 395.3027167055879},
    //     {x: -17.892323885262947, y: 0, z: -36.609106518356604},
    //     260
    //   );
    // }
  }
  public btn_test3(map: any) {
    //map.showDgene(); //显示三维模型
    //map.showLayer({label: 'fbd1333'});
    //map.clearGeometrySearch();
    //map.deleteHeatImage();
    //map.hideMigrateChart();
    //map.clearRouteSearch(); //清除
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
    //map.deleteOverlaysCluster({types: ['sxj1']});
    //map.deleteAllOverlays();
    map.deleteOverlays({ids: ['test001']});
    //map.hideLayer({label: 'ceshi'});
    //map.setMapCenter({x: 121.12, y: 31.23});
    // map.setMapCenterAndLevel({
    //   x: 121.12,
    //   y: 31.23,
    //   level: 17
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
    //       {geometry: {
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
    //       {geometry: {
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
    //       {geometry: {
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
    //       {geometry: {
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
    //       {geometry: {
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
    //       {geometry: {
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

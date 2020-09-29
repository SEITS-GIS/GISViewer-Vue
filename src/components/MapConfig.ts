import axios from 'axios';
import {GdConfig} from './GdConfig';
//import {GisConfig} from './GisConfig';
//import {GisConfig} from './project/config';
//import {GisConfig} from './project/configsub';
import {GisConfig} from './project/configyj';
export default class MapConfig {
  public constructor() {}
  private model_view: any;
  public mapConfig: any = GisConfig;
  public gdConfig: any = GdConfig;
  public async mapLoaded(map: any) {
    let _this = this;
    map
      .addDgeneFusion({
        appendDomID: 'gisDiv',
        url: 'dgene',
        showOut: true,
        outvideo: true,
        callback: (a: number, b: number) => {
          console.log(a, b);
        }
      })
      .then((e: any) => {
        console.log('载入成功', e.result);
        _this.model_view = e.result;
        map.addOverlays({
          type: 'model3d',
          defaultSymbol: {
            type: 'point-2d',
            url: 'assets/image/Anchor.png',
            size: [50, 50],
            anchor: 'center'
          },
          overlays: [
            {
              id: 'model1',
              geometry: {x: -14071.811607336222, y: -4342.546650737293},
              fields: {}
            }
          ],
          iswgs: false
        });
      }); //载入3维模型

    //map.showLayer({label: 'fbd1333'});
    // console.log('Map Loaded.');
    // map.showDistrictMask({
    //   name: '徐汇区',
    //   showMask: true
    // });
    // map.showStreet();
    //map.showJurisdiction();
    // map.deleteAllOverlays();
    // map.deleteOverlays({types: ['police']});
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
      // overlays: [
      //   {
      //     id: 'test001',
      //     geometry: {x: 148.448924, y: 31.157101},
      //     fields: {name: '测试2', featureid: '0002'}
      //   },
      //   {
      //     id: 'test002',
      //     geometry: {x: 121.418924, y: 31.157101},
      //     fields: {name: '测试3', featureid: '0003'}
      //   },
      //   {
      //     id: '1111',
      //     geometry: {
      //       paths: [
      //         [
      //           [121.31, 31.01],
      //           [121.2, 31.22],
      //           [121.1, 31.33],
      //           [121.45, 30.89]
      //         ]
      //       ]
      //     },
      //     symbol: {color: 'red'},
      //     fields: {name: '测试222', featureid: '0003'}
      //   },
      //   {
      //     id: 'test003',
      //     geometry: {x: 121.418924, y: 31.257101},
      //     fields: {name: '测试4', featureid: '0001'}
      //   }
      // ],
      overlays: [
        {
          id: 'test001',
          geometry: {x: -13834.446598916875, y: -4445.604986187298},
          fields: {name: '测试2', featureid: '0002'}
        },
        {
          id: 'test002',
          geometry: {x: -13834.446598916875, y: -4445.604986187298},
          fields: {name: '测试3', featureid: '0003'}
        }
      ],
      showPopup: false,
      autoPopup: false,
      iswgs: false,
      defaultInfoTemplate: {
        title: '1212',
        content: '<div class="accc">name:{name}</div>'
      },
      // showToolTip: true,
      // toolTipContent: '{featureid}',
      // toolTipOption: {
      //   content: '{featureid}',
      //   xoffset: 0,
      //   yoffset: 10
      // },
      custom: {
        content: "<div style='background:red'>333333</div>"
      },
      defaultButtons: [{label: '确认报警', type: 'confirmAlarm'}]
    };
    //const result = await map.addOverlays(points);
  }
  public btn_test1(map: any) {
    if (this.model_view) {
      map.showDgeneOutPoint(false);
    }
    //map.showMigrateChart();

    //const result = map.addOverlays(points);
    // if (this.model_view) {
    //   this.model_view.showVideoDom('HQ0912New151');
    // }
    // axios.get('config/2.json').then((res: any) => {
    //   // res.data.points = (res.data.points as any[]).concat(
    //   //   res.data.points as any[]
    //   // );
    //   // res.data.points = (res.data.points as any[]).concat(
    //   //   res.data.points as any[]
    //   // );
    //   let points = {
    //     type: 'police',
    //     defaultVisible: true,
    //     defaultSymbol: {
    //       type: 'point',
    //       url: 'assets/image/Anchor.png',
    //       height: 29,
    //       width: 29
    //     },
    //     defaultTooltip: '{Name}',
    //     points: res.data.points,
    //     showPopup: true,
    //     autoPopup: false,
    //     defaultInfoTemplate: {
    //       title: '1212',
    //       content: '<div class="accc">name:{Name}</div>'
    //     }
    //   };
    //   const result = map.addOverlaysCluster(res.data);
    // });
    map.addHeatImage();
    map.showMigrateChart('001');
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

    map.showRoutePoint([
      {
        points: [
          {
            geometry: {x: 121.487563, y: 31.395083},
            fields: {content: '牡丹江路-海江路(西向东)'}
          },
          {
            geometry: {x: 121.481867, y: 31.392274},
            fields: {content: '同济路-海江路(北向南)'}
          },
          {
            geometry: {x: 121.479625, y: 31.39665},
            fields: {content: '同济路-宝杨路(南向北)'}
          }
        ],
        showDir: true,
        color: 'red',
        width: 5
      },
      {
        points: [
          {
            geometry: {x: 121.490726, y: 31.378321},
            fields: {
              content: '同济路-同济支路(南向北)'
            }
          },
          {
            geometry: {x: 121.488117, y: 31.382392},
            fields: {content: '同济路-水产路(南向北)'}
          },
          {
            geometry: {x: 121.485499, y: 31.386555},
            fields: {content: '同济路-双城路(南向北)'}
          },
          {
            geometry: {x: 121.481947, y: 31.392143},
            fields: {content: '同济路-海江路(南向北)'}
          },
          {
            geometry: {x: 121.479706, y: 31.396507},
            fields: {content: '同济路-宝杨路(南向北)'}
          }
        ],
        showDir: true
      },
      {
        points: [
          {
            geometry: {x: 121.485116, y: 31.398434},
            fields: {content: '牡丹江路-宝杨路(西向东)'}
          },
          {
            geometry: {x: 121.481686, y: 31.397334},
            fields: {content: '宝杨路-双庆路(北向南)'}
          },
          {
            geometry: {x: 121.479326, y: 31.396519},
            fields: {content: '同济路-宝杨路(北向南)'}
          }
        ],
        showDir: true
      },
      {
        points: [
          {
            geometry: {x: 121.479407, y: 31.396382},
            fields: {content: '同济路-宝杨路(北向南)'}
          },
          {
            geometry: {x: 121.481715, y: 31.39211},
            fields: {content: '同济路-海江路(东向西)', dir: 'left'}
          },
          {
            geometry: {x: 121.487563, y: 31.395083},
            fields: {content: '牡丹江路-海江路(东向西)'}
          }
        ],
        showDir: true
      },
      {
        points: [
          {
            geometry: {x: 121.47939, y: 31.396364},
            fields: {content: '同济路-宝杨路(北向南)1'}
          },
          {
            geometry: {x: 121.481715, y: 31.39211},
            fields: {content: '同济路-海江路(东向西)1', dir: 'left'}
          },
          {
            geometry: {x: 121.48522, y: 31.386528},
            fields: {content: '同济路-双城路(东向西)1'}
          },
          {
            geometry: {x: 121.487838, y: 31.382367},
            fields: {content: '同济路-水产路(西向东)1'}
          },
          {
            geometry: {x: 121.490515, y: 31.378166},
            fields: {content: '同济路-同济支路(东向西)1'}
          }
        ],
        showDir: true
      },
      {
        points: [
          {
            geometry: {x: 121.479691, y: 31.396509},
            fields: {content: '同济路-宝杨路(北向南)'}
          },
          {
            geometry: {x: 121.481736, y: 31.397235},
            fields: {content: '宝杨路-双庆路(东向西)'}
          },
          {
            geometry: {x: 121.485161, y: 31.398369},
            fields: {content: '牡丹江路-宝杨路(东向西)'}
          }
        ],
        showDir: true
      }
    ]);
    // axios.get('config/point1.json').then((res: any) => {
    //   map.addOverlays(res.data);
    // });
    axios.get('config/as.json').then((res: any) => {
      map.addOverlaysCluster(res.data);
    });
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
    if (this.model_view) {
      map.showDgeneOutPoint(true);
    }
    //map.showLayer({label: 'fbd123'});
    //let map = this.$refs.gisViewer as any;
    // var points = [];
    // var x = 121.43;
    // var y = 31.15;
    // for (var i = 0; i < 10000; i++) {
    //   var x1 = x + (Math.random() * 2 - 1) / 20;
    //   var y1 = y + (Math.random() * 2 - 1) / 20;
    //   var value = Math.floor(1000000 * Math.random() + 1);
    //   var a = i % 2 == 0 ? '1' : '0';
    //   points.push({
    //     geometry: {x: x1.toString(), y: y1.toString()},
    //     fields: {
    //       desc: '上海体育馆停车场',
    //       value: 5,
    //       type: a
    //     }
    //   });
    // }
    // var json = {
    //   points: points,
    //   options: {
    //     field: 'value',
    //     radius: '5',
    //     colors: [
    //       'rgb(255, 255, 255,0)',
    //       'rgba(206, 199, 25,0.5)',
    //       'rgba(255, 140, 27,0.5)',
    //       'rgba(246, 64, 64,0.5)',
    //       'rgba(255, 255, 255,1)'
    //     ],
    //     maxValue: 100,
    //     minValue: 0
    //   }
    // };
    // map.addHeatMap(json);
    // let points2 = {
    //   type: 'police',
    //   defaultVisible: true,
    //   defaultSymbol: {
    //     //symbol for 2d
    //     type: 'point',
    //     // primitive: "square",
    //     url: 'assets/image/Anchor.png',
    //     size: [50, 50],
    //     anchor: 'center'
    //   },
    //   overlays: [
    //     {
    //       id: 'test001',
    //       geometry: {
    //         x: -14553.805845333449,
    //         y: -4237.1518463943485
    //       },
    //       fields: {name: '测试2', featureid: '0002'}
    //     },
    //     {
    //       id: 'test002',
    //       geometry: {
    //         x: -15553.805845333449,
    //         y: -4637.1518463943485
    //       },
    //       fields: {name: '测试3', featureid: '0003'}
    //     },
    //     {
    //       id: 'test003',
    //       geometry: {
    //         x: -25553.805845333449,
    //         y: -14637.1518463943485
    //       },
    //       fields: {name: '测试4', featureid: '0001'}
    //     }
    //   ],
    //   showPopup: true,
    //   autoPopup: false,
    //   iswgs: false,
    //   defaultInfoTemplate: {
    //     title: '1212',
    //     content: '<div class="accc">name:{name}</div>'
    //   },
    //   defaultButtons: [{label: '确认报警', type: 'confirmAlarm'}]
    // };
    // const result = map.addOverlays(points2);
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
    map.changeDgeneOut();
    //map.hideBarChart();
    //map.showDgene({duration: 0}); //显示三维模型
    //map.showLayer({label: 'fbd1333'});
    //map.clearGeometrySearch();
    //map.deleteHeatImage();
    //map.hideMigrateChart();
    //map.clearRouteSearch(); //清除
    //map.setMapStyle('amap://styles/darkblue');
    //map.locateStreet({id: '10013'});
    // map.showLayer({type: 'traffic'});
    // map.findFeature({
    //   layerName: '路网状况',
    //   ids: ['NHWY-NI->NHJSJ-NO'],
    //   centerResult: true
    // });
    //map.hideLayer({label: '匝道灯'});
    //map.deleteHeatMap();
    //map.deleteOverlaysCluster({types: ['sxj1']});
    //map.deleteAllOverlays();
    //map.deleteOverlays({types: ['police']});
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

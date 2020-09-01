import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IHeatPoint
} from '@/types/map';
import {loadModules} from 'esri-loader';
import echartsLayer from '../echartsLayer';
export class MigrateChart {
  private static intances: Map<string, any>;
  private view!: any;
  private echartlayer: any;

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: __esri.MapView | __esri.SceneView) {
    let id = view.container.id;
    if (!MigrateChart.intances) {
      MigrateChart.intances = new Map();
    }
    let intance = MigrateChart.intances.get(id);
    if (!intance) {
      intance = new MigrateChart(view);
      MigrateChart.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (MigrateChart.intances as any) = null;
  }

  public async hideMigrateChart() {
    this.clear();
  }
  private clear() {
    if (this.echartlayer) {
      //this.view.map.remove(this.echartlayer);
      this.echartlayer.removeLayer();
      this.echartlayer = null;
    }
  }
  public async showMigrateChart(params: IHeatParameter) {
    this.clear();
    var x = 121.43;
    var y = 31.15;

    let geoCoordMap: any = {};
    geoCoordMap[1] = [121.388, 31.199];
    geoCoordMap[2] = [121.384, 31.152];
    geoCoordMap[3] = [121.437, 31.147];
    for (var i = 4; i < 21; i++) {
      var x1 = x + (Math.random() * 2 - 1) / 20;
      var y1 = y + (Math.random() * 2 - 1) / 20;
      var value = Math.floor(1000 * Math.random() + 1);
      geoCoordMap[i] = [x1, y1];
    }

    let BJData = [
      [{name: '3'}, {name: '10', value: 95}],
      [{name: '3'}, {name: '1', value: 90}],
      [{name: '3'}, {name: '2', value: 80}],
      [{name: '3'}, {name: '20', value: 70}],
      [{name: '3'}, {name: '4', value: 60}],
      [{name: '3'}, {name: '5', value: 50}],
      [{name: '3'}, {name: '6', value: 40}],
      [{name: '3'}, {name: '7', value: 30}],
      [{name: '3'}, {name: '12', value: 20}],
      [{name: '3'}, {name: '15', value: 10}]
    ];

    let SHData = [
      [{name: '2'}, {name: '13', value: 95}],
      [{name: '2'}, {name: '5', value: 90}],
      [{name: '2'}, {name: '1', value: 80}],
      [{name: '2'}, {name: '17', value: 70}],
      [{name: '2'}, {name: '14', value: 60}],
      [{name: '2'}, {name: '3', value: 50}],
      [{name: '2'}, {name: '15', value: 40}],
      [{name: '2'}, {name: '20', value: 30}],
      [{name: '2'}, {name: '16', value: 20}],
      [{name: '2'}, {name: '10', value: 10}]
    ];

    let GZData = [
      [{name: '1'}, {name: '4', value: 95}],
      [{name: '1'}, {name: '6', value: 90}],
      [{name: '1'}, {name: '7', value: 80}],
      [{name: '1'}, {name: '8', value: 70}],
      [{name: '1'}, {name: '9', value: 60}],
      [{name: '1'}, {name: '12', value: 50}],
      [{name: '1'}, {name: '12', value: 40}],
      [{name: '1'}, {name: '20', value: 30}],
      [{name: '1'}, {name: '19', value: 20}],
      [{name: '1'}, {name: '5', value: 10}]
    ];

    let planePath =
      'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

    let convertData = (data: any) => {
      var res = [];
      for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        let fromCoord = geoCoordMap[dataItem[0].name];
        let toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord],
            value: dataItem[1].value
          });
        }
      }
      return res;
    };
    let color = ['#00FFFF', '#00FFFF', '#00FFFF'];
    let series: any = [];
    [
      ['20', BJData],
      ['10', SHData],
      ['1', GZData]
    ].forEach(function(item, i) {
      series.push(
        {
          name: item[0] + ' Top10',
          type: 'lines',
          coordinateSystem: 'arcgis',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
          },
          blendMode: 'lighter',

          lineStyle: {
            normal: {
              color: color[i],
              width: 0.5,
              opacity: 0.1,
              curveness: 0.0
            }
          },
          data: convertData(item[1])
        },
        {
          name: item[0] + ' Top10',
          type: 'lines',
          coordinateSystem: 'arcgis',
          zlevel: 2,
          symbol: ['none', 'none'],
          symbolSize: 10,
          effect: {
            show: true,
            period: 4,
            trailLength: 0,
            symbolSize: 1
          },
          //blendMode: 'lighter',
          lineStyle: {
            normal: {
              color: color[i],
              width: 0.1,
              opacity: 0.6,
              curveness: 0.0
            }
          },
          data: convertData(item[1])
        },
        {
          name: item[0] + ' Top10',
          type: 'effectScatter',
          coordinateSystem: 'arcgis',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: true,
              position: 'left',
              formatter: '{b}'
            }
          },
          symbolSize: (val: any) => {
            return val[2] / 3;
          },
          itemStyle: {
            normal: {
              color: color[i],
              opacity: 0.4
            }
          },
          data: (item[1] as []).map((dataItem: any) => {
            return {
              name: dataItem[1].name,
              value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
            };
          })
        }
      );
    });
    this.echartlayer = new echartsLayer(this.view);
    var option = {
      series: series
    };
    this.echartlayer.setChartOption(option);
  }

  public async showPathChart(params: IHeatParameter) {
    this.clear();
    let busLines = [
      {
        coords: [
          [121.32957491713877, 31.184669012330712],
          [121.33442435103781, 31.18470572652254],
          [121.33345101817262911, 31.177325887774224],
          [121.34004626113317, 31.17688528219029],
          [121.34506735640922, 31.17692199940059],
          [121.34571108657279, 31.171230661889787],
          [121.34566817122855, 31.16869698872447]
        ],
        lineStyle: {normal: {color: 'rgba(223,90,90,1)'}}
      },
      {
        coords: [
          [121.32946971893031, 31.17135624289745],
          [121.33440498351786, 31.17113592647439],
          [121.33981231689202, 31.17120936533901],
          [121.33959774017082, 31.17737802667528],
          [121.33964065551508, 31.183656430017937],
          [121.33968357085932, 31.18549214180122],
          [121.34624961852795, 31.18512500229241],
          [121.34612087249522, 31.18714425196953]
        ],
        lineStyle: {normal: {color: 'rgba(12,12,255,1)'}}
      }
    ];
    let series = [
      {
        type: 'lines',
        coordinateSystem: 'arcgis',
        polyline: true,
        data: busLines,
        silent: true,
        lineStyle: {
          // color: '#c23531',
          // color: 'rgb(200, 35, 45)',
          opacity: 0.5,
          width: 3
        },
        progressiveThreshold: 500,
        progressive: 200
      },
      {
        type: 'lines',
        coordinateSystem: 'arcgis',
        polyline: true,
        data: busLines,
        lineStyle: {
          width: 0
        },
        effect: {
          constantSpeed: 60,
          show: true,
          trailLength: 0.2,
          symbolSize: 3.5
        },
        zlevel: 1
      }
    ];
    this.echartlayer = new echartsLayer(this.view);
    var option = {
      series: series
    };
    this.echartlayer.setChartOption(option);
  }
}

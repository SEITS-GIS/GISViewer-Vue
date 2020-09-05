import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IHeatPoint
} from '@/types/map';
import {loadModules} from 'esri-loader';
import echartsLayer from '../echartsLayer';
import odJson from './config/OD.json';

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
  private getColor(alph: number): string {
    let color = 'rgb(255,255,255)';
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = alph;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }
  public async showPathChart(params: any) {
    this.clear();
    let odData = odJson.coords;
    let _this = this;
    let busLines = [
      {
        coords: ['B1', 'B2', 'B4', 'B5', 'B6', 'B7', 'B8']
      },
      {
        coords: ['B5', 'B12', 'B7', 'B1', 'B6', 'B4', 'B9']
      }
    ];
    let lines = busLines;
    let chartslines = lines.map((line: any) => {
      line.coords = line.coords.map((pid: any) => {
        return (odData as any)[pid] || [0, 0];
      });
      line.lineStyle = {normal: {color: _this.getColor(1)}};
      return line;
    });
    // let planePath =
    //   'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    let imageDataUrl =
      'image://data:image/png;base64,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';
    let series = [
      {
        type: 'lines',
        coordinateSystem: 'arcgis',
        polyline: true,
        data: chartslines,
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
        data: chartslines,
        lineStyle: {
          width: 0
        },
        effect: {
          constantSpeed: 30,
          show: true,
          trailLength: 0.2,
          symbol: imageDataUrl,
          symbolSize: 30
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

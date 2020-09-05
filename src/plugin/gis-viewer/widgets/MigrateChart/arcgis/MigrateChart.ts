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
      {coords: ['B115', 'B116', 'B120', 'B126', 'B131', 'B134']},
      {coords: ['B115', 'B116', 'B120', 'B126', 'B131', 'B132', 'B135']},
      {coords: ['B115', 'B116', 'B120', 'B121', 'B122', 'B123', 'B124']},
      {coords: ['B13', 'B14', 'B11']},
      {coords: ['B118', 'B117', 'B113', 'B114']},
      {coords: ['B118', 'B117', 'B123', 'B129', 'B133', 'B136']},
      {coords: ['B118', 'B117', 'B123', 'B129', 'B133', 'B132', 'B135']},
      {coords: ['B118', 'B117', 'B123', 'B124']},
      {coords: ['B115', 'B116', 'B120', 'B119']}
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
      'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABPlBMVEUAAAAZdtIVZcAWaMMWasYWaMQZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIZdtIVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAVZcAZdtIVZcD////x1Q0TAAAAZ3RSTlMAAAAAAAAEASlqoaJtLGDh42dT8PJdF83RPfRBUvv8ZUf4+VEm5IeWBRar/bEZEHHH38l6Eg4dCBwxQ1JFMx0JBitksdvt9/vu3bVmLgGd6P3+6qQ1A17k5mVA7EsClKmrtq24BHmBZvOwgQAAAAFiS0dEabxrxLQAAAAHdElNRQfkCQULLDBoctWUAAABCUlEQVQ4y2NgoDNgBAO80mxsuJUwMrJzcHJx8/CyY1cB1M3Hnw4EAoJsWFUwMgoJp4OBiCh2BWLi6VAgIYZVgaQUTIGUNFYFMrIwBXLyWBUoKMIUKCljVaAiAFOgqoJVAZsaTIG6BnZvamrJgaS1dXRxhAOjnr6BoaGRsQkjrqBkZDQ1M9PDFRlMIMDMwsIKZmCVNbewtLK2trG1s8dQA+Q6ODo5u7i6ubu7eXh6efuYo6hgYvK19PMPyICDwKDgEF+ECiam0LDwDDQQERkKV8HEFBWdgQE8YhAKYuMysID4ULgChwRsChIdEAqSsClIRihISU32wgDJaSkIR6Y4YAEpSL7ABRjoAgB1L2lcY2kyLwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wNy0xOVQwMzozOToxOCswMDowMDsHR9gAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDEtMDhUMTk6NDE6MzkrMDA6MDBfKAu2AAAAIHRFWHRzb2Z0d2FyZQBodHRwczovL2ltYWdlbWFnaWNrLm9yZ7zPHZ0AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADEyOEN8QYAAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMTI40I0R3QAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNTQ2OTc2NDk5w0sBUwAAABF0RVh0VGh1bWI6OlNpemUAMTA2OEJSkDp6AAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vZGF0YS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9maWxlcy8xMTgvMTE4MjExMi5wbmfLCdqqAAAAAElFTkSuQmCC';
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
          trailLength: 0, //小尾巴长度0.2
          symbol: imageDataUrl,
          symbolSize: 45
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

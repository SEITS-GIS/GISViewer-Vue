import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IHeatPoint,
  ILayerConfig
} from '@/types/map';
import {loadModules} from 'esri-loader';
import echartsLayer from './echartsLayer';
import odJson from './config/OD.json';
import subJson from './config/SubOD.json';
import Axios from 'axios';
import {resolve} from 'esri/core/promiseUtils';
import {param} from 'jquery';

export class MigrateChart {
  private static intances: Map<string, any>;
  private view!: any;
  private echartlayer: any;
  private colors: Array<string> = [
    'rgba(255,0,255,0.5)',
    'rgba(75,0,130,0.5)',
    'rgba(72,61,139,0.5)',
    'rgba(60,179,113,0.5)',
    'rgba(0,250,154,0.5)',
    'rgba(0,255,0,0.5)',
    'rgba(30,144,255,0.5)',
    'rgba(0,255,255,0.5)',
    'rgba(255,215,0,0.5)'
  ];
  private odColor = {o: 'rgba(0,255,255,255)', d: 'rgba(255,215,0,255)'};
  private lineClickHandler: any;
  private selectid: string = '015';
  private odValue: {min: number; max: number} = {min: 0, max: 0};
  private subStations: any = undefined;

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
    if (this.lineClickHandler) {
      this.lineClickHandler.remove();
      this.lineClickHandler = null;
    }
  }
  private clear() {
    if (this.echartlayer) {
      //this.view.map.remove(this.echartlayer);
      this.echartlayer.removeLayer();
      this.echartlayer = null;
    }
  }
  private async doQueryTask(queryUrl: any): Promise<any> {
    type MapModules = [
      typeof import('esri/tasks/QueryTask'),
      typeof import('esri/tasks/support/Query')
    ];
    const [QueryTask, Query] = await (loadModules([
      'esri/tasks/QueryTask',
      'esri/tasks/support/Query'
    ]) as Promise<MapModules>);
    return new Promise((resolve, reject) => {
      var queryTask = new QueryTask({
        url: queryUrl
      });
      var query = new Query();
      query.returnGeometry = true;
      query.outFields = ['*'];
      query.where = '1=1';
      // When resolved, returns features and graphics that satisfy the query.
      queryTask.execute(query).then(function(results) {
        resolve(results.features);
      });
    });
  }
  public async showSubwayChart(params: any) {
    this.clear();
    if (params == undefined || params == null) {
      return;
    }
    let selectid = params.id;
    let layerUrl = params.url || subJson.url;
    let idField = subJson.idField;
    let ODField = subJson.ODField;
    let odtype = params.type || 'd';
    let features: any = this.subStations;
    if (this.subStations == undefined) {
      features = await this.doQueryTask(layerUrl);
      this.subStations = features;
    }

    let geoCoordMap: any = new Object();
    let all_sub: Array<string> = new Array<string>();
    features.forEach((graphic: any) => {
      let id = graphic.attributes[idField].toString();
      if (graphic.attributes[ODField] == '1') {
        geoCoordMap[id] = [graphic.geometry.x, graphic.geometry.y];
        all_sub.push(id);
      }
    });
    if (all_sub.length < 2 || all_sub.indexOf(selectid) < 0) {
      return;
    }
    let BJData: any[] = [];
    all_sub.forEach((id: string) => {
      let value = 42;
      if (id !== selectid) {
        BJData.push([{name: selectid}, {name: id, value: value}]);
      }
    });

    let convertData = (data: any) => {
      var res = [];
      for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        let fromCoord = geoCoordMap[dataItem[0].name];
        let toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          if (odtype == 'o') {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord],
              value: dataItem[1].value
            });
          } else {
            res.push({
              fromName: dataItem[1].name,
              toName: dataItem[0].name,
              coords: [toCoord, fromCoord],
              value: dataItem[1].value
            });
          }
        }
      }
      return res;
    };
    let color = ['#00FFFF', '#00FFFF', '#00FFFF'];
    let series = [
      {
        name: '',
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
            color: color[0],
            width: 0.5,
            opacity: 0.1,
            curveness: 0.2
          }
        },
        data: convertData(BJData)
      },
      {
        name: '',
        type: 'lines',
        coordinateSystem: 'arcgis',
        zlevel: 2,
        symbol: ['none', 'none'],
        symbolSize: 10,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.1,
          symbolSize: 1
        },
        //blendMode: 'lighter',
        lineStyle: {
          normal: {
            color: color[0],
            width: 0.1,
            opacity: 0.6,
            curveness: 0.2
          }
        },
        data: convertData(BJData)
      },
      {
        name: '',
        type: 'effectScatter',
        coordinateSystem: 'arcgis',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: false,
            position: 'left',
            formatter: '{b}'
          }
        },
        symbolSize: (val: any) => {
          return val[2] / 3;
        },
        itemStyle: {
          normal: {
            color: color[0],
            opacity: 0.4
          }
        },
        data: (BJData as []).map((dataItem: any) => {
          return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
          };
        })
      }
    ];
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
    if (params == undefined || params == null) {
      params = this.selectid;
    }
    let odData = odJson.coords;
    let row = odJson.row;
    let col = odJson.col;
    let _this = this;
    let busLines = await this.getODPath(params);
    if (!this.lineClickHandler) {
      this.imageClick();
    }
    //console.log(busLines);
    let lines = busLines;
    if (lines.length == 0 || lines == undefined) {
      return;
    }
    let markpoint: any[] = [];
    let chartslines = lines.map((line: any, index: number) => {
      let centerIndex = line.type == 'o' ? line.coords.length - 1 : 0;
      let centerPoint: any;
      line.coords = line.coords.map((pid: any, index: number) => {
        let xy = (odData as any)[pid];
        let pt = [(row as any)[xy[0]], (col as any)[xy[1]]];
        if (index == centerIndex) {
          centerPoint = [pt[0], pt[1]];
        }
        return pt;
      });
      let color = line.type == 'o' ? _this.odColor.o : _this.odColor.d;
      line.lineStyle = {
        normal: {
          color: color,
          width: 3,
          opacity: 0.1
        }
      };
      line.effect = {
        symbolSize: _this.getlevel(Number(line.value)) * 3 + 5
      };
      markpoint.push({
        x: centerPoint[0],
        y: centerPoint[1],
        value: line.value,
        itemStyle: {normal: {color: color.replace('0.4', '0.7')}}
      });
      return line;
    });
    // let planePath =
    //   'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    // let imageDataUrl =
    //   'image://data:image/png;base64,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UmVhZHlxyWU8AAADJWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0MjU1QTA2RkU2QjMxMUVBQTZCMEYxNTBGMzBEMjI2MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0MjU1QTA3MEU2QjMxMUVBQTZCMEYxNTBGMzBEMjI2MSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwOTAxNUM2RTZCMjExRUFBNkIwRjE1MEYzMEQyMjYxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQyNTVBMDZFRTZCMzExRUFBNkIwRjE1MEYzMEQyMjYxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+B8xDywAADLpJREFUeNq8Wg1sVdUd/5977/voJwXa0tqWqhMFkRAK2ZDIxoTFECfORRFYJG7OTLcQPzYX58x0Ls4YM7dkUbKom87MZR/G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';
    let series = [
      {
        type: 'lines',
        coordinateSystem: 'arcgis',
        polyline: true,
        data: chartslines,
        silent: true,
        smooth: true,
        lineStyle: {
          // color: '#c23531',
          // color: 'rgb(200, 35, 45)',
          opacity: 0.1
          //width: 4
        },
        progressiveThreshold: 500,
        progressive: 200
      },
      {
        type: 'lines',
        coordinateSystem: 'arcgis',
        polyline: true,
        data: chartslines,
        markPoint: {
          data: markpoint,
          symbolOffset: [0, '10%'],
          label: {
            show: true,
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold'
          },
          zIndex: 9,
          animation: true
        },
        smooth: true,
        lineStyle: {
          width: 0
        },
        effect: {
          symbol: 'arrow',
          constantSpeed: 60,
          show: true,
          trailLength: 0.2, //小尾巴长度0.2
          symbolSize: 10
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
  public async getODPath(id: string): Promise<Array<any>> {
    let os = odJson.os;
    let ds = odJson.ds;
    let min = 0;
    let max = 0;
    let _this = this;
    return new Promise((resolve: any, reject: any) => {
      Axios.get(odJson.url + id).then((res: any) => {
        let paths = new Array();
        if (res.data && res.data.length > 0) {
          paths = res.data.filter((dt: any) => {
            if (os.indexOf(dt.ORIGIN_ID) < 0) {
              return false;
            }
            if (ds.indexOf(dt.DESTINATION_ID) < 0) {
              return false;
            }
            return true;
          });
          paths = paths.map((dt: any) => {
            let type = '';
            min = Math.min(min, Number(dt.ROUTE_PEDESTRIAN_VOLUME));
            max = Math.max(max, Number(dt.ROUTE_PEDESTRIAN_VOLUME));
            if (dt.ORIGIN_ID == id) {
              type = 'o';
            }
            if (dt.DESTINATION_ID == id) {
              type = 'd';
            }
            console.log(dt.PATH_ID.toString());
            var re = /\[|\]|\"/gi;
            var newstr = dt.PATH_ID.toString().replace(re, '');
            console.log(newstr);
            return {
              coords:
                type == 'o'
                  ? [id].concat(newstr.split('_'))
                  : [dt.ORIGIN_ID.toString()].concat(newstr.split('_')),
              value: dt.ROUTE_PEDESTRIAN_VOLUME,
              type: type
            };
          });
          _this.odValue.max = max;
          _this.odValue.min = min;
        }
        resolve(paths);
      });
    });
  }
  private getlevel(v: number) {
    let min = this.odValue.min;
    let max = this.odValue.max;
    let sub = max - min;
    let step = sub / 5;
    let level = 100;
    for (let i = 1; i <= step; i++) {
      if (v < step * i) {
        level = i;
        break;
      }
    }
    return Math.min(level, 5);
  }
  private async imageClick() {
    let coords = odJson.coords;
    let row = odJson.row;
    let col = odJson.col;

    let regions = odJson.regions;
    let _this = this;
    const [geometryJsonUtils] = await loadModules([
      'esri/geometry/support/jsonUtils'
    ]);

    this.lineClickHandler = this.view.on('click', (event: any) => {
      if (event.mapPoint) {
        let mp = event.mapPoint;
        for (let odid in regions) {
          let region = (regions as any)[odid];
          let poly = geometryJsonUtils.fromJSON({
            rings: [region],
            type: 'polygon',
            spatialReference: this.view.spatialReference
          });
          if (poly.contains(mp)) {
            console.log(odid);
            _this.showPathChart(odid);
            _this.selectid = odid;
          }
        }
      }
    });
  }
}

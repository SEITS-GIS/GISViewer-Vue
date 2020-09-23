import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IHeatPoint
} from '@/types/map';
import {loadModules} from 'esri-loader';
import echartsLayer from './echartsLayer';

export class SubwayLine {
  private static intances: Map<string, any>;
  private view!: any;
  private echartlayer: any;
  private colors: Array<string> = [
    'rgba(0,255,255,0.4)',
    'rgba(255,255,0,0.4)',
    'rgba(255,215,0,0.4)',
    'rgba(255,69,0,0.4)',
    'rgba(0,250,154,0.4)',
    'rgba(0,255,0,0.4)',
    'rgba(255,0,0,0.4)',
    'rgba(255,20,147,0.4)',
    'rgba(0,191,255,0.4)'
  ];

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: __esri.MapView | __esri.SceneView) {
    let id = view.container.id;
    if (!SubwayLine.intances) {
      SubwayLine.intances = new Map();
    }
    let intance = SubwayLine.intances.get(id);
    if (!intance) {
      intance = new SubwayLine(view);
      SubwayLine.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (SubwayLine.intances as any) = null;
  }

  public async hideSubwayLine() {
    this.clear();
  }
  private clear() {
    if (this.echartlayer) {
      //this.view.map.remove(this.echartlayer);
      this.echartlayer.removeLayer();
      this.echartlayer = null;
    }
  }

  private getColor(alph: number): string {
    let color = 'rgb(255,255,255)';
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = alph;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }
  public async showSubwayFlow() {
    let _this = this;
    console.log('1');
    let sublayerUrl = '';
    this.view.map.allLayers.toArray().forEach((layer: any) => {
      if (layer.type == 'imagery' || layer.type == 'map-image') {
        if (layer.label.indexOf('地铁线路') > -1) {
          layer.allSublayers.forEach((sublayer: any) => {
            if (sublayer.title == 'line') {
              sublayerUrl = sublayer.url;
            }
          });
        }
      }
    });
    if (sublayerUrl) {
      this.doQueryTask(sublayerUrl).then((res: any) => {
        _this.showPathChart(res);
      });
    }
  }
  private async showPathChart(res: any) {
    this.clear();
    let chartslines: any[] = [];
    res.forEach((graphic: any, index: number) => {
      let fields = graphic.attributes;
      let lineid = fields['line.SECTIONID'] || fields['SECTIONID'];
      let yflow =
        fields['YJZH.STAT_METROLINEFLOW.VOLUME_YESTERDAY'] ||
        fields['VOLUME_YESTERDAY'];
      let tflow =
        fields['YJZH.STAT_METROLINEFLOW.VOLUME_TODAY'] ||
        fields['VOLUME_TODAY'];
      let geometry = graphic.geometry;
      geometry.paths.forEach((item: any) => {
        let line: {coords?: any; lineStyle?: any; value?: number} = {};
        line.value = tflow;
        line.lineStyle = {
          normal: {
            color: 'rgba(0,255,0,0.6)',
            width: 0,
            opacity: 0.1
          }
        };
        line.coords = item;
        chartslines.push(line);
      });
    });

    let series = [
      // {
      //   type: 'lines',
      //   coordinateSystem: 'arcgis',
      //   polyline: true,
      //   data: chartslines,
      //   silent: true,
      //   smooth: true,
      //   lineStyle: {
      //     // color: '#c23531',
      //     // color: 'rgb(200, 35, 45)',
      //     opacity: 0.1
      //     //width: 4
      //   },
      //   progressiveThreshold: 500,
      //   progressive: 200
      // },
      {
        type: 'lines',
        coordinateSystem: 'arcgis',
        polyline: true,
        data: chartslines,
        smooth: true,
        lineStyle: {
          width: 0
        },
        effect: {
          //constantSpeed: 60,
          period: 7,
          show: true,
          trailLength: 0.6, //小尾巴长度0.2
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
}

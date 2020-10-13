import '@amap/amap-jsapi-types';
import {IResult} from '@/types/map';
import TdPoint from './td-point.vue';

export default class RoutePoint {
  private static intances: Map<string, any>;
  private view!: AMap.Map;
  private routeGroup: any;
  private roadNameGroups: Array<any> = new Array<any>();
  private defaultParams = [
    {
      points: [
        {geometry: {x: 121.414629, y: 31.164848}},
        {geometry: {x: 121.41538, y: 31.165215}},
        {geometry: {x: 121.415981, y: 31.165601}},
        {geometry: {x: 121.416711, y: 31.165987}},
        {geometry: {x: 121.417161, y: 31.166244}},
        {geometry: {x: 121.418234, y: 31.166794}},
        {
          geometry: {x: 121.4186255, y: 31.166895},
          fields: {
            content: '关键路口:漕宝路-桂林路',
            count: '2134',
            type: '1',
            dir: 'left'
          }
        },
        {geometry: {x: 121.419017, y: 31.166996}},
        {geometry: {x: 121.419586, y: 31.167088}},
        {geometry: {x: 121.420273, y: 31.167171}},
        {geometry: {x: 121.421152, y: 31.167272}},
        {
          geometry: {x: 121.421528, y: 31.167258},
          fields: {content: '协调路口:漕宝路-柳州路', count: '1111'}
        },
        {
          geometry: {x: 121.422086, y: 31.16729}
        },
        {geometry: {x: 121.422998, y: 31.1674}},
        {geometry: {x: 121.423835, y: 31.167529}},
        {geometry: {x: 121.424521, y: 31.167584}},
        {
          geometry: {x: 121.425047, y: 31.167694},
          fields: {content: '协调路口:漕宝路-柳州路', count: '2312'}
        },
        {geometry: {x: 121.425004, y: 31.168116}},
        {geometry: {x: 121.424999, y: 31.168318}},
        {geometry: {x: 121.424908, y: 31.168621}},
        {geometry: {x: 121.424672, y: 31.16975}},
        {geometry: {x: 121.424457, y: 31.170485}},
        {
          geometry: {x: 121.424285, y: 31.171017},
          fields: {content: '协调路口:漕宝路-柳州路', count: '2547'}
        }
      ]
    }
  ];

  private constructor(view: any) {
    this.view = view;
  }

  public static getInstance(view: AMap.Map) {
    let id = view.getContainer().id;
    if (!RoutePoint.intances) {
      RoutePoint.intances = new Map();
    }
    let intance = RoutePoint.intances.get(id);
    if (!intance) {
      intance = new RoutePoint(view);
      RoutePoint.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (RoutePoint.intances as any) = null;
  }
  public async clearRoutePoint() {
    if (this.routeGroup) {
      this.routeGroup.clearOverlays();
    }
    this.roadNameGroups = new Array<string>();
  }
  public async showRoutePoint(params: any) {
    if (!params) {
      params = this.defaultParams;
    }
    let _this = this;
    params.forEach((line: any) => {
      line.points.forEach((point: any) => {
        if (point.fields && !point.fields.dir) {
          let content = point.fields.content;
          let road = _this.getRoadName(content);
          _this.roadNameGroups.push({
            road: road,
            content: content,
            geometry: point.geometry,
            fields: point.fields
          });
        }
      });
    }, this);
    for (let i = 0; i < this.roadNameGroups.length; i++) {
      let item1 = this.roadNameGroups[i];
      for (let j = 0; j < this.roadNameGroups.length; j++) {
        let item2 = this.roadNameGroups[j];
        if (i != j && item1.road == item2.road) {
          if (Number(item1.geometry.x) < Number(item2.geometry.x)) {
            item1.fields.dir = 'left';
            item2.fields.dir = 'right';
          }
          continue;
        }
      }
    }
    console.log(this.roadNameGroups);
    console.log(params);
    params.forEach((line: any) => {
      this.routePoint(line);
    }, this);
  }
  private getRoadName(str: string): string {
    if (str == undefined || str == '') {
      return '';
    }
    let text = str.replace(/[0-9]/gi, '');
    let road = text;
    if (text.indexOf('(') > -1) {
      road = text.split('(')[0];
    } else if (text.indexOf('（') > -1) {
      road = text.split('（')[0];
    }
    return road;
  }
  public async routePoint(params: any) {
    //this.clearRoutePoint();
    let _this = this;
    if (!params) {
      params = {};
    }
    if (!this.routeGroup) {
      this.routeGroup = new AMap.OverlayGroup();
      this.view.add(this.routeGroup as any);
    }
    let points = params.points;
    let showDir = params.showDir === true;
    let paths = new Array();

    points.forEach((point: any) => {
      paths.push([point.geometry.x, point.geometry.y]);
      if (point.fields) {
        let content = point.fields.content;
        let hideStyle = '';
        if (content == undefined || content == '') {
          hideStyle = 'td-point-detail-hide';
        }
        let count = point.fields.count;
        let type = point.fields.type && point.fields.type === '1' ? 'y' : '';
        let dir = '';
        dir = point.fields.dir && point.fields.dir === 'left' ? 'left' : '';
        let countStr =
          point.fields.count !== undefined
            ? '(<span class="' + type + '"> ' + count + ' </span>' + '        )'
            : '';
        let pointContent =
          ' <div class="td-point ' +
          type +
          '"> ' +
          ' <div class="td-point-content ' +
          type +
          '">' +
          ' <div class="td-point-detail-wrap ' +
          hideStyle +
          ' ' +
          type +
          '">' +
          '    <div class="td-point-detail-line ' +
          type +
          '">' +
          '      <div class="td-point-detail ' +
          dir +
          ' ' +
          type +
          '">' +
          content +
          countStr +
          '      </div>' +
          '    </div>' +
          ' </div>' +
          ' </div>' +
          '</div>';
        let marker = new AMap.Marker({
          position: [point.geometry.x, point.geometry.y],
          extData: {
            attributes: point.fields
          },
          anchor: 'bottom-center',
          offset: new AMap.Pixel(0, 28),
          content: pointContent
        });
        this.routeGroup.addOverlay(marker);
      }
    }, this);
    let line = new AMap.Polyline({
      path: paths as any,
      borderWeight: 2,
      strokeColor: params.color || 'green',
      strokeOpacity: 1,
      strokeWeight: params.width || 5,
      strokeStyle: 'solid',
      zIndex: 1,
      showDir: showDir
    });
    this.routeGroup.addOverlay(line);
    this.view.setFitView([line]);
  }
}

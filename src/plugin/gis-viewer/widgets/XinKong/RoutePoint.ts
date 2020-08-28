import '@amap/amap-jsapi-types';
import {IResult} from '@/types/map';
import TdPoint from './td-point.vue';

export default class RoutePoint {
  private static intances: Map<string, any>;
  private view!: AMap.Map;
  private routeGroup: any;

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
  }
  public async showRoutePoint(params: any) {
    this.clearRoutePoint();
    if (!params) {
      params = {};
    }
    if (!this.routeGroup) {
      this.routeGroup = new AMap.OverlayGroup();
      this.view.add(this.routeGroup as any);
    }
    let points = params.points || [
      {geometry: {x: 121.414629, y: 31.164848}},
      {geometry: {x: 121.41538, y: 31.165215}},
      {geometry: {x: 121.415981, y: 31.165601}},
      {geometry: {x: 121.416711, y: 31.165987}},
      {geometry: {x: 121.417161, y: 31.166244}},
      {geometry: {x: 121.418234, y: 31.166794}},
      {
        geometry: {x: 121.4186255, y: 31.166895},
        fields: {content: '关键路口:漕宝路-桂林路', count: '2134', type: '1'}
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
    ];
    let showDir = params.showDir === true;
    let paths = new Array();
    points.forEach((point: any) => {
      paths.push([point.geometry.x, point.geometry.y]);
      if (point.fields) {
        let content = point.fields.content;
        let count = point.fields.count;
        let type = point.fields.type && point.fields.type === '1' ? 'y' : '';
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
          type +
          '">' +
          '    <div class="td-point-detail-line ' +
          type +
          '">' +
          '      <div class="td-point-detail ' +
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
      borderWeight: 5,
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

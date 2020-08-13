import '@amap/amap-jsapi-types';
import {IResult} from '@/types/map';
import TdPoint from './td-point.vue';

export default class RoutePoint {
  private static instance: RoutePoint;
  private view!: AMap.Map;
  private routeGroup: any;

  private constructor(view: any) {
    this.view = view;
  }

  public static getInstance(view: AMap.Map) {
    if (!RoutePoint.instance) {
      RoutePoint.instance = new RoutePoint(view);
    }
    return RoutePoint.instance;
  }
  public static destroy() {
    (RoutePoint.instance as any) = null;
  }
  public async clearRoutePoint() {
    if (this.routeGroup) {
      this.routeGroup.clearOverlays();
    }
  }
  public async showRoutePoint(params: any) {
    if (!this.routeGroup) {
      this.routeGroup = new AMap.OverlayGroup();
      this.view.add(this.routeGroup as any);
    }
    let points = params.points;
    let paths = new Array();
    points.forEach((point: any) => {
      let content = point.fields.content;
      let count = point.fields.count;
      let pointContent =
        ' <div class="td-point"> ' +
        ' <div class="td-point-content">' +
        ' <div class="td-point-detail-wrap">' +
        '    <div class="td-point-detail-line">' +
        '      <div class="td-point-detail">' +
        content +
        '(<span class="y"> ' +
        count +
        ' </span>' +
        '        )' +
        '      </div>' +
        '    </div>' +
        ' </div>' +
        ' </div>' +
        '</div>';
      paths.push([point.geometry.x, point.geometry.y]);
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
    }, this);
    let line = new AMap.Polyline({
      path: paths as any,
      borderWeight: 5,
      strokeColor: params.color || 'red',
      strokeOpacity: 1,
      strokeWeight: params.width || 3,
      strokeStyle: 'solid',
      zIndex: 1
    });
    this.routeGroup.addOverlay(line);
  }
}

import '@amap/amap-jsapi-types';
import {IResult, routeParameter} from '@/types/map';

declare let AMap: any;
export default class Route {
  private static instance: Route;
  private view!: AMap.Map;
  private routeLayer: any;

  private constructor(view: any) {
    this.view = view;
  }

  public static getInstance(view: AMap.Map) {
    if (!Route.instance) {
      Route.instance = new Route(view);
    }
    return Route.instance;
  }
  public static destroy() {
    (Route.instance as any) = null;
  }
  public async clearRouteSearch() {
    if (this.routeLayer) {
      this.routeLayer.clear();
    }
  }
  public async routeSearch(params: routeParameter): Promise<IResult> {
    this.clearRouteSearch();
    //构造路线导航类
    let start = params.start || [];
    let end = params.end || [];
    let waypoints = params.waypoints || [];
    let model = params.model || 'car';
    waypoints.map((wp: any) => {
      return new AMap.LngLat(wp.x, wp.y);
    }, this);
    let route: any;
    if (model === 'car') {
      route = new AMap.Driving({
        map: this.view
      });
    } else if (model === 'ride') {
      route = new AMap.Riding({
        map: this.view
      });
    } else if (model === 'walk') {
      route = new AMap.Walking({
        map: this.view
      });
    }
    this.routeLayer = route;
    let routeResult;
    // 根据起终点经纬度规划驾车导航路线
    return new Promise((resolve, reject) => {
      if (model === 'car') {
        route.search(
          new AMap.LngLat(start.x, start.y),
          new AMap.LngLat(end.x, end.y),
          {
            waypoints: waypoints
          },
          (status: string, result: any) => {
            if (status === 'complete') {
              routeResult = result;
              resolve({
                status: 0,
                message: '绘制驾车路线完成',
                result: routeResult
              });
            } else {
              reject({status: -1, message: '失败'});
            }
          }
        );
      } else {
        route.search(
          new AMap.LngLat(start.x, start.y),
          new AMap.LngLat(end.x, end.y),
          (status: string, result: any) => {
            if (status === 'complete') {
              routeResult = result;
              resolve({
                status: 0,
                message: '绘制驾车路线完成',
                result: routeResult
              });
            } else {
              reject({status: -1, message: '失败'});
            }
          }
        );
      }
    });
  }
}

import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IGeometrySearchParameter
} from '@/types/map';
import {OverlayGaode} from '../../Overlays/gd/OverlayGaode';
import {resolve, reject} from 'esri/core/promiseUtils';
import '@amap/amap-jsapi-types';

export class GeometrySearchGD {
  private static intances: Map<string, any>;
  private view!: any;
  private searchGroups: any;
  private _mapClick: any;

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: AMap.Map) {
    let id = view.getContainer().id;
    if (!GeometrySearchGD.intances) {
      GeometrySearchGD.intances = new Map();
    }
    let intance = GeometrySearchGD.intances.get(id);
    if (!intance) {
      intance = new GeometrySearchGD(view);
      GeometrySearchGD.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (GeometrySearchGD.intances as any) = null;
  }
  private _clear() {
    if (this._mapClick) {
      this.view.off('click', this.onMapClick);
    }
  }

  public async clearGeometrySearch() {
    this._clear();
    if (this.searchGroups) {
      this.searchGroups.clearOverlays();
    }
    let overlays = this.view.getAllOverlays('marker');
    overlays.forEach((overlay: any) => {
      if (overlay.originalState) {
        if (overlay.originalState == 'true') {
          overlay.show();
        } else {
          overlay.hide();
        }
        delete overlay.originalState;
      }
    });
  }
  public async startGeometrySearch(
    params: IGeometrySearchParameter
  ): Promise<IResult> {
    this._clear();
    let center = params.center; //搜索中心
    let that = this;
    if (!center) {
      return new Promise((resolve, reject) => {
        that._mapClick = that.view.on('click', that.onMapClick, {
          params: params,
          that: this,
          resolve: resolve
        });
      });
    } else {
      return this.geometrySearch(params);
    }
  }
  private onMapClick(event: any) {
    let params = (this as any).params;
    let that = (this as any).that;

    let resolve = (this as any).resolve;
    let mp = event.lnglat;
    params.center = [mp.lng, mp.lat];
    that.geometrySearch(params).then((res: any) => {
      resolve(res);
    });
  }
  private async geometrySearch(
    params: IGeometrySearchParameter
  ): Promise<IResult> {
    let repeat = params.repeat !== false;
    if (!repeat) {
      this._clear();
    }

    if (!this.searchGroups) {
      this.searchGroups = new AMap.OverlayGroup();
      this.view.add(this.searchGroups);
    } else {
      this.searchGroups.clearOverlays();
    }
    let radius = params.radius; //搜索半径,单位米
    let center = params.center as number[]; //搜索中心

    let searchTypes = params.types || ['*']; //搜索点位类型
    let showResult = params.showResult !== false;
    let showGeometry = params.showGeometry !== false;
    let clickHandle = params.clickHandle;

    let circle = new AMap.Circle({
      center: new AMap.LngLat(center[0], center[1]), // 圆心位置
      radius: radius, // 圆半径
      fillColor: '#1791fc', // 圆形填充颜色
      strokeColor: 'red', // 描边颜色
      fillOpacity: 0.4,
      bubble: true,
      strokeOpacity: 0.8,
      strokeWeight: 2 // 描边宽度
    });
    let centerCircle = new AMap.CircleMarker({
      center: new AMap.LngLat(center[0], center[1]), // 圆心位置
      radius: 8, // 圆半径
      fillColor: 'red', // 圆形填充颜色
      strokeColor: 'red', // 描边颜色
      fillOpacity: 0.8,
      bubble: true,
      strokeOpacity: 0.8,
      strokeWeight: 2 // 描边宽度
    });
    if (showGeometry) {
      this.searchGroups.addOverlay(centerCircle);
      this.searchGroups.addOverlay(circle);
    }
    return new Promise((resolve, reject) => {
      let overlays = this.view.getAllOverlays('marker');
      let searchOverlays = overlays.filter((overlay: any) => {
        let overlayType = overlay.getExtData().attributes.type;
        let point = overlay.getPosition();
        if (
          searchTypes.indexOf(overlayType) >= 0 ||
          searchTypes.toString() == ['*'].toString()
        ) {
          if (overlay.CLASS_NAME == 'AMap.Marker') {
            if (showResult) {
              if (!overlay.originalState) {
                overlay.originalState = overlay.Ce.visible.toString();
              }
              if (circle.contains(point)) {
                overlay.show();
                return true;
              } else {
                overlay.hide();
                return false;
              }
            }
          }
        }
      });
      let searchResult = searchOverlays.map((result: any) => {
        return {
          positon: result.getPosition(),
          attr: result.getExtData().attributes
        };
      });
      let searchResults = {
        center: center,
        radius: radius,
        searchResults: searchResult
      };
      if (clickHandle) {
        clickHandle(searchResults);
      }
      resolve({
        status: 0,
        message: '',
        result: searchResults
      });
    });
  }
}

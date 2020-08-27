import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IGeometrySearchParameter
} from '@/types/map';
import {resolve, reject} from 'esri/core/promiseUtils';
import {loadModules} from 'esri-loader';
export class GeometrySearch {
  private static intances: Map<string, any>;
  private view!: any;
  private searchOverlays: any;
  private _mapClick: any;

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: __esri.MapView | __esri.SceneView) {
    let id = view.container.id;
    if (!GeometrySearch.intances) {
      GeometrySearch.intances = new Map();
    }
    let intance = GeometrySearch.intances.get(id);
    if (!intance) {
      intance = new GeometrySearch(view);
      GeometrySearch.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (GeometrySearch.intances as any) = null;
  }
  private _clear() {
    if (this._mapClick) {
      this._mapClick.remove();
    }
  }

  public async clearGeometrySearch() {
    this._clear();
    if (this.searchOverlays) {
      this.searchOverlays.removeAll();
    }
    let layers = this.view.map.allLayers;
    layers.forEach((layer: any) => {
      if (layer.type == 'graphics') {
        let overlays = layer.graphics;
        overlays.forEach((overlay: any) => {
          if (overlay.defaultVisible) {
            if (overlay.defaultVisible == 'true') {
              overlay.visible = true;
            } else {
              overlay.visible = false;
            }
            delete overlay.defaultVisible;
          }
        });
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
        that._mapClick = that.view.on('click', async (event: any) => {
          let clickPoint = event.mapPoint;
          params.center = [clickPoint.longitude, clickPoint.latitude];
          that.geometrySearch(params).then((res: any) => {
            resolve(res);
          });
        });
      });
    } else {
      return this.geometrySearch(params);
    }
  }
  private async createOverlayLayer() {
    type MapModules = [typeof import('esri/layers/GraphicsLayer')];
    const [GraphicsLayer] = await (loadModules([
      'esri/layers/GraphicsLayer'
    ]) as Promise<MapModules>);
    this.searchOverlays = new GraphicsLayer();
    this.view.map.add(this.searchOverlays, 0);
  }
  private async geometrySearch(
    params: IGeometrySearchParameter
  ): Promise<IResult> {
    let repeat = params.repeat !== false;
    type MapModules = [
      typeof import('esri/geometry/Point'),
      typeof import('esri/geometry/Circle'),
      typeof import('esri/geometry/Geometry'),
      typeof import('esri/symbols/SimpleFillSymbol'),
      typeof import('esri/symbols/SimpleMarkerSymbol'),
      typeof import('esri/Graphic')
    ];
    const [
      Point,
      Circle,
      Geometry,
      SimpleFillSymbol,
      SimpleMarkerSymbol,
      Graphic
    ] = await (loadModules([
      'esri/geometry/Point',
      'esri/geometry/Circle',
      'esri/geometry/Geometry',
      'esri/symbols/SimpleFillSymbol',
      'esri/symbols/SimpleMarkerSymbol',
      'esri/Graphic'
    ]) as Promise<MapModules>);

    if (!repeat) {
      this._clear();
    }

    if (!this.searchOverlays) {
      await this.createOverlayLayer();
    } else {
      this.searchOverlays.removeAll();
    }
    let radius = params.radius; //搜索半径,单位米
    let center = params.center as number[]; //搜索中心

    let searchTypes = params.types || ['*']; //搜索点位类型
    let showResult = params.showResult !== false;
    let showGeometry = params.showGeometry !== false;
    let clickHandle = params.clickHandle;

    let centerGeo = new Point({
      longitude: center[0],
      latitude: center[1],
      spatialReference: {wkid: 4326}
    });
    let circleGeo = new Circle({
      center: centerGeo,
      radius: radius,
      radiusUnit: 'meters'
    });
    let circleGraphic = new Graphic({
      geometry: circleGeo,
      symbol: new SimpleFillSymbol({
        style: 'solid',
        color: [23, 145, 252, 0.4],
        outline: {
          color: [255, 0, 0, 0.8],
          width: 2
        }
      }),
      attributes: {
        type: 'geometrysearch'
      }
    });
    let centerGraphic = new Graphic({
      geometry: circleGeo,
      symbol: new SimpleMarkerSymbol({
        style: 'circle',
        color: [255, 0, 0, 0.8],
        outline: {
          color: [255, 0, 0, 0.8],
          width: 2
        }
      }),
      attributes: {
        type: 'geometrysearch'
      }
    });
    if (showGeometry) {
      this.searchOverlays.add(circleGraphic);
      this.searchOverlays.add(centerGraphic);
    }
    return new Promise((resolve, reject) => {
      let overlays = this.view.map.allLayers;
      let searchRses = new Array();
      overlays.forEach((layer: any) => {
        if (layer.type == 'graphics') {
          layer.graphics.forEach((overlay: any) => {
            let point = overlay.geometry;
            let overlayType = overlay.type || overlay.attributes.type;
            if (
              (searchTypes.indexOf(overlayType) >= 0 ||
                searchTypes.toString() == ['*'].toString()) &&
              overlayType !== 'geometrysearch'
            ) {
              if (!overlay.defaultVisible) {
                overlay.defaultVisible = overlay.visible.toString();
              }
              if (circleGeo.contains(point)) {
                overlay.visible = true;
                searchRses.push(overlay);
              } else {
                overlay.visible = false;
              }
            }
          });
        }
      });

      let searchResult = searchRses.map((result: any) => {
        return {
          positon: result.geometry,
          attr: result.attributes
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

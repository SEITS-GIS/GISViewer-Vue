import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IGeometrySearchParameter
} from '@/types/map';
import {resolve, reject} from 'esri/core/promiseUtils';
import {loadModules, utils} from 'esri-loader';
import {Utils} from '@/plugin/gis-viewer/Utils';
import {DrawOverlays} from '../../DrawOverlays/arcgis/DrawOverlays';
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
    const drawoverlay = DrawOverlays.getInstance(this.view);
    drawoverlay.clear();
    let layers = this.view.map.allLayers;
    layers.forEach((layer: any) => {
      if (layer.type == 'graphics') {
        if (layer.data) {
          //聚合图层
          layer.visible = true;
        }
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
    let drawType = params.drawType || 'point';
    let that = this;
    if (!center) {
      return new Promise((resolve, reject) => {
        if (drawType == 'point') {
          that._mapClick = that.view.on('click', async (event: any) => {
            let clickPoint = event.mapPoint;
            params.center = [clickPoint.longitude, clickPoint.latitude];
            that.geometrySearch(params).then((res: any) => {
              resolve(res);
            });
          });
        } else {
          const drawoverlay = DrawOverlays.getInstance(that.view);
          drawoverlay.startDrawOverlays({
            drawType: drawType,
            repeat: false,
            update: false,
            callback: (geometry: any) => {
              params.geometry = geometry;
              that.geometrySearch(params).then((res: any) => {
                resolve(res);
              });
            }
          });
        }
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
    this.view.map.add(this.searchOverlays, 1);
  }
  private async showClusterPoint(layer: any, datas: any) {
    layer.visible = false;
    type MapModules = [
      typeof import('esri/Graphic'),
      typeof import('esri/geometry/Point')
    ];
    const [Graphic, Point] = await (loadModules([
      'esri/Graphic',
      'esri/geometry/Point'
    ]) as Promise<MapModules>);
    let defaultSymbol = layer.clusterRenderer.defaultSymbol;
    let texts: any[] = [];
    let graphics = datas.map((item: any) => {
      let symbol = item.symbol ? item.symbol : defaultSymbol;
      let geometry = new Point({
        longitude: item.x,
        latitude: item.y,
        spatialReference: {wkid: 4326}
      });
      let pointGra = new Graphic({
        geometry: geometry,
        symbol: symbol,
        attributes: item
      });
      if (layer.customText && layer.customText.content) {
        let customText = layer.customText;
        let textsymbol = {
          type: 'text', // autocasts as new TextSymbol()
          color: customText.color || 'red',
          text: customText.content || '',
          backgroundColor: customText.backgroundColor || 'black',
          borderLineColor: customText.lineColor || 'white',
          borderLineSize: customText.lineWidth || 1,
          font: {
            // autocasts as new Font()
            size: customText.fontSize || 10,
            weight: customText.weight || 'bold'
          },
          yoffset: 0
        };

        var symOffset = symbol.yoffset ? symbol.yoffset : 0;
        textsymbol.yoffset = symbol.height / 2 + symOffset;
        textsymbol.text = Utils.getContent(item, customText.content);
        var graphicText = new Graphic({geometry: geometry, symbol: textsymbol});
        texts.push(graphicText);
      }

      return pointGra;
    });
    this.searchOverlays.addMany(graphics);
    this.searchOverlays.addMany(texts);
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
    let radius = params.radius || 1000; //搜索半径,单位米
    let center = (params.center as number[]) || undefined; //搜索中心

    let searchTypes = params.types || ['*']; //搜索点位类型
    let showResult = params.showResult !== false;
    let showGeometry = params.showGeometry !== false;
    let clickHandle = params.clickHandle;

    let searchGeometry = params.geometry || undefined;
    if (center) {
      let centerGeo = new Point({
        longitude: center[0],
        latitude: center[1],
        spatialReference: {wkid: 4326}
      });
      searchGeometry = new Circle({
        center: centerGeo,
        radius: radius,
        radiusUnit: 'meters'
      });
      let circleGraphic = new Graphic({
        geometry: searchGeometry,
        symbol: new SimpleFillSymbol({
          style: 'solid',
          color: [23, 145, 252, 0.4],
          outline: {
            style: 'dash',
            color: [255, 0, 0, 0.8],
            width: 2
          }
        }),
        attributes: {
          type: 'geometrysearch'
        }
      });
      let centerGraphic = new Graphic({
        geometry: searchGeometry,
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
    }

    this.view.goTo({target: searchGeometry});
    return new Promise((resolve, reject) => {
      let overlays = this.view.map.allLayers;
      let searchRses = new Array();
      overlays.forEach((layer: any) => {
        if (layer.label !== 'drawOverlays') {
          if (layer.type == 'graphics') {
            if (layer.data && searchTypes.indexOf(layer.label) > -1) {
              //cluster点位
              let datas = layer.data;
              datas.forEach((item: any) => {
                let overlayType = item.type;
                if (
                  searchTypes.indexOf(overlayType) >= 0 ||
                  searchTypes.toString() == ['*'].toString()
                ) {
                  let pt = new Point({
                    longitude: item.x,
                    latitude: item.y,
                    spatialReference: {wkid: 4326}
                  });
                  if (searchGeometry.contains(pt)) {
                    searchRses.push(item);
                  }
                }
              }, this);

              this.showClusterPoint(layer, searchRses);
            } else {
              layer.graphics.forEach((overlay: any) => {
                let point = overlay.geometry;
                let overlayType =
                  overlay.type || overlay.attributes
                    ? overlay.attributes.type
                    : '';
                if (
                  (searchTypes.indexOf(overlayType) >= 0 ||
                    searchTypes.toString() == ['*'].toString()) &&
                  overlayType !== 'geometrysearch'
                ) {
                  if (!overlay.defaultVisible) {
                    overlay.defaultVisible = overlay.visible.toString();
                  }
                  if (searchGeometry.contains(point)) {
                    overlay.visible = true;
                    searchRses.push(overlay);
                  } else {
                    overlay.visible = showResult;
                  }
                }
              });
            }
          } else if (
            layer.type == 'feature' &&
            layer.source &&
            layer.source.items
          ) {
            layer.source.items.forEach((graphic: any) => {
              let point = graphic.geometry;
              let overlayType = graphic.attributes.type;
              if (
                (searchTypes.indexOf(overlayType) >= 0 ||
                  searchTypes.toString() == ['*'].toString()) &&
                overlayType !== 'geometrysearch'
              ) {
                if (searchGeometry.contains(point)) {
                  searchRses.push(graphic);
                }
              }
            });
            layer.refresh();
          }
        }
      });

      // let searchResult = searchRses.map((result: any) => {
      //   return {
      //     positon: result.geometry,
      //     attr: result.attributes
      //   };
      // });
      let searchResults = {
        center: center,
        radius: radius,
        searchResults: searchRses
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

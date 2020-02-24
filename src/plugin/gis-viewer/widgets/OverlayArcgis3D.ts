import {
  IOverlayParameter,
  IPointSymbol,
  PointPrimitives,
  IResult
} from "@/types/map";
import { loadModules } from "esri-loader";

export class OverlayArcgis3D {
  private static overlayArcgis3D: OverlayArcgis3D;

  private overlayLayer!: __esri.GraphicsLayer;
  private view!: __esri.SceneView;

  private constructor(view: __esri.SceneView) {
    this.view = view;
  }

  public static getInstance(view: __esri.SceneView) {
    if (!OverlayArcgis3D.overlayArcgis3D) {
      OverlayArcgis3D.overlayArcgis3D = new OverlayArcgis3D(view);
    }

    return OverlayArcgis3D.overlayArcgis3D;
  }

  private async createOverlayLayer() {
    type MapModules = [typeof import("esri/layers/GraphicsLayer")];
    const [GraphicsLayer] = await (loadModules([
      "esri/layers/GraphicsLayer"
    ]) as Promise<MapModules>);
    this.overlayLayer = new GraphicsLayer();
    this.view.map.add(this.overlayLayer);
  }

  //校验overlay参数
  private verifyParams(): Boolean {
    return true;
  }

  private async makeSymbol(symbol: IPointSymbol | undefined): Promise<IResult> {
    if (!symbol) {
      return { status: -1, message: "no symbol" };
    }

    const [
      Color,
      PointSymbol3D,
      SimpleMarkerSymbol,
      PictureMarkerSymbol
    ] = await loadModules([
      "esri/Color",
      "esri/symbols/PointSymbol3D",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/PictureMarkerSymbol"
    ]);
    let result;
    switch (symbol.type) {
      case "point-2d":
        if (symbol.primitive) {
          //使用图元
          result = new SimpleMarkerSymbol({
            style: symbol.primitive ?? PointPrimitives.circle,
            color: symbol.color ?? [255, 255, 255, 0.25],
            angle: symbol.angle ?? 0,
            xoffset: symbol.xoffset ?? 0,
            yoffset: symbol.yoffset ?? 0
          });
        } else if (symbol.url) {
          //使用图片
          return new PictureMarkerSymbol();
        }
        break;
      case "point-3d":
        break;
    }
    return { status: 0, message: "ok", result };
  }

  public async addOverlays(params: IOverlayParameter): Promise<void> {
    if (!this.overlayLayer) {
      await this.createOverlayLayer();
    }

    const [Graphic, geometryJsonUtils] = await loadModules([
      "esri/Graphic",
      "esri/geometry/support/jsonUtils"
    ]);

    const defaultSymbol = (await this.makeSymbol(params.defaultSymbol)).result;
    for (let i = 0; i < params.overlays.length; i++) {
      const overlay = params.overlays[i];
      const symbol = (await this.makeSymbol(overlay.symbol)).result;
      const graphic = new Graphic({
        geometry: geometryJsonUtils.fromJSON(overlay.geometry),
        symbol: symbol || defaultSymbol
      });
      this.overlayLayer.add(graphic);
    }
  }
}

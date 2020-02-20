import { IOverlayParameter, IPointSymbol } from "@/types/map";
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

  private async makeSymbol(
    symbol: IPointSymbol | undefined
  ): Promise<__esri.Symbol | undefined> {
    type MapModules = [
      typeof import("esri/Color"),
      typeof import("esri/symbols/PointSymbol3D"),
      typeof import("esri/symbols/SimpleMarkerSymbol"),
      typeof import("esri/symbols/PictureMarkerSymbol")
    ];
    if (!symbol) {
      return undefined;
    }

    const [
      Color,
      PointSymbol3D,
      SimpleMarkerSymbol,
      PictureMarkerSymbol
    ] = await (loadModules([
      "esri/Color",
      "esri/symbols/PointSymbol3D",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/PictureMarkerSymbol"
    ]) as Promise<MapModules>);
    switch (symbol.type) {
      case "point-2d":
        if (symbol.primitive) {
          return new SimpleMarkerSymbol({
            style: symbol.primitive,
            color: symbol.color
              ? new Color(symbol.color)
              : [255, 255, 255, 0.25],
            angle: symbol.angle,
            xoffset: symbol.xoffset,
            yoffset: symbol.yoffset
          });
        } else if (symbol.url) {
          return new PictureMarkerSymbol();
        }
        break;
      case "point-3d":
        break;
    }
  }

  public async addOverlays(params: IOverlayParameter): Promise<void> {
    if (!this.overlayLayer) {
      await this.createOverlayLayer();
    }

    const [Graphic, geometryJsonUtils] = await loadModules([
      "esri/Graphic",
      "esri/geometry/support/jsonUtils"
    ]);

    const defaultSymbol = await this.makeSymbol(params.defaultSymbol);
    for (let i = 0; i < params.overlays.length; i++) {
      const overlay = params.overlays[i];
      const symbol = await this.makeSymbol(overlay.symbol);
      const graphic = new Graphic({
        geometry: geometryJsonUtils.fromJSON(overlay.geometry),
        symbol: symbol || defaultSymbol
      });
      this.overlayLayer.add(graphic);
    }
  }
}

import { IOverlayParameter, IPointSymbol, IResult } from "@/types/map";
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

  private makeSymbol(symbol: IPointSymbol | undefined): Object | undefined {
    if (!symbol) return undefined;

    let result;
    switch (symbol.type) {
      case "point-2d":
        result = {
          type: "point-3d", //autocasts as new PointSymbol3D()
          symbolLayers: [
            {
              type: "icon", //autocasts as new IconSymbol3DLayer()
              resource: symbol.primitive
                ? { primitive: symbol.primitive }
                : { href: symbol.url },
              size: symbol.size instanceof Array ? symbol.size[0] : symbol.size,
              material: { color: symbol.color },
              outline: symbol.outline,
              anchor: symbol.anchor
            }
          ]
        };
        break;
      case "point-3d":
        result = {
          type: "point-3d", //autocasts as new PointSymbol3D()
          symbolLayers: [
            {
              type: "object", // autocasts as new ObjectSymbol3DLayer()
              resource: {}
            }
          ]
        };
        break;
    }
    return result;
  }

  public async addOverlays(params: IOverlayParameter): Promise<void> {
    if (!this.overlayLayer) {
      await this.createOverlayLayer();
    }

    const [Graphic, geometryJsonUtils] = await loadModules([
      "esri/Graphic",
      "esri/geometry/support/jsonUtils"
    ]);

    const defaultSymbol = this.makeSymbol(params.defaultSymbol);
    for (let i = 0; i < params.overlays.length; i++) {
      const overlay = params.overlays[i];
      const overlaySymbol = this.makeSymbol(overlay.symbol);
      try {
        const geometry = geometryJsonUtils.fromJSON(overlay.geometry);
        const graphic = new Graphic({
          geometry,
          symbol: overlaySymbol || defaultSymbol
        });
        this.overlayLayer.add(graphic);
      } catch (error) {
        console.log(111);
      }
    }
  }
}

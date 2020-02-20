import { IOverlayParameter } from "@/types/map";
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

  private makeSymbol(symbol: )

  public async addOverlays(params: IOverlayParameter): Promise<void> {
    if (!this.overlayLayer) {
      await this.createOverlayLayer();
    }

    type MapModules = [typeof import("esri/Graphic")];
    const [Graphic] = await (loadModules(["esri/layers/Graphic"]) as Promise<
      MapModules
    >);

    if (params.defaultSymbol) {
    }
  }
}

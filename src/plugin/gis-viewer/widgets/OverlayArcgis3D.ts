import { IOverlayParameter } from "@/types/map";

export class OverlayArcgis3D {
  private static overlayArcgis3D: OverlayArcgis3D;

  private constructor(view: __esri.SceneView) {}

  public static getInstance(view: __esri.SceneView) {
    if (OverlayArcgis3D.overlayArcgis3D === null) {
      OverlayArcgis3D.overlayArcgis3D = new OverlayArcgis3D(view);
    }
    return OverlayArcgis3D.overlayArcgis3D;
  }

  public addOverlays(params: IOverlayParameter) {}
}

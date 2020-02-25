import { IOverlayParameter, IPointSymbol, IResult } from "@/types/map";
import { loadModules } from "esri-loader";

export class OverlayArcgis3D {
  private static overlayArcgis3D: OverlayArcgis3D;

  private overlayLayer!: __esri.GraphicsLayer;
  private view!: __esri.SceneView;

  private primitive2D = ["circle", "square", "cross", "x", "kite", "triangle"];
  private primitive3D = [
    "sphere",
    "cylinder",
    "cube",
    "cone",
    "inverted-cone",
    "diamond",
    "tetrahedron"
  ];

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
    switch (symbol.type.toLowerCase()) {
      case "point-2d":
        //图元类型不匹配
        if (symbol.primitive && !this.primitive2D.includes(symbol.primitive)) {
          console.error(`Wrong primitive: ${symbol.primitive}`);
          return undefined;
        }

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
        //图元类型不匹配
        if (symbol.primitive && !this.primitive3D.includes(symbol.primitive)) {
          console.error(`Wrong primitive: ${symbol.primitive}`);
          return undefined;
        }

        result = {
          type: "point-3d", //autocasts as new PointSymbol3D()
          symbolLayers: [
            {
              type: "object", // autocasts as new ObjectSymbol3DLayer()
              resource: symbol.primitive
                ? { primitive: symbol.primitive }
                : { href: symbol.url },
              width:
                symbol.size instanceof Array ? symbol.size[0] : symbol.size,
              height:
                symbol.size instanceof Array ? symbol.size[1] : symbol.size,
              depth:
                symbol.size instanceof Array ? symbol.size[2] : symbol.size,
              material: { color: symbol.color },
              tilt: symbol.rotation instanceof Array ? symbol.rotation[0] : 0,
              roll: symbol.rotation instanceof Array ? symbol.rotation[1] : 0,
              heading:
                symbol.rotation instanceof Array ? symbol.rotation[2] : 0,
              anchor: symbol.anchor
            }
          ]
        };
        break;
    }
    return result;
  }

  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    if (!this.overlayLayer) {
      await this.createOverlayLayer();
    }

    const [Graphic, geometryJsonUtils] = await loadModules([
      "esri/Graphic",
      "esri/geometry/support/jsonUtils"
    ]);

    const defaultSymbol = this.makeSymbol(params.defaultSymbol);
    let addCount = 0;
    for (let i = 0; i < params.overlays.length; i++) {
      const overlay = params.overlays[i];
      const overlaySymbol = this.makeSymbol(overlay.symbol);
      //TODO: 加入更详细的参数是否合法判断
      if (!defaultSymbol && !overlaySymbol) {
        continue;
      }
      const geometry = geometryJsonUtils.fromJSON(overlay.geometry);
      const graphic = new Graphic({
        geometry,
        symbol: overlaySymbol || defaultSymbol
      });
      this.overlayLayer.add(graphic);
      addCount++;
    }
    return {
      status: 0,
      message: "ok",
      result: `成功添加${params.overlays.length}中的${addCount}个覆盖物`
    };
  }
}

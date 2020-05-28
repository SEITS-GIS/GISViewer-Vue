import {
  IOverlayParameter,
  IFindParameter,
  IResult,
  IOverlayDelete,
} from "@/types/map";
import "@amap/amap-jsapi-types";

export class OverlayGaode {
  private static instance: OverlayGaode;
  private view!: AMap.Map;
  public showGisDeviceInfo: any;

  private overlayGroups: Map<string, AMap.OverlayGroup> = new Map();

  private constructor(view: AMap.Map) {
    this.view = view;
  }

  public static getInstance(view: AMap.Map) {
    if (!OverlayGaode.instance) {
      OverlayGaode.instance = new OverlayGaode(view);
    }

    return OverlayGaode.instance;
  }

  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    console.log(params);
    const { type: overlayType, overlays } = params;

    const group: AMap.OverlayGroup = this.getOverlayGroup(overlayType || "default");

    overlays.forEach(feature => {
      const { geometry, fields, id } = feature;
      if (id) fields.id = id;
      if (overlayType) fields.type = overlayType;
      let overlay;
      if ("x" in geometry && "y" in geometry) {
        overlay = new AMap.Marker({
          position: [geometry.x, geometry.y],
          extData: fields
        })
        group.addOverlay(overlay)
      }
      else if ("path" in geometry) { }
      else if ("ring" in geometry) { }
    });

    return {
      status: 0,
      message: "ok",
      result: ""
    };
  }

  public async deleteOverlays(params: IOverlayDelete): Promise<IResult> {
    return {
      status: 0,
      message: "ok",
      result: "",
    };
  }

  public async findFeature(params: IFindParameter): Promise<IResult> {
    return {
      status: 0,
      message: "ok",
      result: "",
    };
  }

  public async deleteAllOverlays(): Promise<IResult> {
    return {
      status: 0,
      message: "ok",
      result: "",
    };
  }

  private getOverlayGroup(type: string): AMap.OverlayGroup {
    let group = this.overlayGroups.get(type);
    if (!group) {
      group = new AMap.OverlayGroup();
      this.view.add(group);
      this.overlayGroups.set(type, group);
    }
    return group;
  }
}

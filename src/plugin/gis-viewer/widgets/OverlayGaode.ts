import {
  IOverlayParameter,
  IFindParameter,
  IResult,
  IOverlayDelete,
  IPointSymbol,
  IPolylineSymbol,
  IPolygonSymbol
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
    const group: AMap.OverlayGroup = this.getOverlayGroup(params.type || "default");

    const defaultSymbol = this.makeSymbol(params.defaultSymbol);

    params.overlays.forEach(feature => {
      const { geometry, fields, id } = feature;
      fields.id = id;
      fields.type = params.type;

      let overlay;
      //点
      if ("x" in geometry && "y" in geometry) {    
        const symbol = this.makeSymbol(feature.symbol) || defaultSymbol;
        if (symbol) {
          overlay = new AMap.Marker({
            position: [geometry.x, geometry.y],
            extData: fields,
            icon: (symbol || defaultSymbol) as AMap.Icon,
            anchor: feature.symbol ? (feature.symbol as IPointSymbol).anchor : (params.defaultSymbol as IPointSymbol).anchor,
            title: "11111\n22222"
          })
        } 
        else {
          overlay = new AMap.Marker({
            position: [geometry.x, geometry.y],
            extData: fields
          })
        }   
        
        group.addOverlay(overlay)
      }
      //线
      else if ("path" in geometry) { }
      //面
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

  private makeSymbol(symbol: IPointSymbol | IPolylineSymbol | IPolygonSymbol | undefined): AMap.Icon | {} | undefined {
    if (!symbol) return undefined;

    switch (symbol.type) {
      case "point-2d":
        const pointSymbol = symbol as IPointSymbol;
        if (!pointSymbol.url) {
          return undefined;
        }

        let size;
        if (pointSymbol.size instanceof Array) {
          size = [this.makePixelSize(pointSymbol.size[0]), this.makePixelSize(pointSymbol.size[1])]
        }
        else if (pointSymbol.size) {
          size = [this.makePixelSize(pointSymbol.size), this.makePixelSize(pointSymbol.size)]
        }
        return new AMap.Icon({
          image: pointSymbol.url,
          size          
        });
        break;
    
      default:
        return undefined;
    }
  }

  /** 将pixel/point为单位的统一转为pixel */
  private makePixelSize(size: string | number): number {
    if (typeof size === "number") {
      return size;
    }
    else {
      const value = size.slice(0, size.length - 2);
      const unit = size.slice(size.length - 2);
      if (unit === "px") {
        return Number(value)
      } 
      else if (unit === "pt") {
        return Number(value) * 0.75;
      }
      else {
        return Number(size)
      }
    }
  }
}

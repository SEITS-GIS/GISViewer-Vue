import { IOverlayParameter, IPointSymbol, IResult } from "@/types/map";
import { loadModules } from "esri-loader";
import ToolTip from "./ToolTip";

export class OverlayArcgis2D {
  private static overlayArcgis2D: OverlayArcgis2D;

  private overlayLayer!: __esri.GraphicsLayer;
  private view!: __esri.MapView;

  private primitive2D = ["circle", "cross", "diamond", "square", "triangle", "x"];

  private constructor(view: __esri.MapView) {
    this.view = view;
  }

  public static getInstance(view: __esri.MapView) {
    if (!OverlayArcgis2D.overlayArcgis2D) {
      OverlayArcgis2D.overlayArcgis2D = new OverlayArcgis2D(view);
    }

    return OverlayArcgis2D.overlayArcgis2D;
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
    if (!symbol || symbol.type.toLowerCase() !== "point-2d") return undefined;

    let result;

    if (symbol.primitive) {
      if (!this.primitive2D.includes(symbol.primitive)) {
        return undefined;
      }

      result = {
        type: "simple-marker",
        style: symbol.primitive,
        color: symbol.color,
        size: symbol.size,
        xoffset: symbol.xoffset ? symbol.xoffset : null,
        yoffset: symbol.yoffset ? symbol.yoffset : null,
        angle: symbol.rotation ? symbol.rotation : null,
        outline: {
          color: symbol.outline?.color,
          width: symbol.outline?.size
        }
      }      
    } 
    else if (symbol.url) {
      result = {
        type: "picture-marker",
        url: symbol.url,
        width: symbol.size instanceof Array ? symbol.size[0] : null,
        height: symbol.size instanceof Array ? symbol.size[1] : null,
        xoffset: symbol.xoffset ? symbol.xoffset : null,
        yoffset: symbol.yoffset ? symbol.yoffset : null,
        angle: symbol.rotation ? symbol.rotation : null
      }
    }

    return result;

    
  }
  /**根据graphic的属性生成弹出框*/
  private getInfoWindowContent(graphic: any): any {
    let content = "";
    //键值对
    for (let fieldName in graphic.attributes) {
      if (graphic.attributes.hasOwnProperty(fieldName)) {
        content +=
          "<b>" + fieldName + ": </b>" + graphic.attributes[fieldName] + "<br>";
      }
    }
    //去掉最后的<br>
    content = content.substring(0, content.lastIndexOf("<br>"));
    if (graphic.buttons !== undefined) {
      content += "<hr>";
      graphic.buttons.forEach(
        (buttonConfig: { type: string; label: string }) => {
          content +=
            "<button type='button' class='btn btn-primary btn-sm' onclick='mapFeatureClicked(" +
            '"' +
            buttonConfig.type +
            '", "' +
            graphic.id +
            '"' +
            ")'>" +
            buttonConfig.label +
            "</button>  ";
        }
      );
    }
    let divContent = document.createElement("div");
    divContent.innerHTML = content;
    return divContent;
  }
  //使popup中的content,支持html.
  private getPopUpHtml(graphic: any, content: string): any {
    let tipContent = content;
    for (let fieldName in graphic.attributes) {
      if (graphic.attributes.hasOwnProperty(fieldName)) {
        tipContent = tipContent.replace(
          "{" + fieldName + "}",
          graphic.attributes[fieldName]
        );
      }
    }
    let divContent = document.createElement("div");
    divContent.innerHTML = tipContent;
    return divContent;
  }
  //使toolTip中支持{字段}的形式
  private getToolTipContent(graphic: any, content: string): string {
    let tipContent = content;
    if (content) {
      //键值对
      for (let fieldName in graphic.attributes) {
        if (graphic.attributes.hasOwnProperty(fieldName)) {
          tipContent = tipContent.replace(
            "{" + fieldName + "}",
            graphic.attributes[fieldName]
          );
        }
      }
    } else {
      tipContent = this.getInfoWindowContent(graphic).innerHTML;
    }
    return tipContent;
  }

  
  public async addOverlays(params: IOverlayParameter): Promise<IResult> {    
    if (!this.overlayLayer) {
      await this.createOverlayLayer();
    }

    const [Graphic, geometryJsonUtils, PopupTemplate] = await loadModules([
      "esri/Graphic",
      "esri/geometry/support/jsonUtils",
      "esri/PopupTemplate"
    ]);

    const defaultSymbol = this.makeSymbol(params.defaultSymbol);
    const showPopup = params.showPopup;
    const defaultInfoTemplate = params.defaultInfoTemplate;
    const autoPopup = params.autoPopup;
    const defaultButtons = params.defaultButtons;    

    let addCount = 0;
    for (let i = 0; i < params.overlays.length; i++) {
      const overlay = params.overlays[i];
      const overlaySymbol = this.makeSymbol(overlay.symbol);
      //TODO: 加入更详细的参数是否合法判断
      if (!defaultSymbol && !overlaySymbol) {
        continue;
      }
      const geometry = geometryJsonUtils.fromJSON(overlay.geometry);
      const fields = overlay.fields;
      fields.type = params.type;
      fields.id = overlay.id;
      const buttons = overlay.buttons;

      const graphic = new Graphic({
        geometry,
        symbol: overlaySymbol || defaultSymbol,
        attributes: fields || {}
      });
      this.view.goTo(graphic);
      graphic.buttons = buttons || defaultButtons;
      if (showPopup) {
        if (defaultInfoTemplate === undefined) {
          graphic.popupTemplate = new PopupTemplate({
            content: this.getInfoWindowContent(graphic)
          });
        } else {
          graphic.popupTemplate = {
            title: defaultInfoTemplate.title,
            content: this.getPopUpHtml(graphic, defaultInfoTemplate.content)
          };
        }
        if (autoPopup) {
          this.view.popup.open({
            title: "",
            content: this.getInfoWindowContent(graphic),
            location: geometry
          });
          this.view.popup.dockOptions = {
            buttonEnabled: false,
            breakpoint: { width: 400, height: 30 }
          };
        }
      }

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

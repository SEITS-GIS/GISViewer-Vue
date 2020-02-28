import { IOverlayParameter, IPointSymbol, IResult } from "@/types/map";
import { loadModules } from "esri-loader";
import ToolTip from "./ToolTip";

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

  private MoveToolTip(content: string) {
    const view = this.view;
    const moveLayer = this.overlayLayer;
    let parent = this;
    let tip!: any;
    view.on("pointer-move", function(event) {
      view.hitTest(event).then(response => {
        if (response.results.length > 0) {
          response.results.forEach(result => {
            if (result.graphic.layer === moveLayer) {
              if (!tip) {
                tip = new ToolTip(
                  view,
                  {
                    title: "",
                    content: parent.getToolTipContent(result.graphic, content)
                  },
                  result.graphic
                );
              }
            }
          });
        } else {
          if (tip) {
            tip.remove();
            tip = null;
          }
        }
      });
    });
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
    const showPopup = params.showPopup;
    const defaultInfoTemplate = params.defaultInfoTemplate;
    const autoPopup = params.autoPopup;
    const showToolTip = params.showToolTip;
    const toolTipContent = params.toolTipContent;
    const defaultButtons = params.defaultButtons;

    if (showToolTip) {
      this.MoveToolTip(toolTipContent);
    }

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
      const buttons = overlay.buttons;

      const graphic = new Graphic({
        geometry,
        symbol: overlaySymbol || defaultSymbol,
        attributes: fields || {}
      });
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

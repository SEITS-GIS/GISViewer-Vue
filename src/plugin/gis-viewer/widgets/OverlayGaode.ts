import {
  IOverlayParameter,
  IPointSymbol,
  IPolylineSymbol,
  IResult,
  IPopUpTemplate,
  IOverlayClusterParameter,
  IOverlayDelete,
  IFindParameter,
  IOverlay,
} from "@/types/map";
import "@amap/amap-jsapi-types";

export class OverlayGaode {
  private static overlayGaode: OverlayGaode;
  private view!: AMap.Map;
  private overlayers = new Array();
  private overlayGroup:any; 
  private markerClustererLayer = new Array();
  public showGisDeviceInfo: any;

  private overlayGroups: Map<string, AMap.OverlayGroup> = new Map();

  private constructor(view: any) {
    this.view = view;
  }

  public static getInstance(view: AMap.Map) {
    if (!OverlayGaode.overlayGaode) {
      OverlayGaode.overlayGaode = new OverlayGaode(view);
    }
    return OverlayGaode.overlayGaode;
  }
  private createOverlayLayer(markers: any) {
    this.overlayGroup = new AMap.OverlayGroup(markers);
    this.overlayGroup.label = "Overlays";
    this.view.add(this.overlayGroup);
  }
  private getMarker(overlay: any, symbol: any) {
    let marker;
    let type;
    if (symbol) {
      type = symbol.type;
    }
    if (!symbol.outline) {
      symbol.outline = {};
    }
    switch (type) {
      case "polyline":
        marker = new AMap.Polyline({
          path: overlay.geometry.path,
          isOutline: symbol.isoutline || false,
          outlineColor: symbol.outlineColor || "#ffffff",
          borderWeight: symbol.borderWeight || 1,
          strokeColor: symbol.color || "#000000",
          strokeOpacity: symbol.opacity || 1,
          strokeWeight: symbol.width || 3,
          // 折线样式还支持 'dashed'
          strokeStyle: symbol.style || "solid",
          // strokeStyle是dashed时有效
          strokeDasharray: symbol.dashArray || [10, 5],
          lineJoin: symbol.lineJoin || "round",
          lineCap: symbol.lineCap || "round",
          zIndex: symbol.zIndex || 1,
        });
        break;
      case "polygon":
        marker = new AMap.Polygon({
          path: overlay.geometry.ring || overlay.geometry.path,
          strokeColor: symbol.outline.color || "#000000",
          strokeOpacity: symbol.outline.opacity || 1,
          strokeWeight: symbol.outline.width || 1,
          // 线样式还支持 'dashed'
          strokeStyle: symbol.outline.style || "solid",
          // strokeStyle是dashed时有效
          strokeDasharray: symbol.outline.dashArray || [10, 5],
          fillColor: symbol.color || "#000000",
          fillOpacity: symbol.opacity || 1,
          zIndex: symbol.zIndex || 1,
        });
        break;
      case "extent":
        if (symbol.outline) {
          symbol.outline = {};
        }
        marker = new AMap.Rectangle({
          bounds: new AMap.Bounds(
            new AMap.LngLat(overlay.geometry.xmin, overlay.geometry.ymin),
            new AMap.LngLat(overlay.geometry.xmax, overlay.geometry.ymax)
          ),
          strokeColor: symbol.outline.color || "#000000",
          strokeOpacity: symbol.outline.opacity || 1,
          strokeWeight: symbol.outline.width || 1,
          // 线样式还支持 'dashed'
          strokeStyle: symbol.outline.style || "solid",
          // strokeStyle是dashed时有效
          strokeDasharray: symbol.outline.dashArray || [10, 5],
          fillColor: symbol.color || "#000000",
          fillOpacity: symbol.opacity || 1,
          zIndex: symbol.zIndex || 1,
          cursor: "pointer",
        });
        break;
      case "circle":
        marker = new AMap.Circle({
          center: overlay.geometry.center,
          radius: overlay.geometry.radius || 10, //半径
          //borderWeight: Number(symbol.borderWeight) || 1,
          strokeColor: symbol.outline.color || "#000000",
          strokeOpacity: symbol.outline.opacity || 1,
          strokeWeight: symbol.outline.width || 1,
          // 线样式还支持 'dashed'
          strokeStyle: symbol.outline.style || "solid",
          // strokeStyle是dashed时有效
          strokeDasharray: symbol.outline.dashArray || [10, 5],
          fillColor: symbol.color || "#000000",
          fillOpacity: symbol.opacity || 1,
          zIndex: symbol.zIndex || 1,
        }); //创建圆
        break;
      case "point":
      default:
        marker = new AMap.Marker({
          position: [overlay.geometry.x, overlay.geometry.y],
          zooms: overlay.zoom || overlay.zooms,
          offset: new AMap.Pixel(symbol.xoffset, symbol.yoffset),
          icon: symbol,
        });
        break;
    }
    return marker;
  }
  private makeSymbol(symbol: IPointSymbol | undefined) {
    if (!symbol) return undefined;

    let icon;
    let myIcon;
    let size = new AMap.Size(20, 20);
    let xoffset;
    let yoffset;

    switch (symbol.type) {
      case "polyline":
      case "polygon":
      case "extent":
      case "circle":
        icon = symbol;
        break;
      case "point":
      default:
        if (symbol.size) {
          size = new AMap.Size(
            symbol.size instanceof Array ? Number(symbol.size[0]):  Number(symbol.size),
            symbol.size instanceof Array ? Number(symbol.size[1]) : Number(symbol.size)
          );
        }
        if (symbol.width) {
          size = new AMap.Size(Number(symbol.width), Number(symbol.height));
        }
        xoffset = symbol.xoffset || 0 - size.getWidth() / 2;
        yoffset = symbol.yoffset || 0 - size.getHeight();
        icon = new AMap.Icon({
          image: symbol.url || "",
          size: size,
          imageSize: size
        });
        (icon as any).xoffset = xoffset;
        (icon as any).yoffset = yoffset;
        break;
    }
    return icon;
  }
  /**根据graphic的属性生成弹出框*/
  private getInfoWindowContent(graphic: any) {
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
    return content;
  }
  private getPopUpHtml(graphic: any, content: any) {
    let tipContent = content;
    for (let fieldName in graphic.attributes) {
      if (graphic.attributes.hasOwnProperty(fieldName)) {
        tipContent = tipContent.replace(
          new RegExp("{" + fieldName + "}", "g"),
          graphic.attributes[fieldName]
        );
      }
    }
    return tipContent;
  }
  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    const defaultSymbol = this.makeSymbol(params.defaultSymbol);

    const showPopup = params.showPopup;
    const defaultInfoTemplate = params.defaultInfoTemplate;
    const autoPopup = params.autoPopup;
    const defaultType = params.type;

    const showToolTip = params.showToolTip;
    const toolTipContent = params.toolTipContent || {};
    const defaultButtons = params.defaultButtons;

    const _this = this;
    let addCount = 0;
    for (let i = 0; i < params.overlays.length; i++) {
      const overlay = params.overlays[i];
      let geoType = this.getSymbolType(overlay.geometry);
      if (overlay.symbol && !overlay.symbol.type) {
        overlay.symbol.type = geoType;
      }
      const overlaySymbol = this.makeSymbol(overlay.symbol);
      const symbol = overlaySymbol || defaultSymbol;
      const fields = overlay.fields;
      const buttons = overlay.buttons || defaultButtons;
      overlay.zooms= overlay.zooms || params.defaultZooms;

      let graphic = this.getMarker(overlay, symbol);
      (graphic as any).attributes = fields;
      (graphic as any).id = overlay.id;
      (graphic as any).ptype = overlay.type || defaultType;
      (graphic as any).buttons = buttons;

      let title;
      let content = "";

      if (showPopup) {
        if (defaultInfoTemplate === undefined) {
          content = this.getInfoWindowContent(graphic);
        } else {
          title = defaultInfoTemplate.title;
          content = this.getPopUpHtml(graphic, defaultInfoTemplate.content);
        }
        if (autoPopup) {
          let infoWindow = new AMap.InfoWindow({
            anchor: "bottom-center",
            content: content,
          });
          infoWindow.open(this.view, [
            (graphic as any).getPosition().lng,
            (graphic as any).getPosition().lat,
          ],10);
        }
      }
      this.onMarkerClick(graphic, content, symbol);
      if (!this.overlayGroup) {
        this.createOverlayLayer([graphic]);
      } else {
        this.overlayGroup.addOverlay(graphic);
      }
      if (showToolTip) {
        if (geoType == "point") {
          // 创建纯文本标记
          let xoffset = 0; //toolTipOption.xoffset || 0;
          let yoffset = -6; //toolTipOption.yoffset || -6;
          (graphic as any).setLabel({
            offset: new AMap.Pixel(xoffset, yoffset), //设置文本标注偏移量
            content: this.getPopUpHtml(graphic, toolTipContent), //设置文本标注内容
            direction: "center", //设置文本标注方位
          });
        }
      }
      addCount++;
    }
    return {
      status: 0,
      message: "ok",
      result: `成功添加${params.overlays.length}中的${addCount}个覆盖物`,
    };
  }
  //创建点击事件
  onMarkerClick(mark: any, content: any, symbol: any) {
    const _this = this;
    mark.on("click", (e: any) => {
      if (content != "") {
        let infoWindow = new AMap.InfoWindow({
          anchor: "bottom-center",
          content: content,
          offset: new AMap.Pixel(0, symbol.yoffset || 0),
        }); // 创建信息窗口对象
        let center;
        if (e.target.getPosition) {
          center = e.target.getPosition();
        } else {
          center = [e.lnglat.lng, e.lnglat.lat];
        }
        mark.isOpenInfo = true;
        infoWindow.open(_this.view, center,10);
      }
      if (_this.showGisDeviceInfo) {
        _this.showGisDeviceInfo(e.target.ptype, e.target.id);
      }
    });
  }
  getSymbolType(geometry: any) {
    var type = "point";
    if (geometry.ring) {
      type = "polygon";
    }
    if (geometry.path) {
      type = "polyline";
    }
    if (geometry.xmin) {
      type = "extent";
    }
    if (geometry.radius) {
      type = "circle";
    }
    geometry.type = type;
    return type;
  }
  public async deleteOverlays(params: IOverlayDelete) : Promise<IResult>{
    let types = params.types || [];
    let ids = params.ids || [];
    let delCount=0;
    if (this.overlayGroup === undefined) {
      return {
        status: 0,
        message: "ok",
        result: ""
      };
    }
    let overlays = this.overlayGroup.getOverlays();
    for (let i = 0; i < overlays.length; i++) {
      let overlay = overlays[i];
      if (
        //只判断type
        (types.length > 0 &&
          ids.length === 0 &&
          types.indexOf(overlay.type) >= 0) ||
        //只判断id
        (types.length === 0 &&
          ids.length > 0 &&
          ids.indexOf(overlay.id) >= 0) ||
        //type和id都要判断
        (types.length > 0 &&
          ids.length > 0 &&
          types.indexOf(overlay.type) >= 0 &&
          ids.indexOf(overlay.id) >= 0)
      ) {
        if (overlay.isOpenInfo) {
          this.view.clearInfoWindow();
        }
        this.overlayGroup.removeOverlay(overlay);
        delCount++;
        i--;
      }
    }
    return {
      status: 0,
      message: "ok",
      result: `成功删除${delCount}个覆盖物`,
    };
  }
  public async deleteAllOverlays() : Promise<IResult>{
    this.view.clearInfoWindow();
    if (this.overlayGroup === undefined) {
      return {
        status: 0,
        message: "ok",
        result: ""
      };
    }
    this.overlayGroup.clearOverlays();
    return {
      status: 0,
      message: "ok",
      result: ""
    };
  }
  public async findFeature(params: IFindParameter): Promise<IResult> {
    let type = params.layerName;
    let ids = params.ids || [];
    let level = params.level || this.view.getZoom();
    if (this.overlayGroup === undefined) {
      return{
        status: 0,
        message: "ok"
      };
    }
    let centerResult = params.centerResult;
    let overlays = this.overlayGroup.getOverlays();
    overlays.forEach((overlay: any) => {
      if (type == overlay.type && ids.indexOf(overlay.id) >= 0) {
        if (centerResult) {
          if (overlay.CLASS_NAME == "AMap.Marker") {
            this.view.setZoomAndCenter(level, overlay.getPosition());
            overlay.setAnimation("AMAP_ANIMATION_BOUNCE");
            setTimeout(function() {
              overlay.setAnimation("AMAP_ANIMATION_NONE");
            }, 3500);
          } else {
            this.view.setFitView(overlay);
          }
        }
      }
    });
    return {
      status: 0,
      message: "ok",
      result: ""
    };
  }
  private getOverlayGroup(type: string): AMap.OverlayGroup {
    let group = this.overlayGroups.get(type);
    if (!group) {
      group = new AMap.OverlayGroup();
      this.view.add((group as any));
      this.overlayGroups.set(type, group);
    }
    return group;
  }
}

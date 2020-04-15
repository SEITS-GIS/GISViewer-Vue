import {
  IOverlayParameter,
  IPointSymbol,
  IPolylineSymbol,
  IResult,
  IPopUpTemplate,
  IOverlayClusterParameter
} from "@/types/map";
declare let BMap: any;
declare let BMapLib: any;

export class OverlayBaidu {
  private static overlayBD: OverlayBaidu;
  private view!: any;
  private overlayers = new Array();
  private markerClusterer: any;
  public showGisDeviceInfo: any;

  private constructor(view: any) {
    this.view = view;
  }

  public static getInstance(view: __esri.SceneView) {
    if (!OverlayBaidu.overlayBD) {
      OverlayBaidu.overlayBD = new OverlayBaidu(view);
    }

    return OverlayBaidu.overlayBD;
  }

  private async createOverlayLayer() {}
  private getMarker(type: string, overlay: any, symbol: any): any {
    let marker: any;
    let geometry = overlay.geometry;

    switch (type) {
      case "polyline":
        marker = new BMap.Polyline(this.getGeometry(geometry.paths[0]), symbol);
        break;
      case "polygon":
        marker = new BMap.Polygon(this.getGeometry(geometry.rings[0]), symbol);
        break;
      case "extent":
        break;
      case "circle":
        marker = new BMap.Circle(
          new BMap.Point(geometry.x, geometry.y),
          geometry.radius,
          { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 }
        ); //创建圆
        break;
      case "point":
      default:
        marker = new BMap.Marker(
          new BMap.Point(geometry.x, geometry.y),
          symbol
        );
        break;
    }
    return marker;
  }
  private getGeometry(points: number[][]): object[] {
    let features: object[] = [];
    for (let i = 0; i < points.length; i++) {
      let pt: number[] = points[i];
      let point = new BMap.Point(pt[0], pt[1]);
      features.push(point);
    }
    return features;
  }
  private makeSymbol(symbol: IPointSymbol | undefined): object | undefined {
    if (!symbol) return undefined;

    let marker;
    let myIcon;
    let size;
    let xoffset;
    let yoffset;

    switch (symbol.type) {
      case "polyline":
        marker = { strokeColor: symbol.color, strokeWeight: symbol.size };
        break;
      case "polygon" || "extent" || "circle":
        if (!symbol.outline) return undefined;
        marker = {
          strokeColor: symbol.outline.color,
          strokeWeight: symbol.outline.size,
          fillColor: symbol.color
        };
        break;
      case "point":
      default:
        if (symbol.size) {
          size = new BMap.Size(
            symbol.size instanceof Array ? symbol.size[0] : symbol.size,
            symbol.size instanceof Array ? symbol.size[1] : symbol.size
          );
        }
        if (symbol.width) {
          size = new BMap.Size(symbol.width, symbol.height);
        }
        xoffset = symbol.xoffset || 0;
        yoffset = symbol.yoffset || 0;

        myIcon = new BMap.Icon(symbol.url, size);
        marker = { icon: myIcon, offset: new BMap.Size(xoffset, yoffset) };
        break;
    }
    return marker;
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
    return content;
  }

  private getPopUpHtml(graphic: any, content: string): any {
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
  private _showGisDeviceInfo(type: string, id: string) {
    this.showGisDeviceInfo(type, id);
  }
  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    //if (!this.overlayLayer) {
    //await this.createOverlayLayer();
    //}
    const _this = this;
    const defaultSymbol = this.makeSymbol(params.defaultSymbol);

    const showPopup = params.showPopup;
    const defaultInfoTemplate = params.defaultInfoTemplate;
    const autoPopup = params.autoPopup;
    const showToolTip = params.showToolTip;
    const defaultType = params.type;
    const toolTipContent = params.toolTipContent;
    const defaultButtons = params.defaultButtons;

    if (showToolTip) {
      //this.MoveToolTip(toolTipContent);
    }

    let addCount = 0;
    for (let i = 0; i < params.overlays.length; i++) {
      const overlay = params.overlays[i];
      const overlaySymbol = this.makeSymbol(overlay.symbol);
      const fields = overlay.fields;
      const buttons = overlay.buttons || defaultButtons;

      //TODO: 加入更详细的参数是否合法判断
      let graphic = this.getMarker(
        (params.defaultSymbol as IPointSymbol).type || overlay.symbol.type,
        overlay,
        overlaySymbol || defaultSymbol
      );
      graphic.attributes = fields;
      graphic.buttons = buttons;
      graphic.id = overlay.id;
      graphic.type = overlay.type || defaultType;

      let mapView = this.view;
      let title: any;
      let content: string = "";

      if (showPopup) {
        if (defaultInfoTemplate === undefined) {
          content = this.getInfoWindowContent(graphic);
        } else {
          title = defaultInfoTemplate.title;
          content = this.getPopUpHtml(graphic, defaultInfoTemplate.content);
        }
        if (autoPopup) {
          let infoWindow = new BMap.InfoWindow(content, {
            //width : 270,     // 信息窗口宽度
            //height: 50,     // 信息窗口高度
            title: title, // 信息窗口标题
            enableMessage: true, //设置允许信息窗发送短息
            message: ""
          });
          this.view.openInfoWindow(infoWindow, graphic.point);
        }
        graphic.addEventListener("click", function(e: any) {
          let infoWindow = new BMap.InfoWindow(content, {
            width: 0, // 信息窗口宽度
            height: 0, // 信息窗口高度
            title: title, // 信息窗口标题
            enableMessage: true, //设置允许信息窗发送短息
            message: ""
          }); // 创建信息窗口对象
          mapView.openInfoWindow(infoWindow, e.point);
          _this._showGisDeviceInfo(e.target.type, e.target.id);
        });
      }
      this.overlayers.push(graphic);
      this.view.addOverlay(graphic);
      addCount++;
    }
    return {
      status: 0,
      message: "ok",
      result: `成功添加${params.overlays.length}中的${addCount}个覆盖物`
    };
  }
  public async addOverlaysCluster(
    params: IOverlayClusterParameter
  ): Promise<IResult> {
    const _this = this;

    const defaultType = params.type;
    const zoom = params.zoom;
    const distance = params.distance;
    const defaultSymbol = this.makeSymbol(params.defaultSymbol);
    const defaultVisible = params.defaultVisible;
    const defaultTooltip = params.defaultTooltip;

    const points = params.points;
    let mapView = this.view;

    let markers = new Array();

    for (let i = 0; i < points.length; i++) {
      const overlay = points[i];
      const overlaySymbol = this.makeSymbol(overlay.symbol);
      const fields = overlay.fields;
      let graphic = this.getMarker(
        "point",
        overlay,
        overlaySymbol || defaultSymbol
      );

      graphic.attributes = fields;
      graphic.id = overlay.id;
      graphic.type = overlay.type || defaultType;
      let content = this.getPopUpHtml(graphic, defaultTooltip);

      graphic.addEventListener("click", function(e: any) {
        let infoWindow = new BMap.InfoWindow(content, {
          width: 0, // 信息窗口宽度
          height: 0, // 信息窗口高度
          title: "", // 信息窗口标题
          enableMessage: true, //设置允许信息窗发送短息
          message: ""
        }); // 创建信息窗口对象
        mapView.openInfoWindow(infoWindow, e.point);
        _this._showGisDeviceInfo(e.target.type, e.target.id);
      });

      markers.push(graphic);
    }

    this.markerClusterer = new BMapLib.MarkerClusterer(this.view, {
      markers: markers,
      styles: [{ url: "assets/image/m0.png", size: new BMap.Size(53, 53) }],
      maxZoom: zoom,
      gridSize: distance
    });
    return {
      status: 0,
      message: "ok"
    };
  }
  public async deleteAllOverlays() {
    if (this.overlayers.length > 0) {
      for (let i = 0; i < this.overlayers.length; i++) {
        this.view.removeOverlay(this.overlayers[i]);
      }
      this.overlayers = [];
    }
  }
  public async deleteAllOverlaysCluster() {
    this.markerClusterer.clearMarkers();
  }
}

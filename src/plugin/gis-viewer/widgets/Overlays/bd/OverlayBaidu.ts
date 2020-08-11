import {
  IOverlayParameter,
  IPointSymbol,
  IPolylineSymbol,
  IResult,
  IPopUpTemplate,
  IOverlayClusterParameter,
  IOverlayDelete,
  IFindParameter
} from '@/types/map';
declare let BMap: any;
declare let BMapLib: any;

export class OverlayBaidu {
  private static overlayBD: OverlayBaidu;
  private view!: any;
  private overlayers = new Array();
  private markerClustererLayer = new Array();
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
  private getMarker(overlay: any, symbol: any): any {
    let marker: any;
    let geometry = overlay.geometry;
    let type: any;
    if (symbol) {
      type = symbol.type;
    }
    switch (type) {
      case 'polyline':
        marker = new BMap.Polyline(this.getGeometry(geometry.paths[0]), symbol);
        break;
      case 'polygon':
        marker = new BMap.Polygon(this.getGeometry(geometry.rings[0]), symbol);
        break;
      case 'extent':
        break;
      case 'circle':
        marker = new BMap.Circle(
          new BMap.Point(geometry.x, geometry.y),
          geometry.radius,
          {strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5}
        ); //创建圆
        break;
      case 'point':
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
      case 'polyline':
        marker = {strokeColor: symbol.color, strokeWeight: symbol.size};
        break;
      case 'polygon' || 'extent' || 'circle':
        if (!symbol.outline) return undefined;
        marker = {
          strokeColor: symbol.outline.color,
          strokeWeight: symbol.outline.size,
          fillColor: symbol.color
        };
        break;
      case 'point':
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

        myIcon = new BMap.Icon(symbol.url, size, {
          imageSize: size
        });
        marker = {icon: myIcon, offset: new BMap.Size(xoffset, yoffset)};
        break;
    }
    return marker;
  }
  /**根据graphic的属性生成弹出框*/
  private getInfoWindowContent(graphic: any): any {
    let content = '';
    //键值对
    for (let fieldName in graphic.attributes) {
      if (graphic.attributes.hasOwnProperty(fieldName)) {
        content +=
          '<b>' + fieldName + ': </b>' + graphic.attributes[fieldName] + '<br>';
      }
    }
    //去掉最后的<br>
    content = content.substring(0, content.lastIndexOf('<br>'));
    if (graphic.buttons !== undefined) {
      content += '<hr>';
      graphic.buttons.forEach((buttonConfig: {type: string; label: string}) => {
        content +=
          "<button type='button' class='btn btn-primary btn-sm' onclick='mapFeatureClicked(" +
          '"' +
          buttonConfig.type +
          '", "' +
          graphic.id +
          '"' +
          ")'>" +
          buttonConfig.label +
          '</button>  ';
      });
    }
    return content;
  }

  private getPopUpHtml(graphic: any, content: string): any {
    let tipContent = content;
    for (let fieldName in graphic.attributes) {
      if (graphic.attributes.hasOwnProperty(fieldName)) {
        tipContent = tipContent.replace(
          new RegExp('{' + fieldName + '}', 'g'),
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

      let graphic = this.getMarker(overlay, overlaySymbol || defaultSymbol);
      graphic.attributes = fields;
      graphic.buttons = buttons;
      graphic.id = overlay.id;
      graphic.type = overlay.type || defaultType;

      let mapView = this.view;
      let title: any;
      let content: string = '';

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
            message: ''
          });
          graphic.isOpenInfo = true;
          this.view.openInfoWindow(infoWindow, graphic.point);
        }
        graphic.addEventListener('click', function(e: any) {
          let infoWindow = new BMap.InfoWindow(content, {
            width: 0, // 信息窗口宽度
            height: 0, // 信息窗口高度
            title: title, // 信息窗口标题
            enableMessage: true, //设置允许信息窗发送短息
            message: ''
          }); // 创建信息窗口对象
          e.target.isOpenInfo = true;
          mapView.openInfoWindow(infoWindow, e.point);
          _this._showGisDeviceInfo(e.target.type, e.target.id);
        });
      }
      this.overlayers.push(graphic);
      this.view.addOverlay(graphic);
      addCount++;

      if (params.overlays.length == 1) {
        this.view.panTo(graphic.getPosition());
      }
    }
    return {
      status: 0,
      message: 'ok',
      result: `成功添加${params.overlays.length}中的${addCount}个覆盖物`
    };
  }
  public async findFeature(params: IFindParameter) {
    let type = params.layerName;
    let ids = params.ids || [];
    let level = params.level || this.view.getZoom();
    let overlays = this.overlayers;
    let centerResult = params.centerResult;
    overlays.forEach((overlay) => {
      if (type == overlay.type && ids.indexOf(overlay.id) >= 0) {
        if (centerResult) {
          let center = overlay.getPosition();
          if (center.lat !== null && center.lng !== null) {
            this.view.centerAndZoom(overlay.getPosition(), level);
          }
        }
        overlay.setAnimation(2);
        setTimeout(function() {
          overlay.setAnimation(0);
        }, 3600);
      }
    });
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

    const clusterSymbol = params.clusterSymbol;
    const clusterImage = clusterSymbol
      ? clusterSymbol.url
      : 'assets/image/m0.png';
    const clusterSize =
      clusterSymbol && clusterSymbol.width
        ? new BMap.Size(clusterSymbol.width, clusterSymbol.height)
        : new BMap.Size(53, 53);

    const points = params.points;
    let mapView = this.view;

    let markers = new Array();

    for (let i = 0; i < points.length; i++) {
      const overlay = points[i];
      const overlaySymbol = this.makeSymbol(overlay.symbol);
      const fields = overlay.fields;
      let graphic = this.getMarker(overlay, overlaySymbol || defaultSymbol);

      graphic.attributes = fields;
      graphic.id = overlay.id;
      graphic.type = overlay.type || defaultType;
      let content = this.getPopUpHtml(graphic, defaultTooltip);

      graphic.addEventListener('click', function(e: any) {
        let infoWindow = new BMap.InfoWindow(content, {
          width: 0, // 信息窗口宽度
          height: 0, // 信息窗口高度
          title: '', // 信息窗口标题
          enableMessage: true, //设置允许信息窗发送短息
          message: ''
        }); // 创建信息窗口对象
        mapView.openInfoWindow(infoWindow, e.point);
        _this._showGisDeviceInfo(e.target.type, e.target.id);
      });

      markers.push(graphic);
    }

    let markerClusterer = new BMapLib.MarkerClusterer(this.view, {
      markers: markers,
      styles: [{url: clusterImage, size: clusterSize}],
      maxZoom: zoom,
      gridSize: distance
    });
    markerClusterer.type = defaultType;
    this.markerClustererLayer.push(markerClusterer);
    return {
      status: 0,
      message: 'ok'
    };
  }
  public async deleteAllOverlays() {
    if (this.overlayers.length > 0) {
      for (let i = 0; i < this.overlayers.length; i++) {
        this.view.removeOverlay(this.overlayers[i]);
      }
      this.overlayers = [];
    }
    this.view.closeInfoWindow();
  }
  public async deleteOverlays(params: IOverlayDelete) {
    let types = params.types || [];
    let ids = params.ids || [];
    this.overlayers = this.overlayers.filter((graphic) => {
      if (
        //只判断type
        (types.length > 0 &&
          ids.length === 0 &&
          types.indexOf(graphic.type) >= 0) ||
        //只判断id
        (types.length === 0 &&
          ids.length > 0 &&
          ids.indexOf(graphic.id) >= 0) ||
        //type和id都要判断
        (types.length > 0 &&
          ids.length > 0 &&
          types.indexOf(graphic.type) >= 0 &&
          ids.indexOf(graphic.id) >= 0)
      ) {
        this.view.removeOverlay(graphic);
        if (graphic.isOpenInfo === true) {
          this.view.closeInfoWindow();
        }
        return false;
      }
      return true;
    });
  }
  public async deleteOverlaysCluster(params: IOverlayDelete) {
    let types = params.types || [];
    if (this.markerClustererLayer && this.markerClustererLayer.length > 0) {
      this.markerClustererLayer.forEach((layer) => {
        if (types.indexOf(layer.type) >= 0) {
          layer.clearMarkers();
        }
      });
    }
    this.view.closeInfoWindow();
  }
  public async deleteAllOverlaysCluster() {
    if (this.markerClustererLayer && this.markerClustererLayer.length > 0) {
      this.markerClustererLayer.forEach((layer) => {
        layer.clearMarkers();
      });
    }
    this.view.closeInfoWindow();
  }
}

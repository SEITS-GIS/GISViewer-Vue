import {
  IOverlayParameter,
  IResult,
  IPopUpTemplate,
  IOverlayClusterParameter,
  IOverlayDelete,
  IPointSymbol,
  IPolylineSymbol,
  IPolygonSymbol,
  IFindParameter
} from '@/types/map';
import '@amap/amap-jsapi-types';

export class OverlayGaode {
  private static instance: OverlayGaode;
  private view!: AMap.Map;
  private overlayers = new Array();
  private overlayGroup: any;
  private markerClustererLayer = new Array();
  public showGisDeviceInfo: any;

  private overlayGroups: Map<string, AMap.OverlayGroup> = new Map();

  private constructor(view: any) {
    this.view = view;
  }

  public static getInstance(view: AMap.Map) {
    if (!OverlayGaode.instance) {
      OverlayGaode.instance = new OverlayGaode(view);
    }
    return OverlayGaode.instance;
  }
  // private createOverlayLayer(markers: any) {
  //   this.overlayGroup = new AMap.OverlayGroup(markers);
  //   this.overlayGroup.label = "Overlays";
  //   this.view.add(this.overlayGroup);
  // }
  // private getMarker(overlay: any, symbol: any) {
  //   let marker;
  //   let type;
  //   if (symbol) {
  //     type = symbol.type;
  //   }
  //   if (!symbol.outline) {
  //     symbol.outline = {};
  //   }
  //   switch (type) {
  //     case "polyline":
  //       marker = new AMap.Polyline({
  //         path: overlay.geometry.path,
  //         isOutline: symbol.isoutline || false,
  //         outlineColor: symbol.outlineColor || "#ffffff",
  //         borderWeight: symbol.borderWeight || 1,
  //         strokeColor: symbol.color || "#000000",
  //         strokeOpacity: symbol.opacity || 1,
  //         strokeWeight: symbol.width || 3,
  //         // 折线样式还支持 'dashed'
  //         strokeStyle: symbol.style || "solid",
  //         // strokeStyle是dashed时有效
  //         strokeDasharray: symbol.dashArray || [10, 5],
  //         lineJoin: symbol.lineJoin || "round",
  //         lineCap: symbol.lineCap || "round",
  //         zIndex: symbol.zIndex || 1,
  //       });
  //       break;
  //     case "polygon":
  //       marker = new AMap.Polygon({
  //         path: overlay.geometry.ring || overlay.geometry.path,
  //         strokeColor: symbol.outline.color || "#000000",
  //         strokeOpacity: symbol.outline.opacity || 1,
  //         strokeWeight: symbol.outline.width || 1,
  //         // 线样式还支持 'dashed'
  //         strokeStyle: symbol.outline.style || "solid",
  //         // strokeStyle是dashed时有效
  //         strokeDasharray: symbol.outline.dashArray || [10, 5],
  //         fillColor: symbol.color || "#000000",
  //         fillOpacity: symbol.opacity || 1,
  //         zIndex: symbol.zIndex || 1,
  //       });
  //       break;
  //     case "extent":
  //       if (symbol.outline) {
  //         symbol.outline = {};
  //       }
  //       marker = new AMap.Rectangle({
  //         bounds: new AMap.Bounds(
  //           new AMap.LngLat(overlay.geometry.xmin, overlay.geometry.ymin),
  //           new AMap.LngLat(overlay.geometry.xmax, overlay.geometry.ymax)
  //         ),
  //         strokeColor: symbol.outline.color || "#000000",
  //         strokeOpacity: symbol.outline.opacity || 1,
  //         strokeWeight: symbol.outline.width || 1,
  //         // 线样式还支持 'dashed'
  //         strokeStyle: symbol.outline.style || "solid",
  //         // strokeStyle是dashed时有效
  //         strokeDasharray: symbol.outline.dashArray || [10, 5],
  //         fillColor: symbol.color || "#000000",
  //         fillOpacity: symbol.opacity || 1,
  //         zIndex: symbol.zIndex || 1,
  //         cursor: "pointer",
  //       });
  //       break;
  //     case "circle":
  //       marker = new AMap.Circle({
  //         center: overlay.geometry.center,
  //         radius: overlay.geometry.radius || 10, //半径
  //         //borderWeight: Number(symbol.borderWeight) || 1,
  //         strokeColor: symbol.outline.color || "#000000",
  //         strokeOpacity: symbol.outline.opacity || 1,
  //         strokeWeight: symbol.outline.width || 1,
  //         // 线样式还支持 'dashed'
  //         strokeStyle: symbol.outline.style || "solid",
  //         // strokeStyle是dashed时有效
  //         strokeDasharray: symbol.outline.dashArray || [10, 5],
  //         fillColor: symbol.color || "#000000",
  //         fillOpacity: symbol.opacity || 1,
  //         zIndex: symbol.zIndex || 1,
  //       }); //创建圆
  //       break;
  //     case "point":
  //     default:
  //       marker = new AMap.Marker({
  //         position: [overlay.geometry.x, overlay.geometry.y],
  //         zooms: overlay.zoom || overlay.zooms,
  //         offset: new AMap.Pixel(symbol.xoffset, symbol.yoffset),
  //         icon: symbol,
  //       });
  //       break;
  //   }
  //   return marker;
  // }
  // private makeSymbol(symbol: IPointSymbol | undefined) {
  //   if (!symbol) return undefined;

  //   let icon;
  //   let myIcon;
  //   let size = new AMap.Size(20, 20);
  //   let xoffset;
  //   let yoffset;

  //   switch (symbol.type) {
  //     case "polyline":
  //     case "polygon":
  //     case "extent":
  //     case "circle":
  //       icon = symbol;
  //       break;
  //     case "point":
  //     default:
  //       if (symbol.size) {
  //         size = new AMap.Size(
  //           symbol.size instanceof Array ? Number(symbol.size[0]):  Number(symbol.size),
  //           symbol.size instanceof Array ? Number(symbol.size[1]) : Number(symbol.size)
  //         );
  //       }
  //       if (symbol.width) {
  //         size = new AMap.Size(Number(symbol.width), Number(symbol.height));
  //       }
  //       xoffset = symbol.xoffset || 0 - size.getWidth() / 2;
  //       yoffset = symbol.yoffset || 0 - size.getHeight();
  //       icon = new AMap.Icon({
  //         image: symbol.url || "",
  //         size: size,
  //         imageSize: size
  //       });
  //       (icon as any).xoffset = xoffset;
  //       (icon as any).yoffset = yoffset;
  //       break;
  //   }
  //   return icon;
  // }
  /**根据graphic的属性生成弹出框*/
  private getInfoWindowContent(graphic: any) {
    let content = '';
    //键值对
    for (let fieldName in graphic.fields) {
      if (graphic.fields.hasOwnProperty(fieldName)) {
        content +=
          '<b>' + fieldName + ': </b>' + graphic.fields[fieldName] + '<br>';
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

  private getPopUpHtml(graphic: any, content: any) {
    let tipContent = content;
    for (let fieldName in graphic.fields) {
      if (graphic.fields.hasOwnProperty(fieldName)) {
        tipContent = tipContent.replace(
          new RegExp('{' + fieldName + '}', 'g'),
          graphic.fields[fieldName]
        );
      }
    }
    return tipContent;
  }

  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    console.log(params);
    const group: AMap.OverlayGroup = this.getOverlayGroup(
      params.type || 'default'
    );

    const defaultSymbol = this.makeSymbol(params.defaultSymbol);

    const showPopup = params.showPopup;
    const defaultInfoTemplate = params.defaultInfoTemplate;
    const autoPopup = params.autoPopup;

    let addCount = 0;

    params.overlays.forEach((feature) => {
      const {geometry, fields, id} = feature;
      fields.id = id;
      fields.type = params.type;
      let content;
      let title;
      if (showPopup) {
        if (defaultInfoTemplate === undefined) {
          content = this.getInfoWindowContent(feature);
        } else {
          title = defaultInfoTemplate.title;
          content = this.getPopUpHtml(feature, defaultInfoTemplate.content);
        }
        if (autoPopup) {
          let infoWindow = new AMap.InfoWindow({
            anchor: 'bottom-center',
            content: content
          });
          infoWindow.open(
            this.view,
            [
              (feature as any).getPosition().lng,
              (feature as any).getPosition().lat
            ],
            10
          );
        }
      }

      let overlay;
      //点
      if ('x' in geometry && 'y' in geometry) {
        const symbol = this.makeSymbol(feature.symbol) || defaultSymbol;
        if (symbol) {
          let xoffset = feature.symbol
            ? (feature.symbol as IPointSymbol).xoffset || 0
            : (params.defaultSymbol as IPointSymbol).xoffset || 0;
          let yoffset = feature.symbol
            ? (feature.symbol as IPointSymbol).yoffset || 0
            : (params.defaultSymbol as IPointSymbol).yoffset || 0;
          overlay = new AMap.Marker({
            position: [geometry.x, geometry.y],
            extData: {
              clickfunc: this.showGisDeviceInfo,
              attributes: fields,
              infoTemplate: content
            },
            icon: (symbol || defaultSymbol) as AMap.Icon,
            zooms: feature.zooms || params.defaultZooms,
            offset: new AMap.Pixel(xoffset as number, yoffset as number),
            anchor: feature.symbol
              ? (feature.symbol as IPointSymbol).anchor || 'center'
              : (params.defaultSymbol as IPointSymbol).anchor || 'center'
          });
        } else {
          overlay = new AMap.Marker({
            position: [geometry.x, geometry.y],
            extData: {
              clickfunc: this.showGisDeviceInfo,
              attributes: fields,
              infoTemplate: content
            }
          });
        }
        overlay.on('click', this.onOverlayClick);

        group.addOverlay(overlay);
      }
      //线
      else if ('path' in geometry) {
      }
      //面
      else if ('ring' in geometry) {
      }
    });

    // let graphic = this.getMarker(overlay, symbol);
    // (graphic as any).attributes = fields;
    // (graphic as any).id = overlay.id;
    // (graphic as any).ptype = overlay.type || defaultType;
    // (graphic as any).buttons = buttons;

    // let title;
    // let content = "";

    // if (showPopup) {
    //   if (defaultInfoTemplate === undefined) {
    //     content = this.getInfoWindowContent(graphic);
    //   } else {
    //     title = defaultInfoTemplate.title;
    //     content = this.getPopUpHtml(graphic, defaultInfoTemplate.content);
    //   }
    //   if (autoPopup) {
    //     let infoWindow = new AMap.InfoWindow({
    //       anchor: "bottom-center",
    //       content: content,
    //     });
    //     infoWindow.open(this.view, [
    //       (graphic as any).getPosition().lng,
    //       (graphic as any).getPosition().lat,
    //     ],10);
    //   }
    // }
    // this.onMarkerClick(graphic, content, symbol);
    // if (!this.overlayGroup) {
    //   this.createOverlayLayer([graphic]);
    // } else {
    //   this.overlayGroup.addOverlay(graphic);
    // }
    // if (showToolTip) {
    //   if (geoType == "point") {
    //     // 创建纯文本标记
    //     let xoffset = 0; //toolTipOption.xoffset || 0;
    //     let yoffset = -6; //toolTipOption.yoffset || -6;
    //     (graphic as any).setLabel({
    //       offset: new AMap.Pixel(xoffset, yoffset), //设置文本标注偏移量
    //       content: this.getPopUpHtml(graphic, toolTipContent), //设置文本标注内容
    //       direction: "center", //设置文本标注方位
    //     });
    //   }
    // }
    // addCount++;
    // }
    return {
      status: 0,
      message: 'ok',
      result: `成功添加${params.overlays.length}中的${addCount}个覆盖物`
    };
  }

  private onOverlayClick(event: any) {
    let mark = event.target;
    let fields = event.target.getExtData().attributes;
    let content = event.target.getExtData().infoTemplate || '';
    let yoffset = 0 - mark.getIcon().getImageSize().height / 2;
    if (content != '') {
      let infoWindow = new AMap.InfoWindow({
        anchor: 'bottom-center',
        content: content,
        offset: new AMap.Pixel(0, yoffset)
      }); // 创建信息窗口对象
      let center;
      if (event.target.getPosition) {
        center = event.target.getPosition();
      } else {
        center = [event.lnglat.lng, event.lnglat.lat];
      }
      mark.isOpenInfo = true;
      infoWindow.open(mark.getMap(), center, 10);
    }
    if (event.target.getExtData().clickfunc) {
      event.target.getExtData().clickfunc(fields.type, fields.id, fields);
    }
  }

  //创建点击事件
  private onMarkerClick(mark: any, content: any, symbol: any) {
    const _this = this;
    mark.on('click', (e: any) => {
      if (content != '') {
        let infoWindow = new AMap.InfoWindow({
          anchor: 'bottom-center',
          content: content,
          offset: new AMap.Pixel(0, symbol.yoffset || 0)
        }); // 创建信息窗口对象
        let center;
        if (e.target.getPosition) {
          center = e.target.getPosition();
        } else {
          center = [e.lnglat.lng, e.lnglat.lat];
        }
        mark.isOpenInfo = true;
        infoWindow.open(_this.view, center, 10);
      }
      if (_this.showGisDeviceInfo) {
        _this.showGisDeviceInfo(e.target.ptype, e.target.id);
      }
    });
  }
  getSymbolType(geometry: any) {
    var type = 'point';
    if (geometry.ring) {
      type = 'polygon';
    }
    if (geometry.path) {
      type = 'polyline';
    }
    if (geometry.xmin) {
      type = 'extent';
    }
    if (geometry.radius) {
      type = 'circle';
    }
    geometry.type = type;
    return type;
  }

  public async deleteOverlays(params: IOverlayDelete): Promise<IResult> {
    let types = params.types || [];
    let ids = params.ids || [];
    let delCount = 0;
    let overlays = new Array();
    this.overlayGroups.forEach((overlay, key) => {
      if (types.length == 0 || (types.length > 0 && types.indexOf(key) > -1)) {
        overlays = overlays.concat(overlay.getOverlays());
      }
    });
    for (let i = 0; i < overlays.length; i++) {
      let overlay = overlays[i];
      if (
        //只判断type
        (types.length > 0 &&
          ids.length === 0 &&
          types.indexOf(overlay.getExtData().attributes.type) >= 0) ||
        //只判断id
        (types.length === 0 &&
          ids.length > 0 &&
          ids.indexOf(overlay.getExtData().attributes.id) >= 0) ||
        //type和id都要判断
        (types.length > 0 &&
          ids.length > 0 &&
          types.indexOf(overlay.getExtData().attributes.type) >= 0 &&
          ids.indexOf(overlay.getExtData().attributes.id) >= 0)
      ) {
        if (overlay.isOpenInfo) {
          this.view.clearInfoWindow();
        }
        this.view.remove(overlay);
        delCount++;
      }
    }
    return {
      status: 0,
      message: 'ok',
      result: `成功删除${delCount}个覆盖物`
    };
  }

  public async deleteAllOverlays(): Promise<IResult> {
    this.view.clearInfoWindow();
    this.overlayGroups.forEach((overlay, key) => {
      overlay.clearOverlays();
    });
    return {
      status: 0,
      message: 'ok',
      result: ''
    };
  }

  public async findFeature(params: IFindParameter): Promise<IResult> {
    let type = params.layerName;
    let ids = params.ids || [];
    let level = params.level || this.view.getZoom();

    let centerResult = params.centerResult;
    let overlays = this.getOverlayGroup(type).getOverlays();
    overlays.forEach((overlay: any) => {
      if (ids.indexOf(overlay.getExtData().attributes.id) >= 0) {
        if (centerResult) {
          if (overlay.CLASS_NAME == 'AMap.Marker') {
            this.view.setZoomAndCenter(level, overlay.getPosition());
            overlay.setAnimation('AMAP_ANIMATION_BOUNCE');
            setTimeout(function() {
              overlay.setAnimation('AMAP_ANIMATION_NONE');
            }, 3500);
          } else {
            this.view.setFitView(overlay);
          }
        }
      }
    });
    return {
      status: 0,
      message: 'ok',
      result: ''
    };
  }
  private getOverlayGroup(type: string): AMap.OverlayGroup {
    let group = this.overlayGroups.get(type);
    if (!group) {
      group = new AMap.OverlayGroup();
      this.view.add(group as any);
      this.overlayGroups.set(type, group);
    }
    return group;
  }

  private makeSymbol(
    symbol: IPointSymbol | IPolylineSymbol | IPolygonSymbol | undefined
  ): AMap.Icon | {} | undefined {
    if (!symbol) return undefined;

    switch (symbol.type) {
      case 'point-2d':
      case 'point':
        const pointSymbol = symbol as IPointSymbol;
        if (!pointSymbol.url) {
          return undefined;
        }

        let size: any;
        if (pointSymbol.size instanceof Array) {
          size = [
            this.makePixelSize(pointSymbol.size[0]),
            this.makePixelSize(pointSymbol.size[1])
          ];
        } else if (pointSymbol.size) {
          size = [
            this.makePixelSize(pointSymbol.size),
            this.makePixelSize(pointSymbol.size)
          ];
        }
        return new AMap.Icon({
          image: pointSymbol.url,
          size: new AMap.Size(size[0], size[1]),
          imageSize: new AMap.Size(size[0], size[1])
        });
        break;

      default:
        return undefined;
    }
  }

  /** 将pixel/point为单位的统一转为pixel */
  private makePixelSize(size: string | number): number {
    if (typeof size === 'number') {
      return size;
    } else {
      const value = size.slice(0, size.length - 2);
      const unit = size.slice(size.length - 2);
      if (unit === 'px') {
        return Number(value);
      } else if (unit === 'pt') {
        return Number(value) * 0.75;
      } else {
        return Number(size);
      }
    }
  }
}

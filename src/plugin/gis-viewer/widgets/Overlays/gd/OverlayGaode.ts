import {
  IOverlayParameter,
  IResult,
  IPopUpTemplate,
  IOverlayClusterParameter,
  IOverlayDelete,
  IPointSymbol,
  IPolylineSymbol,
  IPolygonSymbol,
  IFindParameter,
  IPolylineGeometry,
  IPolygonGeometry
} from '@/types/map';
import '@amap/amap-jsapi-types';

export class OverlayGaode {
  private static instance: OverlayGaode;
  private view!: AMap.Map;
  private overlayers = new Array();
  private overlayGroup: any;
  private markerClustererLayer = new Array();
  public showGisDeviceInfo: any;
  public mouseGisDeviceInfo: any;

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
  public static destroy() {
    (OverlayGaode.instance as any) = null;
  }
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
      let symbol;
      //点
      if ('x' in geometry && 'y' in geometry) {
        symbol = this.makeSymbol(feature.symbol) || defaultSymbol;
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
              mousefunc: this.mouseGisDeviceInfo,
              attributes: fields,
              infoTemplate: content,
              type: 'point'
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
              mousefunc: this.mouseGisDeviceInfo,
              attributes: fields,
              infoTemplate: content
            }
          });
        }
      }
      //线
      else if ('paths' in geometry || 'path' in geometry) {
        let path =
          (feature.geometry as IPolylineGeometry).path ||
          (feature.geometry as any).paths[0];
        symbol =
          (feature.symbol as IPolylineSymbol) ||
          (defaultSymbol as IPolylineSymbol);
        overlay = new AMap.Polyline({
          path: path as any,
          extData: {
            clickfunc: this.showGisDeviceInfo,
            mousefunc: this.mouseGisDeviceInfo,
            attributes: fields,
            infoTemplate: content,
            type: 'polyline'
          },
          isOutline: symbol.isoutline || false,
          outlineColor: symbol.outlineColor || '#ffffff',
          borderWeight: symbol.borderWeight || 1,
          strokeColor: symbol.color || '#000000',
          strokeOpacity: symbol.opacity || 1,
          strokeWeight: symbol.width || 3,
          // 折线样式还支持 'dashed'
          strokeStyle: symbol.style || 'solid',
          // strokeStyle是dashed时有效
          strokeDasharray: symbol.dashArray || [10, 5],
          lineJoin: symbol.lineJoin || 'round',
          lineCap: symbol.lineCap || 'round',
          zIndex: symbol.zIndex || 1
        });
      }
      //面
      else if ('rings' in geometry || 'ring' in geometry) {
        let ring =
          (feature.geometry as IPolygonGeometry).ring ||
          (feature.geometry as any).rings;
        symbol =
          (feature.symbol as IPolygonSymbol) ||
          (defaultSymbol as IPolygonSymbol);
        overlay = new AMap.Polygon({
          path: ring as any,
          extData: {
            clickfunc: this.showGisDeviceInfo,
            mousefunc: this.mouseGisDeviceInfo,
            attributes: fields,
            infoTemplate: content,
            type: 'polygon'
          },
          strokeColor: (symbol.outline && symbol.outline.color) || '#000000',
          strokeOpacity: (symbol.outline && symbol.outline.opacity) || 1,
          strokeWeight: (symbol.outline && symbol.outline.width) || 1,
          // 线样式还支持 'dashed'
          strokeStyle: (symbol.outline && symbol.outline.style) || 'solid',
          // strokeStyle是dashed时有效
          strokeDasharray: (symbol.outline && symbol.outline.dashArray) || [
            10,
            5
          ],
          fillColor: symbol.color || '#000000',
          fillOpacity: symbol.opacity || 1,
          zIndex: symbol.zIndex || 1
        });
      } else if (
        'xmin' in geometry &&
        'ymin' in geometry &&
        'xmax' in geometry &&
        'ymax' in geometry
      ) {
        let geo = feature.geometry as any;
        symbol =
          (feature.symbol as IPolygonSymbol) ||
          (defaultSymbol as IPolygonSymbol);
        overlay = new AMap.Rectangle({
          bounds: new AMap.Bounds(
            new AMap.LngLat(geo.xmin, geo.ymin),
            new AMap.LngLat(geo.xmax, geo.ymax)
          ),
          extData: {
            clickfunc: this.showGisDeviceInfo,
            mousefunc: this.mouseGisDeviceInfo,
            attributes: fields,
            infoTemplate: content,
            type: 'extent'
          },
          strokeColor: (symbol.outline && symbol.outline.color) || '#000000',
          strokeOpacity: (symbol.outline && symbol.outline.opacity) || 1,
          strokeWeight: (symbol.outline && symbol.outline.width) || 1,
          // 线样式还支持 'dashed'
          strokeStyle: (symbol.outline && symbol.outline.style) || 'solid',
          // strokeStyle是dashed时有效
          strokeDasharray: (symbol.outline && symbol.outline.dashArray) || [
            10,
            5
          ],
          fillColor: symbol.color || '#000000',
          fillOpacity: symbol.opacity || 1,
          zIndex: symbol.zIndex || 1
        });
      } else if ('center' in geometry && 'radius' in geometry) {
        symbol =
          (feature.symbol as IPolygonSymbol) ||
          (defaultSymbol as IPolygonSymbol);
        overlay = new AMap.Circle({
          center: (feature.geometry as any).center,
          radius: (feature.geometry as any).radius || 10, //半径
          extData: {
            clickfunc: this.showGisDeviceInfo,
            mousefunc: this.mouseGisDeviceInfo,
            attributes: fields,
            infoTemplate: content,
            type: 'circle'
          },
          strokeColor: (symbol.outline && symbol.outline.color) || '#000000',
          strokeOpacity: (symbol.outline && symbol.outline.opacity) || 1,
          strokeWeight: (symbol.outline && symbol.outline.width) || 1,
          // 线样式还支持 'dashed'
          strokeStyle: (symbol.outline && symbol.outline.style) || 'solid',
          // strokeStyle是dashed时有效
          strokeDasharray: (symbol.outline && symbol.outline.dashArray) || [
            10,
            5
          ],
          fillColor: symbol.color || '#000000',
          fillOpacity: symbol.opacity || 1,
          zIndex: symbol.zIndex || 1
        });
      }
      if (overlay) {
        group.addOverlay(overlay);
        overlay.on('click', this.onOverlayClick);
        overlay.on('mouseover', this.onOverlayMouse);
        overlay.on('mouseout', this.onOverlayMouse);
      }
    });
    return {
      status: 0,
      message: 'ok',
      result: `成功添加${params.overlays.length}中的${addCount}个覆盖物`
    };
  }
  private onOverlayMouse(event: any) {
    let mark = event.target;
    let fields = event.target.getExtData().attributes;
    if (event.target.getExtData().mousefunc) {
      event.target
        .getExtData()
        .mousefunc(event, fields.type, fields.id, fields);
    }
  }
  private onOverlayClick(event: any) {
    let mark = event.target;
    let fields = event.target.getExtData().attributes;
    let content = event.target.getExtData().infoTemplate || '';
    let geotype = event.target.getExtData().type || 'point';
    let yoffset = 0;
    if (geotype === 'point') {
      let size = mark.getIcon().getImageSize();
      if ('height' in size) {
        yoffset = 0 - size.height / 2;
      } else {
        yoffset = 0 - size[1] / 2;
      }
    }
    if (content != '') {
      let infoWindow = new AMap.InfoWindow({
        anchor: 'bottom-center',
        content: content,
        offset: new AMap.Pixel(0, yoffset)
      }); // 创建信息窗口对象
      let center;
      if (geotype === 'point') {
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

        if (pointSymbol.width && pointSymbol.height) {
          size = [
            this.makePixelSize(pointSymbol.width),
            this.makePixelSize(pointSymbol.height)
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

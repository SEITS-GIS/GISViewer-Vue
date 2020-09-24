import {
  IOverlayParameter,
  IPointSymbol,
  IResult,
  IOverlayDelete,
  IFindParameter,
  IPolylineSymbol,
  IPolygonSymbol
} from '@/types/map';
import {loadModules} from 'esri-loader';
import ToolTip from './ToolTip';
import HighFeauture from './HighFeauture3D';
import HighFeauture2D from './HighFeauture2D';
import {type} from 'jquery';
import {Utils} from '@/plugin/gis-viewer/Utils';

export class OverlayArcgis2D {
  private static intances: Map<string, any>;

  private overlayGroups: Map<string, __esri.GraphicsLayer> = new Map<
    string,
    __esri.GraphicsLayer
  >();
  private view!: __esri.MapView;

  private primitive2D = [
    'circle',
    'cross',
    'diamond',
    'square',
    'triangle',
    'x'
  ];

  private constructor(view: __esri.MapView) {
    this.view = view;
  }

  public static getInstance(view: __esri.MapView) {
    let id = view.container.id;
    if (!OverlayArcgis2D.intances) {
      OverlayArcgis2D.intances = new Map();
    }
    let intance = OverlayArcgis2D.intances.get(id);
    if (!intance) {
      intance = new OverlayArcgis2D(view);
      OverlayArcgis2D.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (OverlayArcgis2D.intances as any) = null;
  }
  private async getOverlayLayer(type: string) {
    let group = this.overlayGroups.get(type);
    if (!group) {
      group = await this.createOverlayLayer(type);
    }
    return group;
  }
  private async createOverlayLayer(
    type: string
  ): Promise<__esri.GraphicsLayer> {
    type MapModules = [typeof import('esri/layers/GraphicsLayer')];
    const [GraphicsLayer] = await (loadModules([
      'esri/layers/GraphicsLayer'
    ]) as Promise<MapModules>);
    let overlayLayer: __esri.GraphicsLayer = new GraphicsLayer();
    this.view.map.add(overlayLayer);
    this.overlayGroups.set(type, overlayLayer);
    return overlayLayer;
  }
  private MoveToolTip(type: string, content: string) {
    const view = this.view;
    const moveLayer = this.overlayGroups.get(type);
    let parent = this;
    let tip!: any;
    view.on('pointer-move', function(event) {
      view.hitTest(event).then((response) => {
        if (response.results.length > 0) {
          response.results.forEach((result) => {
            if (result.graphic.layer === moveLayer) {
              if (!tip) {
                tip = new ToolTip(
                  view,
                  {
                    title: '',
                    istip: true,
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
  private makeSymbol(symbol: IPointSymbol | undefined): Object | undefined {
    if (!symbol || (symbol.type && symbol.type.toLowerCase() == 'point-3d'))
      return undefined;
    let result;

    if (symbol.primitive) {
      if (!this.primitive2D.includes(symbol.primitive)) {
        return undefined;
      }

      result = {
        type: 'simple-marker',
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
      };
    } else if (symbol.url) {
      result = {
        type: 'picture-marker',
        url: symbol.url,
        width: symbol.size instanceof Array ? symbol.size[0] : null,
        height: symbol.size instanceof Array ? symbol.size[1] : null,
        xoffset: symbol.xoffset ? symbol.xoffset : null,
        yoffset: symbol.yoffset ? symbol.yoffset : null,
        angle: symbol.rotation ? symbol.rotation : null
      };
    } else if (symbol.type == 'line' || symbol.type == 'polyline') {
      result = {
        type: 'simple-line', // autocasts as new SimpleLineSymbol()
        color: (symbol as any).color || 'red',
        width: (symbol as any).width || 1,
        style: (symbol as any).style || 'solid'
      };
    } else if (symbol.type == 'fill' || symbol.type == 'polygon') {
      result = {
        type: 'simple-fill', // autocasts as new SimpleFillSymbol()
        color: (symbol as any).color || 'rgba(255,0,0,0.5)',
        style: (symbol as any).style || 'solid',
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: (symbol as any).outline
            ? (symbol as any).outline.color || 'green'
            : 'green',
          width: (symbol as any).outline
            ? (symbol as any).outline.width || 0.4
            : 0.4
        }
      };
    }

    return result;
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
    let divContent = document.createElement('div');
    divContent.innerHTML = content;
    return divContent;
  }
  //使popup中的content,支持html.
  private getPopUpHtml(graphic: any, content: string): any {
    let tipContent = content;
    for (let fieldName in graphic.attributes) {
      if (graphic.attributes.hasOwnProperty(fieldName)) {
        tipContent = tipContent.replace(
          '{' + fieldName + '}',
          graphic.attributes[fieldName]
        );
      }
    }
    let divContent = document.createElement('div');
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
            '{' + fieldName + '}',
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
    console.log(params);
    let layerType = params.type || 'default';
    let overlayLayer = (await this.getOverlayLayer(
      params.type || 'default'
    )) as __esri.GraphicsLayer;
    const [
      Graphic,
      geometryJsonUtils,
      PopupTemplate,
      SpatialReference,
      WebMercatorUtils
    ] = await loadModules([
      'esri/Graphic',
      'esri/geometry/support/jsonUtils',
      'esri/PopupTemplate',
      'esri/geometry/SpatialReference',
      'esri/geometry/support/webMercatorUtils'
    ]);

    const defaultSymbol = this.makeSymbol(params.defaultSymbol);
    const showPopup = params.showPopup;
    const defaultInfoTemplate = params.defaultInfoTemplate;
    const autoPopup = params.autoPopup;
    const defaultButtons = params.defaultButtons;
    const defaultVisible = params.defaultVisible !== false;
    const custom = params.custom;
    const iswgs = params.iswgs !== false;
    const zooms = params.defaultZooms || [0, 0];
    if (params.defaultZooms) {
      overlayLayer.minScale = Utils.getScale(this.view, zooms[0]);
      overlayLayer.maxScale = Utils.getScale(this.view, zooms[1]);
    }

    const showToolTip = params.showToolTip;
    const toolTipContent = params.toolTipContent;

    if (showToolTip && toolTipContent) {
      this.MoveToolTip(layerType, toolTipContent);
    }

    let addCount = 0;
    for (let i = 0; i < params.overlays.length; i++) {
      const overlay = params.overlays[i];
      if ((overlay.geometry as any).x) {
        (overlay.geometry as any).x = Number((overlay.geometry as any).x);
        (overlay.geometry as any).y = Number((overlay.geometry as any).y);
      }
      if (!iswgs) {
        (overlay.geometry as any).spatialReference = this.view.spatialReference;
      }
      let geometry = geometryJsonUtils.fromJSON(overlay.geometry);
      if (overlay.symbol && !overlay.symbol.type) {
        overlay.symbol.type = geometry.type;
      }
      const overlaySymbol = this.makeSymbol(overlay.symbol);
      //TODO: 加入更详细的参数是否合法判断
      if (!defaultSymbol && !overlaySymbol) {
        continue;
      }
      const fields = overlay.fields;
      fields.type = params.type;
      fields.id = overlay.id;
      const buttons = overlay.buttons;

      let graphic = new Graphic({
        geometry,
        symbol: overlaySymbol || defaultSymbol,
        attributes: fields || {}
      });
      graphic.visible = defaultVisible;
      graphic.type = params.type;
      graphic.id = overlay.id;
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
            title: '',
            content: this.getInfoWindowContent(graphic),
            location: geometry
          });
          this.view.popup.dockOptions = {
            buttonEnabled: false,
            breakpoint: {width: 400, height: 30}
          };
        }
      }
      if (custom) {
        let customContent = custom.content;
        let customtool = new ToolTip(
          this.view,
          {
            title: '',
            id: overlay.id,
            zooms: custom.zooms,
            visible: !custom.visible || false,
            content: this.getToolTipContent(graphic, customContent)
          },
          graphic
        );
      }
      overlayLayer.add(graphic);
      addCount++;
    }
    return {
      status: 0,
      message: 'ok',
      result: `成功添加${params.overlays.length}中的${addCount}个覆盖物`
    };
  }
  public async deleteOverlays(params: IOverlayDelete): Promise<IResult> {
    let types = params.types || [];
    let ids = params.ids || [];
    let delcount = 0;
    let groups: Array<__esri.GraphicsLayer> = [];
    this.overlayGroups.forEach((overlay, key) => {
      if (types.length == 0 || types.indexOf(key) > -1) {
        groups.push(overlay);
      }
    });
    groups.forEach((overlayLayer: __esri.GraphicsLayer) => {
      for (let i = 0; i < overlayLayer.graphics.length; i++) {
        let graphic: any = overlayLayer.graphics.getItemAt(i);
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
          overlayLayer.remove(graphic);
          delcount++;
          i--;
        }
      }
    }, this);

    ids.forEach((id: string) => {
      ToolTip.clear(this.view, id);
    }, this);
    return {
      status: 0,
      message: 'ok',
      result: `成功删除${delcount}个覆盖物`
    };
  }
  public async deleteAllOverlays(): Promise<IResult> {
    this.overlayGroups.forEach((overlay, key) => {
      overlay.removeAll();
    });
    return {
      status: 0,
      message: 'ok'
    };
  }
  public async findFeature(params: IFindParameter): Promise<IResult> {
    let type = params.layerName;
    let overlayLayer = this.overlayGroups.get(type);
    if (!overlayLayer) {
      return {
        status: 0,
        message: 'ok'
      };
    }
    let ids = params.ids || [];
    let level = params.level || this.view.zoom;
    let overlays = overlayLayer.graphics;
    let centerResult = params.centerResult !== false;
    overlays.forEach((overlay: any) => {
      if (type == overlay.type && ids.indexOf(overlay.id) >= 0) {
        if (centerResult) {
          this.view.goTo({target: overlay.geometry, zoom: level});
        }
        this.startJumpPoint([overlay]);
      }
    });
    return {
      status: 0,
      message: 'ok'
    };
  }
  private async startJumpPoint(graphics: any[]) {
    let high = HighFeauture2D.getInstance(this.view);
    high.startup(graphics);
  }
}

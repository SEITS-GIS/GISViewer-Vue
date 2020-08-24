import {
  IOverlayParameter,
  IPointSymbol,
  IResult,
  IOverlayDelete,
  IFindParameter
} from '@/types/map';
import {loadModules} from 'esri-loader';
import ToolTip from './ToolTip';
import HighFeauture3D from './HighFeauture3D';

export class OverlayArcgis3D {
  private static intances: Map<string, any>;

  private overlayLayer!: __esri.GraphicsLayer;
  private view!: __esri.SceneView;
  private jumpRender: any;

  private primitive2D = ['circle', 'square', 'cross', 'x', 'kite', 'triangle'];
  private primitive3D = [
    'sphere',
    'cylinder',
    'cube',
    'cone',
    'inverted-cone',
    'diamond',
    'tetrahedron'
  ];

  private constructor(view: __esri.SceneView) {
    this.view = view;
  }

  public static getInstance(view: __esri.SceneView) {
    let id = view.container.id;
    if (!OverlayArcgis3D.intances) {
      OverlayArcgis3D.intances = new Map();
    }
    let intance = OverlayArcgis3D.intances.get(id);
    if (!intance) {
      intance = new OverlayArcgis3D(view);
      OverlayArcgis3D.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (OverlayArcgis3D.intances as any) = null;
  }
  private async createOverlayLayer() {
    type MapModules = [typeof import('esri/layers/GraphicsLayer')];
    const [GraphicsLayer] = await (loadModules([
      'esri/layers/GraphicsLayer'
    ]) as Promise<MapModules>);
    this.overlayLayer = new GraphicsLayer();
    this.view.map.add(this.overlayLayer);
  }

  private makeSymbol(symbol: IPointSymbol | undefined): Object | undefined {
    if (!symbol) return undefined;

    let result;
    switch (symbol.type.toLowerCase()) {
      case 'point-2d':
      case 'point':
        //图元类型不匹配
        if (symbol.primitive && !this.primitive2D.includes(symbol.primitive)) {
          // console.error(`Wrong primitive: ${symbol.primitive}`);
          return undefined;
        }

        result = {
          type: 'point-3d', //autocasts as new PointSymbol3D()
          symbolLayers: [
            {
              type: 'icon', //autocasts as new IconSymbol3DLayer()
              resource: symbol.primitive
                ? {primitive: symbol.primitive}
                : {href: symbol.url},
              size: symbol.size instanceof Array ? symbol.size[0] : symbol.size,
              material: {color: symbol.color},
              outline: symbol.outline,
              anchor: symbol.anchor
            }
          ]
        };
        break;

      case 'point-3d':
        //图元类型不匹配
        if (symbol.primitive && !this.primitive3D.includes(symbol.primitive)) {
          // console.error(`Wrong primitive: ${symbol.primitive}`);
          return undefined;
        }

        result = {
          type: 'point-3d', //autocasts as new PointSymbol3D()
          symbolLayers: [
            {
              type: 'object', // autocasts as new ObjectSymbol3DLayer()
              resource: symbol.primitive
                ? {primitive: symbol.primitive}
                : {href: symbol.url},
              width:
                symbol.size instanceof Array ? symbol.size[0] : symbol.size,
              height:
                symbol.size instanceof Array ? symbol.size[1] : symbol.size,
              depth:
                symbol.size instanceof Array ? symbol.size[2] : symbol.size,
              material: {color: symbol.color},
              tilt: symbol.rotation instanceof Array ? symbol.rotation[0] : 0,
              roll: symbol.rotation instanceof Array ? symbol.rotation[1] : 0,
              heading:
                symbol.rotation instanceof Array ? symbol.rotation[2] : 0,
              anchor: symbol.anchor
            }
          ]
        };
        break;
      case 'line':
      case 'polyline':
        result = {
          type: 'simple-line', // autocasts as new SimpleLineSymbol()
          color: (symbol as any).color || 'red',
          width: (symbol as any).width || 1,
          style: (symbol as any).style || 'solid'
        };
        break;
      case 'fill':
      case 'polygon':
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
        break;
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

  private MoveToolTip(content: string) {
    const view = this.view;
    const moveLayer = this.overlayLayer;
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

    const [Graphic, geometryJsonUtils, PopupTemplate] = await loadModules([
      'esri/Graphic',
      'esri/geometry/support/jsonUtils',
      'esri/PopupTemplate'
    ]);

    const defaultSymbol = this.makeSymbol(params.defaultSymbol);
    const showPopup = params.showPopup;
    const defaultInfoTemplate = params.defaultInfoTemplate;
    const autoPopup = params.autoPopup;
    const showToolTip = params.showToolTip;
    const toolTipContent = params.toolTipContent;
    const defaultButtons = params.defaultButtons;
    const defaultVisible = params.defaultVisible !== false;

    if (showToolTip && toolTipContent) {
      this.MoveToolTip(toolTipContent);
    }

    let addCount = 0;
    for (let i = 0; i < params.overlays.length; i++) {
      const overlay = params.overlays[i];
      const geometry = geometryJsonUtils.fromJSON(overlay.geometry);
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

      const graphic = new Graphic({
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

      this.overlayLayer.add(graphic);
      addCount++;
    }
    return {
      status: 0,
      message: 'ok',
      result: `成功添加${params.overlays.length}中的${addCount}个覆盖物`
    };
  }
  public async deleteOverlays(params: IOverlayDelete): Promise<IResult> {
    console.log(params);
    let types = params.types || [];
    let ids = params.ids || [];
    let delcount = 0;
    for (let i = 0; i < this.overlayLayer.graphics.length; i++) {
      let graphic: any = this.overlayLayer.graphics.getItemAt(i);
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
        this.overlayLayer.remove(graphic);
        delcount++;
        i--;
      }
    }
    return {
      status: 0,
      message: 'ok',
      result: `成功删除${delcount}个覆盖物`
    };
  }
  public async deleteAllOverlays(): Promise<IResult> {
    this.overlayLayer.removeAll();
    return {
      status: 0,
      message: 'ok'
    };
  }
  public async findFeature(params: IFindParameter): Promise<IResult> {
    if (!this.overlayLayer) {
      return {
        status: 0,
        message: 'ok'
      };
    }
    let type = params.layerName;
    let ids = params.ids || [];
    let level = params.level || this.view.zoom;
    let overlays = this.overlayLayer.graphics;
    let centerResult = params.centerResult !== false;
    console.log(ids);
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
    let high = HighFeauture3D.getInstance(this.view);
    high.startup(graphics);
  }
}

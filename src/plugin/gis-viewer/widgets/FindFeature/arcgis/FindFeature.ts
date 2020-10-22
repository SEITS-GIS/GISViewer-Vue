import {
  IOverlayParameter,
  IPointSymbol,
  IResult,
  IOverlayDelete,
  IFindParameter
} from '@/types/map';
import {loadModules} from 'esri-loader';
import HighFeauture3D from '../../Overlays/arcgis/HighFeauture3D';
import HighFeauture2D from '../../Overlays/arcgis/HighFeauture2D';
import {getThumbnailUrl} from 'esri/widgets/BasemapToggle/BasemapToggleViewModel';
import {param} from 'jquery';
import {Utils} from '@/plugin/gis-viewer/Utils';
import ToolTip from '../../Overlays/arcgis/ToolTip';

export class FindFeature {
  private static intances: Map<string, any>;

  private findLayer!: __esri.GraphicsLayer;
  private view!: __esri.MapView | __esri.SceneView;
  private highTime: any;
  private highState: boolean = true;
  private highCount: number = 0;
  private highRepeat: number = 5;

  private constructor(view: __esri.MapView | __esri.SceneView) {
    this.view = view;
  }

  public static getInstance(view: __esri.MapView | __esri.SceneView) {
    let id = view.container.id;
    if (!FindFeature.intances) {
      FindFeature.intances = new Map();
    }
    let intance = FindFeature.intances.get(id);
    if (!intance) {
      intance = new FindFeature(view);
      FindFeature.intances.set(id, intance);
    }
    return intance;
  }
  private async createOverlayLayer() {
    type MapModules = [typeof import('esri/layers/GraphicsLayer')];
    const [GraphicsLayer] = await (loadModules([
      'esri/layers/GraphicsLayer'
    ]) as Promise<MapModules>);
    this.findLayer = new GraphicsLayer();
    this.view.map.add(this.findLayer);
  }
  public async findLayerFeature(params: IFindParameter): Promise<IResult> {
    if (!this.findLayer) {
      await this.createOverlayLayer();
    } else {
      this.findLayer.removeAll();
      this.view.popup.close();
    }
    let type = params.layerName;
    let ids = params.ids || [];
    let level = params.level || 0;
    let centerResult = params.centerResult !== false;
    let layerIds = params.layerids || undefined;
    let showPopUp = params.showPopUp !== false;

    this.view.map.allLayers.forEach((layer: any) => {
      if (params.layerName && layer.label === params.layerName) {
        //if (layer.visible) {
        //console.log(layer);
        if (layer.type == 'feature' || layer.type == 'map-image') {
          this.doFindTask({
            url: layer.url as string,
            layer: layer,
            layerIds: layerIds || this.getLayerIds(layer),
            ids: ids,
            zoom: level,
            showPopUp: showPopUp
          });
        }
        //}
      }
      if (layer.type == 'graphics') {
        if (layer.graphics) {
          //addoverlay撒点图层
          let overlays = layer.graphics;
          overlays.forEach((overlay: any) => {
            if (
              (type == overlay.type && ids.indexOf(overlay.id) >= 0) ||
              (overlay.attributes &&
                overlay.attributes.type == type &&
                ids.indexOf(overlay.attributes.id) >= 0)
            ) {
              if (centerResult) {
                this.view.goTo({
                  target: overlay.geometry,
                  zoom: Math.max(this.view.zoom, level)
                });
              }
              if (overlay.geometry.type == 'point') {
                this.startJumpPoint([overlay]);
              }
            }
          }, this);
        }
        if (layer.data) {
          //cluster点聚合图层
          let overlays = layer.data;
          let _this = this;
          overlays.forEach((overlay: any) => {
            if (type == overlay.type && ids.indexOf(overlay.id) >= 0) {
              if (centerResult) {
                this.view
                  .goTo({
                    center: [overlay.x, overlay.y],
                    zoom: Math.max(this.view.zoom, level)
                  })
                  .then(() => {
                    setTimeout(() => {
                      for (let i = 0; i < layer.graphics.length; i++) {
                        let graphic = layer.graphics.getItemAt(i);
                        if (
                          graphic.attributes &&
                          graphic.attributes.type == type &&
                          ids.indexOf(graphic.attributes.id) >= 0
                        ) {
                          _this.startJumpPoint([graphic]);
                          break;
                        }
                      }
                    }, 800);
                  });
              }
            }
          }, this);
        }
      }
    });
    return {
      status: 0,
      message: 'ok'
    };
  }
  private getLayerIds(layer: any): any[] {
    let layerids = [];
    if (layer.type == 'feature') {
      //featurelayer查询
      layerids.push(layer.layerId);
    } else if (layer.type == 'map-image') {
      let sublayers = (layer as __esri.MapImageLayer).allSublayers;
      sublayers.forEach((sublayer) => {
        if (sublayer.visible) {
          layerids.push(sublayer.id);
        }
      });
    }
    return layerids;
  }
  private getLayerScale(label: string, layerId: number): any {
    let scale = 0;
    let resLayer: any;
    let parentlayer: any;
    let minScale = 0;
    let maxScale = 0;
    this.view.map.allLayers.forEach((layer: any) => {
      if (layer.type == 'map-image' && layer.label == label) {
        let sublayers = (layer as __esri.MapImageLayer).allSublayers;
        sublayers.forEach((sublayer: any) => {
          if (sublayer.id == layerId) {
            resLayer = sublayer;
            parentlayer = layer;
          }
        });
      } else if (layer.type == 'feature' && layer.label == label) {
        if ((layer.layerId = layerId)) {
          resLayer = layer;
          parentlayer = layer;
        }
      }
    });
    if (resLayer) {
      minScale = resLayer.minScale;
      maxScale = resLayer.maxScale;
      if (resLayer.minScale == 0 && resLayer.maxScale == 0 && resLayer.parent) {
        minScale =
          resLayer.parent.minScale == undefined ? 0 : resLayer.parent.minScale;
        maxScale =
          resLayer.parent.maxScale == undefined ? 0 : resLayer.parent.maxScale;
      }
    }
    scale = Utils.getMostScale(this.view, maxScale, minScale);
    return {layer: parentlayer, scale: scale};
  }
  //使toolTip中支持{字段}的形式
  private getContent(attr: any, content: string): string {
    let tipContent = content;
    if (content) {
      //键值对
      for (let fieldName in attr) {
        if (attr.hasOwnProperty(fieldName)) {
          tipContent = tipContent.replace(
            '{' + fieldName + '}',
            attr[fieldName]
          );
        }
      }
    }
    return tipContent;
  }
  private async doFindTask(options: any): Promise<any> {
    type MapModules = [
      typeof import('esri/Graphic'),
      typeof import('esri/tasks/FindTask'),
      typeof import('esri/tasks/support/FindParameters')
    ];
    const [Graphic, FindTask, FindParameters] = await (loadModules([
      'esri/Graphic',
      'esri/tasks/FindTask',
      'esri/tasks/support/FindParameters'
    ]) as Promise<MapModules>);
    let ids = options.ids;
    let showPopUp = options.showPopUp;
    let symbol = {
      type: 'simple-fill', // autocasts as new SimpleFillSymbol()
      color: [51, 51, 204, 0],
      style: 'solid',
      outline: {
        color: [0, 255, 255, 255],
        width: 1
      }
    }; //options.layer.renderer.symbol;
    let that = this;
    let promises = ids.map((searchText: string) => {
      return new Promise((resolve, reject) => {
        let findTask = new FindTask(options.url); //创建属性查询对象

        let findParams = new FindParameters(); //创建属性查询参数
        findParams.returnGeometry = true; // true 返回几何信息
        // findParams.layerIds = [0, 1, 2]; // 查询图层id
        findParams.layerIds = options.layerIds; // 查询图层id
        findParams.searchFields = [
          'DEVICEID',
          'BM_CODE',
          'FEATUREID',
          'SECTIONID',
          'FEATUREID'
        ]; // 查询字段 artel
        findParams.searchText = searchText; // 查询内容 artel = searchText

        // 执行查询对象
        findTask.execute(findParams).then((data: any) => {
          let results = data.results;
          if (results.length < 1) return [];
          console.log(results);
          let graphics: any[] = [];
          const feats = results.map((item: any) => {
            let gra = item.feature;
            gra.symbol = symbol;
            graphics.push(gra);
            return item.feature.attributes;
          });
          //that.startJumpPoint(graphics);
          let select = that.getLayerScale(
            options.layer.label,
            results[0].layerId
          );

          if (options.zoom > 0) {
            that.view.goTo({target: graphics[0].geometry, zoom: options.zoom});
          } else {
            that.view.goTo({
              target: graphics[0].geometry,
              scale: select.scale
            });
          }
          that.startHighlightOverlays(graphics[0].geometry);
          if (showPopUp) {
            that.showPopUp(select.layer, results[0].layerId, graphics[0]);
          }
          resolve(feats);
        });
      });
    });
    return new Promise((resolve) => {
      Promise.all(promises).then((e) => {
        resolve(e);
      });
    });
  }
  private showPopUp(layer: any, layerid: number, graphic: any) {
    let popup;
    if (layer.type == 'map-image') {
      popup = layer.popupTemplates[layerid];
    } else if (layer.type == 'feature') {
      popup = layer.popupTemplate;
    }
    if (popup) {
      this.view.popup.open({
        title: popup.title,
        content: this.getContent(graphic.attributes, popup.content),
        location: Utils.getGeometryPoint(graphic.geometry)
      });
    }
  }
  private async startJumpPoint(graphics: any[]) {
    if (this.view.type == '3d') {
      let high = HighFeauture3D.getInstance(this.view as __esri.SceneView);
      high.startup(graphics);
    } else {
      let high = HighFeauture2D.getInstance(this.view as __esri.MapView);
      high.startup(graphics);
    }
  }
  public async startHighlightOverlays(geometry: any) {
    if (this.highTime) {
      clearTimeout(this.highTime);
      this.highTime = undefined;
    }
    if (!this.findLayer) {
      await this.createOverlayLayer();
    } else {
      this.findLayer.removeAll();
      this.view.popup.close();
    }
    this.highState = false;
    this.highCount = 0;
    if (geometry == undefined) {
      return;
    }
    this.highState = true;
    type MapModules = [
      typeof import('esri/Graphic'),
      typeof import('esri/tasks/FindTask'),
      typeof import('esri/tasks/support/FindParameters')
    ];
    const [Graphic] = await (loadModules(['esri/Graphic']) as Promise<
      MapModules
    >);
    let symbol;
    if (geometry.type == 'polyline') {
      symbol = {
        type: 'simple-line', // autocasts as SimpleLineSymbol()
        color: [0, 255, 255],
        style: 'dash',
        width: 3
      };
    } else if (geometry.type == 'polygon') {
      symbol = {
        type: 'simple-fill', // autocasts as new SimpleFillSymbol()
        color: [51, 51, 204, 0.0],
        style: 'none',
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [0, 255, 255],
          style: 'dash',
          width: 2
        }
      };
    } else if (geometry.type == 'point') {
      symbol = {
        type: 'simple-marker', // autocasts as new SimpleFillSymbol()
        color: [0, 0, 0, 0],
        style: 'none',
        size: 12,
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [0, 255, 255],
          style: 'solid',
          width: 2
        }
      };
    }
    let highGraphic = new Graphic({
      geometry: geometry,
      symbol: symbol as any
    });
    this.findLayer.add(highGraphic);
    this.HighlightOverlays();
  }
  private HighlightOverlays() {
    let _this = this;
    this.highTime = setTimeout((e: any) => {
      if (_this.findLayer.opacity <= 0) {
        _this.findLayer.opacity = 1;
        _this.highCount++;
      }
      _this.findLayer.opacity = _this.findLayer.opacity - 0.1;
      if (_this.highState && _this.highCount < _this.highRepeat) {
        _this.HighlightOverlays();
      } else {
        _this.findLayer.removeAll();
        _this.view.popup.close();
      }
    }, 70);
  }
}

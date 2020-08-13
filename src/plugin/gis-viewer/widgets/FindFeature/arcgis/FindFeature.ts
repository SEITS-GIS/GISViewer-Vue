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

export class FindFeature {
  private static findFeature: FindFeature;

  private overlayLayer!: __esri.GraphicsLayer;
  private view!: __esri.MapView | __esri.SceneView;

  private constructor(view: __esri.MapView | __esri.SceneView) {
    this.view = view;
  }

  public static getInstance(view: __esri.MapView | __esri.SceneView) {
    if (!FindFeature.findFeature) {
      FindFeature.findFeature = new FindFeature(view);
    }
    return FindFeature.findFeature;
  }
  public static destroy() {
    (FindFeature.findFeature as any) = null;
  }
  public async findLayerFeature(params: IFindParameter): Promise<IResult> {
    let type = params.layerName;
    let ids = params.ids || [];
    let level = params.level || this.view.zoom;
    let centerResult = params.centerResult !== false;

    this.view.map.allLayers.forEach((layer: any) => {
      if (params.layerName && layer.label === params.layerName) {
        if (layer.visible) {
          //console.log(layer);
          if (layer.type == 'feature' || layer.type == 'map-image') {
            this.doFindTask({
              url: layer.url as string,
              layer: layer,
              layerIds: this.getLayerIds(layer),
              ids: ids
            });
          }
        }
      }
      if (layer.type == 'graphics') {
        if (layer.graphics) {
          //addoverlay撒点图层
          let overlays = layer.graphics;
          overlays.forEach((overlay: any) => {
            if (type == overlay.type && ids.indexOf(overlay.id) >= 0) {
              if (centerResult) {
                this.view.goTo({
                  target: overlay.geometry,
                  zoom: Math.max(this.view.zoom, level)
                });
              }
              this.startJumpPoint([overlay]);
            }
          }, this);
        }
        if (layer.data) {
          //cluster点聚合图层
          let overlays = layer.data;
          overlays.forEach((overlay: any) => {
            if (type == overlay.type && ids.indexOf(overlay.id) >= 0) {
              if (centerResult) {
                this.view.goTo({
                  center: [overlay.x, overlay.y],
                  zoom: Math.max(this.view.zoom, level)
                });
              }
              this.startJumpPoint([
                {
                  geometry: {type: 'point', x: overlay.x, y: overlay.y},
                  symbol: layer.flareRenderer.defaultSymbol,
                  attributes: overlays
                }
              ]);
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
      let sublayers = (layer as __esri.MapImageLayer).sublayers;
      sublayers.forEach((sublayer) => {
        if (sublayer.visible) {
          layerids.push(sublayer.id);
        }
      });
    }
    return layerids;
  }
  private async doFindTask(options: any) {
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
    let symbol = ''; //options.layer.renderer.symbol;
    let that = this;
    let promises = ids.map((searchText: string) => {
      return new Promise((resolve, reject) => {
        let findTask = new FindTask(options.url); //创建属性查询对象

        let findParams = new FindParameters(); //创建属性查询参数
        findParams.returnGeometry = true; // true 返回几何信息
        // findParams.layerIds = [0, 1, 2]; // 查询图层id
        findParams.layerIds = options.layerIds; // 查询图层id
        findParams.searchFields = ['DEVICEID', 'BM_CODE', 'FEATUREID']; // 查询字段 artel
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
  private async startJumpPoint(graphics: any[]) {
    if (this.view.type == '3d') {
      let high = HighFeauture3D.getInstance(this.view as __esri.SceneView);
      high.startup(graphics);
    } else {
      let high = HighFeauture2D.getInstance(this.view as __esri.MapView);
      high.startup(graphics);
    }
  }
}

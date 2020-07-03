import {
  IOverlayParameter,
  IPointSymbol,
  IResult,
  IOverlayDelete,
  IFindParameter
} from '@/types/map';
import {loadModules} from 'esri-loader';

export class FindFeature {
  private static findFeature: FindFeature;

  private overlayLayer!: __esri.GraphicsLayer;
  private view!: __esri.MapView;

  private constructor(view: __esri.MapView) {
    this.view = view;
  }

  public static getInstance(view: __esri.MapView) {
    if (!FindFeature.findFeature) {
      FindFeature.findFeature = new FindFeature(view);
    }
    return FindFeature.findFeature;
  }
  public async findLayerFeature(params: IFindParameter): Promise<IResult> {
    let type = params.layerName;
    let ids = params.ids || [];
    let level = params.level || this.view.zoom;

    this.view.map.allLayers.forEach((layer: any) => {
      if (params.layerName && layer.label === params.layerName) {
        if (layer.visible) {
          this.doFindTask({
            url: layer.url as string,
            layerIds: this.getLayerIds(layer.layerIds),
            ids: ids
          });
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
    if (layer.declaredClass == 'esri.layers.FeatureLayer') {
      //featurelayer查询
      layerids.push(layer.layerId);
    } else if (layer.declaredClass == 'esri.layers.MapImageLayer') {
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
      typeof import('esri/tasks/FindTask'),
      typeof import('esri/tasks/support/FindParameters')
    ];
    const [FindTask, FindParameters] = await (loadModules([
      'esri/tasks/FindTask',
      'esri/tasks/support/FindParameters'
    ]) as Promise<MapModules>);
    let ids = options.ids;
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
        findTask.execute(findParams).then((results: any) => {
          if (results.length < 1) return [];
          const feats = results.map((item: any) => {
            return item.feature.attributes;
          });
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
}

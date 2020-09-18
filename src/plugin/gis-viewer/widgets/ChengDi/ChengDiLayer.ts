import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IHeatPoint
} from '@/types/map';
import {loadModules} from 'esri-loader';
import Axios from 'axios';
import {resolve} from 'esri/core/promiseUtils';
import {param} from 'jquery';
export class ChengDiLayer {
  private static intances: Map<string, any>;
  private view!: any;
  private cdPostUrl: string =
    'http://10.31.214.244/IDPSCoordinate/PostConvertService.svc/CoordinateConverter/false/lon1/lat';
  private cdPostLen: number = 5000;
  private gloablClass: any;
  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: __esri.MapView) {
    let id = view.container.id;
    if (!ChengDiLayer.intances) {
      ChengDiLayer.intances = new Map();
    }
    let intance = ChengDiLayer.intances.get(id);
    if (!intance) {
      intance = new ChengDiLayer(view);
      ChengDiLayer.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (ChengDiLayer.intances as any) = null;
  }

  public async deleteChengDiLayer() {}
  private clear(params: any) {
    let layer;
    this.view.map.allLayers.forEach((baselayer: any) => {
      if (params.label && baselayer.label === params.label) {
        layer = baselayer;
      }
    });
    if (layer) {
      this.view.map.remove(layer);
    }
  }
  public async addChengDiLayer(params: any) {
    type MapModules = [
      typeof import('esri/Graphic'),
      typeof import('esri/tasks/QueryTask'),
      typeof import('esri/tasks/support/Query'),
      typeof import('esri/layers/FeatureLayer'),
      typeof import('esri/layers/GraphicsLayer'),
      typeof import('esri/geometry/support/jsonUtils'),
      typeof import('esri/renderers/HeatmapRenderer')
    ];
    this.gloablClass = await (loadModules([
      'esri/Graphic',
      'esri/tasks/QueryTask',
      'esri/tasks/support/Query',
      'esri/layers/FeatureLayer',
      'esri/layers/GraphicsLayer',
      'esri/geometry/support/jsonUtils',
      'esri/renderers/HeatmapRenderer'
    ]) as Promise<MapModules>);
    let _this = this;
    this.queryChengDiLayer(params);
    if (params.refreshInterval) {
      setInterval(() => {
        _this.queryChengDiLayer(params);
      }, params.refreshInterval * 1000 * 60);
    }
  }
  public async queryChengDiLayer(params: any) {
    const [
      Graphic,
      QueryTask,
      Query,
      FeatureLayer,
      GraphicsLayer,
      geometryJsonUtils,
      HeatmapRenderer
    ] = this.gloablClass;
    let _this = this;
    let isChengdi = params.isCD === true;
    let layer = new FeatureLayer({
      url: params.url,
      outFields: ['*']
    });

    layer.queryFeatures().then((results: any) => {
      // prints the array of result graphics to the console
      let featureResults = isChengdi ? results.features : undefined;
      _this.WgsToChengDi(featureResults).then((res: any) => {
        let chengdigeo = res.result;
        let fields: any = [];
        let fieldNames = results.fields;
        let features = results.features.map((graphic: any, index: number) => {
          let attr = graphic.attributes;
          let obj: any = {};
          for (let str in attr) {
            let fieldArr = str.split('.');
            let field = fieldArr[fieldArr.length - 1];
            obj[field] = attr[str];
          }
          //graphic.attributes = obj;
          let geoJson = graphic.geometry.toJSON();
          geoJson.spatialReference = _this.view.spatialReference;
          if (isChengdi) {
            geoJson.x = Number(chengdigeo[index].lon1);
            geoJson.y = Number(chengdigeo[index].lat);
          }
          let geometry = geometryJsonUtils.fromJSON(geoJson);
          return new Graphic({
            attributes: obj,
            geometry: geometry,
            symbol: graphic.symbol
          });
        });
        fieldNames.forEach((field: any) => {
          let fieldArr = field.name.split('.');
          let alias = fieldArr[fieldArr.length - 1];
          fields.push({
            name: alias,
            alias: alias,
            type: field.type
          });
        });
        let chengdilayer = new FeatureLayer({
          source: features,
          fields: fields,
          objectIdField: 'OBJECTID',
          geometryType: results.geometryType,
          renderer: params.renderer,
          outFields: params.outFields,
          visible: params.visible
        });
        (chengdilayer as any).label = params.label;
        _this.clear(params);
        _this.view.map.add(chengdilayer);
      });
    });
  }
  private WgsToChengDi(features: any): Promise<IResult> {
    let pointDatas: any;
    let that = this;
    if (features) {
      pointDatas = features.map((graphic: any) => {
        return {
          lon1: graphic.geometry.longitude.toFixed(6),
          lat: graphic.geometry.latitude.toFixed(6)
        };
      });
      console.log(pointDatas);
    } else {
      return new Promise((resolve) => {
        resolve({status: 0, message: '无数据转换', result: []});
      });
    }
    let postDatas = [];
    let postLen = Math.ceil(pointDatas.length / this.cdPostLen); //分成多少个数组
    let index = 0;
    for (let i = 0; i < postLen; i++) {
      let len = Math.min(
        this.cdPostLen * i + this.cdPostLen,
        pointDatas.length //最大长度
      );
      let sliceArr = pointDatas.slice(this.cdPostLen * i, len);
      sliceArr.forEach((pt: any) => {
        pt.x = i;
        pt.c = i;
      });
      postDatas.push(sliceArr);
      index++;
    }
    let promises = postDatas.map((post: any) => {
      return new Promise((resolve: any, reject: any) => {
        if (post) {
          Axios({
            method: 'post',
            url: that.cdPostUrl,
            data: JSON.stringify(post)
          }).then((result: any) => {
            resolve(result.data);
          });
        } else {
          resolve([]);
        }
      });
    });
    return new Promise((resolve) => {
      Promise.all(promises).then((results: any) => {
        if (results && results.length > 0) {
          let cdResults: any = [];
          results.forEach((res: any) => {
            let resArr = JSON.parse(res);
            cdResults = cdResults.concat(resArr);
          });
          resolve({status: 0, message: '转换陈宫', result: cdResults});
        }
      });
    });
  }
}

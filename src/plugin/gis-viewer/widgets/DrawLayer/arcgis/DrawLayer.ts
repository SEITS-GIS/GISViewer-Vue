import {
  IOverlayParameter,
  IPointSymbol,
  IResult,
  IOverlayDelete,
  IFindParameter,
  ILayerConfig
} from '@/types/map';
import axios from 'axios';
import {loadModules} from 'esri-loader';
import {reject} from 'esri/core/promiseUtils';

export class DrawLayer {
  private static intances: Map<string, any>;

  private drawlayer!: any;
  private view!: __esri.MapView | __esri.SceneView;
  private dataJsonMap: Map<string, any> = new Map();

  private constructor(view: __esri.MapView | __esri.SceneView) {
    this.view = view;
  }

  public static getInstance(view: __esri.MapView | __esri.SceneView) {
    let id = view.container.id;
    if (!DrawLayer.intances) {
      DrawLayer.intances = new Map();
    }
    let intance = DrawLayer.intances.get(id);
    if (!intance) {
      intance = new DrawLayer(view);
      DrawLayer.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (DrawLayer.intances as any) = null;
  }
  public clearDrawLayer(params: ILayerConfig) {
    this.clear(params.label as string);
    this.dataJsonMap.delete(params.label as string);
  }
  public clear(label: string) {
    let layer = this.view.map.allLayers.find((baselayer: any) => {
      return baselayer.label === label;
    });
    this.view.map.remove(layer);
  }
  public addDrawLayer(params: any): Promise<IResult> {
    let label = params.label;
    let url = params.layerUrls || params.url;
    let dataUrl = params.dataUrl;
    let defaultVisible = params.visible !== false;
    let renderer = params.renderer || this.getRender();
    let labelingInfo = params.labelingInfo;
    let refreshInterval = params.refreshInterval || 0;

    let layer = this.view.map.allLayers.find((baselayer: any) => {
      return baselayer.label === label;
    });
    if (refreshInterval > 0) {
      let _this = this;
      setTimeout(() => {
        let getlayer = this.view.map.allLayers.find((baselayer: any) => {
          return baselayer.label === label;
        });
        params.visible = getlayer.visible;
        _this.addDrawLayer(params);
      }, refreshInterval * 1000 * 60);
    }
    if (layer) {
      this.view.map.remove(layer);
    }

    // return new Promise((resolve, reject) => {
    //   axios.get(url).then((res: any) => {
    //     //todo
    //     this.getFeature({
    //       data: res.data,
    //       label: label,
    //       renderer: renderer,
    //       visible: defaultVisible
    //     });
    //     resolve({
    //       status: 0,
    //       message: '添加图层' + label,
    //       result: {}
    //     });
    //   });
    // });
    return new Promise((resolve) => {
      Promise.all([
        this.getLayerData(label, url),
        this.queryLayerData(dataUrl)
      ]).then((e: any) => {
        //更新graphic中状态;
        //console.log(e);
        if (e.length > 1) {
          this.getFeature({
            data: e[0],
            label: label,
            renderer: renderer,
            labelingInfo: labelingInfo,
            visible: defaultVisible,
            states: e[1]
          });
        }
      });
    });
  }
  public getLayerData(label: string, url: string): Promise<any> {
    let _this = this;
    return new Promise((resolve, reject) => {
      if (url) {
        let result = _this.dataJsonMap.get(label);
        if (result) {
          resolve(result);
        } else {
          axios.get(url).then((res: any) => {
            //todo
            resolve(res.data);
            _this.dataJsonMap.set(label, res.data);
          });
        }
      } else {
        resolve({data: []});
      }
    });
  }
  public queryLayerData(url: string): Promise<any> {
    let dataStates: {
      free: string[];
      jam: string[];
      crowd: string[];
      other: string[];
      state: boolean;
      num: number;
    } = {
      free: [],
      jam: [],
      crowd: [],
      other: [],
      state: true,
      num: 12
    };
    return new Promise((resolve, reject) => {
      if (url) {
        axios.get(url).then((res: any) => {
          //todo
          dataStates.state = true;
          res.data.forEach((item: any) => {
            if (item.STATE == 'free') {
              dataStates.free.push(item.SECTIONID);
            } else if (item.STATE == 'jam') {
              dataStates.jam.push(item.SECTIONID);
            } else if (item.STATE == 'crowd') {
              dataStates.crowd.push(item.SECTIONID);
            } else {
              dataStates.other.push(item.SECTIONID);
            }
          });
          resolve(dataStates);
        });
      } else {
        resolve(dataStates);
      }
    });
  }
  public async getFeature(param: any) {
    type MapModules = [
      typeof import('esri/geometry/support/jsonUtils'),
      typeof import('esri/Graphic'),
      typeof import('esri/geometry/Geometry'),
      typeof import('esri/layers/FeatureLayer'),
      typeof import('esri/renderers/HeatmapRenderer')
    ];
    const [
      jsonUtils,
      Graphic,
      Geometry,
      FeatureLayer,
      HeatmapRenderer
    ] = await (loadModules([
      'esri/geometry/support/jsonUtils',
      'esri/Graphic',
      'esri/geometry/Geometry',
      'esri/layers/FeatureLayer',
      'esri/renderers/HeatmapRenderer'
    ]) as Promise<MapModules>);
    let res = param.data;
    let states = param.states;
    res.fields.forEach((field: any) => {
      field.type = field.type.replace('esriFieldType', '').toLowerCase();
    });
    let renderer = res.renderer || param.renderer;
    let labelingInfo = res.labelingInfo || param.labelingInfo;
    let graphics = res.features.map((graphic: any) => {
      // return {
      //   geometry: jsonUtils.fromJSON(graphic.geometry),
      //   attributes: graphic.attributes
      // };
      if (states.state) {
        if (states.free.indexOf(graphic.attributes.SECTIONID) > -1) {
          graphic.attributes.STATE = 'free';
        } else if (states.jam.indexOf(graphic.attributes.SECTIONID) > -1) {
          graphic.attributes.STATE = 'jam';
        } else if (states.crowd.indexOf(graphic.attributes.SECTIONID) > -1) {
          graphic.attributes.STATE = 'crowd';
        } else {
          //graphic.attributes.STATE = 'other';
        }
      }
      return Graphic.fromJSON(graphic);
    });
    let drawlayer = new FeatureLayer({
      source: graphics,
      fields: res.fields,
      objectIdField: 'FID',
      geometryType: res.geometryType.replace('esriGeometry', '').toLowerCase(),
      renderer: renderer,
      visible: param.visible,
      outFields: ['*']
    });
    if (labelingInfo) {
      drawlayer.labelingInfo = labelingInfo;
    }
    if (param.label) {
      (drawlayer as any).label = param.label;
    }
    this.view.map.add(drawlayer, 0);
  }
  public getRender(): object {
    let renderer = {
      type: 'unique-value', // autocasts as new UniqueValueRenderer()
      field: 'STATE',
      defaultSymbol: {
        type: 'simple-fill',
        color: 'rgba(100, 210, 121, 255)',
        outline: {color: 'rgba(128,128,128,255)', width: 1}
      }, // autocasts as new SimpleFillSymbol()
      uniqueValueInfos: [
        {
          // All features with value of "North" will be blue
          value: 'free',
          symbol: {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: 'rgba(100, 210, 121, 255)',
            outline: {color: 'rgba(128,128,128,255)', width: 1}
          }
        },
        {
          // All features with value of "East" will be green
          value: 'jam',
          symbol: {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: 'rgba(255, 68, 68, 255)',
            outline: {color: 'rgba(128,128,128,255)', width: 1}
          }
        },
        {
          // All features with value of "South" will be red
          value: 'crowd',
          symbol: {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: 'rgba(255, 187, 51, 255)',
            outline: {color: 'rgba(128,128,128,255)', width: 1}
          }
        }
      ]
    };
    return renderer;
  }
  private getFont(field: string): any {
    let labelingInfo = [
      {
        labelExpressionInfo: {
          expression: '$feature.' + field
        },
        useCodedValues: true,
        labelPlacement: 'always-horizontal',
        symbol: {
          type: 'text', // autocasts as new TextSymbol()
          color: 'white',
          font: {
            // autocast as new Font()
            size: 12,
            weight: 'bord'
          }
        }
      }
    ];
    return labelingInfo;
  }
}

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
  private static instance: DrawLayer;

  private drawlayer!: any;
  private view!: __esri.MapView | __esri.SceneView;

  private constructor(view: __esri.MapView | __esri.SceneView) {
    this.view = view;
  }

  public static getInstance(view: __esri.MapView | __esri.SceneView) {
    if (!DrawLayer.instance) {
      DrawLayer.instance = new DrawLayer(view);
    }
    return DrawLayer.instance;
  }
  public static destroy() {
    (DrawLayer.instance as any) = null;
  }
  public clearDrawLayer(params: ILayerConfig) {}
  public addDrawLayer(params: any): Promise<IResult> {
    let label = params.label;
    let url = params.layerUrls;
    let dataUrl = params.dataUrl;

    return new Promise((resolve, reject) => {
      axios.get(url).then((res: any) => {
        //todo
        this.getFeature(label, res.data);
        resolve({
          status: 0,
          message: '',
          result: {}
        });
      });
    });
  }
  public async getFeature(label: string, res: any) {
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
    res.fields.forEach((field: any) => {
      field.type = field.type.replace('esriFieldType', '').toLowerCase();
    });
    let graphics = res.features.map((graphic: any) => {
      // return {
      //   geometry: jsonUtils.fromJSON(graphic.geometry),
      //   attributes: graphic.attributes
      // };
      return Graphic.fromJSON(graphic);
    });
    let drawlayer = new FeatureLayer({
      source: graphics,
      fields: res.fields,
      objectIdField: 'FID',
      geometryType: res.geometryType.replace('esriGeometry', '').toLowerCase(),
      renderer: this.getRender()
    });
    if (label) {
      (drawlayer as any).label = label;
    }
    this.view.map.add(drawlayer);
  }
  public getRender(): object {
    let renderer = {
      type: 'unique-value', // autocasts as new UniqueValueRenderer()
      field: 'Name',
      defaultSymbol: {
        type: 'simple-fill',
        color: 'rgba(100, 210, 121, 255)',
        outline: undefined
      }, // autocasts as new SimpleFillSymbol()
      uniqueValueInfos: [
        {
          // All features with value of "North" will be blue
          value: 'North',
          symbol: {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: 'blue'
          }
        },
        {
          // All features with value of "East" will be green
          value: 'East',
          symbol: {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: 'green'
          }
        },
        {
          // All features with value of "South" will be red
          value: 'South',
          symbol: {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: 'red'
          }
        },
        {
          // All features with value of "West" will be yellow
          value: 'West',
          symbol: {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            color: 'yellow'
          }
        }
      ]
    };
    return renderer;
  }
}

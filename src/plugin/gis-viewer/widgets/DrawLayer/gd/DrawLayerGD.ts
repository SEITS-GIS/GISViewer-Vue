import {
  IOverlayParameter,
  IPointSymbol,
  IResult,
  IOverlayDelete,
  IFindParameter,
  ILayerConfig
} from '@/types/map';
import axios from 'axios';
import '@amap/amap-jsapi-types';

export class DrawLayerGD {
  private static instance: DrawLayerGD;

  private drawlayer!: any;
  private view!: any;

  private constructor(view: AMap.Map) {
    this.view = view;
  }

  public static getInstance(view: AMap.Map) {
    if (!DrawLayerGD.instance) {
      DrawLayerGD.instance = new DrawLayerGD(view);
    }
    return DrawLayerGD.instance;
  }
  public static destroy() {
    (DrawLayerGD.instance as any) = null;
  }
  public clearDrawLayer(params: ILayerConfig) {}
  public addDrawLayer(params: any): Promise<IResult> {
    let label = params.label;
    let url = params.layerUrls || params.url;
    let dataUrl = params.dataUrl;
    let defaultVisible = params.visible !== false;
    let renderer = params.renderer || this.getRender();

    return new Promise((resolve, reject) => {
      axios.get(url).then((res: any) => {
        //todo
        this.getFeature({
          data: res.data,
          label: label,
          renderer: renderer,
          visible: defaultVisible
        });
        resolve();
      });
    });
  }
  public async getFeature(param: any) {}
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

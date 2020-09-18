import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IHeatPoint
} from '@/types/map';
import {loadModules} from 'esri-loader';
import {Point} from 'esri/geometry';
export class HeatMap {
  private static intances: Map<string, any>;
  private view!: any;
  private heatlayer: any;

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: __esri.MapView) {
    let id = view.container.id;
    if (!HeatMap.intances) {
      HeatMap.intances = new Map();
    }
    let intance = HeatMap.intances.get(id);
    if (!intance) {
      intance = new HeatMap(view);
      HeatMap.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (HeatMap.intances as any) = null;
  }

  public async deleteHeatMap() {
    this.clear();
  }
  private clear() {
    if (this.heatlayer) {
      this.view.map.remove(this.heatlayer);
    }
  }
  public async addHeatMap(params: IHeatParameter) {
    // Create featurelayer from client-side graphics
    this.clear();
    type MapModules = [
      typeof import('esri/Graphic'),
      typeof import('esri/layers/FeatureLayer'),
      typeof import('esri/renderers/HeatmapRenderer')
    ];
    const [Graphic, FeatureLayer, HeatmapRenderer] = await (loadModules([
      'esri/Graphic',
      'esri/layers/FeatureLayer',
      'esri/renderers/HeatmapRenderer'
    ]) as Promise<MapModules>);

    let points = params.points;
    let options = params.options;
    let graphics: any[] = [];
    let fields: any[] = [
      {
        name: 'ObjectID',
        alias: 'ObjectID',
        type: 'oid'
      }
    ];
    let fieldName = points[0].fields;
    for (let str in fieldName) {
      let fieldtype = 'string';
      if (str == options.field) {
        fieldtype = 'double';
      }
      fields.push({name: str, alias: str, type: fieldtype});
    }
    graphics = points.map((point: IHeatPoint) => {
      return new Graphic({
        geometry: {
          type: 'point',
          x: point.geometry.x,
          y: point.geometry.y
        } as any,
        attributes: point.fields
      });
    });
    this.heatlayer = new FeatureLayer({
      source: graphics,
      fields: fields,
      objectIdField: 'ObjectID',
      geometryType: 'point'
    });
    let layer = this.heatlayer;
    let maxzoom = options.zoom || 100;
    let colors = params.options.colors || [
      'rgb(255, 255, 255)',
      'rgb(255, 140, 0)',
      'rgb(255, 140, 0)',
      'rgb(255, 0, 0)'
    ];
    let simpleRenderer = this.getRender(options.renderer);
    let heatmapRenderer = {
      type: 'heatmap',
      field: options.field,
      colorStops: this.getHeatColor(colors),
      minPixelIntensity: 0,
      maxPixelIntensity: options.maxValue
    } as any;
    layer.renderer =
      this.view.zoom > maxzoom ? simpleRenderer : heatmapRenderer;
    this.view.map.add(layer);
    this.view.watch('zoom', (newValue: number) => {
      layer.renderer = newValue > maxzoom ? simpleRenderer : heatmapRenderer;
    });
  }
  private getRender(renderer: any): any {
    let newrender = renderer;
    if (newrender && newrender.symbol) {
      newrender.symbol.type = newrender.symbol.type
        .replace('esriPMS', 'picture-marker')
        .replace('esriSMS', 'simple-marker');
    }
    return newrender;
  }
  public getHeatColor(colors: string[] | undefined): any[] {
    let obj: any = [
      {ratio: 0, color: 'rgba(255, 255, 255, 0)'},
      {ratio: 0.2, color: 'rgba(255, 255, 255, 1)'},
      {ratio: 0.5, color: 'rgba(255, 140, 0, 1)'},
      {ratio: 0.8, color: 'rgba(255, 140, 0, 1)'},
      {ratio: 1, color: 'rgba(255, 0, 0, 1)'}
    ]; //默认值
    if (colors && colors.length >= 4) {
      //"rgba(30,144,255,0)","rgba(30,144,255)","rgb(0, 255, 0)","rgb(255, 255, 0)", "rgb(254,89,0)"
      let steps = [0.2, 0.5, 0.8, 1];
      let colorStops: any[] = [{ratio: 0, color: 'rgba(255, 255, 255, 0)'}];
      steps.forEach((element: number, index: number) => {
        colorStops.push({ratio: element, color: colors[index]});
      });
      console.log(colorStops);
      return colorStops;
    }
    return obj;
  }
  public async addOverlays(params: IHeatParameter) {}
}

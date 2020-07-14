import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IHeatPoint
} from '@/types/map';
import {loadModules} from 'esri-loader';
import {Point} from 'esri/geometry';
import HeatMap3DRender from './Render/HeatMap3DRender';
export class HeatMap3D {
  private static heatMap: HeatMap3D;
  private view!: any;

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: any) {
    if (!HeatMap3D.heatMap) {
      HeatMap3D.heatMap = new HeatMap3D(view);
    }
    return HeatMap3D.heatMap;
  }
  public static destroy() {
    (HeatMap3D.heatMap as any) = null;
  }

  public async deleteHeatMap() {
    this.clear();
  }
  private clear() {}
  public async addHeatMap(params: IHeatParameter) {
    // Create featurelayer from client-side graphics
    this.clear();

    let points = params.points;
    let options = params.options;

    let maxzoom = options.zoom || 0;
    let colors = params.options.colors || [
      'rgb(255, 255, 255)',
      'rgb(255, 140, 0)',
      'rgb(255, 140, 0)',
      'rgb(255, 0, 0)'
    ];
    let heatmapRenderer = HeatMap3DRender.getInstance(this.view);
    heatmapRenderer.startup({
      graphics: points,
      options: {
        zoom: maxzoom,
        colors: this.getHeatColor(colors),
        minValue: 0,
        maxValue: options.maxValue,
        radius: options.radius,
        field: options.field
      }
    });
    this.view.watch('zoom', (newValue: number) => {});
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

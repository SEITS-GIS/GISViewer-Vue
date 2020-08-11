import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IHeatPoint
} from '@/types/map';
import {loadModules} from 'esri-loader';
import {Point} from 'esri/geometry';
import HeatMap3DRender from './HeatMap3DRender';
import {OverlayArcgis3D} from '../../Overlays/arcgis/OverlayArcgis3D';
export class HeatMap3D {
  private static heatMap: HeatMap3D;
  private view!: any;
  private overlays: any;
  private handle: any;
  private state: string = 'heat';

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

    if (this.handle) {
      this.handle.remove();
    }
  }
  private clear() {
    let heatmapRenderer = HeatMap3DRender.getInstance(this.view);
    heatmapRenderer.clear();
    if (this.overlays) {
      this.overlays.deleteOverlays({types: ['heatpoint']});
    }
  }
  public async addHeatMap(params: IHeatParameter) {
    // Create featurelayer from client-side graphics

    let options = params.options;
    let maxzoom = options.zoom || 0;
    if (this.view.zoom > maxzoom) {
      this.addOverlays(params);
    } else {
      this.showHeatMap(params);
    }
    let that = this;
    this.handle = this.view.watch('zoom', (newValue: number) => {
      if (newValue > maxzoom) {
        //显示point
        if (that.state == 'heat') {
          this.addOverlays(params);
        }
      } else {
        //显示heat
        if (that.state == 'point') {
          this.showHeatMap(params);
        }
      }
    });
  }
  private showHeatMap(params: IHeatParameter) {
    this.state = 'heat';
    this.clear();
    let points = params.points;
    let options = params.options;

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
        colors: this.getHeatColor(colors),
        minValue: 0,
        maxValue: options.maxValue,
        radius: options.radius,
        field: options.field
      }
    });
  }
  public getHeatColor(colors: string[] | undefined): any[] {
    let obj: any = {};
    if (colors && colors.length >= 4) {
      //"rgba(30,144,255,0)","rgba(30,144,255)","rgb(0, 255, 0)","rgb(255, 255, 0)", "rgb(254,89,0)"
      let steps = ['0.2', '0.5', '0.8', '1'];
      let colorStops: any = {};
      steps.forEach((element: string, index: number) => {
        colorStops[element] = colors[index];
      });
      return colorStops;
    }
    return obj;
  }
  public async addOverlays(params: IHeatParameter) {
    this.state = 'point';
    this.clear();
    const points = params.points;
    const options = params.options;
    const renderer = options.renderer;
    let symbol;
    if (options.renderer) {
      symbol = {
        type: 'point-2d',
        url: renderer.symbol.url,
        width: renderer.symbol.width,
        height: renderer.symbol.height,
        xoffset: renderer.symbol.xoffset || 0,
        yoffset: renderer.symbol.yoffset || 0
      };
    }
    let overlayparams = {
      defaultSymbol: symbol,
      overlays: points,
      type: 'heatpoint'
    };
    this.overlays = OverlayArcgis3D.getInstance(this.view);
    await this.overlays.addOverlays(overlayparams);
  }
}

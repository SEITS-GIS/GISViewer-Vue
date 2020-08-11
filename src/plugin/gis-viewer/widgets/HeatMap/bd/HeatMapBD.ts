import {IOverlayParameter, IResult, IHeatParameter} from '@/types/map';
import {OverlayBaidu} from '../../Overlays/bd/OverlayBaidu';
declare let BMapLib: any;

export class HeatMapBD {
  private static heatMapBD: HeatMapBD;
  private view!: any;
  private heatmapOverlay: any;
  private _state: string = 'nomal';
  private zoomEvent: any;
  private overlays: any;

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: any) {
    if (!HeatMapBD.heatMapBD) {
      HeatMapBD.heatMapBD = new HeatMapBD(view);
    }
    return HeatMapBD.heatMapBD;
  }
  public isSupportCanvas() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  }
  public async deleteHeatMap() {
    this._clear();
    this.view.removeEventListener('zoomend', this.zoomEvent);
  }
  public _clear() {
    this.view.removeOverlay(this.heatmapOverlay);
    if (this.overlays) {
      this.overlays.deleteOverlays({types: ['heatpoint']});
    }
  }
  public async addHeatLayer(params: IHeatParameter): Promise<IResult> {
    const options = params.options;
    const countField = options.field;
    const radius = options.radius;
    const colors = options.colors || undefined;
    const maxValue = options.maxValue || 100;

    const points = params.points;
    let heatPoints = new Array();

    points.forEach((point) => {
      heatPoints.push({
        lng: point.geometry.x,
        lat: point.geometry.y,
        count: point.fields[countField]
      });
    });
    let gradient = this.getHeatColor(colors);
    this.heatmapOverlay = new BMapLib.HeatmapOverlay({
      radius: radius,
      gradient: gradient
    });
    this.view.addOverlay(this.heatmapOverlay);
    this.heatmapOverlay.setDataSet({data: heatPoints, max: maxValue});

    return {
      status: 0,
      message: 'ok'
    };
  }
  public async addHeatMap(params: IHeatParameter) {
    if (!this.isSupportCanvas()) {
      alert(
        '热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~'
      );
    }
    const options = params.options;

    const zoom = options.zoom || 0;

    const _this = this;
    if (zoom > 0) {
      if (this.view.getZoom() <= zoom) {
        this.addHeatLayer(params);
        this._state = 'hot';
      } else {
        this.addOverlays(params);
        this._state = 'nomal';
      }
      this.view.addEventListener(
        'zoomend',
        (this.zoomEvent = function(e: any) {
          if (e.target.getZoom() <= zoom) {
            if (_this._state == 'nomal') {
              _this._clear();
              _this.addHeatLayer(params);
              _this._state = 'hot';
            }
          } else {
            if (_this._state == 'hot') {
              _this._clear();
              _this.addOverlays(params);
              _this._state = 'nomal';
            }
          }
        })
      );
    } else {
      this.addHeatLayer(params);
      this._state = 'hot';
    }
  }
  public getHeatColor(colors: string[] | undefined): any {
    let obj: any = {
      0.2: 'rgb(0, 255, 255)',
      0.5: 'rgb(0, 110, 255)',
      0.8: 'rgb(100, 0, 255)'
    };
    if (colors && colors.length >= 4) {
      //"rgba(30,144,255,0)","rgba(30,144,255)","rgb(0, 255, 0)","rgb(255, 255, 0)", "rgb(254,89,0)"
      return {
        0.2: colors[0],
        0.4: colors[1],
        0.6: colors[2],
        0.8: colors[3]
      };
    }
    return obj;
  }
  public async addOverlays(params: IHeatParameter) {
    const points = params.points;
    const options = params.options;
    const renderer = options.renderer;
    let symbol;
    if (options.renderer) {
      symbol = {
        type: 'point',
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
    this.overlays = OverlayBaidu.getInstance(this.view);
    await this.overlays.addOverlays(overlayparams);
  }
}

import {IOverlayParameter, IResult, IHeatParameter} from '@/types/map';
import {OverlayGaode} from '../../Overlays/gd/OverlayGaode';
declare let AMap: any;

export class HeatMapGD {
  private static heatMap: HeatMapGD;
  private view!: any;
  private heatmapOverlay: any;
  private _state: string = 'nomal';
  private zoomEvent: any;
  private overlays: any;

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: any) {
    if (!HeatMapGD.heatMap) {
      HeatMapGD.heatMap = new HeatMapGD(view);
    }
    return HeatMapGD.heatMap;
  }
  public static destroy() {
    (HeatMapGD.heatMap as any) = null;
  }
  public isSupportCanvas() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  }
  public async deleteHeatMap() {
    this._clear();
    this.view.off('zoomend', this.zoomEvent);
  }
  public _clear() {
    //this.view.remove(this.heatmapOverlay);
    if (this.heatmapOverlay) {
      this.heatmapOverlay.hide();
    }
    if (this.overlays) {
      this.overlays.deleteOverlays({types: ['heatpoint']});
    }
  }
  public async addHeatLayer(params: IHeatParameter): Promise<IResult> {
    this._clear();
    const options = params.options;
    const countField = options.field;
    let radius = options.radius || undefined;
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
    if (this.view.getViewMode_() == '3D') {
      radius = undefined;
    }
    if (AMap.HeatMap) {
      this.heatmapOverlay = new AMap.HeatMap(this.view, {
        //radius: radius,
        opacity: [0, 1],
        gradient: gradient,
        '3d': {
          //热度转高度的曲线控制参数，可以利用左侧的控制面板获取
          heightBezier: [0.4, 0.2, 0.4, 0.8],
          //取样精度，值越小，曲面效果越精细，但同时性能消耗越大
          gridSize: 5,
          heightScale: 1
        }
      });
    } else {
      this.heatmapOverlay = new AMap.Heatmap(this.view, {
        //radius: radius,
        opacity: [0, 1],
        gradient: gradient,
        '3d': {
          //热度转高度的曲线控制参数，可以利用左侧的控制面板获取
          heightBezier: [0.4, 0.2, 0.4, 0.8],
          //取样精度，值越小，曲面效果越精细，但同时性能消耗越大
          gridSize: 5,
          heightScale: 1
        }
      });
    }
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

      this.view.on(
        'zoomend',
        (this.zoomEvent = (e: any) => {
          if (_this.view.getZoom() <= zoom) {
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
      let step: string = (1 / colors.length).toFixed(2);
      let colorObj: any = {};
      colors.forEach((element: string, index: number) => {
        let cur_step = parseFloat((Number(step) * (index + 1)).toFixed(2));
        colorObj[cur_step] = element;
      });
      return colorObj;
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
        size: [renderer.symbol.width, renderer.symbol.height],
        xoffset: renderer.symbol.xoffset || 0,
        yoffset: renderer.symbol.yoffset || 0
      };
    }
    let overlayparams = {
      defaultSymbol: symbol,
      overlays: points,
      type: 'heatpoint'
    };
    this.overlays = OverlayGaode.getInstance(this.view);
    await this.overlays.addOverlays(overlayparams);
  }
}

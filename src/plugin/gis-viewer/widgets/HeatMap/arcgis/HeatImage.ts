import {IHeatImageParameter} from '@/types/map';
import {loadModules} from 'esri-loader';

export class HeatImage {
  private static intances: Map<string, any>;
  private view!: any;
  private heatlayer: any;
  private image: any;
  private canvas: any;
  private heatmapInstance: any;
  private pointdata: any;
  private options: any;
  private imageOpt: any;
  private imagePos: any;
  private modules: any;
  private scale: number = 144447;
  private step: number = 1;
  private centerwatchHandle: any;
  private scalewatchHandle: any;

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: any) {
    let id = view.container.id;
    if (!HeatImage.intances) {
      HeatImage.intances = new Map();
    }
    let intance = HeatImage.intances.get(id);
    if (!intance) {
      intance = new HeatImage(view);
      HeatImage.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (HeatImage.intances as any) = null;
  }

  public async deleteHeatImage() {
    this.clear();
  }
  private clear() {
    if (this.canvas) {
      this.canvas.parentNode.removeChild(this.canvas);
      this.canvas = null;
    }
    if (this.centerwatchHandle) {
      this.centerwatchHandle.remove();
      this.scalewatchHandle.remove();
      this.centerwatchHandle = null;
      this.scalewatchHandle = null;
    }
  }
  public async addHeatImage(params: IHeatImageParameter) {
    // Create featurelayer from client-side graphics
    this.clear();
    let options = params.options;
    this.options = options;
    let points = params.points;
    let imageOpt = params.images;
    this.imageOpt = imageOpt;
    this.step = this.scale / this.view.scale;
    this.modules = await loadModules([
      'esri/geometry/Point',
      'libs/heatmap.min.js'
    ]);
    const [Point, h337] = this.modules;
    let canvas = document.createElement('div');
    canvas.style.width = this.view.width + 'px';
    canvas.style.height = this.view.height + 'px';
    canvas.setAttribute('id', 'heatmapdiv');
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    let parent = document.getElementsByClassName('esri-overlay-surface')[0];
    parent.appendChild(canvas);
    this.canvas = canvas;
    this.image = new Image();
    this.image.src = imageOpt.url || 'http://localhost/vc.png';
    this.image.width = this.imageOpt.width || 1133;
    this.image.height = this.imageOpt.height || 713;
    let that = this;
    this.image.onload = (e: any) => {
      var ctx = that.canvas.firstChild.getContext('2d');
      ctx.globalCompositeOperation = 'destination-atop';

      let point = new Point({
        x: imageOpt.geometry.x,
        y: imageOpt.geometry.y,
        spatialReference: {wkid: 4326}
      });

      this.imagePos = point;
      let p = this.view.toScreen(point);
      let width = Math.floor(this.imageOpt.width * this.step);
      let height = Math.floor(this.imageOpt.height * this.step);
      that.canvas.firstChild
        .getContext('2d')
        .drawImage(that.image, p.x, p.y, width, height);
    };

    let rad = Number(options.radius);
    rad = Math.max(1, Math.floor(rad * this.step));
    this.heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: this.canvas,
      radius: rad,
      gradient: this.getHeatColor(options.colors),
      maxOpacity: 1,
      minOpacity: 0,
      blur: 1
    });
    let fieldName = this.options.field;
    this.pointdata = [];
    points.forEach((graphic: any) => {
      let point = new Point({
        x: graphic.geometry.x,
        y: graphic.geometry.y,
        spatialReference: {wkid: 4326}
      });
      let p = this.view.toScreen(point);
      let data = {
        x: Math.floor(p.x),
        y: Math.floor(p.y),
        point: point,
        value: graphic.fields[fieldName] || 0
      };
      this.pointdata.push(data);
    });
    var data = {
      max: options.maxValue,
      min: 0,
      data: this.pointdata
    };
    this.heatmapInstance.setData(data);
    if (!this.centerwatchHandle) {
      this.centerwatchHandle = this.view.watch('center', (e: any) => {
        that.refreshHeatLayer();
      });
      this.scalewatchHandle = this.view.watch(
        'scale',
        (newValue: any, oldValue: any) => {
          let step = that.scale / newValue;
          that.step = step;
          that.refreshHeatLayer();
        }
      );
    }
  }
  public refreshHeatLayer() {
    let step = this.step;
    let that = this;
    let points = this.pointdata.map((point: any) => {
      let pp = that.view.toScreen(point.point);
      return {
        x: Math.floor(pp.x),
        y: Math.floor(pp.y),
        value: point.value
      };
    });
    var data = {
      max: this.options.maxValue,
      min: this.options.minValue,
      data: points
    };
    let rad = this.options.radius;
    rad = Math.max(1, Math.floor(rad * step));
    that.canvas.innerHTML = '';
    this.heatmapInstance = this.modules[1].create({
      // only container is required, the rest will be defaults
      container: this.canvas,
      radius: rad,
      gradient: this.getHeatColor(this.options.colors),
      maxOpacity: 1,
      minOpacity: 0,
      blur: 1
    });
    this.heatmapInstance.setData(data);
    let p = this.view.toScreen(this.imagePos);
    let width = Math.floor(this.imageOpt.width * step);
    let height = Math.floor(this.imageOpt.height * step);
    let ctx = this.canvas.firstChild.getContext('2d');
    ctx.globalCompositeOperation = 'destination-atop';
    ctx.drawImage(this.image, p.x, p.y, width, height);
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
}

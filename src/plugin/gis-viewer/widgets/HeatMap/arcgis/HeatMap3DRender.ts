import {loadModules} from 'esri-loader';
export default class HeatMap3DRender {
  private view: any;
  private static instance: HeatMap3DRender;
  private heatRender: any;
  private constructor(view: __esri.SceneView) {
    // Geometrical transformations that must be recomputed
    // from scratch at every frame.
    this.view = view;
  }
  public static getInstance(view: __esri.SceneView) {
    if (!HeatMap3DRender.instance) {
      HeatMap3DRender.instance = new HeatMap3DRender(view);
    }
    return HeatMap3DRender.instance;
  }
  public async startup(param: {graphics: any[]; options: any}) {
    let that = this;
    loadModules(['esri/views/3d/externalRenderers']).then(
      ([externalRenderers]) => {
        if (that.heatRender) {
          externalRenderers.remove(this.view, this.heatRender);
          that.heatRender.clear();
          that.heatRender = null;
        }
        that.heatRender = new HeatMapRender(
          that.view,
          param.graphics,
          param.options
        );
        externalRenderers.add(this.view, this.heatRender);
      }
    );
  }
  public async clear() {
    let that = this;
    loadModules(['esri/views/3d/externalRenderers']).then(
      ([externalRenderers]) => {
        if (that.heatRender) {
          externalRenderers.remove(this.view, this.heatRender);
          that.heatRender.clear();
          that.heatRender = null;
        }
      }
    );
  }
}
class HeatMapRender {
  private aPosition = 0;
  private aOffset = 1;

  private view: any;
  private canvas: any;
  private aClass: any;
  private heatmapInstance: any;
  private pointdata: any = [];
  private omax: any;
  private options: any;
  private graphics: any;

  public constructor(view: __esri.SceneView, graphics: any[], options: any) {
    // Geometrical transformations that must be recomputed
    // from scratch at every frame.
    this.view = view;
    this.graphics = graphics;
    this.options = options;
  }

  // Called once a custom layer is added to the map.layers collection and this layer view is instantiated.
  public async setup(context: any) {
    this.aClass = await loadModules([
      'esri/geometry/Point',
      'libs/heatmap.min.js'
    ]);
    const [Point, h337] = this.aClass;
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

    this.heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: this.canvas,
      radius: this.options.radius,
      gradient: this.options.colors,
      maxOpacity: 0.5,
      minOpacity: 0,
      blur: 0.75
    });

    let points = [];
    let fieldName = this.options.field;
    this.graphics.forEach((graphic: any) => {
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
      max: this.options.maxValue,
      min: this.options.minValue,
      data: this.pointdata
    };
    this.heatmapInstance.setData(data);
  }
  private async refreshLayer() {
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
    this.heatmapInstance.setData(data);
  }
  // Called every time a frame is rendered.
  private async render(context: any) {
    if (this.heatmapInstance) {
      this.refreshLayer();
    }
    context.resetWebGLState();
  }
  // Called internally from render().
  public async clear() {
    if (this.canvas) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

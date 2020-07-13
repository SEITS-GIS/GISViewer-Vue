import {loadModules} from 'esri-loader';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
//import * as THREE from 'three';
declare let h337: any;
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
  public async startup(graphics: any[]) {
    let that = this;
    loadModules(['esri/views/3d/externalRenderers']).then(
      ([externalRenderers]) => {
        if (that.heatRender) {
          externalRenderers.remove(this.view, this.heatRender);
          that.heatRender.clear();
          that.heatRender = null;
        }
        that.heatRender = new HeatMapRender(that.view, graphics, {});
        externalRenderers.add(this.view, this.heatRender);
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

  public constructor(view: __esri.SceneView, graphics: any[], options: any) {
    // Geometrical transformations that must be recomputed
    // from scratch at every frame.
    this.view = view;
  }

  // Called once a custom layer is added to the map.layers collection and this layer view is instantiated.
  public async setup(context: any) {
    this.aClass = await loadModules([
      'esri/geometry/Point',
      'esri/geometry/support/webMercatorUtils',
      'esri/geometry/SpatialReference'
    ]);
    const [Point, webMercatorUtils, SpatialReference] = this.aClass;

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
      radius: 10,
      maxOpacity: 0.5,
      minOpacity: 0,
      blur: 0.75
    });
    var points = [];
    var max = 0;
    var len = 100;

    while (len--) {
      var val = Math.floor(Math.random() * 120);
      // now also with custom radius
      var radius = Math.floor(Math.random() * 70);
      let x = 121 + Math.random() * 1;
      let y = 31 + Math.random() * 1;
      let pp = new Point({
        y: y,
        x: x,
        spatialReference: {wkid: 4326}
      });
      pp = webMercatorUtils.geographicToWebMercator(pp);
      let p = this.view.toScreen(pp);
      max = Math.max(max, val);
      var point = {
        x: Math.floor(p.x),
        y: Math.floor(p.y),
        point: pp,
        value: val,
        // radius configuration on point basis
        radius: radius
      };
      this.pointdata.push(point);
      points.push(point);
    }
    this.omax = max;
    var data = {
      max: max,
      data: points
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
        value: point.value,
        // radius configuration on point basis
        radius: point.radius
      };
    });
    var data = {
      max: this.omax,
      data: points
    };
    this.heatmapInstance.setData(data);
  }
  // Called every time a frame is rendered.
  private async render(context: any) {
    this.refreshLayer();
    context.resetWebGLState();
  }
  // Called internally from render().
  public async clear() {
    (document.getElementById('heatmapdiv') as any).innerHTML = '';
  }
}

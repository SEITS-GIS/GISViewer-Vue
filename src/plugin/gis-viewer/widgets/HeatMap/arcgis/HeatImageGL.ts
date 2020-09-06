import {loadModules} from 'esri-loader';
import {resolve, reject} from 'esri/core/promiseUtils';
import {offset} from 'esri/geometry/geometryEngine';
import {IHeatImageParameter} from '@/types/map';
export default class HeatImageGL {
  private static intances: Map<string, any>;
  public view: any;
  private heatmapInstance: any;
  private customLayer: any;
  private heat: any;
  private scale: number = 16000;
  private factor: number = 8;
  private imageCenter: any;
  private allImage: any;
  private heatData: any;
  private options: any;
  private imageOpt: any;

  private constructor(view: __esri.MapView | __esri.SceneView) {
    // Geometrical transformations that must be recomputed
    // from scratch at every frame.
    this.view = view;
  }
  public static getInstance(view: __esri.MapView | __esri.SceneView) {
    let id = view.container.id;
    if (!HeatImageGL.intances) {
      HeatImageGL.intances = new Map();
    }
    let intance = HeatImageGL.intances.get(id);
    if (!intance) {
      intance = new HeatImageGL(view);
      HeatImageGL.intances.set(id, intance);
    }
    return intance;
  }
  private clear() {
    if (this.customLayer) {
      this.view.map.remove(this.customLayer);
    }
    if (this.heat) {
      this.heat.parentNode.removeChild(this.heat);
      this.heat = null;
    }
  }
  public async addHeatImage(params: IHeatImageParameter) {
    this.clear();
    let options = params.options;
    this.options = options;
    let points = params.points;
    let imageOpt = params.images;
    this.imageOpt = imageOpt;
    this.scale = imageOpt.scale || this.scale;
    this.factor = imageOpt.factor || this.factor;
    this.imageCenter = imageOpt.center || imageOpt.geometry;

    let step = this.scale / this.view.scale;

    const [h337] = await loadModules(['libs/heatmap.min.js']);
    let heatDiv = document.createElement('div');
    heatDiv.style.width = this.view.width + 'px';
    heatDiv.style.height = this.view.height + 'px';
    heatDiv.setAttribute('id', 'heatmapdiv');
    heatDiv.style.position = 'absolute';
    heatDiv.style.top = '0px';
    heatDiv.style.left = '0px';
    heatDiv.style.opacity = '0.2';
    let parent = document.getElementsByClassName('esri-overlay-surface')[0];
    parent.appendChild(heatDiv);
    this.heat = heatDiv;
    let _this = this;
    this.view.watch('width,height', async (newValue: any) => {
      heatDiv.style.width = _this.view.width + 'px';
      heatDiv.style.height = _this.view.height + 'px';
    });

    let heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: heatDiv,
      radius: options.radius || 25,
      gradient: this.getHeatColor(options.colors),
      maxOpacity: 1,
      minOpacity: 0,
      blur: 0.75
    });
    let fieldName = options.field;
    let pdata = points.map((point: any) => {
      return {
        x: Math.floor(point.geometry.x),
        y: Math.floor(point.geometry.y),
        value: point.fields[fieldName] || 0
      };
    });
    var data = {
      max: options.maxValue || 1000,
      min: 0,
      data: pdata
    };
    this.heatData = pdata;
    heatmapInstance.setData(data);
    this.heatmapInstance = heatmapInstance;
    heatDiv.style.display = 'none';
    let image = new Image();
    image.src = imageOpt.url;
    image.setAttribute('crossOrigin', 'anonymous');
    image.width = this.imageOpt.width || 600;
    image.height = this.imageOpt.height || 600;
    this.allImage = image;
    image.onload = (e: any) => {
      this.startup(params);
    };
  }
  public getHeatColor(colors: string[] | undefined): any[] | undefined {
    let obj: any = {};
    if (colors && colors.length >= 4) {
      //"rgba(30,144,255,0)","rgba(30,144,255)","rgb(0, 255, 0)","rgb(255, 255, 0)", "rgb(254,89,0)"
      let steps = ['0.2', '0.5', '0.8', '1'];
      let colorStops: any = {};
      steps.forEach((element: string, index: number) => {
        colorStops[element] = colors[index];
      });
      return colorStops;
    } else {
      return undefined;
    }
  }
  public async startup(params: IHeatImageParameter) {
    let _that = this;
    let imageOpt = params.images;
    let pt = params.images.geometry;
    let options = params.options;
    await loadModules([
      'esri/views/2d/layers/BaseLayerView2D',
      'esri/geometry/Point',
      'esri/geometry/SpatialReference',
      'esri/layers/Layer',
      'libs/heatmap.min.js'
    ]).then(([BaseLayerView2D, Point, SpatialReference, Layer, h337]) => {
      let TileBorderLayerView2D = BaseLayerView2D.createSubclass({
        attach: () => {
          if (_that.imageCenter) {
            let point = new Point({
              x: _that.imageCenter.x,
              y: _that.imageCenter.y,
              spatialReference: _that.view.spatialReference
            });
            _that.view.goTo({center: point, scale: _that.scale / _that.factor});
          }
        },
        render: (renderParameters: any) => {
          var context = renderParameters.context;
          let step = _that.scale / _that.view.scale;
          let point = new Point({
            x: pt.x,
            y: pt.y,
            spatialReference: _that.view.spatialReference
          });
          let screenPoint = _that.view.toScreen(point);

          let xoffset = Math.min(screenPoint.x, 0);
          let yoffset = Math.min(screenPoint.y, 0);
          _that.heat.innerHTML = '';
          let heatmapInstance = h337.create({
            container: _that.heat,
            radius: (options.radius || 25) * step,
            gradient: this.getHeatColor(options.colors),
            maxOpacity: 1,
            minOpacity: 0,
            blur: 0.75
          });
          let pdata = _that.heatData.map((dt: any) => {
            let dx = Math.floor(dt.x * step + xoffset);
            let dy = Math.floor(dt.y * step + yoffset);
            return {
              x: dx,
              y: dy,
              value: dt.value
            };
          });

          var resdata = {
            max: options.maxValue || 1000,
            min: 0,
            data: pdata
          };
          try {
            heatmapInstance.setData(resdata);
          } catch (e) {}

          let canvas = _that.heat.firstChild;
          let cts = canvas.getContext('2d');
          if (pdata.length > 0) {
            cts.globalCompositeOperation = 'destination-atop';
          }
          cts.drawImage(
            _that.allImage,
            xoffset,
            yoffset,
            _that.allImage.width * step,
            _that.allImage.height * step
          );
          let devicePixelRatio = window.devicePixelRatio || 1;
          context.drawImage(
            canvas,
            Math.max(screenPoint.x, 0),
            Math.max(screenPoint.y, 0),
            canvas.width * devicePixelRatio,
            canvas.height * devicePixelRatio
          );
        }
      });
      let CustomTileLayer = Layer.createSubclass({
        createLayerView: (view: any) => {
          if (view.type === '2d') {
            return new TileBorderLayerView2D({
              view: view,
              layer: this
            });
          }
        }
      });
      let wmsLayer = new CustomTileLayer();
      _that.customLayer = wmsLayer;
      _that.view.map.layers.add(wmsLayer);
    });
  }
}

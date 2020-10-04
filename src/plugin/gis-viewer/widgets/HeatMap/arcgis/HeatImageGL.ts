import {loadModules} from 'esri-loader';
import {resolve, reject} from 'esri/core/promiseUtils';
import {offset} from 'esri/geometry/geometryEngine';
import {IHeatImageParameter} from '@/types/map';
import wifiJson from './config/wifi.json';
import ToolTip from '../../Overlays/arcgis/ToolTip';
import Axios from 'axios';

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
  private heatClickHandler: any;
  private tipTimeHangler: any;
  private wifiMax: number = 100;

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
    if (this.heatClickHandler) {
      this.heatClickHandler.remove();
      this.heatClickHandler = null;
    }
    ToolTip.clear(this.view, undefined, 'heatTip');
  }
  public deleteHeatImage() {
    this.addHeatImage({points: []});
  }
  public async addHeatImage(params: IHeatImageParameter) {
    this.clear();
    if (!params) {
      params = {};
    }
    let points = params.points || (await this.getHeatData());
    let options = params.options || {
      field: 'value',
      radius: 40,
      colors: undefined,
      backgroundColor: 'rgb(0, 255, 0)', // '#121212'
      maxValue: Math.max(this.wifiMax, 40),
      minValue: 1
    };
    this.options = options;
    let imageOpt = params.images || {
      geometry: {x: -14553.805845333449, y: -4137.1518463943485},
      width: 294,
      height: 103,
      url: './assets/HQ3.svg',
      center: {x: -13931.811607336222, y: -4354.546650737293},
      factor: 4,
      scale: this.scale
    };
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
    let parent = this.view.container.children[0].children[0];
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
      backgroundColor: 'rgb(0, 0, 255)', // '#121212'
      gradient: this.getHeatColor(options.colors),
      maxOpacity: 1,
      minOpacity: 0.3,
      blur: 0.75
    });
    let fieldName = options.field;
    let pdata = points.map((point: any) => {
      let pt = point.geometry || (wifiJson.geo as any)[point.fields.id];
      return {
        id: point.fields.id,
        x: Math.floor(pt.x),
        y: Math.floor(pt.y),
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
      this.startup();
    };
    if (!this.heatClickHandler) {
      this.heatImageClick();
    }
  }
  private async heatImageClick() {
    let coords = wifiJson.coords;
    let _this = this;
    const [geometryJsonUtils] = await loadModules([
      'esri/geometry/support/jsonUtils'
    ]);
    let poly = geometryJsonUtils.fromJSON({
      rings: wifiJson.rings,
      spatialReference: this.view.spatialReference
    });

    this.heatClickHandler = this.view.on('click', (event: any) => {
      ToolTip.clear(this.view, undefined, 'heatTip');
      if (event.mapPoint) {
        let mp = event.mapPoint;
        if (poly.contains(mp)) {
          let clickPoint = {
            x: mp.x,
            y: mp.y
          };
          let distances = new Array();
          for (let odid in coords) {
            let point = (coords as any)[odid];
            distances.push({
              id: odid,
              dis: _this.getDistance(point, clickPoint)
            });
          }
          distances.sort((dis1, dis2) => {
            return dis1.dis - dis2.dis;
          });
          let lastDir_id = distances[0].id;
          let a = _this.heatData.filter((dt: any) => {
            return dt.id == lastDir_id;
          });
          if (a.length > 0) {
            _this.showToolTip('流量：' + a[0].value.toString(), clickPoint);
          }
        }
      }
    });
  }
  private showToolTip(content: string, point: any) {
    if (this.tipTimeHangler) {
      clearTimeout(this.tipTimeHangler);
    }
    let _view = this.view;
    let tool = new ToolTip(
      this.view,
      {
        title: '',
        istip: true,
        content: content,
        className: 'heatTip'
      },
      {
        geometry: {
          x: point.x,
          y: point.y,
          spatialReference: this.view.spatialReference
        }
      }
    );
    this.tipTimeHangler = setTimeout(() => {
      ToolTip.clear(_view, undefined, 'heatTip');
    }, 5000);
  }
  private getDistance(pt: {x: number; y: number}, pt2: {x: number; y: number}) {
    return Math.sqrt(
      (pt.x - pt2.x) * (pt.x - pt2.x) + (pt.y - pt2.y) * (pt.y - pt2.y)
    );
  }
  public async getHeatData(): Promise<Array<any>> {
    let max = 0;
    let min = 1000000;
    let _this = this;
    return new Promise((resolve: any, reject: any) => {
      Axios.get(wifiJson.url).then((res: any) => {
        let results = new Array();
        if (res.data && res.data.length > 0) {
          let arr = new Array<number>(18);

          res.data.forEach((dt: any) => {
            let index = Number(dt.WIFI_ID) - 1;
            if (arr[index]) {
              arr[index] = arr[index] + Number(dt.PEOPLE_NUM);
            } else {
              arr[index] = Number(dt.PEOPLE_NUM);
            }
          });

          results = arr.map((dt: number, num: number) => {
            max = Math.max(Number(dt), max);
            if (dt > 0) {
              min = Math.min(Number(dt), min);
            }
            return {
              fields: {id: (num + 1).toString(), value: Math.floor(dt)}
            };
          });
        }
        console.log('max:' + max + ',min:' + min);
        _this.wifiMax = max;
        resolve(results);
      });
    });
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
      //return undefined;
      return {
        0.01: 'rgb(0,255,0)',
        0.3: 'rgb(173,255,47)',
        0.6: 'rgb(255, 255, 0)',
        0.8: 'rgb(255,215,0)',
        1.0: 'rgb(255,0,0)'
      } as any;
    }
  }
  public async startup() {
    let _that = this;
    let imageOpt = this.imageOpt;
    let pt = imageOpt.geometry;
    let options = this.options;
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
            backgroundColor: 'rgb(0, 0,255)', // '#121212'
            radius: (options.radius || 25) * step,
            gradient: this.getHeatColor(options.colors),
            maxOpacity: 1,
            minOpacity: 0.3,
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
          let devicePixelRatio = window.devicePixelRatio || 1;
          cts.drawImage(
            _that.allImage,
            xoffset,
            yoffset,
            _that.allImage.width * step,
            _that.allImage.height * step
          );

          context.drawImage(
            canvas,
            Math.max(screenPoint.x, 0) * devicePixelRatio,
            Math.max(screenPoint.y, 0) * devicePixelRatio,
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

import {IHeatImageParameter} from '@/types/map';
import {loadModules} from 'esri-loader';
import {resolve, reject} from 'esri/core/promiseUtils';
import {param} from 'jquery';
export default class HeatImage2D {
  private static intances: Map<string, any>;
  public view: any;
  private heatmapInstance: any;
  private customLayer: any;
  private scale: number = 8000;
  private heatDivs: Array<any> = new Array<any>();

  private constructor(view: __esri.MapView | __esri.SceneView) {
    // Geometrical transformations that must be recomputed
    // from scratch at every frame.
    this.view = view;
  }
  public static getInstance(view: any) {
    let id = view.container.id;
    if (!HeatImage2D.intances) {
      HeatImage2D.intances = new Map();
    }
    let intance = HeatImage2D.intances.get(id);
    if (!intance) {
      intance = new HeatImage2D(view);
      HeatImage2D.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (HeatImage2D.intances as any) = null;
  }
  private clear() {
    if (this.customLayer) {
      this.view.map.remove(this.customLayer);
    }
    if (this.heatDivs && this.heatDivs.length > 0) {
      this.heatDivs.forEach((div: any) => {
        div.parentNode.removeChild(div);
      });
      this.heatDivs = new Array<any>();
    }
  }
  public async addImage(params: IHeatImageParameter) {
    const [h337] = await loadModules(['libs/heatmap.min.js']);
    let heatDiv = document.createElement('div');
    heatDiv.style.width = this.view.width + 'px';
    heatDiv.style.height = this.view.height + 'px';
    heatDiv.setAttribute('id', 'heatmapdiv' + this.view.container.id);
    heatDiv.style.position = 'absolute';
    heatDiv.style.top = '0px';
    heatDiv.style.left = '0px';
    let parent = document.getElementsByClassName('esri-overlay-surface')[0];
    parent.appendChild(heatDiv);
    this.heatDivs.push(heatDiv);
    let data = params.points;
    let imageOpt = params.images || {
      url: '',
      width: 600,
      heigth: 600,
      center: {x: 0, y: 0}
    };
    let heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: heatDiv,
      radius: 23
    });
    if (data && data.length > 0) {
      heatmapInstance.setData(data);
    }
    this.heatmapInstance = heatmapInstance;

    heatDiv.style.display = 'none';
    let image = new Image();
    image.src = imageOpt.url;
    image.width = imageOpt.width;
    image.height = imageOpt.heigth;
    image.onload = (e: any) => {
      this.adds({
        image: image,
        imageOpt: imageOpt,
        heatDiv: heatDiv,
        heatData: data
      });
    };
  }
  public async adds(opt: any) {
    //this.clear();
    //this.graphics = graphics;
    let _that = this;
    let pt = opt.imageOpt.geometry;
    await loadModules([
      'esri/views/2d/layers/BaseLayerView2D',
      'esri/layers/BaseDynamicLayer',
      'esri/geometry/Point',
      'esri/geometry/SpatialReference',
      'esri/layers/GraphicsLayer',
      'esri/Graphic',
      'esri/core/watchUtils',
      'libs/heatmap.min.js'
    ]).then(
      ([
        BaseLayerView2D,
        BaseDynamicLayer,
        Point,
        SpatialReference,
        GraphicsLayer,
        Graphic,
        watchUtils,
        h337
      ]) => {
        let CustomWMSLayer = BaseDynamicLayer.createSubclass({
          properties: {
            mapUrl: null,
            mapParameters: null
          },
          load: (signal: any) => {
            console.log(signal);
          },
          fetchImage: (extent: any, width: any, height: any): Promise<any> => {
            // generate the URL for the map image
            // create a canvas with teal fill
            //this.getImageUrl(extent, width, height);
            //options.signal =
            opt.heatDiv.innerHTML = '';

            let step = _that.scale / _that.view.scale;

            let point = new Point({
              x: pt.x,
              y: pt.y,
              spatialReference: _that.view.spatialReference
            });

            let pcc = _that.view.toScreen(point);

            if (opt.heatData) {
              let heatmapInstance = h337.create({
                // only container is required, the rest will be defaults
                container: opt.heatDiv,
                radius: 23 * step
              });
              let pdata = opt.heatData.map((dt: any) => {
                let dx = Math.floor(dt.x * step + pcc.x);
                let dy = Math.floor(dt.y * step + pcc.y);
                return {
                  x: dx,
                  y: dy,
                  value: dt.value
                };
              });
              var resdata = {
                max: 1000,
                min: 0,
                data: pdata
              };
              heatmapInstance.setData(resdata);
            }
            //console.log(step);
            return new Promise((resolve, reject) => {
              let canvas = opt.heatDiv.firstChild;
              let context = canvas.getContext('2d');

              context.globalCompositeOperation = 'destination-atop';
              context.drawImage(
                opt.image,
                pcc.x,
                pcc.y,
                opt.imageOpt.width * step,
                opt.imageOpt.height * step
              );

              resolve(canvas);
            });

            //return 'http://localhost/gz.svg';
          }
          // Override the getImageUrl() method to generate URL
          // to an image for a given extent, width, and height.
          // fetchImage: (extent: any, width: any, height: any) => {
          //   var url = this.getImageUrl(extent, width, height);
          //   // request for the image  based on the generated url
          //   return esriRequest(url, {
          //     responseType: 'image'
          //   }).then(
          //     function(response) {
          //       var image = response.data;

          //       // create a canvas with teal fill
          //       var canvas = document.createElement('canvas');
          //       var context = canvas.getContext('2d');
          //       canvas.width = width;
          //       canvas.height = height;

          //       // Apply destination-atop operation to the image returned from the server
          //       context.fillStyle = 'rgb(0,200,200)';
          //       context.fillRect(0, 0, width, height);
          //       context.globalCompositeOperation = 'destination-atop';
          //       context.drawImage(image, 0, 0, width, height);

          //       return canvas;
          //     }.bind(this)
          //   );
          // }
        });
        let wmsLayer = new CustomWMSLayer({
          mapUrl: opt.imageOpt.url,
          mapParameters: {
            WIDTH: '{width}',
            HEIGHT: '{height}',
            CRS: 'EPSG:{wkid}',
            BBOX: '{xmin},{ymin},{xmax},{ymax}'
          }
        });
        wmsLayer.maxScale = opt.imageOpt.maxScale || 0;
        wmsLayer.minScale = opt.imageOpt.minScale || 0;
        _that.customLayer = wmsLayer;
        _that.view.map.layers.add(wmsLayer, 0);
      }
    );
  }
}

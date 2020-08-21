import {loadModules} from 'esri-loader';
import {resolve, reject} from 'esri/core/promiseUtils';
export default class HeatImage2D {
  private static intances: Map<string, any>;
  public view: any;
  private heatmapInstance: any;
  private customLayer: any;
  private heat: any;
  private scale: number = 144447;
  private allImage: any;

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
    if (this.heat) {
      this.heat.parentNode.removeChild(this.heat);
      this.heat = null;
    }
  }
  public async startup() {
    const [h337] = await loadModules(['libs/heatmap.min.js']);
    let heatDiv = document.createElement('div');
    heatDiv.style.width = this.view.width + 'px';
    heatDiv.style.height = this.view.height + 'px';
    heatDiv.setAttribute('id', 'heatmapdiv');
    heatDiv.style.position = 'absolute';
    heatDiv.style.top = '0px';
    heatDiv.style.left = '0px';
    let parent = document.getElementsByClassName('esri-overlay-surface')[0];
    parent.appendChild(heatDiv);
    this.heat = heatDiv;

    let heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: heatDiv,
      radius: 23
    });
    var data = {
      max: 1000,
      min: 0,
      data: [
        {x: 1500, y: 60, value: 500},
        {x: 1300, y: 650, value: 500},
        {x: 1870, y: 825, value: 1500}
      ]
    };
    heatmapInstance.setData(data);
    this.heatmapInstance = heatmapInstance;
    heatDiv.style.display = 'none';
    let image = new Image();
    image.src = 'http://localhost/gz.svg';
    image.width = 600;
    image.height = 600;
    this.allImage = image;
    image.onload = (e: any) => {
      this.adds();
    };
  }
  public async adds() {
    this.clear();
    //this.graphics = graphics;
    let _that = this;
    let pt = [121.43, 31.15];
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
          refresh: () => {
            //this.fetchImage();
          },
          fetchImage: (extent: any, width: any, height: any): Promise<any> => {
            // generate the URL for the map image
            // create a canvas with teal fill
            //this.getImageUrl(extent, width, height);
            //options.signal =
            _that.heat.innerHTML = '';

            let step = _that.scale / _that.view.scale;

            let point = new Point({
              x: pt[0],
              y: pt[1],
              spatialReference: new SpatialReference({wkid: 4326})
            });

            let pcc = _that.view.toScreen(point);
            console.log(pcc);
            let heatmapInstance = h337.create({
              // only container is required, the rest will be defaults
              container: _that.heat,
              radius: 23 * step
            });
            let pdata: any = [];
            for (let i = 0; i < 400; i++) {
              var temp = Math.floor(Math.random() * 1000) % 2 == 0 ? 1 : -1;
              var temp2 = Math.floor(Math.random() * 1000) % 3 == 0 ? 1 : -1;
              var x1 = 1 + (1 * (Math.random() * 1000 - 1)) / 2;
              var y1 = 1 + (1 * (Math.random() * 300 - 1)) / 2;
              var value = Math.floor(1000 * Math.random() + 1);
              pdata.push({
                x: Math.floor(x1 * step + pcc.x),
                y: Math.floor(y1 * step + pcc.y),
                value: value
              });
            }
            var resdata = {
              max: 1000,
              min: 0,
              data: pdata
            };
            heatmapInstance.setData(resdata);
            //console.log(step);
            return new Promise((resolve, reject) => {
              //   let image = new Image();
              //   image.src = 'http://localhost/gz.svg';
              //   image.width = 1133;
              //   image.height = 300;
              //   image.onload = (e: any) => {};
              let canvas = _that.heat.firstChild;
              //   canvas.width = width * step;
              //   canvas.height = height * step;
              let context = canvas.getContext('2d');

              console.log('2222::::' + pcc.x + ',' + pcc.y);
              context.globalCompositeOperation = 'destination-atop';
              context.drawImage(
                _that.allImage,
                pcc.x,
                pcc.y,
                600 * step,
                600 * step
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
          mapUrl: 'http://localhost/gz.svg',
          mapParameters: {
            WIDTH: '{width}',
            HEIGHT: '{height}',
            CRS: 'EPSG:{wkid}',
            BBOX: '{xmin},{ymin},{xmax},{ymax}'
          }
        });
        _that.customLayer = wmsLayer;
        _that.view.map.layers.add(wmsLayer);
        watchUtils.watch(
          _that.view,
          'extent',
          (newValue: any, oldValue: any) => {
            //console.log(_that.customLayer);
            _that.customLayer.refresh();
          }
        );
      }
    );
  }
}

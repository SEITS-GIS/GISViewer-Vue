import {
  IOverlayParameter,
  IPointSymbol,
  IResult,
  IOverlayDelete,
  IFindParameter,
  ILayerConfig,
  IDrawOverlays
} from '@/types/map';
import axios from 'axios';
import {loadModules} from 'esri-loader';
import {resolve} from 'esri/core/promiseUtils';

export class DrawOverlays {
  private static intances: Map<string, any>;

  private drawlayer!: any;
  private view!: __esri.MapView | __esri.SceneView;
  private dataJsonMap: Map<string, any> = new Map();
  private sketchVM: any;

  private constructor(view: __esri.MapView | __esri.SceneView) {
    this.view = view;
  }

  public static getInstance(view: __esri.MapView | __esri.SceneView) {
    let id = view.container.id;
    if (!DrawOverlays.intances) {
      DrawOverlays.intances = new Map();
    }
    let intance = DrawOverlays.intances.get(id);
    if (!intance) {
      intance = new DrawOverlays(view);
      DrawOverlays.intances.set(id, intance);
    }
    return intance;
  }
  public clear() {
    if (this.drawlayer) {
      this.drawlayer.removeAll();
    }
  }
  public stopDrawOverlays() {
    if (this.drawlayer) {
      this.drawlayer.removeAll();
      this.drawlayer = undefined;
    }
    if (this.sketchVM) {
      this.sketchVM.destroy();
      this.sketchVM = undefined;
    }
  }
  public async startDrawOverlays(params: IDrawOverlays): IPromise<void> {
    let repeat = params.repeat !== false;
    if (!repeat) {
      this.clear();
    }
    if (!this.sketchVM) {
      await this.createSketch(params);
    }
    this.sketchVM.create('polygon');
  }
  public async createSketch(params: any) {
    let callback = params.callback;
    let update = params.update !== false;
    type MapModules = [
      typeof import('esri/widgets/Sketch/SketchViewModel'),
      typeof import('esri/geometry/support/webMercatorUtils')
    ];
    const [SketchViewModel, WebMercatorUtils] = await (loadModules([
      'esri/widgets/Sketch/SketchViewModel',
      'esri/geometry/support/webMercatorUtils'
    ]) as Promise<MapModules>);
    let drawlayer = await this.createOverlaysLayer();
    this.drawlayer = drawlayer;
    this.sketchVM = new SketchViewModel({
      layer: this.drawlayer,
      view: this.view,
      updateOnGraphicClick: false,
      defaultUpdateOptions: {
        toggleToolOnClick: true,
        enableRotation: true,
        multipleSelectionEnabled: true
      },
      polygonSymbol: {
        type: 'simple-fill', // autocasts as new SimpleMarkerSymbol()
        color: [23, 145, 252, 0.4],
        outline: {
          style: 'dash',
          color: [255, 0, 0, 0.8],
          width: 2
        }
      },
      polylineSymbol: {
        type: 'simple-line',
        color: [255, 0, 0],
        width: 2
      },
      pointSymbol: {
        type: 'simple-marker',
        style: 'circle',
        size: 16,
        color: [255, 0, 0],
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      }
    });
    let _this = this;
    // listen to create event, only respond when event's state changes to complete
    this.sketchVM.on('create', (event: any) => {
      if (event.state === 'complete') {
        if (callback) {
          callback(event.graphic.geometry);
        }
      }
    });

    let _view = this.view;
    if (update) {
      this.view.on('click', async (event) => {
        const response = await _view.hitTest(event);
        if (!_this.sketchVM) {
          return;
        }
        if (_this.sketchVM.state === 'active') {
          return;
        }
        if (response.results.length > 0) {
          let geometry = response.results[0].graphic.geometry;
          if (this.view.spatialReference.isWebMercator) {
            if (geometry.spatialReference.isWGS84) {
              geometry = WebMercatorUtils.geographicToWebMercator(geometry);
            }
          }
          response.results[0].graphic.geometry = geometry;
          _this.sketchVM.update([response.results[0].graphic], 'reshape');
        }
      });
    }
  }
  private async createOverlaysLayer() {
    type MapModules = [typeof import('esri/layers/GraphicsLayer')];
    const [GraphicsLayer] = await (loadModules([
      'esri/layers/GraphicsLayer'
    ]) as Promise<MapModules>);

    let layer = this.view.map.allLayers.find((baselayer: any) => {
      return baselayer.label === 'drawOverlays';
    });
    if (!layer) {
      let drawlayer = new GraphicsLayer();
      (drawlayer as any).label = 'drawOverlays';
      this.view.map.add(drawlayer, 0);
      layer = drawlayer;
    }
    return layer;
  }
  public async getDrawOverlays(): Promise<IResult> {
    let _this = this;
    return new Promise((resolve: any, reject: any) => {
      let layer = _this.view.map.allLayers.find((baselayer: any) => {
        return (
          baselayer.type == 'graphics' && baselayer.label === 'drawOverlays'
        );
      });
      if (!layer) {
        resolve({status: 0, message: '', result: {}});
      }
      let overlays: any[] = [];
      (layer as __esri.GraphicsLayer).graphics.forEach(
        (graphic: __esri.Graphic, index: number) => {
          let symbol;
          if (graphic.geometry.type == 'polyline') {
            symbol = {
              type: 'simple-line',
              color: [255, 255, 0],
              width: 2
            };
          } else if (graphic.geometry.type == 'polygon') {
            symbol = {
              type: 'simple-fill',
              color: [23, 145, 252, 0.4],
              outline: {
                style: 'dash',
                color: [255, 255, 0, 0.8],
                width: 2
              }
            };
          } else {
            //point
            symbol = {
              type: 'simple-marker',
              style: 'circle',
              size: 16,
              color: [255, 0, 0],
              outline: {
                color: [255, 255, 255],
                width: 2
              }
            };
          }
          overlays.push({
            geometry: graphic.geometry,
            fields: {
              id: 'drawoverlay' + index.toString(),
              type: 'drawOverlays'
            },
            symbol: symbol
          });
        }
      );
      let result = {type: 'drawOverlays', overlays: overlays};
      resolve({
        status: 0,
        message: '',
        result: {dataJson: JSON.stringify(result), data: result}
      });
    });
  }
}

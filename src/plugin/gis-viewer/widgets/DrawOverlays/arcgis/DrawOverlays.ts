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
    let repeat = params.repeat === true;
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
    type MapModules = [typeof import('esri/widgets/Sketch/SketchViewModel')];
    const [SketchViewModel] = await (loadModules([
      'esri/widgets/Sketch/SketchViewModel'
    ]) as Promise<MapModules>);
    let drawlayer = await this.createOverlaysLayer();
    this.drawlayer = drawlayer;
    this.sketchVM = new SketchViewModel({
      layer: this.drawlayer,
      view: this.view,
      updateOnGraphicClick: update,
      defaultUpdateOptions: {
        toggleToolOnClick: true,
        enableRotation: false,
        multipleSelectionEnabled: false
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
        callback(event.graphic.geometry);
      }
    });
    // let _view = this.view;
    // _view.on('click', async (event) => {
    //   const response = await _view.hitTest(event);
    //   if (response.results.length > 0) {
    //     console.log(response.results);
    //   }
    // });
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
  public async getDrawOverlays() {}
}

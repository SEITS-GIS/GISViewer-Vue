import {
  IOverlayParameter,
  IPointSymbol,
  IResult,
  IOverlayDelete,
  IFindParameter,
  ILayerConfig
} from '@/types/map';
import axios from 'axios';
import {loadModules} from 'esri-loader';

export class DrawOverlays {
  private static intances: Map<string, any>;

  private drawlayer!: any;
  private view!: __esri.MapView | __esri.SceneView;
  private dataJsonMap: Map<string, any> = new Map();
  private drawaction: any;

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
  public clear(label: string) {
    let layer = this.view.map.allLayers.find((baselayer: any) => {
      return baselayer.label === label;
    });
    this.view.map.remove(layer);
  }
  public async startDrawOverlays() {
    type MapModules = [
      typeof import('esri/Graphic'),
      typeof import('esri/geometry/Geometry'),
      typeof import('esri/layers/GraphicsLayer'),
      typeof import('esri/views/draw/Draw')
    ];
    const [Graphic, Geometry, GraphicsLayer, Draw] = await (loadModules([
      'esri/Graphic',
      'esri/geometry/Geometry',
      'esri/layers/GraphicsLayer',
      'esri/views/draw/Draw'
    ]) as Promise<MapModules>);
    const layer = new GraphicsLayer();
    this.drawaction = new Draw({
      view: this.view
    });
    this.drawaction.on(
      ['vertex-remove', 'cursor-update', 'redo', 'undo'],
      this.updateVertices
    );
  }
  public updateVertices(event: any) {
    if (event.vertices.length > 1) {
      const result = this.createGraphic(event);
    }
  }
  public async createGraphic(event: any) {
    type MapModules = [
      typeof import('esri/Graphic'),
      typeof import('esri/geometry/Geometry'),
      typeof import('esri/layers/GraphicsLayer'),
      typeof import('esri/views/draw/Draw')
    ];
    const [Graphic, Geometry, GraphicsLayer, Draw] = await (loadModules([
      'esri/Graphic',
      'esri/geometry/Geometry',
      'esri/layers/GraphicsLayer',
      'esri/views/draw/Draw'
    ]) as Promise<MapModules>);
    const vertices = event.vertices;
    this.view.graphics.removeAll();

    // a graphic representing the polyline that is being drawn
    const graphic = new Graphic({
      geometry: {
        type: 'polyline',
        paths: vertices,
        spatialReference: this.view.spatialReference
      } as any,
      symbol: {
        type: 'simple-line', // autocasts as new SimpleFillSymbol
        color: [4, 90, 141],
        width: 4,
        cap: 'round',
        join: 'round'
      } as any
    });
  }
}

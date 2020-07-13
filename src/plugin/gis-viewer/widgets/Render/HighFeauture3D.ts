import {loadModules} from 'esri-loader';
export default class HighFeauture3D {
  private view: any;
  private static highfeature: HighFeauture3D;
  private jumpRender: any;
  private constructor(view: __esri.SceneView) {
    // Geometrical transformations that must be recomputed
    // from scratch at every frame.
    this.view = view;
  }
  public static getInstance(view: __esri.SceneView) {
    if (!HighFeauture3D.highfeature) {
      HighFeauture3D.highfeature = new HighFeauture3D(view);
    }
    return HighFeauture3D.highfeature;
  }
  public async startup(graphics: any[]) {
    let that = this;
    loadModules(['esri/views/3d/externalRenderers']).then(
      ([externalRenderers]) => {
        if (that.jumpRender) {
          externalRenderers.remove(this.view, this.jumpRender);
          that.jumpRender.clear();
          that.jumpRender = null;
        }
        that.jumpRender = new HighFeautureRender(that.view, graphics);
        externalRenderers.add(this.view, this.jumpRender);
      }
    );
  }
}
class HighFeautureRender {
  private view: any;
  private graphics: any;
  private graphicsClone: any;
  private externalRenderers: any;
  private isUp: boolean = true;
  private upDis: number = 25;
  private currentDis: number = 0;
  private upCount: number = 1;
  private GraphicsLayer: any;
  private Graphic: any;
  private overlayer: any;
  private symboltype = '3d';

  public constructor(view: __esri.SceneView, graphics: any[]) {
    // Geometrical transformations that must be recomputed
    // from scratch at every frame.
    this.view = view;
    this.graphics = graphics;
  }
  // Called once a custom layer is added to the map.layers collection and this layer view is instantiated.
  public async setup(context: any) {
    this.graphicsClone = [];
    await loadModules([
      'esri/views/3d/externalRenderers',
      'esri/layers/GraphicsLayer',
      'esri/Graphic'
    ]).then(([externalRenderers, GraphicsLayer, Graphic]) => {
      this.externalRenderers = externalRenderers;
      this.GraphicsLayer = GraphicsLayer;
      this.Graphic = Graphic;
      this.overlayer = new GraphicsLayer();
      this.graphics.forEach((graphic: any, index: number) => {
        graphic.visible = false;
        if (graphic.symbol.type == 'point-3d') {
          this.upDis = Math.min(
            Math.round(graphic.symbol.symbolLayers.getItemAt(0).size / 2.0),
            25
          );
        } else {
          this.symboltype = '2d';
          this.upDis = Math.min(Math.round(graphic.symbol.height / 1.2), 45);
        }
        var g = new this.Graphic({
          geometry: graphic.geometry,
          symbol: graphic.symbol.clone(),
          attributes: {id: index}
        });
        this.graphicsClone.push(g);
      }, this);
      this.view.map.add(this.overlayer);
    });
  }
  public async clear() {
    this.overlayer.removeAll();
    this.view.map.remove(this.overlayer);
    this.graphics.forEach((graphic: any) => {
      graphic.visible = true;
    }, this);
    this.upDis == 0;
  }
  // Called every time a frame is rendered.
  public async render(context: any) {
    if (this.upDis == 0) {
      this.overlayer.removeAll();
      this.view.map.remove(this.overlayer);
      this.graphics.forEach((graphic: any) => {
        graphic.visible = true;
      }, this);
      return;
    }
    this.graphicsClone.forEach((graphic: any) => {
      if (this.symboltype == '3d') {
        graphic.symbol.symbolLayers.getItemAt(0).anchor = 'relative';
      }
      if (this.isUp) {
        if (this.symboltype == '3d') {
          if (
            graphic.symbol.symbolLayers.getItemAt(0).anchorPosition == undefined
          ) {
            graphic.symbol.symbolLayers.getItemAt(0).anchorPosition = {
              x: 0,
              y: 0
            };
          }

          graphic.symbol.symbolLayers.getItemAt(0).anchorPosition.y += 0.1;
        } else {
          if (
            graphic.symbol.yoffset == undefined ||
            Number.isNaN(graphic.symbol.yoffset)
          ) {
            graphic.symbol.yoffset = 0;
          }
          graphic.symbol.yoffset++;
        }
        if (this.currentDis >= this.upDis) {
          //切换弹跳方向
          this.currentDis = 0;
          this.isUp = false;
        }
      } else {
        if (this.symboltype == '3d') {
          graphic.symbol.symbolLayers.getItemAt(0).anchorPosition.y -= 0.1;
        } else {
          graphic.symbol.yoffset--;
        }
        if (this.currentDis >= this.upDis) {
          //切换弹跳方向
          this.currentDis = 0;
          this.isUp = true;
          this.upCount += 0.1;
          this.upDis = Math.round(this.upDis / this.upCount);
        }
      }
      this.currentDis += 2;
      //this.overlayer.remove(gra);
      var gra = new this.Graphic({
        geometry: graphic.geometry,
        symbol: graphic.symbol.clone(),
        attributes: graphic.attributes
      });
      this.removeGraphic(graphic.attributes.id);
      this.overlayer.add(gra);
    }, this);
    if (this.upDis > 0) {
      this.externalRenderers.requestRender(this.view);
    }
  }
  private removeGraphic(id: number) {
    if (this.overlayer && this.overlayer.graphics.length > 0) {
      for (let i = 0; i < this.overlayer.graphics.length; i++) {
        let g = this.overlayer.graphics.getItemAt(i);
        if (g && g.attributes.id == id) {
          console.log(id);
          this.overlayer.remove(g);
          break;
        }
      }
    }
  }
}

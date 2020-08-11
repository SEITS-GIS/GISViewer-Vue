import {loadModules} from 'esri-loader';
export default class HighFeauture2D {
  private static highfeature: HighFeauture2D;
  public view: any;
  private graphics: any;
  private customLayer: any;
  private overlayer: any;

  private constructor(view: __esri.MapView) {
    // Geometrical transformations that must be recomputed
    // from scratch at every frame.
    this.view = view;
  }
  public static getInstance(view: __esri.MapView) {
    if (!HighFeauture2D.highfeature) {
      HighFeauture2D.highfeature = new HighFeauture2D(view);
    }
    return HighFeauture2D.highfeature;
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
  private clear() {
    if (this.overlayer) {
      this.overlayer.removeAll();
      this.view.map.remove(this.overlayer);
    }
    if (this.graphics) {
      this.graphics.forEach((graphic: any) => {
        graphic.visible = true;
      }, this);
    }
    if (this.customLayer) {
      this.view.map.remove(this.customLayer);
    }
  }
  public async startup(graphics: any[]) {
    this.clear();
    this.graphics = graphics;
    let _that = this;
    await loadModules([
      'esri/views/2d/layers/BaseLayerViewGL2D',
      'esri/layers/GraphicsLayer',
      'esri/Graphic',
      'esri/core/watchUtils'
    ]).then(([BaseLayerViewGL2D, GraphicsLayer, Graphic, watchUtils]) => {
      _that.overlayer = new GraphicsLayer();
      _that.view.map.add(_that.overlayer);
      let CustomLayerView2D = BaseLayerViewGL2D.createSubclass({
        aPosition: 0,
        aOffset: 1,
        isUp: true,
        upDis: 25, //跳动的幅度
        currentDis: 0,
        upCount: 1, //跳动的次数
        graphicsClone: null,
        constructor: function() {
          this.graphicsClone = [];
        },
        attach: function() {
          graphics.forEach((graphic: any, index: number) => {
            graphic.visible = false;
            this.upDis = Math.min(Math.round(graphic.symbol.height / 1.2), 45);
            var g = new Graphic({
              geometry: graphic.geometry,
              symbol: graphic.symbol.clone(),
              attributes: {id: index}
            });
            this.graphicsClone.push(g);
          }, this);
        },
        detach: function() {
          this.upDis == 0;
          _that.view.map.remove(_that.customLayer);
        },
        // Called every time a frame is rendered.
        render: function(context: any) {
          if (this.upDis == 0) {
            if (_that.overlayer) {
              _that.overlayer.removeAll();
              _that.view.map.remove(_that.overlayer);
            }
            graphics.forEach((graphic: any) => {
              graphic.visible = true;
            }, this);
            _that.view.map.remove(_that.customLayer);
            return;
          }
          this.graphicsClone.forEach((graphic: any, index: number) => {
            if (this.isUp) {
              if (
                graphic.symbol.yoffset == undefined ||
                Number.isNaN(graphic.symbol.yoffset)
              ) {
                graphic.symbol.yoffset = 0;
              }
              graphic.symbol.yoffset++;
              if (this.currentDis >= this.upDis) {
                //切换弹跳方向
                this.currentDis = 0;
                this.isUp = false;
              }
            } else {
              graphic.symbol.yoffset--;
              if (this.currentDis >= this.upDis) {
                //切换弹跳方向
                this.currentDis = 0;
                this.isUp = true;
                this.upCount += 0.2;
                this.upDis = Math.round(this.upDis / this.upCount);
              }
            }
            this.currentDis += 2;
            var gra = new Graphic({
              geometry: graphic.geometry,
              symbol: graphic.symbol.clone(),
              attributes: {id: index}
            });
            _that.removeGraphic(index);
            _that.overlayer.add(gra);
          }, this);
          if (this.upDis > 0) {
            this.requestRender();
          }
        }
      });
      let CustomLayer = GraphicsLayer.createSubclass({
        createLayerView: function(view: any) {
          // We only support MapView, so we only need to return a
          // custom layer view for the `2d` case.
          if (view.type === '2d') {
            return new CustomLayerView2D({
              view: view,
              layer: this
            });
          }
        }
      });
      _that.customLayer = new CustomLayer();
      _that.view.map.add(_that.customLayer);
    });
  }
}

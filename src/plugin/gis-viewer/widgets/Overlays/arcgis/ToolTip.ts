import MapToolTip from './MapToolTip.vue';
import {Vue, Component, Emit, Prop, PropSync} from 'vue-property-decorator';
import {loadModules} from 'esri-loader';
import {Geometry} from 'esri/geometry';

export default class ToolTip {
  public id: string = 'tooltip1';
  private view!: __esri.SceneView | __esri.MapView;
  private vm!: Vue;
  private postion!: any;
  private offset: number = 0;
  private zooms: [number, number] = [0, 100];

  public constructor(
    view: __esri.SceneView | __esri.MapView,
    props: any,
    graphic: any
  ) {
    this.view = view;
    this.postion = graphic.geometry || graphic;
    if (props.zooms) {
      this.zooms = props.zooms;
      if (
        this.view.zoom <= props.zooms[1] &&
        this.view.zoom >= props.zooms[0]
      ) {
        props.visible = true;
      } else {
        props.visible = false;
      }
    }
    this.create(props);
  }
  private create(props: Object) {
    this.vm = new Vue({
      // 为什么不使用 template 要使用render 因为现在是webpack里面没有编译器 只能使用render
      render: (h) => h(MapToolTip, {props}) // render 生成虚拟dom  {props: props}
    }).$mount(); // $mount 生成真实dom, 挂载dom 挂载在哪里, 不传参的时候只生成不挂载，需要手动挂载

    this.view.container.children[0].children[0].appendChild(this.vm.$el);
    this.changeText();
    this.init();
  }
  //计算tooltip，偏移位置；
  private subLocate(location: string): {xoffset: number; yoffset: number} {
    let xoffset: number = 0;
    let yoffset: number = 0;
    const width = this.vm.$el.clientWidth;
    const height = this.vm.$el.clientHeight;
    switch (location) {
      case 'top':
        xoffset = 0 - width / 2 - 10;
        yoffset = 0 - height - this.offset;
    }
    return {xoffset: xoffset, yoffset: yoffset};
  }
  private init() {
    let o: any = this;
    o.view.watch('extent', (event: any) => {
      o.changeText();
    });
    o.view.watch('zoom', (newValue: any) => {
      let zoom = Math.round(newValue);
      if (zoom <= o.zooms[1] && zoom >= o.zooms[0]) {
        o.vm.$el.style.visibility = 'visible';
      } else {
        o.vm.$el.style.visibility = 'hidden';
      }
    });
  }
  private changeText() {
    let center = this.getPostion(this.postion);
    let point = this.view.toScreen(center);
    const offset: {xoffset: number; yoffset: number} = this.subLocate('top');
    Object(this.vm.$el).style.left = point.x + 10 + offset.xoffset + 'px';
    Object(this.vm.$el).style.top = point.y + offset.yoffset + 'px';
  }
  private getPostion(geometry: any) {
    let center = geometry;
    if (geometry.type == 'point') {
    } else if (geometry.type == 'polyline') {
      center = geometry.extent.center;
    } else if (geometry.type == 'extent') {
      center = geometry.center;
    } else if (geometry.type == 'polygon' || geometry.type == 'circle') {
      center = geometry.centroid;
    }
    return center;
  }
  public remove() {
    // 回收组件
    this.view.container.children[0].children[0].removeChild(this.vm.$el); // 删除元素
    this.vm.$destroy(); // 销毁组件
  }
  public static clear(view: any, id: string | undefined) {
    let tools: any = document.getElementsByClassName('map-tool-tip');
    tools.forEach((el: any) => {
      if (id == undefined || el.id == id) {
        view.container.children[0].children[0].removeChild(el);
      }
    }, this);
  }
}

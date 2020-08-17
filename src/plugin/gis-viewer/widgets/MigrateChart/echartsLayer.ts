import * as echarts from 'echarts';
import * as echartsgl from 'echarts-gl';
import {loadModules} from 'esri-loader';

export default class echartsLayer {
  private name = 'EchartsglLayer';
  private view: any;
  private box: any;
  private chart: any;
  private chartOption: any;
  private visible = true;
  private moudles: any;

  private map_rotationChange_Listener: any;
  private map_extentChange_Listener: any;

  public constructor(view: any, option?: any) {
    //如果在服务器上使用该代码  可以将echart对象传入到option中

    this.init(view, option);
  }
  private async init(view: any, option: any) {
    type MapModules = [typeof import('esri/geometry/SpatialReference')];
    this.moudles = await (loadModules([
      'esri/geometry/SpatialReference'
    ]) as Promise<MapModules>);

    let cordsys = this.getE3CoordinateSystem(view);
    echarts.registerCoordinateSystem('arcgis', cordsys);

    this.setBaseMap(view);
    this.createLayer();
  }
  private setBaseMap(view: any) {
    this.view = view;
  }
  public async setChartOption(option: any) {
    this.chartOption = option;
    this.setCharts();
  }
  private setVisible(bool: boolean) {
    if (!this.box || this.visible === bool) return;
    this.box.hidden = !bool;
    this.visible = bool;
    bool === true && this.setCharts();
  }
  private refreshBegin() {
    this.box.hidden = true;
  }
  private refreshing() {
    this.setCharts();
  }
  private refreshEnd() {
    this.box.hidden = false;
  }
  private on(eventName: any, handler: any, context: any) {
    this.chart.on(eventName, handler, context);
  }
  private off(eventName: any, handler: any, context: any) {
    this.chart.off(eventName, handler, context);
  }
  private setCharts() {
    if (!this.visible) return;
    if (
      this.chartOption == null ||
      this.chartOption == 'undefined' ||
      this.view == undefined
    )
      return;
    let baseExtent = this.view.extent;
    //判断是否使用了mark类型标签，每次重绘要重新转换地理坐标到屏幕坐标
    //根据地图extent,重绘echarts
    this.chartOption.xAxis = {
      show: false,
      min: baseExtent.xmin,
      max: baseExtent.xmax
    };
    this.chartOption.yAxis = {
      show: false,
      min: baseExtent.ymin,
      max: baseExtent.ymax
    };
    this.chart.setOption(this.chartOption);
    this.chartOption.animation = false;
  }
  /*创建layer的容器，添加到map的layers下面*/
  private createLayer() {
    let box = (this.box = document.createElement('div'));
    box.setAttribute('id', 'echartsData');
    box.setAttribute('name', 'echartsData');
    box.style.width = this.view.width + 'px';
    box.style.height = this.view.height + 'px';
    box.style.position = 'absolute';
    box.style.top = '0px';
    box.style.left = '0px';
    box.style.zIndex = '99';
    let parent = document.getElementsByClassName('esri-overlay-surface')[0];
    parent.appendChild(box);
    this.chart = echarts.init(box);
    this.setCharts();
    this.startMapEventListeners();
  }
  /*销毁实例*/
  private removeLayer() {
    this.box.outerHTML = '';
    this.view = null;
    this.box = null;
    this.chart = null;
    this.chartOption = null;
    this.map_rotationChange_Listener.remove();
    this.map_extentChange_Listener.remove();
  }
  /*监听地图事件，根据图层是否显示，判断是否重绘echarts*/
  private startMapEventListeners() {
    let view = this.view;
    let _this = this;
    this.map_extentChange_Listener = view.watch('extent', (e: any) => {
      if (!_this.visible) return;
      _this.setCharts();
      _this.chart.resize();
      _this.box.hidden = false;
    });
    this.map_rotationChange_Listener = view.watch('rotation', (e: any) => {
      if (!this.visible) return;
      _this.setCharts();
      _this.chart.resize();
      _this.box.hidden = false;
    });
  }
  private getE3CoordinateSystem(map: any) {
    let _map: any;
    let _mapOffset: any;
    let adt = this.moudles[0];
    let CoordSystem: any = (map: any) => {
      _map = map;
      _mapOffset = [0, 0];
    };
    CoordSystem.create = (ecModel: any) => {
      ecModel.eachSeries((seriesModel: any) => {
        if (seriesModel.get('coordinateSystem') === 'arcgis') {
          seriesModel.coordinateSystem = new CoordSystem(map);
        }
      });
    };
    CoordSystem.getDimensionsInfo = () => {
      return ['x', 'y'];
    };
    CoordSystem.dimensions = ['x', 'y'];
    CoordSystem.prototype.dimensions = ['x', 'y'];
    CoordSystem.prototype.setMapOffset = (mapOffset: any) => {
      _mapOffset = mapOffset;
    };
    CoordSystem.prototype.dataToPoint = (data: any) => {
      var point = {
        type: 'point',
        x: data[0],
        y: data[1],
        spatialReference: new adt({wkid: 4326})
      };
      var px = this.view.toScreen(point);
      var mapOffset = [0, 0];
      return [px.x - mapOffset[0], px.y - mapOffset[1]];
    };
    CoordSystem.prototype.pointToData = (pt: any) => {
      var mapOffset = _mapOffset;
      var screentPoint = {
        x: pt[0] + mapOffset[0],
        y: pt[1] + mapOffset[1]
      };
      var data = map.toMap(screentPoint);
      return [data.x, data.y];
    };
    CoordSystem.prototype.getViewRect = () => {
      //return new graphic.BoundingRect(0, 0, _map.width, _map.height);
    };
    CoordSystem.prototype.getRoamTransform = () => {
      //return matrix.create();
    };
    return CoordSystem;
  }
}

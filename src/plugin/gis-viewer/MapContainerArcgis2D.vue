<template>
  <div :id="mapId" class="my-map-div" />
</template>

<script lang="ts">
import {Vue, Component, Emit, Prop} from 'vue-property-decorator';
import MapApp from '@/plugin/gis-viewer/MapAppArcgis2D';
import {
  IMapContainer,
  IOverlayParameter,
  IHeatParameter,
  IOverlayClusterParameter,
  IOverlayDelete,
  ILayerConfig,
  IPointGeometry,
  ICenterLevel,
  IFindParameter,
  IResult,
  IDistrictParameter,
  IStreetParameter,
  routeParameter,
  IHeatImageParameter,
  IGeometrySearchParameter,
  ICustomTip,
  ISelectRouteParam,
  ISelectRouteResult,
  IDrawOverlays
} from '@/types/map';

@Component({
  name: 'MapContainerArcgisTwoD'
})
export default class MapContainerArcgis extends Vue implements IMapContainer {
  private mapApp!: MapApp;

  private mapId: string = 'divArcGISMap2D' + (Math.random() * 10000).toFixed(0);
  //地图配置
  @Prop({type: Object}) readonly mapConfig!: Object;

  @Emit('map-loaded')
  async mounted() {
    this.mapApp = new MapApp();
    await this.mapApp.initialize(this.mapConfig, this.mapId);
    this.mapApp.showGisDeviceInfo = this.showGisDeviceInfo;
    this.mapApp.mapClick = this.mapClick;
    this.mapApp.selectRouteFinished = this.selectedRouteFinished;
  }
  @Emit('map-click')
  public mapClick(point: object) {}
  @Emit('marker-click')
  public showGisDeviceInfo(type: string, id: string, detail: any) {}

  @Emit('marker-mouse')
  public mouseGisDeviceInfo(
    event: any,
    type: string,
    id: string,
    detail: any
  ) {}

  @Emit('select-route-finished')
  public selectedRouteFinished(routeInfo: object) {}

  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    return await this.mapApp.addOverlays(params);
  }
  public addHeatMap(params: IHeatParameter) {
    this.mapApp.addHeatMap(params);
  }
  public addOverlaysCluster(params: IOverlayClusterParameter) {
    this.mapApp.addOverlaysCluster(params);
  }
  public deleteOverlays(params: IOverlayDelete) {
    this.mapApp.deleteOverlays(params);
  }
  public deleteOverlaysCluster(params: IOverlayDelete) {
    this.mapApp.deleteOverlaysCluster(params);
  }
  public deleteAllOverlays() {
    this.mapApp.deleteAllOverlays();
  }
  public deleteAllOverlaysCluster() {
    this.mapApp.deleteAllOverlaysCluster();
  }
  public deleteHeatMap() {
    this.mapApp.deleteHeatMap();
  }
  public showLayer(params: ILayerConfig) {
    this.mapApp.showLayer(params);
  }
  public hideLayer(params: ILayerConfig) {
    this.mapApp.hideLayer(params);
  }
  public setMapCenter(params: IPointGeometry) {
    this.mapApp.setMapCenter(params);
  }
  public setMapCenterAndLevel(params: ICenterLevel) {
    this.mapApp.setMapCenterAndLevel(params);
  }
  public showJurisdiction() {}
  public hideJurisdiction() {}
  public showDistrictMask(param: IDistrictParameter) {}
  public hideDistrictMask() {}
  public findFeature(params: IFindParameter) {
    this.mapApp.findFeature(params);
  }
  public showRoad() {}
  public hideRoad() {}
  public showStreet() {}
  public hideStreet() {}
  public locateStreet(param: IStreetParameter) {}
  public setMapStyle(param: string) {}
  public async routeSearch(params: routeParameter): Promise<IResult> {
    return {status: 0, message: ''};
  }
  public clearRouteSearch() {}
  public showRoutePoint(params: any) {}
  public clearRoutePoint() {}
  public async addDrawLayer(params: any): Promise<IResult> {
    return await this.mapApp.addDrawLayer(params);
  }
  public clearDrawLayer(params: any) {
    this.mapApp.clearDrawLayer(params);
  }
  public addHeatImage(params: IHeatImageParameter) {
    this.mapApp.addHeatImage(params);
  }
  public deleteHeatImage() {
    this.mapApp.deleteHeatImage();
  }
  public showMigrateChart(params: any) {
    this.mapApp.showMigrateChart(params);
  }
  public hideMigrateChart() {
    this.mapApp.hideMigrateChart();
  }
  public showBarChart(params: any) {
    this.mapApp.showBarChart(params);
  }
  public hideBarChart() {
    this.mapApp.hideBarChart();
  }
  public async startGeometrySearch(
    params: IGeometrySearchParameter
  ): Promise<IResult> {
    return await this.mapApp.startGeometrySearch(params);
  }
  public clearGeometrySearch() {
    this.mapApp.clearGeometrySearch();
  }
  public async showDgene(params: any): Promise<IResult> {
    return await this.mapApp.showDgene(params);
  }
  public hideDgene() {
    this.mapApp.hideDgene();
  }
  public async addDgeneFusion(params: any): Promise<IResult> {
    return await this.mapApp.addDgeneFusion(params);
  }
  public async restoreDegeneFsion(): Promise<IResult> {
    return await this.mapApp.restoreDegeneFsion();
  }
  public showCustomTip(params: ICustomTip) {
    this.mapApp.showCustomTip(params);
  }
  public showDgeneOutPoint(params: any) {
    this.mapApp.showDgeneOutPoint(params);
  }
  public changeDgeneOut() {
    this.mapApp.changeDgeneOut();
  }

  /**
   * 路段选择
   * 选择起点路段，显示后续路段，最终完成一个完整路段
   */
  /**
   * 初始化路段选择数据，地图上显示路段，进入路段选择状态
   * @param enableXHJ 是否自动选择信号机
   * */
  public async initializeRouteSelect(params: ISelectRouteParam) {
    await this.mapApp.initializeRouteData(params);
  }

  public async showSelectedRoute(params: ISelectRouteResult) {
    await this.mapApp.showSelectedRoute(params);
  }
  public async startDrawOverlays(params: IDrawOverlays): Promise<void> {
    return await this.mapApp.startDrawOverlays(params);
  }
  public async stopDrawOverlays(): Promise<void> {
    return await this.mapApp.stopDrawOverlays();
  }
  public async getDrawOverlays(): Promise<IResult> {
    return await this.mapApp.getDrawOverlays();
  }
}
</script>

<style scoped>
@import './styles/cluter.css';
@import './styles/dgeneapp.css';
.my-map-div {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

.esri-view .esri-view-surface--inset-outline:focus::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  outline: auto 2px Highlight;
  outline: auto 5px -webkit-focus-ring-color;
  outline-offset: -9px;
  pointer-events: none;
  overflow: hidden;
}
.show-fusion {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
}
.hide-fusion {
  display: none;
}
</style>

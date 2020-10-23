<template>
  <div :id="mapId" class="my-map-div" />
</template>
<script lang="ts">
import {Vue, Component, Emit, Prop} from 'vue-property-decorator';
import MapApp from '@/plugin/gis-viewer/MapAppBaidu';
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
  name: 'MapAppBaidu'
})
export default class MapContainerArcgis extends Vue implements IMapContainer {
  private mapApp!: MapApp;

  private mapId: string = 'divBMap' + (Math.random() * 10000).toFixed(0);
  //地图配置
  @Prop({type: Object}) readonly mapConfig!: Object;

  @Emit('map-loaded')
  async mounted() {
    this.mapApp = new MapApp();
    await this.mapApp.initialize(this.mapConfig, this.mapId);
    this.mapApp.showGisDeviceInfo = this.showGisDeviceInfo;
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

  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    return await this.mapApp.addOverlays(params);
  }
  public addOverlaysCluster(params: IOverlayClusterParameter) {
    this.mapApp.addOverlaysCluster(params);
  }
  public addHeatMap(params: IHeatParameter) {
    this.mapApp.addHeatMap(params);
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
  public showJurisdiction() {
    this.mapApp.showJurisdiction();
  }
  public hideJurisdiction() {
    this.mapApp.hideJurisdiction();
  }
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
  public setMapStyle(param: string) {
    this.mapApp.setMapStyle(param);
  }
  public async routeSearch(params: routeParameter): Promise<IResult> {
    return {status: 0, message: ''};
  }
  public clearRouteSearch() {}
  public showRoutePoint(params: any) {}
  public clearRoutePoint() {}
  public async addDrawLayer(params: any): Promise<IResult> {
    return {status: 0, message: ''};
  }
  public clearDrawLayer(params: ILayerConfig) {}
  public addHeatImage(params: IHeatImageParameter) {}
  public deleteHeatImage() {}
  public showMigrateChart(params: any) {}
  public hideMigrateChart() {}
  public showBarChart(params: any) {}
  public hideBarChart() {}
  public async startGeometrySearch(
    params: IGeometrySearchParameter
  ): Promise<IResult> {
    return {status: 0, message: ''};
  }
  public clearGeometrySearch() {}
  public async showDgene(params: any): Promise<IResult> {
    return {status: 0, message: ''};
  }
  public hideDgene() {}
  public async addDgeneFusion(params: any): Promise<IResult> {
    return {status: 0, message: ''};
  }
  public async restoreDegeneFsion(): Promise<IResult> {
    return {status: 0, message: ''};
  }
  public showCustomTip(params: ICustomTip) {}
  public showDgeneOutPoint(params: any) {}
  public changeDgeneOut() {}

  public async initializeRouteSelect(params: ISelectRouteParam) {}
  public async showSelectedRoute(params: ISelectRouteResult) {}
  public async startDrawOverlays(params: IDrawOverlays): Promise<void> {}
  public async stopDrawOverlays(): Promise<void> {}
}
</script>

<style scoped>
.my-map-div {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>

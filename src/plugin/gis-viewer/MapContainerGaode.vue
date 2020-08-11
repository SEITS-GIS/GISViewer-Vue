<template>
  <div id="divAMap" />
</template>

<script lang="ts">
import {Vue, Component, Emit, Prop} from 'vue-property-decorator';
import MapApp from '@/plugin/gis-viewer/MapAppGaode';
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
  routeParameter
} from '@/types/map';

@Component({
  name: 'MapContainerGaode'
})
export default class MapContainerGd extends Vue implements IMapContainer {
  private mapApp!: MapApp;

  //地图配置
  @Prop({type: Object}) readonly mapConfig!: Object;

  @Emit('map-loaded')
  async mounted() {
    this.mapApp = new MapApp();
    await this.mapApp.initialize(this.mapConfig, 'divAMap');

    this.mapApp.showGisDeviceInfo = this.showGisDeviceInfo;
    this.mapApp.mouseGisDeviceInfo = this.mouseGisDeviceInfo;
  }

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
  public showDistrictMask(param: IDistrictParameter) {
    this.mapApp.showDistrictMask(param);
  }
  public hideDistrictMask() {
    this.mapApp.hideDistrictMask();
  }
  public findFeature(params: IFindParameter) {
    this.mapApp.findFeature(params);
  }
  public showRoad(params: {ids: string[]}) {
    this.mapApp.showRoad(params);
  }
  public hideRoad() {
    this.mapApp.hideRoad();
  }
  public showStreet() {
    this.mapApp.showStreet();
  }
  public hideStreet() {
    this.mapApp.hideStreet();
  }
  public locateStreet(param: IStreetParameter) {
    this.mapApp.locateStreet(param);
  }
  public setMapStyle(param: string) {
    this.mapApp.setMapStyle(param);
  }
  public async routeSearch(params: routeParameter): Promise<IResult> {
    return await this.mapApp.routeSearch(params);
  }
  public clearRouteSearch() {
    this.mapApp.clearRouteSearch();
  }
}
</script>

<style scoped>
#divAMap {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>

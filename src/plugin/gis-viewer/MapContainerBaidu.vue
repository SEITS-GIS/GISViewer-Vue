<template>
  <div id="divBMap" />
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
  routeParameter
} from '@/types/map';
@Component({
  name: 'MapAppBaidu'
})
export default class MapContainerArcgis extends Vue implements IMapContainer {
  private mapApp!: MapApp;

  //地图配置
  @Prop({type: Object}) readonly mapConfig!: Object;

  @Emit('map-loaded')
  async mounted() {
    this.mapApp = new MapApp();
    await this.mapApp.initialize(this.mapConfig, 'divBMap');
    this.mapApp.showGisDeviceInfo = this.showGisDeviceInfo;
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
}
</script>

<style scoped>
#divBMap {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>

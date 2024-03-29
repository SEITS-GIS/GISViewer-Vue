<template>
  <div id="divMap">
    <map-container-arcgis-three-d
      ref="containerArcgis3D"
      v-if="this.platform === 'arcgis3d'"
      :map-config="this.mapConfig"
      @map-loaded="mapLoaded"
      @map-click="mapClick"
      @marker-click="showGisDeviceInfo"
    />
    <map-container-arcgis-two-d
      ref="containerArcgis2D"
      v-if="this.platform === 'arcgis2d'"
      :map-config="this.mapConfig"
      @map-loaded="mapLoaded"
      @map-click="mapClick"
      @marker-click="showGisDeviceInfo"
      @select-route-finished="selectedRouteFinished"
    />
    <map-container-baidu
      ref="containerBaidu"
      v-if="this.platform === 'bd'"
      :map-config="this.mapConfig"
      @map-loaded="mapLoaded"
      @map-click="mapClick"
      @marker-click="showGisDeviceInfo"
    />
    <map-container-gaode
      ref="containerGaode"
      v-if="this.platform === 'gd'"
      :map-config="this.mapConfig"
      @map-loaded="mapLoaded"
      @marker-click="showGisDeviceInfo"
      @map-click="mapClick"
      @marker-mouse="mouseGisDeviceInfo"
    />
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Ref, Emit} from 'vue-property-decorator';
import MapContainerArcgisThreeD from '@/plugin/gis-viewer/MapContainerArcgis3D.vue';
import MapContainerArcgisTwoD from '@/plugin/gis-viewer/MapContainerArcgis2D.vue';
import MapContainerBaidu from '@/plugin/gis-viewer/MapContainerBaidu.vue';
import MapContainerGaode from '@/plugin/gis-viewer/MapContainerGaode.vue';
import {
  Platforms,
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
  components: {
    MapContainerArcgisThreeD,
    MapContainerArcgisTwoD,
    MapContainerBaidu,
    MapContainerGaode
  }
})
export default class MapContainer extends Vue implements IMapContainer {
  //平台类型 高德/百度/arcgis
  @Prop({default: Platforms.ArcGIS3D, type: String})
  readonly platform!: string;

  //地图配置
  @Prop({type: Object}) readonly mapConfig!: Object;

  @Ref() readonly containerArcgis3D!: MapContainerArcgisThreeD;
  @Ref() readonly containerArcgis2D!: MapContainerArcgisTwoD;
  @Ref() readonly containerBaidu!: MapContainerBaidu;
  @Ref() readonly containerGaode!: MapContainerGaode;

  //当前的地图容器
  get mapContainer(): IMapContainer {
    switch (this.platform) {
      case Platforms.ArcGIS2D:
        return this.containerArcgis2D;
      case Platforms.ArcGIS3D:
        return this.containerArcgis3D;
      case Platforms.BDMap:
        return this.containerBaidu;
      case Platforms.AMap:
        return this.containerGaode;
      default:
        return this.containerArcgis3D;
    }
  }
  async created() {
    //console.log(this.mapConfig);
    if (
      (this.mapConfig as any).arcgis_api &&
      (this.mapConfig as any).arcgis_api.indexOf('arcgis') > -1
    ) {
      (window as any).dojoConfig = {
        async: true,
        tlmSiblingOfDojo: false,
        baseUrl: (this.mapConfig as any).arcgis_api + '/dojo/',
        packages: [
          {
            name: 'libs',
            location: 'libs'
          }
        ],
        has: {
          'esri-promise-compatibility': 1
        }
      };
    }
  }
  @Emit('map-loaded')
  private mapLoaded() {}
  @Emit('map-click')
  public mapClick(point: object) {}
  @Emit('marker-click')
  private showGisDeviceInfo(type: string, id: string) {}
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
    return await this.mapContainer.addOverlays(params);
  }

  public addOverlaysCluster(params: IOverlayClusterParameter) {
    this.mapContainer.addOverlaysCluster(params);
  }
  public addHeatMap(params: IHeatParameter) {
    this.mapContainer.addHeatMap(params);
  }
  public deleteOverlays(params: IOverlayDelete) {
    this.mapContainer.deleteOverlays(params);
  }
  public deleteOverlaysCluster(params: IOverlayDelete) {
    this.mapContainer.deleteOverlaysCluster(params);
  }

  public deleteAllOverlays() {
    this.mapContainer.deleteAllOverlays();
  }
  public deleteAllOverlaysCluster() {
    this.mapContainer.deleteAllOverlaysCluster();
  }
  public deleteHeatMap() {
    this.mapContainer.deleteHeatMap();
  }
  public showLayer(params: ILayerConfig) {
    this.mapContainer.showLayer(params);
  }
  public hideLayer(params: ILayerConfig) {
    this.mapContainer.hideLayer(params);
  }
  public setMapCenter(params: IPointGeometry) {
    this.mapContainer.setMapCenter(params);
  }
  public setMapCenterAndLevel(params: ICenterLevel) {
    this.mapContainer.setMapCenterAndLevel(params);
  }
  public showJurisdiction() {
    this.mapContainer.showJurisdiction();
  }
  public hideJurisdiction() {
    this.mapContainer.hideJurisdiction();
  }
  public showDistrictMask(params: IDistrictParameter) {
    this.mapContainer.showDistrictMask(params);
  }
  public hideDistrictMask() {
    this.mapContainer.hideDistrictMask();
  }
  public findFeature(params: IFindParameter) {
    this.mapContainer.findFeature(params);
  }
  public showRoad(param: {ids: string[]}) {
    this.mapContainer.showRoad(param);
  }
  public hideRoad() {
    this.mapContainer.hideRoad();
  }
  public showStreet() {
    this.mapContainer.showStreet();
  }
  public hideStreet() {
    this.mapContainer.hideStreet();
  }
  public locateStreet(param: IStreetParameter) {
    this.mapContainer.locateStreet(param);
  }
  public setMapStyle(param: string) {
    this.mapContainer.setMapStyle(param);
  }
  public async routeSearch(params: routeParameter): Promise<IResult> {
    return await this.mapContainer.routeSearch(params);
  }
  public clearRouteSearch() {
    this.mapContainer.clearRouteSearch();
  }
  public showRoutePoint(params: any) {
    this.mapContainer.showRoutePoint(params);
  }
  public clearRoutePoint() {
    this.mapContainer.clearRoutePoint();
  }
  public async addDrawLayer(params: any): Promise<IResult> {
    return await this.mapContainer.addDrawLayer(params);
  }
  public clearDrawLayer(params: ILayerConfig) {
    this.mapContainer.clearDrawLayer(params);
  }
  public addHeatImage(params: IHeatImageParameter) {
    this.mapContainer.addHeatImage(params);
  }
  public deleteHeatImage() {
    this.mapContainer.deleteHeatImage();
  }
  public showMigrateChart(params: any) {
    this.mapContainer.showMigrateChart(params);
  }
  public hideMigrateChart() {
    this.mapContainer.hideMigrateChart();
  }
  public showBarChart(params: any) {
    this.mapContainer.showBarChart(params);
  }
  public hideBarChart() {
    this.mapContainer.hideBarChart();
  }
  public async startGeometrySearch(
    params: IGeometrySearchParameter
  ): Promise<IResult> {
    return await this.mapContainer.startGeometrySearch(params);
  }
  public clearGeometrySearch() {
    this.mapContainer.clearGeometrySearch();
  }
  public async showDgene(params: any): Promise<IResult> {
    return await this.mapContainer.showDgene(params);
  }
  public hideDgene() {
    this.mapContainer.hideDgene();
  }
  public async addDgeneFusion(params: any): Promise<IResult> {
    return await this.mapContainer.addDgeneFusion(params);
  }
  public async restoreDegeneFsion(): Promise<IResult> {
    return await this.mapContainer.restoreDegeneFsion();
  }
  public showCustomTip(params: ICustomTip) {
    this.mapContainer.showCustomTip(params);
  }
  public showDgeneOutPoint(params: any) {
    this.mapContainer.showDgeneOutPoint(params);
  }
  public changeDgeneOut() {
    this.mapContainer.changeDgeneOut();
  }

  public async initializeRouteSelect(params: ISelectRouteParam) {
    await this.mapContainer.initializeRouteSelect(params);
  }

  public async showSelectedRoute(params: ISelectRouteResult) {
    await this.mapContainer.showSelectedRoute(params);
  }

  public async startDrawOverlays(params: IDrawOverlays): Promise<void> {
    return await this.mapContainer.startDrawOverlays(params);
  }
  public async stopDrawOverlays(): Promise<void> {
    return await this.mapContainer.stopDrawOverlays();
  }
  public async getDrawOverlays(): Promise<IResult> {
    return await this.mapContainer.getDrawOverlays();
  }
}
</script>

<style scoped>
#divMap {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>

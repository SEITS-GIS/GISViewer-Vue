<template>
  <div id="divAMap" />
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import MapApp from "@/plugin/gis-viewer/MapAppGaode";
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
  IResult
} from "@/types/map";

@Component({
  name: "MapContainerGaode"
})
export default class MapContainerGd extends Vue implements IMapContainer {
  private mapApp!: MapApp;

  //地图配置
  @Prop({ type: Object }) readonly mapConfig!: Object;

  @Emit("map-loaded")
  async mounted() {
    this.mapApp = new MapApp();
    await this.mapApp.initialize(this.mapConfig, "divAMap");

    this.mapApp.showGisDeviceInfo = this.showGisDeviceInfo;
  }

  @Emit("marker-click")
  public showGisDeviceInfo(type: string, id: string) {}

  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    return await this.mapApp.addOverlays(params);
  }
  public addHeatMap(params: IHeatParameter) {}
  public addOverlaysCluster(params: IOverlayClusterParameter) {}
  public deleteOverlays(params: IOverlayDelete) {
    this.mapApp.deleteOverlays(params);
  }
  public deleteOverlaysCluster(params: IOverlayDelete) {}
  public deleteAllOverlays() {
    this.mapApp.deleteAllOverlays();
  }
  public deleteAllOverlaysCluster() {}
  public deleteHeatMap() {}
  public showLayer(params: ILayerConfig) {
    this.mapApp.showLayer(params);
  }
  public hideLayer(params: ILayerConfig) {
    this.mapApp.hideLayer(params);
  }
  public setMapCenter(params: IPointGeometry) {}
  public setMapCenterAndLevel(params: ICenterLevel) {}
  public showJurisdiction() {}
  public hideJurisdiction() {}
  public findFeature(params: IFindParameter) {
    this.mapApp.findFeature(params);
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

<template>
  <div id="divBMap" />
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import MapApp from "@/plugin/gis-viewer/MapAppBaidu";
<<<<<<< HEAD
import { IMapContainer, IOverlayParameter, IHeatParameter, IOverlayClusterParameter,IOverlayDelete } from "@/types/map";
=======
import { IMapContainer } from "@/types/map";
>>>>>>> 8b4c2ea4bcfafc5dd8e8ddc464d568c3fbdb8028

@Component({
  name: "MapAppBaidu"
})
export default class MapContainerArcgis extends Vue implements IMapContainer {
  private mapApp!: MapApp;

  //地图配置
  @Prop({ type: Object }) readonly mapConfig!: Object;

  @Emit("map-loaded")
  async mounted() {
    this.mapApp = new MapApp();
    await this.mapApp.initialize(this.mapConfig, "divBMap");
    this.mapApp.showGisDeviceInfo=this.showGisDeviceInfo;
  }

  @Emit("marker-click")
  public showGisDeviceInfo(type:string,id:string){
  }

<<<<<<< HEAD
  public addOverlays(params: IOverlayParameter) {
    this.mapApp.addOverlays(params);
  }
  public addOverlaysCluster(params:IOverlayClusterParameter)
  {
    this.mapApp.addOverlaysCluster(params);
  }
  public addHeatMap(params:IHeatParameter)
  {
    this.mapApp.addHeatMap(params);
  }
  public deleteOverlays(params:IOverlayDelete)
  {
    this.mapApp.deleteOverlays(params);
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
=======
  public addOverlays() {}
>>>>>>> 8b4c2ea4bcfafc5dd8e8ddc464d568c3fbdb8028
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

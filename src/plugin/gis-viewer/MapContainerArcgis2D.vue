<template>
  <div id="divArcGISMap2D" />
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import MapApp from "@/plugin/gis-viewer/MapAppArcgis2D";
import {
  IMapContainer,
  IHeatParameter,
  IOverlayClusterParameter
} from "@/types/map";

@Component({
  name: "MapContainerArcgisTwoD"
})
export default class MapContainerArcgis extends Vue implements IMapContainer {
  private mapApp!: MapApp;

  //地图配置
  @Prop({ type: Object }) readonly mapConfig!: Object;

  @Emit("mapLoaded")
  async mounted() {
    this.mapApp = new MapApp();
    await this.mapApp.initialize(this.mapConfig, "divArcGISMap2D");
  }

  public addOverlays() {}

  public addHeatMap(params: IHeatParameter) {}
  public addOverlaysCluster(params: IOverlayClusterParameter) {}
  public deleteAllOverlays() {}
  public deleteAllOverlaysCluster() {}
  public deleteHeatMap() {}
}
</script>

<style scoped>
#divArcGISMap2D {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>

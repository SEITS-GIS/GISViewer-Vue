<template>
  <div id="divBMap" />
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import MapApp from "@/plugin/gis-viewer/MapAppBaidu";
import { IMapContainer } from "@/types/map";

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
  }

  public addOverlays() {}
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

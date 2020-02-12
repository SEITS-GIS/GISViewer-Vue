<template>
  <div id="divArcGISMap3D" />
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import MapApp from "@/plugin/gis-viewer/MapAppArcgis3D";

@Component({
  name: "MapContainerArcgisThreeD"
})
export default class MapContainerArcgis3D extends Vue {
  mapApp!: MapApp;

  //地图配置
  @Prop({ type: Object }) readonly mapConfig!: Object;

  @Emit("mapLoaded")
  async mounted() {
    this.mapApp = new MapApp();
    await this.mapApp.initialize(this.mapConfig, "divArcGISMap3D");
  }
}
</script>

<style scoped>
#divArcGISMap3D {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>

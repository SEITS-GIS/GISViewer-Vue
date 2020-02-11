<template>
  <div id="divArcGISMap3D" />
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import MapApp from "@/plugin/gis-viewer/MapAppArcgis3D";

@Component({
  name: "MapContainerArcgisThreeD"
})
export default class MapContainerArcgis3D extends Vue {
  mapApp!: MapApp;

  @Emit("mapLoaded")
  async mounted() {
    this.mapApp = new MapApp();
    await this.mapApp.initialize("/MapConfig.json", "divArcGISMap3D");
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

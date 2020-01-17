<template>
  <div id="divArcGISMap" />
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import MapApp from "@/plugin/gis-viewer/MapAppArcgis";

@Component
export default class MapContainerArcgis extends Vue {
  mapApp!: MapApp;

  @Emit("mapLoaded")
  async mounted() {
    this.mapApp = new MapApp();
    await this.mapApp.initialize("/MapConfig.json");
  }
}
</script>

<style scoped>
#divArcGISMap {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div id="divMap">
    <map-container-arcgis />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MapContainerArcgis from "@/plugin/gis-viewer/MapContainerArcgis.vue";

@Component({
  components: {
    MapContainerArcgis
  }
})
export default class MapContainer extends Vue {}
</script>

<style scoped>
#divMap {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>

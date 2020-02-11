<template>
  <div id="divArcGISMap2D" />
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

@Component({
  name: "MapContainerArcgisTwoD"
})
export default class MapContainerArcgis extends Vue {}
</script>

<style scoped>
#divArcGISMap2D {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>

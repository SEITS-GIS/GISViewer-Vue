<template>
  <map-container />
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import MapContainer from "@/plugin/gis-viewer/MapContainer.vue";
@Component({
  components: {
    MapContainer
  }
})
export default class PluginTest extends Vue {}
</script>

<style scoped></style>

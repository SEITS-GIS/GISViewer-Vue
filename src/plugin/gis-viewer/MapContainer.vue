<template>
  <div id="divMap">
    <map-container-arcgis ref="containerArcgis" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import MapContainerArcgis3D from "@/plugin/gis-viewer/MapContainerArcgis3D.vue";

@Component({
  components: {
    MapContainerArcgis3D
  }
})
export default class MapContainer extends Vue {
  @Prop({ default: "arcgis3D" }) readonly platform!: string;

  @Ref() readonly containerArcgis3D!: MapContainerArcgis3D;

  get mapContainer() {
    switch (this.platform) {
      default:
        return this.containerArcgis3D;
    }
  }
}
</script>

<style scoped>
#divMap {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>

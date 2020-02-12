<template>
  <div id="divMap">
    <map-container-arcgis-three-d
      ref="containerArcgis3D"
      v-if="this.platform === 'arcgis3d'"
      :mapConfig="this.mapConfig"
    />
    <map-container-arcgis-two-d
      ref="containerArcgis2D"
      v-if="this.platform === 'arcgis2d'"
      :mapConfig="this.mapConfig"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import MapContainerArcgisThreeD from "@/plugin/gis-viewer/MapContainerArcgis3D.vue";
import MapContainerArcgisTwoD from "@/plugin/gis-viewer/MapContainerArcgis2D.vue";
import { Platforms } from "@/types/map";

@Component({
  components: {
    MapContainerArcgisThreeD,
    MapContainerArcgisTwoD
  }
})
export default class MapContainer extends Vue {
  //平台类型 高德/百度/arcgis
  @Prop({ default: Platforms.ArcGIS3D, type: String })
  readonly platform!: string;

  //地图配置
  @Prop({ type: Object }) readonly mapConfig!: Object;

  @Ref() readonly containerArcgis3D!: MapContainerArcgisThreeD;
  @Ref() readonly containerArcgis2D!: MapContainerArcgisTwoD;

  //当前的地图容器
  get mapContainer() {
    switch (this.platform) {
      case Platforms.ArcGIS2D:
        return this.containerArcgis2D;
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

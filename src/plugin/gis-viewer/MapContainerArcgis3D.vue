<template>
  <div id="divArcGISMap3D" />
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import MapApp from "@/plugin/gis-viewer/MapAppArcgis3D";
import {
  IMapContainer,
  IOverlayParameter,
  IHeatParameter,
  IOverlayClusterParameter,
  IOverlayDelete,
  ILayerConfig,
  IPointGeometry,
  ICenterLevel,
  IFindParameter,
  IResult,
  IDistrictParameter
} from "@/types/map";

@Component({
  name: "MapContainerArcgisThreeD"
})
export default class MapContainerArcgis3D extends Vue implements IMapContainer {
  private mapApp!: MapApp;

  //地图配置
  @Prop({ type: Object }) readonly mapConfig!: Object;

  @Emit("map-loaded")
  async mounted() {
    this.mapApp = new MapApp();
    await this.mapApp.initialize(this.mapConfig, "divArcGISMap3D");
  }

  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    return await this.mapApp.addOverlays(params);
  }

  public addHeatMap(params: IHeatParameter) {}
  public addOverlaysCluster(params: IOverlayClusterParameter) {}
  public deleteOverlays(params: IOverlayDelete) {}
  public deleteOverlaysCluster(params: IOverlayDelete) {}
  public deleteAllOverlays() {}
  public deleteAllOverlaysCluster() {}
  public deleteHeatMap() {}
  public showLayer(params: ILayerConfig) {}
  public hideLayer(params: ILayerConfig) {}
  public setMapCenter(params: IPointGeometry) {}
  public setMapCenterAndLevel(params: ICenterLevel) {}
  public showJurisdiction() {}
  public hideJurisdiction() {}
  public showDistrictMask(param: IDistrictParameter) {}
  public hideDistrictMask() {}
  public findFeature(params: IFindParameter) {}
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

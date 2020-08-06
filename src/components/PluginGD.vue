<template>
  <div id="gisDiv">
    <div id="test">
      <button @click="btn_test1">test1</button>
      <button @click="btn_test2">test2</button>
      <button @click="btn_test3">test3</button>
    </div>
    <gis-viewer
      ref="gisViewer"
      platform="gd"
      :map-config="mapConfig"
      @map-loaded="mapLoaded"
      @marker-click="showGisDeviceInfo"
      @marker-mouse="mouseGisDeviceInfo"
    />
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import axios from 'axios';
import MapConfig from './MapConfig';
@Component
export default class PluginGD extends Vue {
  private cg = new MapConfig();
  private mapConfig = this.cg.gdConfig;
  private async mapLoaded() {
    this.cg.mapLoaded(this.$refs.gisViewer);
  }
  private btn_test1() {
    this.cg.btn_test1(this.$refs.gisViewer);
  }
  private async btn_test2() {
    this.cg.btn_test2(this.$refs.gisViewer);
  }
  private btn_test3() {
    this.cg.btn_test3(this.$refs.gisViewer);
  }
  private showGisDeviceInfo(type: string, id: string, detail: any) {
    console.log(type, id, detail);
  }
  private moveGisDeviceInfo(type: string, id: string, detail: any) {
    console.log(type, id, detail);
  }
}
</script>

<style scoped>
#gisDiv {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
#test {
  position: absolute;
  z-index: 99;
  display: block;
}
</style>

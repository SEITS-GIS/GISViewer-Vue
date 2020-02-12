<template>
  <gis-viewer ref="gisViewer" platform="arcgis3d" :mapConfig="mapConfig" />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class PluginTest extends Vue {
  private mapConfig = {
    arcgis_api: "http://localhost:8090/arcgis_js_api_4/",
    theme: "dark-blue",
    baseLayers: [
      {
        type: "tiled",
        url:
          "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        visible: true
      }
    ],
    options: {
      camera: {
        heading: 0,
        tilt: 0,
        position: {
          x: 0,
          y: 0,
          z: 25000000
        }
      }
    },
    bookmarks: [
      {
        name: "china",
        camera: {
          heading: 0,
          tilt: 9.15,
          position: {
            x: 105.508849,
            y: 22.581284,
            z: 7000000
          }
        }
      }
    ]
  };
}
</script>

<style scoped></style>

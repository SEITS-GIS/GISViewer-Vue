<template>
  <gis-viewer
    ref="gisViewer"
    platform="arcgis3d"
    :map-config="mapConfig"
    @map-loaded="mapLoaded"
  />
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
      //for arcgis-2d
      // center: [121, 31],
      // zoom: 15

      //for arcgis-3d
      camera: {
        heading: 0,
        tilt: 9.15,
        position: {
          x: 105.508849,
          y: 22.581284,
          z: 7000000
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

  private mapLoaded() {
    console.log("map loaded");
    (this.$refs.gisViewer as any).addOverlays({
      type: "police",
      defaultSymbol: {
        type: "2d",
        primitive: "circle",
        size: "66px"
      },
      overlays: [{ id: "test001", geometry: { x: 121.418924, y: 31.157101 } }]
    });
  }
}
</script>

<style scoped></style>

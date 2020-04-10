<template>
  <gis-viewer
    ref="gisViewer"
    platform="bd"
    :map-config="mapConfig"
    @map-loaded="mapLoaded"
  />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class PluginTest extends Vue {
  private mapConfig = {
    //arcgis_api: "http://localhost:8090/arcgis_js_api_4/",
    arcgis_api: "http://localhost:8090/baidu/BDAPI.js",
    theme: "vec", //dark,vec
    baseLayers: [
      {
        type: "traffic",
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
    /* (this.$refs.gisViewer as any).addOverlays({
      type: "police",
      defaultSymbol: {
        //symbol for 2d
        // type: "point-2d",
        // primitive: "square",
        // url: "assets/image/Anchor.png",
        // size: 20,
        // color: "red",
        // outline: {
        //   color: "white",
        //   size: 4
        // },
        // anchor: "top"

        //symbol for 3d
        type: "point-3d",
        primitive: "cube",
        color: "red",
        size: 20000,
        anchor: "bottom"
      },
      overlays: [{ id: "test001", geometry: { x: 121.418924, y: 31.157101 } }]
    }); */
    (this.$refs.gisViewer as any).addOverlays({
      type: "police",
      defaultSymbol: {
        //symbol for 2d
        // type: "point-2d",
        // primitive: "square",
        // url: "assets/image/Anchor.png",
        // size: 20,
        // color: "red",
        // outline: {
        //   color: "white",
        //   size: 4
        // },
        // anchor: "top"

        //symbol for 3d
        type: "point-3d",
        primitive: "cube",
        color: "red",
        size: 20000,
        anchor: "bottom"
      },
      overlays: [
        {
          id: "test001",
          geometry: { x: 121.418924, y: 31.157101 },
          fields: { name: "测试2", featureid: "0002" }
        },
        {
          id: "test002",
          geometry: { x: 121.318924, y: 31.157101 },
          fields: { name: "测试3", featureid: "0003" }
        },
        {
          id: "test003",
          geometry: { x: 121.418924, y: 31.257101 },
          fields: { name: "测试4", featureid: "0001" }
        }
      ],
      showPopup: true,
      autoPopup: true,
      defaultInfoTemplate: {
        title: "1212",
        content: "name:<br/><button>{name}</button>"
      },
      defaultButtons: [{ label: "确认报警", type: "confirmAlarm" }],
      showToolTip: true,
      toolTipContent: "{name}"
    });
  }
}
</script>

<style scoped></style>

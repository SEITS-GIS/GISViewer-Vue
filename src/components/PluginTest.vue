<template>
  <div id="gisDiv">
    <div id="test">
      <button @click="btn_test1">test1</button>
      <button @click="btn_test2">test2</button>
      <button @click="btn_test3">test3</button>
    </div>
    <gis-viewer
      ref="gisViewer"
      platform="bd"
      :map-config="mapConfig"
      @map-loaded="mapLoaded"
      @marker-click="showGisDeviceInfo"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
@Component
export default class PluginTest extends Vue {
  private mapConfig = {
    //arcgis_api: "http://localhost:8090/arcgis_js_api_4/",
    //arcgis_api: "http://128.64.130.247:8219/baidumap/jsapi/api.js",
    //arcgis_api: "http://128.64.151.245:8019/baidumap/jsapi/api.js",
    arcgis_api:"http://localhost:8090/baidu/BDAPI.js",
    theme: "vec", //dark,vec
    baseLayers: [
      {
        label:"路况",
        type: "traffic",
        visible:false
      },
    ],
    gisServer:"http://128.64.151.245:8019",
    options: {
      //for arcgis-2d
      // center: [121, 31],
      // zoom: 15
      //for arcgis-3d
      // camera: {
      //   heading: 0,
      //   tilt: 9.15,
      //   position: {
      //     x: 105.508849,
      //     y: 22.581284,
      //     z: 7000000
      //   }
      // }
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
            z: 7000000,
          },
        },
      },
    ],
  };
  private mapLoaded() {
    console.log("map loaded");
    let map = this.$refs.gisViewer as any;
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
    map.addOverlays({
      type: "police",
      defaultSymbol: {
        //symbol for 2d
        type: "point",
        // primitive: "square",
        url: "assets/image/Anchor.png",
        width: 50,
        height:30,
        // color: "red",
        // outline: {
        //   color: "white",
        //   size: 4
        // },
        // anchor: "top"

        //symbol for 3d
        //type: "point-3d",
        //primitive: "cube",
        //color: "red",
        //size: 20000,
        //anchor: "bottom",
      },
      overlays: [
        {
          id: "test001",
          geometry: { x: 121.418924, y: 31.157101 },
          fields: { name: "测试2", featureid: "0002" },
        },
        {
          id: "test002",
          geometry: { x: 121.318924, y: 31.157101 },
          fields: { name: "测试3", featureid: "0003" },
        },
        {
          id: "test003",
          geometry: { x: 121.418924, y: 31.257101 },
          fields: { name: "测试4", featureid: "0001" },
        },
      ],
      showPopup: true,
      autoPopup: false,
      defaultInfoTemplate: {
        title: "1212",
        content: "<div>name:{name}<br/><button>{name}</button></div>",
      },
      defaultButtons: [{ label: "确认报警", type: "confirmAlarm" }],
      showToolTip: false,
      toolTipContent: "{name}",
    });
  }
  private btn_test1() {
    let map = this.$refs.gisViewer as any;
    // axios.get("config/point.json").then((res: any) => {
    //   map.addOverlaysCluster(res.data);
    // });
    // axios.get("config/point2.json").then((res: any) => {
    //   map.addOverlaysCluster(res.data);
    // });

    //axios.get("config/Jurisdiction/bsga_v2.geo.json").then((res: any) => {
      //map.addOverlaysCluster(res.data);
    //  console.log(res.data);
    //});
    //map.showJurisdiction();
    map.findFeature({layerName: "police", ids: ["test002"],level:15, centerResult: true});
  }
  private btn_test2() {
    let map = this.$refs.gisViewer as any;
    var points = [];
    var x = 121.43;
    var y = 31.15;
    for (var i = 0; i < 200; i++) {
      var x1 = x + (Math.random() * 2 - 1) / 5;
      var y1 = y + (Math.random() * 2 - 1) / 5;
      var value = 1000 * Math.random() + 1;
      var a = i % 2 == 0 ? "1" : "0";
      points.push({
        geometry: { x: x1, y: y1 },
        fields: { desc: "上海体育馆停车场", totalSpace: value, type: a },
      });
    }
    var json = {
      points: points,
      options: {
        field: "totalSpace",
        radius: "20",
        colors: [
          "rgba(30,144,255)",
          "rgb(0, 255, 0)",
          "rgb(255, 255, 0)",
          "rgb(254,89,0)",
        ],
        maxValue: 1000,
        minValue: 1,
        zoom: 12,
        renderer: {
          type: "simple",
          symbol: {
            type: "esriPMS",
            url: "assets/image/Anchor.png",
            width: 64,
            height: 66,
            yoffset: 16,
          },
        },
      },
    };
    map.addHeatMap(json);

    (this.$refs.gisViewer as any).showLayer({type:"traffic"});
  }
  private btn_test3() {
    // (this.$refs.gisViewer as any).deleteHeatMap();
    //(this.$refs.gisViewer as any).deleteOverlaysCluster({types:["sxj"]});
    //(this.$refs.gisViewer as any).deleteAllOverlaysCluster();
    (this.$refs.gisViewer as any).deleteOverlays({types:["police"]});
    //(this.$refs.gisViewer as any).hideLayer({type:"traffic"});
    //(this.$refs.gisViewer as any).setMapCenter({x:121.12,y:31.23});
    //(this.$refs.gisViewer as any).setMapCenterAndLevel({x:121.12,y:31.23,level:15});
  }
  private showGisDeviceInfo(type: string, id: string) {
    console.log(type + "," + id);
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

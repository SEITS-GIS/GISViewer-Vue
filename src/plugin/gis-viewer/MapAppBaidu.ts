<<<<<<< HEAD
import { loadScript, ILoadScriptOptions } from "esri-loader";
import { IMapContainer, IOverlayParameter, IHeatParameter, IOverlayClusterParameter, IOverlayDelete } from "@/types/map";
import { OverlayBaidu } from "@/plugin/gis-viewer/widgets/OverlayBaidu";
import { HeatMapBD } from "./widgets/BD/HeatMapBD";
declare let BMap: any;

export default class MapAppBaidu implements IMapContainer {
  public view!: any;
  public showGisDeviceInfo: any;
=======
import { loadScript } from "esri-loader";
import { IMapContainer, IOverlayParameter } from "@/types/map";
declare let BMap: any;

export default class MapAppBaidu implements IMapContainer {
  public view!: __esri.MapView;
>>>>>>> 8b4c2ea4bcfafc5dd8e8ddc464d568c3fbdb8028

  public async initialize(mapConfig: any, mapContainer: string): Promise<void> {
    const apiUrl = mapConfig.arcgis_api; //"http://localhost:8090/baidu/BDAPI.js";
    let view: any;
    await loadScript({
      url: `${apiUrl}`
    });
    const apiRoot = mapConfig.arcgis_api.substring(0, apiUrl.lastIndexOf("/"));
    console.log(apiRoot);

    await this.loadOtherScripts([
      apiRoot + "/library/Heatmap/Heatmap_min.js",
      apiRoot + "/library/TextIconOverlay/TextIconOverlay_min.js",
      apiRoot + "/library/MarkerClusterer/MarkerClusterer_min.js"
    ]).then(function(e: any) {
      console.log("Load Scripts");
    });
    
    view = new BMap.Map(mapContainer);
    let gisUrl = mapConfig.gisServer
      ? mapConfig.gisServer
      : this.getIpPort(apiUrl);
    if (mapConfig.theme === "dark") {
      let darklayer = new BMap.TileLayer();
      darklayer["getTilesUrl"] = (
        tileCoord: { x: number; y: number },
        zoom: number,
        style: string
      ) => {
        let x = Number((tileCoord.x + "").replace(/-/gi, "M"));
        let y = Number((tileCoord.y + "").replace(/-/gi, "M"));
        let z = zoom;
        return (
          gisUrl +
          "/customtile/" +
          z +
          "/" +
          ~~(x / 10) +
          "/" +
          ~~(y / 10) +
          "/" +
          x +
          "_" +
          y +
          ".png"
        );
      };
      var maptype = new BMap.MapType("地图", darklayer, {
        tips: "显示午夜蓝地图",
        maxZoom: 15
      });
      view.setMapType(maptype);
    }
    if (mapConfig.baseLayers) {
      mapConfig.baseLayers.forEach((element: any) => {
        if (element.visible) {
          this.createLayer(view, element);
        }
      });
    }
    let zoom = 12;
    let center = new BMap.Point(121.31, 31.2);
    if (mapConfig.options.zoom) {
      zoom = mapConfig.options.zoom;
    }
    if (mapConfig.options.center) {
      center = new BMap.Point(
        mapConfig.options.center[0],
        mapConfig.options.center[1]
      );
    }
    view.centerAndZoom(center, zoom);

    view.enableScrollWheelZoom();
    this.view = view;
  }

  private async loadOtherScripts(scriptUrls: string[]): Promise<any> {
    let promises = scriptUrls.map(url => {
      return new Promise((resolve, reject) => {
        const scriptElement = document.createElement("script");
        scriptElement.src = url;
        scriptElement.onload = resolve;
        document.body.appendChild(scriptElement);
      });
    });
    return new Promise(resolve => {
      Promise.all(promises).then(e => {
        resolve(e);
      });
    });
  }
  //得到url中的ip和port
  private getIpPort(url: string): string {
    let urls = url.split("/");
    let ip: string = "";
    for (let el in urls) {
      if (el.indexOf(":") > 0 || el.indexOf(".") > 0) {
        ip = el;
        break;
      }
    }
    if (ip === "") {
      ip = urls[2];
    }
    return ip;
  }
  public createLayer(view: any, layer: any) {
    switch (layer.type) {
      case "traffic":
        view.addTileLayer(new BMap.TrafficLayer());
        break;
    }
  }
<<<<<<< HEAD
  public async addOverlays(params: IOverlayParameter) {
    const overlay = OverlayBaidu.getInstance(this.view);
    overlay.showGisDeviceInfo = this.showGisDeviceInfo;
    await overlay.addOverlays(params);
  }

  public async addOverlaysCluster(params:IOverlayClusterParameter) {
    const overlay = OverlayBaidu.getInstance(this.view);
    overlay.showGisDeviceInfo = this.showGisDeviceInfo;
    await overlay.addOverlaysCluster(params);
  }

  public async addHeatMap(params: IHeatParameter) {
    const heatmap = HeatMapBD.getInstance(this.view);
    await heatmap.addHeatMap(params);
  }

  public async deleteOverlays(params:IOverlayDelete) {
    const overlay = OverlayBaidu.getInstance(this.view);
    await overlay.deleteOverlays(params);
  }

  public async deleteAllOverlays() {
    const overlay = OverlayBaidu.getInstance(this.view);
    overlay.showGisDeviceInfo = this.showGisDeviceInfo;
    await overlay.deleteAllOverlays();
  }
  public async deleteAllOverlaysCluster() {
    const overlay = OverlayBaidu.getInstance(this.view);
    overlay.showGisDeviceInfo = this.showGisDeviceInfo;
    await overlay.deleteAllOverlaysCluster();
  }
  public async deleteHeatMap() {
    const heatmap = HeatMapBD.getInstance(this.view);
    await heatmap.deleteHeatMap();
  }
=======
  public async addOverlays(params: IOverlayParameter) {}
>>>>>>> 8b4c2ea4bcfafc5dd8e8ddc464d568c3fbdb8028
}

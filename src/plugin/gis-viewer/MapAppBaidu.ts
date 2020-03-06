import { loadScript } from "esri-loader";
import { IMapContainer, IOverlayParameter } from "@/types/map";
declare let BMap: any;

export default class MapAppBaidu implements IMapContainer {
  public view!: __esri.MapView;

  public async initialize(mapConfig: any, mapContainer: string): Promise<void> {
    const apiUrl = mapConfig.arcgis_api; //"http://localhost:8090/baidu/BDAPI.js";
    let view: any;
    await loadScript({
      url: `${apiUrl}`
    });

    view = new BMap.Map(mapContainer);
    let gisUrl = mapConfig.gisServer
      ? mapConfig.gisServer
      : this.getIpPort(apiUrl);
    console.log(gisUrl);
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
        this.createLayer(view, element);
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
  public async addOverlays(params: IOverlayParameter) {}
}

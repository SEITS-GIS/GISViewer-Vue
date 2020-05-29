import { loadScript, ILoadScriptOptions } from "esri-loader";
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
import { OverlayGaode } from "@/plugin/gis-viewer/widgets/OverlayGaode";
import { JurisdictionPolice } from "./widgets/GD/JurisdictionPolice";
import { HeatMap } from "./widgets/GD/HeatMap";
declare let AMap: any;

export default class MapAppGaode implements IMapContainer {
  public view!: any;
  public baseLayers: Array<any> = [];
  public showGisDeviceInfo: any;

  public async initialize(mapConfig: any, mapContainer: string): Promise<void> {
    let apiUrl: string = mapConfig.arcgis_api; //"http://localhost:8090/baidu/BDAPI.js";
    let plugins =
      "&plugin=AMap.DistrictSearch,AMap.Heatmap,AMap.CustomLayer,AMap.ControlBar";
    // plugins.forEach((element: string) => {
    //   apiUrl = apiUrl + "&plugin=" + element;
    // });
    apiUrl = apiUrl + plugins;
    let view: any;
    await loadScript({
      url: `${apiUrl}`
    });
    const apiRoot = mapConfig.arcgis_api.substring(0, apiUrl.lastIndexOf("/"));
    console.log(apiRoot);

    view = new AMap.Map(mapContainer, mapConfig.options);

    let gisUrl = mapConfig.gisServer;
    if (mapConfig.baseLayers) {
      mapConfig.baseLayers.forEach((element: any) => {
        this.createLayer(view, element);
      });
    }
    this.view = view;
    this.view.gisServer = gisUrl;
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
        let trafficlayer = new AMap.TileLayer.Traffic({
          autoRefresh: true, //是否自动刷新，默认为false
          interval: 60 //刷新间隔，默认180s
        });
        if (layer.visible !== false) {
          view.add(trafficlayer);
        }
        this.baseLayers.push({
          label: layer.label || "",
          type: layer.type || "",
          layer: trafficlayer,
          visible: layer.visible !== false
        });
        break;
    }
  }
  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    const overlay = OverlayGaode.getInstance(this.view);
    overlay.showGisDeviceInfo = this.showGisDeviceInfo;
    return await overlay.addOverlays(params);
  }
  public async findFeature(params: IFindParameter) {
    const overlay = OverlayGaode.getInstance(this.view);
    await overlay.findFeature(params);
  }

  public async addOverlaysCluster(params: IOverlayClusterParameter) {}

  public async addHeatMap(params: IHeatParameter) {
    const overlay = HeatMap.getInstance(this.view);
    await overlay.addHeatMap(params);
  }

  public async deleteOverlays(params: IOverlayDelete) {
    const overlay = OverlayGaode.getInstance(this.view);
    await overlay.deleteOverlays(params);
  }
  public async deleteOverlaysCluster(params: IOverlayDelete) {}
  public async deleteAllOverlays() {
    const overlay = OverlayGaode.getInstance(this.view);
    await overlay.deleteAllOverlays();
  }
  public async deleteAllOverlaysCluster() {}
  public async deleteHeatMap() {
    const overlay = HeatMap.getInstance(this.view);
    await overlay.deleteHeatMap();
  }
  public async setMapCenter(params: IPointGeometry) {
    let x = params.x;
    let y = params.y;
    let center = new AMap.LngLat(x, y);
    this.view.setCenter(center);
  }
  public async setMapCenterAndLevel(params: ICenterLevel) {
    let x = params.x;
    let y = params.y;
    let center = new AMap.LngLat(x, y);
    let level = params.level || this.view.getZoom();
    this.view.setZoomAndCenter(level, center);
  }

  public showLayer(params: ILayerConfig) {
    console.log(params);
    this.baseLayers.forEach(baselayer => {
      if (
        (params.label && baselayer.label === params.label) ||
        (params.type && baselayer.type === params.type)
      ) {
        if (!baselayer.visible) {
          this.view.add(baselayer.layer);
          baselayer.visible = true;
        }
      }
    });
  }
  public hideLayer(params: ILayerConfig) {
    this.baseLayers.forEach(baselayer => {
      if (
        (params.label && baselayer.label === params.label) ||
        (params.type && baselayer.type === params.type)
      ) {
        if (baselayer.visible) {
          this.view.remove(baselayer.layer);
          baselayer.visible = false;
        }
      }
    });
  }

  public async showJurisdiction() {}
  public async hideJurisdiction() {}

  public async showDistrictMask(param: IDistrictParameter) {
    const jurisdiction = JurisdictionPolice.getInstance(this.view);
    await jurisdiction.showDistrictMask(param);
  }
  public async hideDistrictMask() {
    const jurisdiction = JurisdictionPolice.getInstance(this.view);
    await jurisdiction.hideDistrictMask();
  }
}

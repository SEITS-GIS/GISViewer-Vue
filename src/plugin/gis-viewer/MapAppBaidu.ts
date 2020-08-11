import {loadScript, ILoadScriptOptions} from 'esri-loader';
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
  IDistrictParameter,
  IStreetParameter,
  routeParameter
} from '@/types/map';
import {OverlayBaidu} from '@/plugin/gis-viewer/widgets/Overlays/bd/OverlayBaidu';
import {HeatMapBD} from './widgets/HeatMap/bd/HeatMapBD';
import {JurisdictionPolice} from './widgets/JurisdictionPolice/bd/JurisdictionPolice';
declare let BMap: any;

export default class MapAppBaidu implements IMapContainer {
  public view!: any;
  public baseLayers: Array<any> = [];
  public showGisDeviceInfo: any;

  public async initialize(mapConfig: any, mapContainer: string): Promise<void> {
    const apiUrl = mapConfig.arcgis_api; //"http://localhost:8090/baidu/BDAPI.js";
    let view: any;
    await loadScript({
      url: `${apiUrl}`
    });
    const apiRoot = mapConfig.arcgis_api.substring(0, apiUrl.lastIndexOf('/'));

    await this.loadOtherScripts([
      apiRoot + '/library/Heatmap/Heatmap_min.js',
      apiRoot + '/library/TextIconOverlay/TextIconOverlay_min.js',
      apiRoot + '/library/MarkerClusterer/MarkerClusterer_min.js'
    ]).then(function(e: any) {
      //console.log("Load Scripts");
    });

    view = new BMap.Map(mapContainer);
    let gisUrl = mapConfig.gisServer
      ? mapConfig.gisServer
      : this.getIpPort(apiUrl);
    if (mapConfig.theme === 'dark') {
      view.setMapStyle({style: 'midnight'});
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
    this.view.gisServer = gisUrl;
  }
  private async loadOtherScripts(scriptUrls: string[]): Promise<any> {
    let promises = scriptUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script');
        scriptElement.src = url;
        scriptElement.onload = resolve;
        document.body.appendChild(scriptElement);
      });
    });
    return new Promise((resolve) => {
      Promise.all(promises).then((e) => {
        resolve(e);
      });
    });
  }
  //得到url中的ip和port
  private getIpPort(url: string): string {
    let urls = url.split('/');
    let ip: string = '';
    for (let el in urls) {
      if (el.indexOf(':') > 0 || el.indexOf('.') > 0) {
        ip = el;
        break;
      }
    }
    if (ip === '') {
      ip = urls[2];
    }
    return ip;
  }
  public createLayer(view: any, layer: any) {
    switch (layer.type) {
      case 'traffic':
        let trafficlayer = new BMap.TrafficLayer();
        if (layer.visible !== false) {
          view.addTileLayer(trafficlayer);
        }
        this.baseLayers.push({
          label: layer.label || '',
          type: layer.type || '',
          layer: trafficlayer,
          visible: layer.visible !== false
        });
        break;
    }
  }
  public setMapStyle(param: string) {
    //this.view.setMapStyle(param);
  }
  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    const overlay = OverlayBaidu.getInstance(this.view);
    overlay.showGisDeviceInfo = this.showGisDeviceInfo;
    return await overlay.addOverlays(params);
  }
  public async findFeature(params: IFindParameter) {
    const overlay = OverlayBaidu.getInstance(this.view);
    await overlay.findFeature(params);
  }
  public async findLayerFeature(params: IFindParameter) {}
  public async addOverlaysCluster(params: IOverlayClusterParameter) {
    const overlay = OverlayBaidu.getInstance(this.view);
    overlay.showGisDeviceInfo = this.showGisDeviceInfo;
    await overlay.addOverlaysCluster(params);
  }

  public async addHeatMap(params: IHeatParameter) {
    const heatmap = HeatMapBD.getInstance(this.view);
    await heatmap.addHeatMap(params);
  }

  public async deleteOverlays(params: IOverlayDelete) {
    const overlay = OverlayBaidu.getInstance(this.view);
    await overlay.deleteOverlays(params);
  }
  public async deleteOverlaysCluster(params: IOverlayDelete) {
    const overlay = OverlayBaidu.getInstance(this.view);
    await overlay.deleteOverlaysCluster(params);
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
  public async setMapCenter(params: IPointGeometry) {
    let x = params.x;
    let y = params.y;
    let center = new BMap.Point(x, y);
    this.view.panTo(center);
  }
  public async setMapCenterAndLevel(params: ICenterLevel) {
    let x = params.x;
    let y = params.y;
    let level = params.level || this.view.getZoom();
    let center = new BMap.Point(x, y);
    this.view.centerAndZoom(center, level);
  }

  public showLayer(params: ILayerConfig) {
    this.baseLayers.forEach((baselayer) => {
      if (
        (params.label && baselayer.label === params.label) ||
        (params.type && baselayer.type === params.type)
      ) {
        if (!baselayer.visible) {
          this.view.addTileLayer(baselayer.layer);
          baselayer.visible = true;
        }
      }
    });
  }
  public hideLayer(params: ILayerConfig) {
    this.baseLayers.forEach((baselayer) => {
      if (
        (params.label && baselayer.label === params.label) ||
        (params.type && baselayer.type === params.type)
      ) {
        if (baselayer.visible) {
          this.view.removeTileLayer(baselayer.layer);
          baselayer.visible = false;
        }
      }
    });
  }

  public async showJurisdiction() {
    const police = JurisdictionPolice.getInstance(this.view);
    await police.showJurisdiction();
  }
  public async hideJurisdiction() {
    const police = JurisdictionPolice.getInstance(this.view);
    await police.hideJurisdiction();
  }
  public async showDistrictMask(param: IDistrictParameter) {}
  public async hideDistrictMask() {}
  public async showRoad() {}
  public async hideRoad() {}
  public async showStreet() {}
  public async hideStreet() {}
  public async locateStreet(param: IStreetParameter) {}
  public async routeSearch(params: routeParameter): Promise<IResult> {
    return {status: 0, message: ''};
  }
  public clearRouteSearch() {}
}

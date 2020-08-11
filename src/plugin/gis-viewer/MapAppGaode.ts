import {loadScript, getScript, ILoadScriptOptions} from 'esri-loader';
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
import {OverlayGaode} from '@/plugin/gis-viewer/widgets/Overlays/gd/OverlayGaode';
import {JurisdictionPoliceGD} from './widgets/JurisdictionPolice/gd/JurisdictionPoliceGD';
import {HeatMapGD} from './widgets/HeatMap/gd/HeatMapGD';
import {ClusterGD} from './widgets/Cluster/gd/ClusterGD';
import '@amap/amap-jsapi-types';
import AMapLoader from '@amap/amap-jsapi-loader';
import {DrawSteet} from './widgets/DrawStreet/gd/DrawStreet';
import Route from './widgets/Route/Route';

export default class MapAppGaode implements IMapContainer {
  public view!: AMap.Map;
  public baseLayers: Array<any> = [];
  public showGisDeviceInfo: any;
  public mouseGisDeviceInfo: any;

  public async initialize(mapConfig: any, mapContainer: string) {
    let apiUrl = mapConfig.arcgis_api || mapConfig.api_url;
    let plugins = [
      'AMap.DistrictSearch',
      'AMap.CustomLayer',
      'AMap.ControlBar',
      'AMap.MarkerClusterer',
      'AMap.Driving',
      'AMap.Walking',
      'AMap.Riding'
    ];
    let version = '1.0';
    if (apiUrl.indexOf('v=2') > -1) {
      plugins.push('AMap.HeatMap');
      version = '2.0';
    } else {
      plugins.push('AMap.Heatmap');
    }
    let key = this.getQueryString(apiUrl, 'key');
    let v = this.getQueryString(apiUrl, 'v');
    await AMapLoader.load({
      key: key,
      version: v,
      plugins: plugins
    });
    this.view = new AMap.Map(mapContainer, mapConfig.options);
    (this.view as any).version = version;
    (this.view as any).mapOptions = mapConfig.options;
    this.destroy();
    return new Promise((resole) => {
      this.view.on('complete', () => {
        if (mapConfig.baseLayers) {
          mapConfig.baseLayers.forEach((element: any) => {
            this.createLayer(this.view, element);
          });
        }
        resole();
      });
    });
  }
  private getQueryString(url: string, name: string): string {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
    let search = url.split('?')[1];
    let r = search.match(reg); //匹配目标参数
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return ''; //返回参数值
  }
  public createLayer(view: any, layer: any) {
    switch (layer.type) {
      case 'traffic':
        let trafficlayer = new AMap.TileLayer.Traffic({
          autoRefresh: true, //是否自动刷新，默认为false
          interval: layer.interval || 60, //刷新间隔，默认180s
          zooms: layer.zooms || [3, 17],
          opacity: layer.opacity || 1,
          zIndex: layer.zIndex || 4
        });
        if (layer.visible !== false) {
          view.add(trafficlayer);
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
  private destroy() {
    OverlayGaode.destroy();
    ClusterGD.destroy();
    HeatMapGD.destroy();
    JurisdictionPoliceGD.destroy();
    DrawSteet.destroy();
  }
  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    const overlay = OverlayGaode.getInstance(this.view);
    overlay.showGisDeviceInfo = this.showGisDeviceInfo;
    overlay.mouseGisDeviceInfo = this.mouseGisDeviceInfo;
    return await overlay.addOverlays(params);
  }

  public async findFeature(params: IFindParameter): Promise<IResult> {
    const overlay = OverlayGaode.getInstance(this.view);
    return await overlay.findFeature(params);
  }
  public async findLayerFeature(params: IFindParameter) {}
  public async addOverlaysCluster(params: IOverlayClusterParameter) {
    const cluster = ClusterGD.getInstance(this.view);
    cluster.showGisDeviceInfo = this.showGisDeviceInfo;
    await cluster.addOverlaysCluster(params);
  }

  public async addHeatMap(params: IHeatParameter) {
    const heatmap = HeatMapGD.getInstance(this.view);
    await heatmap.addHeatMap(params);
  }

  public async deleteOverlays(params: IOverlayDelete) {
    const overlay = OverlayGaode.getInstance(this.view);
    await overlay.deleteOverlays(params);
  }

  public async deleteOverlaysCluster(params: IOverlayDelete) {
    const cluster = ClusterGD.getInstance(this.view);
    await cluster.deleteOverlaysCluster(params);
  }

  public async deleteAllOverlays() {
    const overlay = OverlayGaode.getInstance(this.view);
    await overlay.deleteAllOverlays();
  }

  public async deleteAllOverlaysCluster() {
    const cluster = ClusterGD.getInstance(this.view);
    await cluster.deleteAllOverlaysCluster();
  }
  public async deleteHeatMap() {
    const overlay = HeatMapGD.getInstance(this.view);
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
    this.baseLayers.forEach((baselayer) => {
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
    this.baseLayers.forEach((baselayer) => {
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
    const jurisdiction = JurisdictionPoliceGD.getInstance(this.view);
    await jurisdiction.showDistrictMask(param);
  }
  public async hideDistrictMask() {
    const jurisdiction = JurisdictionPoliceGD.getInstance(this.view);
    await jurisdiction.hideDistrictMask();
  }
  public async showRoad(param: {ids: string[]}) {
    const road = DrawSteet.getInstance(this.view);
    await road.showRoad(param);
  }
  public async hideRoad() {
    const road = DrawSteet.getInstance(this.view);
    await road.hideRoad();
  }
  public async showStreet() {
    const jurisdiction = JurisdictionPoliceGD.getInstance(this.view);
    await jurisdiction.showStreet();
  }
  public async hideStreet() {
    const jurisdiction = JurisdictionPoliceGD.getInstance(this.view);
    await jurisdiction.hideStreet();
  }
  public async locateStreet(param: IStreetParameter) {
    const jurisdiction = JurisdictionPoliceGD.getInstance(this.view);
    await jurisdiction.locateStreet(param);
  }
  public setMapStyle(param: string) {
    this.view.setMapStyle(param);
  }
  public async routeSearch(params: routeParameter): Promise<IResult> {
    const route = Route.getInstance(this.view);
    return await route.routeSearch(params);
  }
  public clearRouteSearch() {
    const route = Route.getInstance(this.view);
    route.clearRouteSearch();
  }
}

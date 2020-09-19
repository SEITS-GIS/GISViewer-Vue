import {setDefaultOptions, loadCss, loadModules} from 'esri-loader';
import {
  ILayerConfig,
  IOverlayParameter,
  IMapContainer,
  IOverlay,
  IHeatParameter,
  IOverlayClusterParameter,
  IOverlayDelete,
  IPointGeometry,
  ICenterLevel,
  IFindParameter,
  IResult,
  IDistrictParameter,
  IStreetParameter,
  routeParameter,
  IHeatImageParameter,
  IGeometrySearchParameter
} from '@/types/map';
import {OverlayArcgis3D} from '@/plugin/gis-viewer/widgets/Overlays/arcgis/OverlayArcgis3D';
import {RasterStretchRenderer} from 'esri/rasterRenderers';
import {FindFeature} from './widgets/FindFeature/arcgis/FindFeature';
import {HeatMap} from './widgets/HeatMap/arcgis/HeatMap';
import {HeatMap3D} from './widgets/HeatMap/arcgis/HeatMap3D';
import ToolTip from './widgets/Overlays/arcgis/ToolTip';
import {Cluster} from './widgets/Cluster/arcgis/Cluster';
import {DrawLayer} from './widgets/DrawLayer/arcgis/DrawLayer';
import {MigrateChart} from './widgets/MigrateChart/arcgis/MigrateChart';
import {HeatImage} from './widgets/HeatMap/arcgis/HeatImage';
import HeatImage2D from './widgets/HeatMap/arcgis/HeatImage2D';
import HeatImageGL from './widgets/HeatMap/arcgis/HeatImageGL';
import HeatImage3D from './widgets/HeatMap/arcgis/HeatImage3D';
import {GeometrySearch} from './widgets/GeometrySearch/arcgis/GeometrySearch';
import {Bar3DChart} from './widgets/MigrateChart/arcgis/Bar3DChart';

export default class MapAppArcGIS3D implements IMapContainer {
  public view!: __esri.SceneView;
  public showGisDeviceInfo: any;
  private mapToolTip: any;
  public mapClick: any;

  public async initialize(mapConfig: any, mapContainer: string): Promise<void> {
    const apiUrl = mapConfig.arcgis_api || 'https://js.arcgis.com/4.14/';

    // await loadModules(['esri/config']).then(([esriConfig]) => {
    //   esriConfig.workers.loaderConfig.baseUrl = apiUrl + '/dojo';
    // });

    setDefaultOptions({url: `${apiUrl}/init.js`});

    const cssFile: string = mapConfig.theme
      ? `themes/${mapConfig.theme}/main.css`
      : 'css/main.css';
    loadCss(`${apiUrl}/esri/${cssFile}`);
    if (mapConfig.theme == 'custom') {
      this.loadCustomCss();
    }
    type MapModules = [
      typeof import('esri/views/SceneView'),
      typeof import('esri/Basemap'),
      typeof import('esri/Map'),
      typeof import('esri/layers/TileLayer'),
      typeof import('esri/layers/WebTileLayer'),
      typeof import('esri/core/Collection')
    ];
    const [
      SceneView,
      Basemap,
      Map,
      TileLayer,
      WebTileLayer,
      Collection
    ] = await (loadModules([
      'esri/views/SceneView',
      'esri/Basemap',
      'esri/Map',
      'esri/layers/TileLayer',
      'esri/layers/WebTileLayer',
      'esri/core/Collection'
    ]) as Promise<MapModules>);

    const baseLayers: __esri.Collection = new Collection();
    baseLayers.addMany(
      mapConfig.baseLayers.map((layerConfig: ILayerConfig) => {
        if (layerConfig.type === 'tiled') {
          delete layerConfig.type;
          return new TileLayer(layerConfig);
        } else if (layerConfig.type === 'webtiled') {
          return new WebTileLayer({
            urlTemplate: layerConfig.url,
            subDomains: layerConfig.subDomains || undefined
          });
        }
      })
    );
    //this.destroy();
    const basemap: __esri.Basemap = new Basemap({
      baseLayers
    });
    const view: __esri.SceneView = new SceneView({
      map: new Map({
        basemap,
        ground: mapConfig.options.ground
      }),
      container: mapContainer,
      ...mapConfig.options
    });
    if (mapConfig.operationallayers) {
      this.createLayer(view, mapConfig.operationallayers);
    }
    view.ui.remove('attribution');
    view.ui.remove('zoom');
    view.ui.remove('compass');
    view.ui.remove('navigation-toggle');
    view.on('click', async (event) => {
      if (event.mapPoint) {
        let mp = event.mapPoint;
        this.mapClick({
          x: mp.longitude,
          y: mp.latitude,
          lat: mp.x,
          lnt: mp.y,
          wkid: mp.spatialReference.wkid
        });
      } else {
        this.mapClick(event);
      }
      const response = await view.hitTest(event);
      if (response.results.length > 0) {
        // response.results.forEach((result) => {
        //   //}
        // });
        let result = response.results[0];
        const graphic = result.graphic;
        let {type, id} = graphic.attributes;
        let label = graphic.layer ? (graphic.layer as any).label : '';
        if (
          graphic.layer &&
          (graphic.layer.type == 'feature' || graphic.layer.type == 'graphics')
        ) {
          id =
            graphic.attributes['DEVICEID'] ||
            graphic.attributes['FEATUREID'] ||
            graphic.attributes['SECTIONID'] ||
            graphic.attributes['id'] ||
            graphic.attributes['ID'] ||
            undefined;
          type =
            graphic.attributes['DEVICETYPE'] ||
            graphic.attributes['FEATURETYPE'] ||
            graphic.attributes['FEATURETYP'] ||
            graphic.attributes['type'] ||
            graphic.attributes['TYPE'] ||
            label ||
            undefined;
        }
        //if (id) {
        this.showGisDeviceInfo(type, id, graphic.toJSON());
      } else {
        this.doIdentifyTask(event.mapPoint).then((results: any) => {
          if (results.length > 0) {
            let res = results.filter((item: any) => {
              if (item != undefined) {
                return true;
              } else {
                return false;
              }
            })[0];
            if (!res) {
              return;
            }
            let layername = res.layerName;
            let layerid = res.layerId;
            let id =
              res.feature.attributes['DEVICEID'] ||
              res.feature.attributes['FEATUREID'] ||
              res.feature.attributes['SECTIONID'] ||
              res.feature.attributes[res.displayFieldName];
            this.showGisDeviceInfo(layername, id, res.feature.attributes);
            let selectLayer = this.getLayerByName(layername, layerid);
            if (selectLayer.popupTemplates) {
              let popup = selectLayer.popupTemplates[layerid];
              if (popup) {
                this.view.popup.open({
                  title: popup.title,
                  content: this.getContent(
                    res.feature.attributes,
                    popup.content
                  ),
                  location: event.mapPoint
                });
              }
            }
          }
        });
      }
    });
    await view.when();
    this.view = view;
    (this.view as any).mapOptions = mapConfig.options;
  }
  private loadCustomCss() {
    require('./styles/custom.css');
  }
  private destroy() {
    OverlayArcgis3D.destroy();
    Cluster.destroy();
    HeatMap3D.destroy();
    FindFeature.destroy();
    DrawLayer.destroy();
    MigrateChart.destroy();
    HeatImage.destroy();
    GeometrySearch.destroy();
  }
  //使toolTip中支持{字段}的形式
  private getContent(attr: any, content: string): string {
    let tipContent = content;
    if (content) {
      //键值对
      for (let fieldName in attr) {
        if (attr.hasOwnProperty(fieldName)) {
          tipContent = tipContent.replace(
            '{' + fieldName + '}',
            attr[fieldName]
          );
        }
      }
    }
    return tipContent;
  }
  private getLayerIds(layer: any): any[] {
    let layerids = [];
    if (layer.type == 'feature') {
      //featurelayer查询
      layerids.push(layer.layerId);
    } else if (layer.type == 'map-image') {
      let sublayers = (layer as __esri.MapImageLayer).sublayers;
      sublayers.forEach((sublayer) => {
        if (sublayer.visible) {
          layerids.push(sublayer.id);
        }
      });
    }
    return layerids.reverse();
  }
  private getLayerByName(layername: string, id: string | number): any {
    let selLayer;
    let layers = this.view.map.allLayers.toArray().forEach((layer: any) => {
      if (layer.type == 'imagery' || layer.type == 'map-image') {
        let sublayers = (layer as __esri.MapImageLayer).allSublayers;
        sublayers.forEach((sublayer) => {
          if (
            sublayer.title == layername &&
            sublayer.id.toString() == id.toString()
          ) {
            selLayer = layer;
          }
        });
      }
      return false;
    });
    return selLayer;
  }
  private async doIdentifyTask(clickpoint: any) {
    let layers = this.view.map.allLayers.filter((layer: any) => {
      if (
        layer.visible &&
        (layer.type == 'imagery' || layer.type == 'map-image')
      ) {
        return true;
      }
      return false;
    });
    let that = this;
    type MapModules = [
      typeof import('esri/Graphic'),
      typeof import('esri/tasks/IdentifyTask'),
      typeof import('esri/tasks/support/IdentifyParameters')
    ];
    const [Graphic, IdentifyTask, IdentifyParameters] = await (loadModules([
      'esri/Graphic',
      'esri/tasks/IdentifyTask',
      'esri/tasks/support/IdentifyParameters'
    ]) as Promise<MapModules>);
    let promises: any = layers.toArray().map((layer: any) => {
      return new Promise((resolve, reject) => {
        let identify = new IdentifyTask(layer.url); //创建属性查询对象

        let identifyParams = new IdentifyParameters(); //创建属性查询参数
        identifyParams.tolerance = 3;
        identifyParams.layerIds = that.getLayerIds(layer);
        identifyParams.layerOption = 'visible'; //"top"|"visible"|"all"
        identifyParams.width = that.view.width;
        identifyParams.height = that.view.height;
        identifyParams.geometry = clickpoint;
        identifyParams.mapExtent = that.view.extent;

        // 执行查询对象
        identify.execute(identifyParams).then((data: any) => {
          let results = data.results;
          if (results.length < 1) {
            resolve(undefined);
          } else {
            resolve(results[0]);
          }
        });
      });
    });
    return new Promise((resolve) => {
      Promise.all(promises).then((e: any) => {
        resolve(e);
      });
    });
  }
  private async createLayer(view: __esri.SceneView, layers: any) {
    type MapModules = [
      typeof import('esri/layers/FeatureLayer'),
      typeof import('esri/layers/WebTileLayer'),
      typeof import('esri/layers/MapImageLayer'),
      typeof import('esri/layers/WMSLayer'),
      typeof import('esri/layers/Layer'),
      typeof import('esri/layers/support/LabelClass'),
      typeof import('esri/Color'),
      typeof import('esri/symbols/Font'),
      typeof import('esri/symbols/TextSymbol')
    ];
    const [
      FeatureLayer,
      WebTileLayer,
      MapImageLayer,
      WMSLayer,
      Layer,
      LabelClass,
      Color,
      Font,
      TextSymbol
    ] = await (loadModules([
      'esri/layers/FeatureLayer',
      'esri/layers/WebTileLayer',
      'esri/layers/MapImageLayer',
      'esri/layers/WMSLayer',
      'esri/layers/Layer',
      'esri/layers/support/LabelClass',
      'esri/Color',
      'esri/symbols/Font',
      'esri/symbols/TextSymbol'
    ]) as Promise<MapModules>);
    let map = view.map;
    map.addMany(
      layers
        .map((layerConfig: any) => {
          let layer: any;
          let type = layerConfig.type.toLowerCase();
          delete layerConfig.type;
          switch (type) {
            case 'feature':
              layer = new FeatureLayer(layerConfig);
              layer.labelingInfo = layerConfig.labelingInfo;
              break;
            case 'dynamic':
              layer = new MapImageLayer(layerConfig);
              break;
            case 'wms':
              layer = new WMSLayer(layerConfig);
              break;
            case 'webtiled':
              layer = new WebTileLayer({
                urlTemplate: layerConfig.url,
                subDomains: layerConfig.subDomains || undefined
              });
              break;
            case 'json':
              const drawlayer = DrawLayer.getInstance(view);
              drawlayer.addDrawLayer(layerConfig);
              break;
          }
          // if (layer) {
          //   layer.id = layerConfig.id || layerConfig.label;
          // }
          return layer;
        })
        .filter((layer: any) => {
          return layer !== undefined;
        })
    );
  }
  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    const overlay = OverlayArcgis3D.getInstance(this.view);
    return await overlay.addOverlays(params);
  }
  public async addOverlaysCluster(params: IOverlayClusterParameter) {
    const cluster = Cluster.getInstance(this.view);
    return await cluster.addOverlaysCluster(params);
  }
  public async addHeatMap(params: IHeatParameter) {
    const heatmap = HeatMap3D.getInstance(this.view);
    return await heatmap.addHeatMap(params);
  }
  public async deleteAllOverlays() {
    const overlay = OverlayArcgis3D.getInstance(this.view);
    return await overlay.deleteAllOverlays();
  }
  public async deleteAllOverlaysCluster() {
    const cluster = Cluster.getInstance(this.view);
    return await cluster.deleteAllOverlaysCluster();
  }
  public async deleteHeatMap() {
    const heatmap = HeatMap3D.getInstance(this.view);
    return await heatmap.deleteHeatMap();
  }
  public async deleteOverlays(params: IOverlayDelete) {
    const overlay = OverlayArcgis3D.getInstance(this.view);
    return await overlay.deleteOverlays(params);
  }
  public async deleteOverlaysCluster(params: IOverlayDelete) {
    const cluster = Cluster.getInstance(this.view);
    return await cluster.deleteOverlaysCluster(params);
  }
  public async showLayer(params: ILayerConfig) {
    console.log(params);
    this.view.map.allLayers.forEach((baselayer: ILayerConfig) => {
      if (params.label && baselayer.label === params.label) {
        if (!baselayer.visible) {
          baselayer.visible = true;
        }
      }
    });
  }
  public async hideLayer(params: ILayerConfig) {
    console.log(params);
    this.view.map.allLayers.forEach((baselayer: ILayerConfig) => {
      if (params.label && baselayer.label === params.label) {
        if (baselayer.visible) {
          baselayer.visible = false;
        }
      }
    });
  }
  public async setMapCenter(params: IPointGeometry) {
    let x = params.x;
    let y = params.y;

    if (!isNaN(x) && !isNaN(y)) {
      this.view.goTo({
        center: [x, y]
      });
    }
  }
  public async setMapCenterAndLevel(params: ICenterLevel) {
    let x = params.x;
    let y = params.y;
    let level: number = params.level || this.view.zoom;

    if (!isNaN(x) && !isNaN(y) && !isNaN(level) && level >= 0) {
      this.view.goTo({
        zoom: level,
        center: [x, y]
      });
    }
  }
  public async showJurisdiction() {}
  public async hideJurisdiction() {}
  public async findFeature(params: IFindParameter) {
    // const overlay = OverlayArcgis3D.getInstance(this.view);
    // return await overlay.findFeature(params);
    const find = FindFeature.getInstance(this.view);
    return await find.findLayerFeature(params);
  }
  public async showDistrictMask(param: IDistrictParameter) {}
  public async hideDistrictMask() {}
  public async showRoad() {}
  public async hideRoad() {}
  public async showStreet() {}
  public async hideStreet() {}
  public async locateStreet(param: IStreetParameter) {}
  public setMapStyle(param: string) {}

  public async routeSearch(params: routeParameter): Promise<IResult> {
    return {status: 0, message: ''};
  }
  public clearRouteSearch() {}

  public showRoutePoint(params: any) {}
  public clearRoutePoint() {}

  public async addDrawLayer(params: any): Promise<IResult> {
    const drawlayer = DrawLayer.getInstance(this.view);
    return await drawlayer.addDrawLayer(params);
  }
  public clearDrawLayer(params: any) {
    const drawlayer = DrawLayer.getInstance(this.view);
    drawlayer.clearDrawLayer(params);
  }
  public showMigrateChart(params: any) {
    const chart = MigrateChart.getInstance(this.view);
    chart.showMigrateChart(params);
  }
  public hideMigrateChart() {
    const chart = MigrateChart.getInstance(this.view);
    chart.hideMigrateChart();
  }
  public showBarChart(params: any) {
    const chart = Bar3DChart.getInstance(this.view);
    chart.showBarChart(params);
  }
  public hideBarChart() {
    const chart = Bar3DChart.getInstance(this.view);
    chart.hideBarChart();
  }
  public addHeatImage(params: IHeatImageParameter) {
    const heatmap2 = HeatImage3D.getInstance(this.view);
    return heatmap2.startup(params);
  }
  public deleteHeatImage() {}
  public async startGeometrySearch(
    params: IGeometrySearchParameter
  ): Promise<IResult> {
    let geometrySearch = GeometrySearch.getInstance(this.view);
    return await geometrySearch.startGeometrySearch(params);
  }
  public clearGeometrySearch() {
    let geometrySearch = GeometrySearch.getInstance(this.view);
    geometrySearch.clearGeometrySearch();
  }
  public async showDgene(params: any): Promise<IResult> {
    return {status: 0, message: ''};
  }
  public hideDgene() {}
  public async addDgeneFusion(params: any): Promise<IResult> {
    return {status: 0, message: ''};
  }
  public async restoreDegeneFsion(): Promise<IResult> {
    return {status: 0, message: ''};
  }
}

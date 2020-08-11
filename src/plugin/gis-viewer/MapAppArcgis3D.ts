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
  routeParameter
} from '@/types/map';
import {OverlayArcgis3D} from '@/plugin/gis-viewer/widgets/Overlays/arcgis/OverlayArcgis3D';
import {RasterStretchRenderer} from 'esri/rasterRenderers';
import {FindFeature} from './widgets/FindFeature/arcgis/FindFeature';
import {HeatMap} from './widgets/HeatMap/arcgis/HeatMap';
import {HeatMap3D} from './widgets/HeatMap/arcgis/HeatMap3D';
import ToolTip from './widgets/Overlays/arcgis/ToolTip';
import {Cluster} from './widgets/Cluster/arcgis/Cluster';

export default class MapAppArcGIS3D implements IMapContainer {
  public view!: __esri.SceneView;
  public showGisDeviceInfo: any;
  private mapToolTip: any;

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
      this.createLayer(view.map, mapConfig.operationallayers);
    }
    view.ui.remove('attribution');
    view.on('click', async (event) => {
      const response = await view.hitTest(event);
      if (response.results.length > 0) {
        response.results.forEach((result) => {
          const graphic = result.graphic;
          let {type, id} = graphic.attributes;
          if (
            graphic.layer.type == 'feature' ||
            graphic.layer.type == 'graphics'
          ) {
            id =
              graphic.attributes['DEVICEID'] ||
              graphic.attributes['FEATUREID'] ||
              graphic.attributes['id'] ||
              graphic.attributes['ID'] ||
              undefined;
            type =
              graphic.attributes['DEVICETYPE'] ||
              graphic.attributes['FEATURETYPE'] ||
              graphic.attributes['FEATURETYP'] ||
              graphic.attributes['type'] ||
              graphic.attributes['TYPE'] ||
              undefined;
          }
          if (type && id) {
            this.showGisDeviceInfo(type, id, graphic.toJSON());
          }
        });
      } else {
        this.doIdentifyTask(event.mapPoint).then((results: any) => {
          if (results.length > 0) {
            let result = results[0];
            let type = result.layerName;
            let layerid = result.layerId;
            let id =
              result.feature.attributes['DEVICEID'] ||
              result.feature.attributes['FEATUREID'] ||
              result.feature.attributes[result.displayFieldName];
            this.showGisDeviceInfo(type, id, result.feature.attributes);
            let selectLayer = this.getLayerByName(type);
            if (selectLayer.popupTemplates) {
              let popup = selectLayer.popupTemplates[layerid];
              if (popup) {
                this.view.popup.open({
                  title: popup.title,
                  content: this.getContent(
                    result.feature.attributes,
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
  private getLayerByName(layername: string): any {
    let selLayer;
    let layers = this.view.map.allLayers.toArray().forEach((layer: any) => {
      if (layer.type == 'imagery' || layer.type == 'map-image') {
        let sublayers = (layer as __esri.MapImageLayer).sublayers;
        sublayers.forEach((sublayer) => {
          if (sublayer.title == layername) {
            selLayer = layer;
          }
        });
      }
      return false;
    });
    return selLayer;
  }
  private async doIdentifyTask(clickpoint: any) {
    console.log(clickpoint);
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
          if (results.length < 1) return [];
          resolve(results[0]);
        });
      });
    });
    return new Promise((resolve) => {
      Promise.all(promises).then((e: any) => {
        resolve(e);
      });
    });
  }
  private async createLayer(map: __esri.Map, layers: any) {
    type MapModules = [
      typeof import('esri/layers/FeatureLayer'),
      typeof import('esri/layers/WebTileLayer'),
      typeof import('esri/layers/MapImageLayer'),
      typeof import('esri/layers/WMSLayer'),
      typeof import('esri/layers/Layer'),
      typeof import('esri/layers/support/LabelClass'),
      typeof import('esri/Color'),
      typeof import('esri/symbols/Font'),
      typeof import('esri/symbols/TextSymbol'),
      any
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
      TextSymbol,
      PictureLayer
    ] = await (loadModules([
      'esri/layers/FeatureLayer',
      'esri/layers/WebTileLayer',
      'esri/layers/MapImageLayer',
      'esri/layers/WMSLayer',
      'esri/layers/Layer',
      'esri/layers/support/LabelClass',
      'esri/Color',
      'esri/symbols/Font',
      'esri/symbols/TextSymbol',
      'libs/PictureLayer.js'
    ]) as Promise<MapModules>);
    map.addMany(
      layers.map((layerConfig: any) => {
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
          case 'picture':
            let extent = {
              xmin: 1.3399331780261297e7,
              ymin: 3642756.620312426,
              xmax: 1.3661939778556328e7,
              ymax: 3754658.9837650103
            };
            let spatialReference = {wkid: 102100, latestWkid: 3857};
            let units = 'esriMeters';
            layer = new PictureLayer({
              visible: true,
              url: layerConfig.url,
              opacity: 1,
              pictureExtent: extent,
              units: units,
              spatialReference: spatialReference
            });
            break;
        }
        layer.id = layerConfig.id || layerConfig.label;
        return layer;
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
}

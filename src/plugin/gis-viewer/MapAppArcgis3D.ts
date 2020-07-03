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
  IDistrictParameter
} from '@/types/map';
import {OverlayArcgis3D} from '@/plugin/gis-viewer/widgets/OverlayArcgis3D';
import {RasterStretchRenderer} from 'esri/rasterRenderers';

export default class MapAppArcGIS3D implements IMapContainer {
  public view!: __esri.SceneView;
  public showGisDeviceInfo: any;

  public async initialize(mapConfig: any, mapContainer: string): Promise<void> {
    const apiUrl = mapConfig.arcgis_api || 'https://js.arcgis.com/4.14/';
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
        basemap
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
      response.results.forEach((result) => {
        const graphic = result.graphic;
        let {type, id} = graphic.attributes;
        if (graphic.layer.declaredClass.indexOf('FeatureLayer') > -1) {
          id =
            graphic.attributes['DEVICEID'] ||
            graphic.attributes['FEATUREID'] ||
            undefined;
          type =
            graphic.attributes['DEVICETYPE'] ||
            graphic.attributes['FEATURETYPE'] ||
            graphic.attributes['FEATURETYP'] ||
            undefined;
        }
        if (type && id) {
          this.showGisDeviceInfo(type, id, graphic.toJSON());
        }
      });
    });
    await view.when();
    this.view = view;
  }
  private async createLayer(map: __esri.Map, layers: any) {
    type MapModules = [
      typeof import('esri/layers/FeatureLayer'),
      typeof import('esri/layers/WebTileLayer'),
      typeof import('esri/layers/MapImageLayer'),
      typeof import('esri/layers/Layer')
    ];
    const [
      FeatureLayer,
      WebTileLayer,
      MapImageLayer,
      Layer
    ] = await (loadModules([
      'esri/layers/FeatureLayer',
      'esri/layers/WebTileLayer',
      'esri/layers/MapImageLayer',
      'esri/layers/Layer'
    ]) as Promise<MapModules>);
    map.addMany(
      layers.map((layerConfig: any) => {
        let layer: any;
        switch (layerConfig.type.toLowerCase()) {
          case 'feature':
            delete layerConfig.type;
            layer = new FeatureLayer(layerConfig);
            break;
          case 'dynamic':
            delete layerConfig.type;
            layer = new MapImageLayer(layerConfig);
            break;
          case 'webtiled':
            delete layerConfig.type;
            layer = new WebTileLayer({
              urlTemplate: layerConfig.url,
              subDomains: layerConfig.subDomains || undefined
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
  public async addOverlaysCluster(params: IOverlayClusterParameter) {}
  public async addHeatMap(params: IHeatParameter) {}
  public async deleteAllOverlays() {
    const overlay = OverlayArcgis3D.getInstance(this.view);
    return await overlay.deleteAllOverlays();
  }
  public async deleteAllOverlaysCluster() {}
  public async deleteHeatMap() {}
  public async deleteOverlays(params: IOverlayDelete) {
    const overlay = OverlayArcgis3D.getInstance(this.view);
    return await overlay.deleteOverlays(params);
  }
  public async deleteOverlaysCluster(params: IOverlayDelete) {}
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
    const overlay = OverlayArcgis3D.getInstance(this.view);
    return await overlay.findFeature(params);
  }
  public async showDistrictMask(param: IDistrictParameter) {}
  public async hideDistrictMask() {}
  public async showRoad() {}
  public async hideRoad() {}
}

import { setDefaultOptions, loadCss, loadModules } from "esri-loader";
import {
  ILayerConfig,
  IOverlayParameter,
  IMapContainer,
  IOverlay,
  IHeatParameter,
  IOverlayClusterParameter,
  IOverlayDelete
} from "@/types/map";
import { OverlayArcgis3D } from "@/plugin/gis-viewer/widgets/OverlayArcgis3D";

export default class MapAppArcGIS3D implements IMapContainer {
  public view!: __esri.SceneView;

  public async initialize(mapConfig: any, mapContainer: string): Promise<void> {
    const apiUrl = mapConfig.arcgis_api || "https://js.arcgis.com/4.14/";
    setDefaultOptions({ url: `${apiUrl}/init.js` });

    const cssFile: string = mapConfig.theme
      ? `themes/${mapConfig.theme}/main.css`
      : "css/main.css";
    loadCss(`${apiUrl}/esri/${cssFile}`);

    type MapModules = [
      typeof import("esri/views/SceneView"),
      typeof import("esri/Basemap"),
      typeof import("esri/Map"),
      typeof import("esri/layers/TileLayer"),
      typeof import("esri/core/Collection")
    ];
    const [
      SceneView,
      Basemap,
      Map,
      TileLayer,
      Collection,
    ] = await (loadModules([
      "esri/views/SceneView",
      "esri/Basemap",
      "esri/Map",
      "esri/layers/TileLayer",
      "esri/core/Collection",
    ]) as Promise<MapModules>);

    const baseLayers: __esri.Collection = new Collection();
    baseLayers.addMany(
      mapConfig.baseLayers.map((layerConfig: ILayerConfig) => {
        if (layerConfig.type === "tiled") {
          delete layerConfig.type;
          return new TileLayer(layerConfig);
        }
      })
    );

    const basemap: __esri.Basemap = new Basemap({
      baseLayers,
    });
    const view: __esri.SceneView = new SceneView({
      map: new Map({
        basemap,
      }),
      container: mapContainer,
      ...mapConfig.options,
    });
    view.ui.remove("attribution");
    await view.when();
    this.view = view;
  }

  public async addOverlays(params: IOverlayParameter) {
    const overlay = OverlayArcgis3D.getInstance(this.view);
    await overlay.addOverlays(params);
  }
  public async addOverlaysCluster(params: IOverlayClusterParameter) {}

  public async addHeatMap(params: IHeatParameter) {}
  public async deleteAllOverlays() {}
  public async deleteAllOverlaysCluster() {}
  public async deleteHeatMap() {}
  public async deleteOverlays(params: IOverlayDelete) {}
  public async showLayer(params:ILayerConfig){}
}

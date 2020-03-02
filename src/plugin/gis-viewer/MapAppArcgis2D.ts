import { setDefaultOptions, loadCss, loadModules } from "esri-loader";
import { ILayerConfig } from "@/types/map";

export default class MapAppArcGIS2D {
  public view!: __esri.MapView;

  public async initialize(mapConfig: any, mapContainer: string): Promise<void> {
    const apiUrl = mapConfig.arcgis_api || "https://js.arcgis.com/4.14/";
    setDefaultOptions({
      url: `${apiUrl}/init.js`
    });

    const cssFile: string = mapConfig.theme
      ? `themes/${mapConfig.theme}/main.css`
      : "css/main.css";
    loadCss(`${apiUrl}/esri/${cssFile}`);

    type MapModules = [
      typeof import("esri/views/MapView"),
      typeof import("esri/Basemap"),
      typeof import("esri/Map"),
      typeof import("esri/layers/TileLayer"),
      typeof import("esri/core/Collection")
    ];
    const [MapView, Basemap, Map, TileLayer, Collection] = await (loadModules([
      "esri/views/MapView",
      "esri/Basemap",
      "esri/Map",
      "esri/layers/TileLayer",
      "esri/core/Collection"
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
      baseLayers
    });

    const view: __esri.MapView = new MapView({
      map: new Map({
        basemap
      }),
      container: mapContainer,
      ...mapConfig.options
    });
    view.ui.remove("attribution");
    await view.when();
    this.view = view;
  }
}
import { setDefaultOptions, loadCss, loadModules } from "esri-loader";
import { ILayerConfig, IOverlayParameter, IResult } from "@/types/map";
import { OverlayArcgis2D } from "@/plugin/gis-viewer/widgets/OverlayArcgis2D";

export default class MapAppArcGIS2D {
  public view!: __esri.MapView;
  public showGisDeviceInfo: any;

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

    view.on("click", async (event) => {
      const response = await view.hitTest(event);
      response.results.forEach(result => {
        const graphic = result.graphic;
        const { type, id } = graphic.attributes;
        if (type && id) {
          this.showGisDeviceInfo(type, id);
        }
      })
    })
    await view.when();
    this.view = view;
  }

  public async addOverlays(params: IOverlayParameter): Promise<IResult> {
    const overlay = OverlayArcgis2D.getInstance(this.view);
    return await overlay.addOverlays(params);
  }

}

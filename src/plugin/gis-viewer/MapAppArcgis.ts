import { setDefaultOptions, loadCss, loadModules } from "esri-loader";
export default class MapAppArcGIS {
  public view!: __esri.SceneView;

  public async initialize(configFile: string): Promise<void> {
    // configFile = process.env.BASE_URL + configFile;
    const response = await fetch(configFile);
    const mapConfig = await response.json();
    const apiUrl = mapConfig.arcgis_api || "https://js.arcgis.com/4.14/";
    setDefaultOptions({ url: apiUrl });

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
      Collection
    ] = await (loadModules([
      "esri/views/SceneView",
      "esri/Basemap",
      "esri/Map",
      "esri/layers/TileLayer",
      "esri/core/Collection"
    ]) as Promise<MapModules>);
  }
}

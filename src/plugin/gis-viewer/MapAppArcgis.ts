import { setDefaultOptions } from "esri-loader";
export default class MapAppArcGIS {
  public view!: __esri.SceneView;

  public initialize(): void {
    console.log(process.env.BASE_URL);
    setDefaultOptions({
      url: ""
    });
  }
}

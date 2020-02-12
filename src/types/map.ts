export enum Platforms {
  ArcGIS3D = "arcgis3d",
  ArcGIS2D = "arcgis2d"
}

export interface ILayerConfig {
  type: string;
  url: string;
  visible: boolean;
}

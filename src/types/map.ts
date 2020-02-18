export enum Platforms {
  ArcGIS3D = "arcgis3d",
  ArcGIS2D = "arcgis2d"
}

export interface ILayerConfig {
  type: string;
  url: string;
  visible: boolean;
}

export interface ILineSimpleSymbol {
  type: string;
  color?: string | number;
}

enum PointPrimitives {
  circle = "circle",
  cross = "cross",
  x = "x",
  diamond = "diamond",
  square = "square",
  triangle = "triangle"
}

export interface IPointSymbol {
  type: string; //2d/3d
  url?: string; //使用图片时图片的url地址
  primitive?: PointPrimitives; //使用图元时的图元类型
  //使用图元时的图元颜色
  color?: number | string;
  //[width, height], number单位默认为pt, 可以使用'pt'或'px'
  //size = 14; size = ["12pt", "14pt"]
  size?: Array<number | string> | number | string;
  angle?: number; //使用图片时的偏转角度
  xoffset?: number; //图元或图片的水平位移
  yoffset?: number; //图元或图片的垂直位移
}

export interface IPointGeometry {
  x: number;
  y: number;
  z?: number;
}

export interface IOverlay {
  id?: string;
  symbol: IPointSymbol;
  geometry: IPointGeometry;
}

export interface IOverlayParameter {
  type?: string;
  defaultSymbol?: IPointSymbol;
  overlays: Array<IOverlay>;
}

export interface IMapContainer {
  addOverlays: (param: IOverlayParameter) => void;
}

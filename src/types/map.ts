export interface IResult {
  status: number;
  message: string;
  result?: any;
}

export enum Platforms {
  ArcGIS3D = "arcgis3d",
  ArcGIS2D = "arcgis2d"
}

export interface ILayerConfig {
  type: string;
  url: string;
  visible: boolean;
}

export enum PointPrimitives {
  circle = "circle",
  cross = "cross",
  x = "x",
  diamond = "diamond",
  square = "square",
  triangle = "triangle"
}

export interface IPointSymbol {
  type: string; //point-2d/point-3d
  url?: string; //使用图片时图片的url地址
  primitive?: PointPrimitives; //使用图元时的图元类型
  //使用图元时的图元颜色
  color?: number | string | number[];
  //[width, height], number单位默认为pt, 可以使用'pt'或'px'
  //size = 14; size = ["12pt", "14pt"]
  size?: Array<number | string> | number | string;
  angle?: number; //使用图片时的偏转角度
  xoffset?: number; //图元或图片的水平位移
  yoffset?: number; //图元或图片的垂直位移
}

export interface IPolylineSymbol {
  type: string; //line-2d/line-3d
}

export interface IPointGeometry {
  x: number;
  y: number;
  z?: number;
}

export interface IOverlay {
  id?: string; //覆盖物编号, 用于按编号/类型删除
  type?: string; //覆盖物类型, 用于按编号/类型删除
  symbol: IPointSymbol | IPolylineSymbol;
  geometry: IPointGeometry;
}

export interface IOverlayParameter {
  defaultType?: string;
  defaultSymbol?: IPointSymbol | IPolylineSymbol;
  overlays: Array<IOverlay>;
}

export interface IMapContainer {
  addOverlays: (param: IOverlayParameter) => void;
}

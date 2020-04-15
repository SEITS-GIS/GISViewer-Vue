export interface IResult {
  //本次接口调用状态，如果成功返回0，如果失败返回其他数字。
  status: number;
  //对接口调用状态值的英文说明，如果成功返回"ok"，并返回结果字段，如果失败返回错误说明。
  message: string;
  //接口调用结果
  result?: any;
}

export enum Platforms {
  ArcGIS3D = "arcgis3d",
  ArcGIS2D = "arcgis2d",
  BDMap = "bd"
}

export interface ILayerConfig {
  type: string;
  url: string;
  visible: boolean;
}

export interface IPointSymbol {
  type: string; //point-2d/point-3d
  //2D时为图片地址
  //3D时为模型地址
  url?: string;
  //使用图元时的图元类型
  //2D图元
  //"circle" | "square" | "cross" | "x" | "kite" | "triangle"
  //3D图元
  //"sphere" | "cylinder" | "cube" | "cone" | "inverted-cone" | "diamond" | "tetrahedron"
  primitive?: string;
  color?: number | string | number[]; //使用图元时的图元颜色
  outline?: {
    //使用图元时的图元边框
    size?: number;
    color?: number | string;
  };
  //[width, height, depth], number单位默认为pt, 可以使用'pt'或'px'
  //depth在point-3D时可用
  //size = 14; size = ["12pt", "14pt"]
  size?: Array<number | string> | number | string;
  //锚点
  //"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
  anchor?: string;
  //旋转角度，在point-3d时可用
  //[x轴角度, y轴角度, z轴角度]
  rotation?: Array<number>;
  width?:number;
  height?:number;
  xoffset?:number;
  yoffset?:number;
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
  fields: any;
  buttons: string[];
}

export interface IOverlayParameter {
  defaultType?: string;
  type?: string;
  defaultSymbol?: IPointSymbol | IPolylineSymbol;
  overlays: Array<IOverlay>;
  autoPopup: boolean;
  showPopup: boolean; //是否显示popup
  defaultInfoTemplate: IPopUpTemplate;
  defaultButtons: Object[];
  showToolTip: boolean; //鼠标移到该点位是，是否显示悬浮窗
  toolTipContent: string; //悬浮窗内容
}
export interface IOverlayClusterParameter{
  points:Array<IOverlay>;
  type?:string;
  zoom:number;
  distance:number;
  defaultSymbol?: IPointSymbol;
  defaultVisible:boolean;
  defaultTooltip:string;
}

export interface IMapContainer {
  addOverlays: (param: IOverlayParameter) => void;
  addHeatMap:(param:IHeatParameter)=>void;
  addOverlaysCluster:(param:IOverlayClusterParameter)=>void;
  deleteAllOverlays:()=>void;
  deleteAllOverlaysCluster:()=>void;
  deleteHeatMap:()=>void;
}
export interface IPopUpTemplate {
  title?: string;
  content: string;
}
export interface IHeatParameter
{
  points:Array<IHeatPoint>;
  options:IHeatOptions;
}
export interface IHeatOptions
{
  field:string;
  radius?:number;
  colors?:Array<string>;
  maxValue?:number;
}
export interface IHeatPoint
{
  fields:any;
  geometry:IPointGeometry;
}
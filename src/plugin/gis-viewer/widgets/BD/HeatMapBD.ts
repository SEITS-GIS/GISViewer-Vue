import {
  IOverlayParameter,
  IPointSymbol,
  IPolylineSymbol,
  IResult,
  IPopUpTemplate,
  IHeatParameter,
  IPointGeometry
} from "@/types/map";
declare let BMapLib: any;

export class HeatMapBD {
  private static heatMapBD: HeatMapBD;
  private view!: any;
  private heatmapOverlay: any;

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: __esri.SceneView) {
    if (!HeatMapBD.heatMapBD) {
      HeatMapBD.heatMapBD = new HeatMapBD(view);
    }
    return HeatMapBD.heatMapBD;
  }
  public isSupportCanvas() {
    var elem = document.createElement("canvas");
    return !!(elem.getContext && elem.getContext("2d"));
  }
  public async deleteHeatMap() {
    this.view.removeOverlay(this.heatmapOverlay);
  }
  public async addHeatMap(params: IHeatParameter): Promise<IResult> {
    if (!this.isSupportCanvas()) {
      alert(
        "热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~"
      );
    }
    const options = params.options;
    const countField = options.field;
    const radius = options.radius;
    const colors = options.colors || undefined;
    const maxValue = options.maxValue || 100;

    const points = params.points;
    let heatPoints = new Array();
    points.forEach(point => {
      heatPoints.push({
        lng: point.geometry.x,
        lat: point.geometry.y,
        count: point.fields[countField]
      });
    });
    //详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
    //参数说明如下:
    /* visible 热力图是否显示,默认为true
      * opacity 热力的透明度,1-100
      * radius 势力图的每个点的半径大小   
      * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
      *	{
        .2:'rgb(0, 255, 255)',
        .5:'rgb(0, 110, 255)',
        .8:'rgb(100, 0, 255)'
      }
      其中 key 表示插值的位置, 0~1. 
          value 为颜色值. 
      */
    let gradient = this.getHeatColor(colors);
    this.heatmapOverlay = new BMapLib.HeatmapOverlay({
      radius: radius,
      gradient: gradient
    });
    this.view.addOverlay(this.heatmapOverlay);
    this.heatmapOverlay.setDataSet({ data: heatPoints, max: maxValue });
    return {
      status: 0,
      message: "ok"
    };
  }
  public getHeatColor(colors: string[] | undefined): any {
    let obj: any = {
      0.2: "rgb(0, 255, 255)",
      0.5: "rgb(0, 110, 255)",
      0.8: "rgb(100, 0, 255)"
    };
    if (colors && colors.length >=4) {
      //"rgba(30,144,255,0)","rgba(30,144,255)","rgb(0, 255, 0)","rgb(255, 255, 0)", "rgb(254,89,0)"
      return {
        0.2: colors[0],
        0.4: colors[1],
        0.6: colors[2],
        0.8: colors[3]
      };
    }
    return obj;
  }
}

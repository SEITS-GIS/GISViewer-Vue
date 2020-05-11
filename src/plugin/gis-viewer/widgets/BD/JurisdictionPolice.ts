import { IOverlayParameter, IResult, IHeatParameter } from "@/types/map";
import axios from "axios";
declare let BMap: any;

export class JurisdictionPolice {
  private static jurisdictionPolice: JurisdictionPolice;
  private overlayers = new Array();
  private view!: any;

  private constructor(view: any) {
    this.view = view;
  }

  public static getInstance(view: any) {
    if (!JurisdictionPolice.jurisdictionPolice) {
      JurisdictionPolice.jurisdictionPolice = new JurisdictionPolice(view);
    }
    return JurisdictionPolice.jurisdictionPolice;
  }
  private getGraphic(overlay: any): any {
    let marker: any;
    let geometry = overlay.geometry;
    let type = overlay.geometry.type;
    switch (type.toLowerCase()) {
      case "polyline":
      case "linestring":
        marker = new BMap.Polyline(this.getGeometry(geometry.coordinates), {
          strokeColor: "rgba(0,0,0,255)",
          strokeWeight: 2,
        });
        break;
      case "polygon":
        marker = new BMap.Polygon(this.getGeometry(geometry.coordinates[0]), {
          strokeColor: "rgba(0,0,0,255)",
          strokeWeight: 2,
          fillColor: "rgba(255,0,0,255)",
        });
        break;
    }
    return marker;
  }

  private async translate(overlay: any): Promise<any> {
    let _this = this;
    let queryLen = 50; //坐标转换最大数
    let features = "";
    let promises = new Array();
    let points: number[][] =
      overlay.geometry.type == "Polygon"
        ? overlay.geometry.coordinates[0]
        : overlay.geometry.coordinates;
    let count = 0;
    let featuresArr = Array();
    let feaureStr = "";
    for (let i = 0; i < points.length; i++) {
      if (count == queryLen) {
        featuresArr.push(feaureStr);
        feaureStr = "";
        count = 0;
      } else {
        let pt: number[] = points[i];
        feaureStr = feaureStr + pt[0] + "," + pt[1] + ";";
        count++;
      }
    }
    featuresArr.push(feaureStr);
    for (let j = 0; j < featuresArr.length; j++) {
      let promise = new Promise((resolve, reject) => {
        features = featuresArr[j];
        axios
          .get(
            _this.view.gisServer +
              "/geoconv?coords=" +
              features +
              "&from=3&to=5&output=json"
          )
          .then((res: any) => {
            resolve(res.data.results);
          });
      });
      promises.push(promise);
    }
    return new Promise((resloveAll) => {
      Promise.all(promises).then((e) => {
        //console.log(e);
        resloveAll(e);
      });
    });
  }
  private getGeometry(points: number[][]): object[] {
    let features: object[] = [];
    for (let i = 0; i < points.length; i++) {
      let pt: number[] = points[i];
      let point = new BMap.Point(pt[0], pt[1]);
      features.push(point);
    }
    return features;
  }
  public async showJurisdiction(): Promise<IResult> {
    this.overlayers = [];
    axios.get("config/Jurisdiction/bsga_v2.geo.json").then((res: any) => {
      let data = res.data;
      console.log(data);
      data.features.forEach((overlay: any) => {
        // let graphic = this.getGraphic(overlay);
        // graphic.id = overlay.id || "";
        // graphic.type = "Jurisdiction";
        // this.view.addOverlay(graphic);
        // this.overlayers.push(graphic);
        this.translate(overlay).then((res) => {
          console.log(res);
          let geo = Array();
          for (let i = 0; i < res.length; i++) {
            let geometry = res[i];
            if (geometry) {
              let geometryNew = geometry.map((point: any) => {
                return new BMap.Point(point.x, point.y);
              });
              geo = geo.concat(geometryNew);
            }
          }
          let marker = new BMap.Polygon(geo, {
            strokeColor: "rgba(0,0,0,255)",
            strokeWeight: 2,
            fillColor: "rgba(255,0,0,255)",
          });
          this.view.addOverlay(marker);
        });
      }, this);
    });
    return {
      status: 0,
      message: "ok",
    };
  }
  public async hideJurisdiction() {}
}

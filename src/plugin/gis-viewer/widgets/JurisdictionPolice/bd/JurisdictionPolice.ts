import {IOverlayParameter, IResult, IHeatParameter} from '@/types/map';
import axios from 'axios';
declare let BMap: any;

export class JurisdictionPolice {
  private static intances: Map<string, any>;
  private overlayers = new Array();
  private clickOverlay: any;
  private view!: any;

  private constructor(view: any) {
    this.view = view;
  }

  public static getInstance(view: any) {
    let id = view.getContainer().id;
    if (!JurisdictionPolice.intances) {
      JurisdictionPolice.intances = new Map();
    }
    let intance = JurisdictionPolice.intances.get(id);
    if (!intance) {
      intance = new JurisdictionPolice(view);
      JurisdictionPolice.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (JurisdictionPolice.intances as any) = null;
  }
  private getGraphic(overlay: any, index: number): any {
    let marker: any;
    let geometry = overlay.geometry;
    let type = overlay.geometry.type;
    let colorRamps = [
      '#aed581',
      '#dce775',
      '#1E90FF',
      '#4db6ac',
      '#81c784',
      '#fff176',
      '#ff8a65',
      '#9370DB',
      '#ffd54f',
      '#ffb74d',
      '#9575cd',
      '#7986cb',
      '#64b5f6',
      '#4dd0e1',
      '#87CEFA',
      '#00CED1',
      '#40E0D0',
      '#BDB76B',
      '#40E0D0'
    ];
    switch (type.toLowerCase()) {
      case 'polyline':
      case 'linestring':
        marker = new BMap.Polyline(this.getGeometry(geometry.coordinates), {
          strokeColor: 'rgba(0,0,0,255)',
          strokeWeight: 2
        });
        break;
      case 'polygon':
        console.log(overlay, index);
        marker = new BMap.Polygon(this.getGeometry(geometry.coordinates[0]), {
          strokeColor: '#3f51b5',
          strokeWeight: 1,
          fillColor: colorRamps[index % colorRamps.length],
          fillOpacity: 0.4
        });
        break;
    }
    return marker;
  }

  private async translate(overlay: any): Promise<any> {
    let _this = this;
    let queryLen = 50; //坐标转换最大数
    let features = '';
    let promises = new Array();
    let points: number[][] =
      overlay.geometry.type == 'Polygon'
        ? overlay.geometry.coordinates[0]
        : overlay.geometry.coordinates;
    let count = 0;
    let featuresArr = Array();
    let feaureStr = '';
    for (let i = 0; i < points.length; i++) {
      let pt: number[] = points[i];
      if (count == queryLen) {
        featuresArr.push(feaureStr);
        feaureStr = pt[0] + ',' + pt[1] + ';';
        count = 1;
      } else {
        feaureStr = feaureStr + pt[0] + ',' + pt[1] + ';';
        count++;
      }
    }
    if (feaureStr != '') {
      featuresArr.push(feaureStr);
    }
    for (let j = 0; j < featuresArr.length; j++) {
      let promise = new Promise((resolve, reject) => {
        features = featuresArr[j];
        axios
          .get(
            _this.view.gisServer +
              '/geoconv?coords=' +
              features +
              '&from=3&to=5&output=json'
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
    this.hideJurisdiction();
    this.overlayers = [];
    let _this = this;
    axios.get('config/Jurisdiction/bsga_v2.bd.json').then((res: any) => {
      let data = res.data;
      for (let i = 0; i < data.features.length; i++) {
        let overlay = data.features[i];
        let graphic = this.getGraphic(overlay, i);
        graphic.id = overlay.id || '';
        graphic.type = 'Jurisdiction';

        graphic.addEventListener('click', function(e: any) {
          if (_this.clickOverlay) {
            _this.view.removeOverlay(_this.clickOverlay);
          }
          let polygon = e.currentTarget;
          _this.clickOverlay = new BMap.Polyline(polygon.getPath(), {
            strokeColor: 'red',
            strokeWeight: 3,
            strokeStyle: 'dashed'
          });
          _this.view.addOverlay(_this.clickOverlay);
        });

        this.view.addOverlay(graphic);
        this.overlayers.push(graphic);
        let name = overlay.properties.name;
        let cp: any;
        if (overlay.geometry.type == 'Polygon') {
          cp = new BMap.Point(
            overlay.properties.cp[0],
            overlay.properties.cp[1]
          );
        }
        if (cp) {
          var opts = {
            position: cp, // 指定文本标注所在的地理位置
            offset: new BMap.Size(-15, -15) //设置文本偏移量
          };
          var label = new BMap.Label(name, opts); // 创建文本标注对象
          label.setStyle({
            backgroundColor: 'rgba(0,0,0,0)',
            border: 0,
            color: '#45526e',
            fontWeight: 'bold',
            fontSize: '13px',
            pointerEvents: 'none'
          });
          this.view.addOverlay(label);
          this.overlayers.push(label);
        }
        // this.translate(overlay).then((res) => {
        //   console.log(name);

        //   let geo = Array();
        //   let geo2 = Array();
        //   for (let i = 0; i < res.length; i++) {
        //     let geometry = res[i];
        //     if (geometry) {
        //       let geometryNew = geometry.map((point: any) => {
        //         return new BMap.Point(point.x, point.y);
        //       });
        //       geo = geo.concat(geometryNew);

        //       let geometryNew2 = geometry.map((point: any) => {
        //         return [point.x, point.y];
        //       });

        //       geo2 = geo2.concat(geometryNew2);
        //     }
        //   }
        //   console.log(JSON.stringify(geo2));
        //   let marker = new BMap.Polygon(geo, {
        //     strokeColor: "rgba(0,0,0,255)",
        //     strokeWeight: 2,
        //     fillColor: "rgba(255,0,0,255)",
        //   });
        //   if (cp) {
        //     var opts = {
        //       position: cp, // 指定文本标注所在的地理位置
        //       offset: new BMap.Size(30, -30), //设置文本偏移量
        //     };
        //     var label = new BMap.Label(name, opts); // 创建文本标注对象
        //     label.setStyle({
        //       color: "red",
        //       fontSize: "12px",
        //       height: "20px",
        //       lineHeight: "20px",
        //       fontFamily: "微软雅黑",
        //     });
        //     this.view.addOverlay(label);
        //   }
        //   this.view.addOverlay(marker);
        // });
      }
    });
    return {
      status: 0,
      message: 'ok'
    };
  }
  public async hideJurisdiction() {
    if (this.clickOverlay) {
      this.view.removeOverlay(this.clickOverlay);
    }
    if (this.overlayers.length > 0) {
      for (let i = 0; i < this.overlayers.length; i++) {
        this.view.removeOverlay(this.overlayers[i]);
      }
      this.overlayers = [];
    }
    this.view.closeInfoWindow();
  }
}

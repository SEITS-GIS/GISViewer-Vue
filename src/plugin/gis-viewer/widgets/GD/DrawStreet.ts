import '@amap/amap-jsapi-types';
import axios from 'axios';

export class DrawSteet {
  private static instance: DrawSteet;
  private view!: AMap.Map;
  private overlayGroup: AMap.OverlayGroup = new AMap.OverlayGroup();
  private streets: any;
  private colors = ['#6DC647', '#FFCD05', '#DE0404'];

  private constructor(view: any) {
    this.view = view;
    this.view.add(this.overlayGroup as any);
  }

  public static getInstance(view: AMap.Map) {
    if (!DrawSteet.instance) {
      DrawSteet.instance = new DrawSteet(view);
    }
    return DrawSteet.instance;
  }
  public static destroy() {
    (DrawSteet.instance as any) = null;
  }
  public async hideRoad() {
    this.overlayGroup.clearOverlays();
  }
  public async showRoad(param: {ids: string[]}) {
    this.overlayGroup.clearOverlays();
    let ids = (param && param.ids) || [];
    let _this = this;
    if (this.streets) {
      this.drawStreet(ids);
    } else {
      axios.get('./config/street_xh.json').then((res: any) => {
        _this.streets = res.data;
        _this.drawStreet(ids);
      });
      this.drawStreet(ids);
    }
  }
  private drawStreet(ids: any[]) {
    let allLines: any[] = [];
    this.streets.forEach((road: any) => {
      if (ids.length == 0 || (ids.length > 0 && ids.indexOf(road.id) > -1)) {
        let paths = road.geometry.path;
        let newPaths = this.splitPath(paths);
        for (let i = 0; i < newPaths.length; i++) {
          let sPath = newPaths[i];
          let polyline = new AMap.Polyline({
            path: sPath,
            strokeColor: this.getColor(),
            strokeOpacity: 1,
            strokeWeight: 3,
            strokeStyle: 'solid'
          });
          this.overlayGroup.addOverlay(polyline);
          allLines.push(polyline);
        }
      }
    }, this);

    this.view.setFitView(allLines);
  }
  private splitPath(paths: []): any[][] {
    let newPaths = [];
    let currentIndex = 0;
    while (currentIndex < paths.length - 1) {
      let num = Math.round(Math.random() * 4) + 1; //1-5
      let nPath: any[] = [];
      for (let i = currentIndex; i <= currentIndex + num; i++) {
        if (i < paths.length) {
          nPath.push(paths[i]);
        }
      }
      newPaths.push(nPath);
      currentIndex = currentIndex + num;
    }
    return newPaths;
  }
  private getColor(): string {
    let num = Math.round(Math.random() * 100);
    let index = 0;
    if (num > 35 && num < 38) {
      index = 2;
    } else if (num > 18 && num <= 24) {
      index = 1;
    }
    return this.colors[index];
  }
}

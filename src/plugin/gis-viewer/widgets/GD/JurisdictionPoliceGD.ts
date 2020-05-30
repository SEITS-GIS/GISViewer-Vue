import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IDistrictParameter
} from '@/types/map';
import axios from 'axios';
declare let AMap: any;

export class JurisdictionPoliceGD {
  private static jurisdictionPolice: JurisdictionPoliceGD;
  private overlayGroups: any;
  private clickOverlay: any;
  private view!: any;

  private constructor(view: any) {
    this.view = view;
  }

  public static getInstance(view: any) {
    if (!JurisdictionPoliceGD.jurisdictionPolice) {
      JurisdictionPoliceGD.jurisdictionPolice = new JurisdictionPoliceGD(view);
    }
    return JurisdictionPoliceGD.jurisdictionPolice;
  }
  public async showDistrictMask(params: IDistrictParameter) {
    this.hideDistrictMask();
    let name = params.name;
    let citycode: string = params.city || '021';
    let outmask: boolean = params.showMask === true;
    let district = null;
    let polygons = new Array();
    let centerArea: any;
    //加载行政区划插件
    if (!district) {
      //实例化DistrictSearch
      var opts = {
        subdistrict: 0, //获取边界不需要返回下级行政区
        extensions: 'all', //返回行政区边界坐标组等具体信息
        level: 'city' //查询行政级别为 市
      };
      district = new AMap.DistrictSearch(opts);
    }
    let _this = this;
    district.search(name, (status: any, result: any) => {
      let inner: any;
      result.districtList.forEach((element: any) => {
        if (element.citycode == citycode) {
          inner = element.boundaries;
        }
        centerArea = new AMap.Polygon({
          path: inner
        });
      });
      if (outmask) {
        /**从边界里扣除***/
        let district2 = new AMap.DistrictSearch(opts);
        district2.search(citycode, (status: any, result: any) => {
          polygons = [];
          var bounds = result.districtList[0].boundaries;
          if (bounds) {
            for (var i = 0, l = bounds.length; i < l; i++) {
              //生成行政区划polygon
              let area = bounds[i];
              let intersect = false;
              for (let i = 0; i < inner.length; i++) {
                let element = inner[i];
                if (
                  AMap.GeometryUtil.isRingInRing(element, area) ||
                  AMap.GeometryUtil.doesRingRingIntersect(element, area)
                ) {
                  intersect = true;
                  break;
                }
              }
              if (intersect) {
                area = [bounds[i]].concat(inner);
              }
              var polygon = new AMap.Polygon({
                strokeWeight: 3,
                path: area,
                fillOpacity: 0.3,
                fillColor: 'rgb(255,255,255)',
                strokeColor: '#0091ea'
              });
              polygons.push(polygon);
            }
            _this.overlayGroups = new AMap.OverlayGroup(polygons);
            _this.view.add(_this.overlayGroups);
          }
        });
        /**从边界里扣除***/
      } else {
        var polygon = new AMap.Polygon({
          strokeWeight: 5,
          path: inner,
          fillOpacity: 0,
          fillColor: 'rgb(255,255,255)',
          strokeColor: '#0091ea'
        });
        polygons.push(polygon);

        _this.overlayGroups = new AMap.OverlayGroup(polygons);
        _this.view.add(_this.overlayGroups);
      }
      _this.view.setFitView(centerArea); //视口自适应
    });
  }
  public async hideDistrictMask() {
    if (this.overlayGroups) {
      this.view.remove(this.overlayGroups);
    }
  }
}

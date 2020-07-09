import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IDistrictParameter,
  IStreetParameter
} from '@/types/map';
import axios from 'axios';
declare let AMap: any;

export class JurisdictionPoliceGD {
  private static jurisdictionPolice: JurisdictionPoliceGD;
  private overlayGroups: any;
  private streetGroup: any;
  private clickOverlay: any;
  private view!: any;

  private constructor(view: any) {
    this.view = view;

    this.overlayGroups = new AMap.OverlayGroup();
    this.view.add(this.overlayGroups);

    this.streetGroup = new AMap.OverlayGroup();
    this.view.add(this.streetGroup);
  }

  public static getInstance(view: any) {
    if (!JurisdictionPoliceGD.jurisdictionPolice) {
      JurisdictionPoliceGD.jurisdictionPolice = new JurisdictionPoliceGD(view);
    }
    return JurisdictionPoliceGD.jurisdictionPolice;
  }
  public static destroy() {
    (JurisdictionPoliceGD.jurisdictionPolice as any) = null;
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
                strokeWeight: 0,
                path: area,
                fillOpacity: 1,
                fillColor: 'rgb(0,0,0)',
                strokeColor: '#000000'
              });
              polygons.push(polygon);
            }
            _this.overlayGroups.addOverlays(polygons);
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

        _this.overlayGroups.addOverlays(polygons);
      }
      _this.view.setFitView(centerArea); //视口自适应
    });
  }
  public async hideDistrictMask() {
    if (this.overlayGroups) {
      this.overlayGroups.clearOverlays();
    }
  }
  public async showStreet() {
    this.hideStreet();

    let _this = this;
    axios.get('config/Jurisdiction/Street.json').then((res: any) => {
      let data = res.data;
      for (let i = 0; i < data.features.length; i++) {
        let overlay = data.features[i];
        let graphic = new AMap.Polygon({
          strokeWeight: 2,
          path: overlay.geometry.rings,
          fillOpacity: 0.3,
          fillColor: 'rgb(.0,125,255)',
          strokeColor: '#FFD700'
        });
        graphic.extData = {
          id: overlay.attributes.FEATUREID,
          name: overlay.attributes.SHOWNAME,
          type: 'street'
        };

        // graphic.on('click', function(e: any) {
        //   if (_this.clickOverlay) {
        //     _this.streetGroup.removeOverlay(_this.clickOverlay);
        //   }
        //   let polygon = e.target;
        //   _this.clickOverlay = new AMap.Polygon({
        //     path: polygon.getPath(),
        //     strokeColor: 'red',
        //     strokeWeight: 3,
        //     fillOpacity: 0,
        //     strokeStyle: 'dashed'
        //   });
        //   _this.streetGroup.addOverlay(_this.clickOverlay);
        // });
        this.streetGroup.addOverlay(graphic);

        let name = overlay.attributes.SHOWNAME;
        let cp: any = graphic.getBounds().getCenter();
        if (cp) {
          var text = new AMap.Text({
            text: name,
            anchor: 'center', // 设置文本标记锚点
            draggable: false,
            style: {
              border: '0',
              'font-size': '15px',
              'background-color': 'rgba(0, 0, 0, 0)',
              color: '#ff0000'
            },
            position: cp
          });
          this.streetGroup.addOverlay(text);
        }
      }
    });
    return {
      status: 0,
      message: 'ok'
    };
  }
  public async hideStreet() {
    if (this.streetGroup) {
      this.streetGroup.clearOverlays();
    }
  }
  public async locateStreet(params: IStreetParameter) {
    let id: string = params.id || '';
    let hideStreet: boolean = params.hideStreet == true;
    let name: string = params.name || '';
    let overlays: any = this.streetGroup.getOverlays();
    let localOverlay: any;
    for (let i = 0; i < overlays.length; i++) {
      let overlay = overlays[i];
      if (overlay.CLASS_NAME == 'AMap.Polygon') {
        let extData = overlay.extData;
        if (
          (id && extData.id == id) ||
          (name && extData.name.indexOf(name) > -1)
        ) {
          localOverlay = overlay;
        } else {
          overlay.setOptions({
            strokeWeight: 2,
            fillOpacity: 0.3,
            fillColor: 'rgb(.0,125,255)',
            strokeColor: '#FFD700'
          });
        }
      }
    }
    if (localOverlay) {
      localOverlay.setOptions({
        strokeColor: 'red',
        strokeWeight: 5,
        fillOpacity: 0,
        strokeStyle: 'dashed'
      });
      this.view.setFitView(localOverlay);
    }
  }
}

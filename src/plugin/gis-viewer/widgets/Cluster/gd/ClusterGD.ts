import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IOverlayDelete,
  IOverlayClusterParameter,
  IPointSymbol
} from '@/types/map';
declare let AMap: any;

export class ClusterGD {
  private static intances: Map<string, any>;
  private view!: any;
  private markerClustererLayer = new Array();
  public showGisDeviceInfo: any;

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: AMap.Map) {
    let id = view.getContainer().id;
    if (!ClusterGD.intances) {
      ClusterGD.intances = new Map();
    }
    let intance = ClusterGD.intances.get(id);
    if (!intance) {
      intance = new ClusterGD(view);
      ClusterGD.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (ClusterGD.intances as any) = null;
  }
  public async addOverlaysCluster(
    params: IOverlayClusterParameter
  ): Promise<IResult> {
    const defaultType = params.type;
    const zoom = params.zoom;
    const distance = params.distance || 60;
    const defaultSymbol = params.defaultSymbol;

    const defaultVisible = params.defaultVisible;
    const defaultTooltip = params.defaultTooltip;

    if (defaultSymbol) {
      let pointSymbol = {
        url: defaultSymbol.url,
        size: new AMap.Size(defaultSymbol.width, defaultSymbol.height),
        offset: new AMap.Pixel(defaultSymbol.width, defaultSymbol.width)
      };
    }

    const clusterSymbol = params.clusterSymbol;
    let clusterStyles;
    if (clusterSymbol) {
      clusterStyles = [];
      for (let i = 0; i < 5; i++) {
        clusterStyles.push({
          url: clusterSymbol.url,
          size: new AMap.Size(
            Number(clusterSymbol.width),
            Number(clusterSymbol.height)
          ),
          offset: new AMap.Pixel(
            0 - Number(clusterSymbol.width) / 2,
            0 - Number(clusterSymbol.height) / 2
          )
        });
      }
    }
    const points = params.points;
    let markers = new Array();
    let version: string = this.view.version;
    points.forEach((point: any) => {
      const {geometry, fields, id} = point;
      fields.id = id;
      fields.type = defaultType;
      if (version === '1.0') {
        let mark = new AMap.Marker({
          anchor: 'center',
          icon: new AMap.Icon({
            image: (defaultSymbol as IPointSymbol).url,
            size: new AMap.Size(
              Number((defaultSymbol as IPointSymbol).width),
              Number((defaultSymbol as IPointSymbol).height)
            ),
            imageSize: new AMap.Size(
              Number((defaultSymbol as IPointSymbol).width),
              Number((defaultSymbol as IPointSymbol).height)
            )
          }),
          offset: new AMap.Pixel(
            Number((defaultSymbol as IPointSymbol).xoffset) || 0,
            Number((defaultSymbol as IPointSymbol).yoffset) || 0
          ),
          position: [Number(point.geometry.x), Number(point.geometry.y)]
        });

        let content = this.getPopUpHtml(point, defaultTooltip);
        mark.setExtData({
          clickfunc: this.showGisDeviceInfo,
          attributes: point.fields,
          infoTemplate: content,
          type: 'point'
        });

        mark.on('click', this.onOverlayClick);
        markers.push(mark);
      } else {
        markers.push({
          lnglat: [Number(point.geometry.x), Number(point.geometry.y)]
        });
      }
    }, this);
    let clustererLayer = new AMap.MarkerClusterer(this.view, markers, {
      styles: clusterStyles,
      gridSize: distance,
      maxZoom: zoom,
      renderMarker: (opt: any) => {
        opt.marker.setIcon(
          new AMap.Icon({
            image: (defaultSymbol as IPointSymbol).url,
            size: new AMap.Size(
              Number((defaultSymbol as IPointSymbol).width),
              Number((defaultSymbol as IPointSymbol).height)
            ),
            imageSize: new AMap.Size(
              Number((defaultSymbol as IPointSymbol).width),
              Number((defaultSymbol as IPointSymbol).height)
            )
          })
        );
        opt.marker.setOffset(
          new AMap.Pixel(
            Number((defaultSymbol as IPointSymbol).xoffset) || 0,
            Number((defaultSymbol as IPointSymbol).yoffset) || 0
          )
        );
      } // 自定义非聚合点样式
    });
    clustererLayer.type = defaultType;
    this.markerClustererLayer.push(clustererLayer);
    return {
      status: 0,
      message: 'ok'
    };
  }
  private getPopUpHtml(graphic: any, content: any) {
    let tipContent = content;
    for (let fieldName in graphic.fields) {
      if (graphic.fields.hasOwnProperty(fieldName)) {
        tipContent = tipContent.replace(
          new RegExp('{' + fieldName + '}', 'g'),
          graphic.fields[fieldName]
        );
      }
    }
    return tipContent;
  }
  private onOverlayClick(event: any) {
    let mark = event.target;
    let fields = event.target.getExtData().attributes;
    let content = event.target.getExtData().infoTemplate || '';
    let geotype = event.target.getExtData().type || 'point';
    let yoffset = 0;
    if (geotype === 'point') {
      let size = mark.getIcon().getImageSize();
      if ('height' in size) {
        yoffset = 0 - size.height / 2;
      } else {
        yoffset = 0 - size[1] / 2;
      }
    }
    if (content != '') {
      let infoWindow = new AMap.InfoWindow({
        anchor: 'bottom-center',
        content: content,
        offset: new AMap.Pixel(0, yoffset)
      }); // 创建信息窗口对象
      let center;
      if (event.target.getPosition) {
        center = event.target.getPosition();
      } else {
        center = [event.lnglat.lng, event.lnglat.lat];
      }
      mark.isOpenInfo = true;
      infoWindow.open(mark.getMap(), center, 10);
    }
    if (event.target.getExtData().clickfunc) {
      event.target.getExtData().clickfunc(fields.type, fields.id, fields);
    }
  }
  public async deleteOverlaysCluster(params: IOverlayDelete) {
    let types = params.types || [];
    if (this.markerClustererLayer && this.markerClustererLayer.length > 0) {
      this.markerClustererLayer.forEach((layer: any) => {
        if (types.indexOf(layer.type) >= 0) {
          layer.clearMarkers();
        }
      });
    }
    this.view.clearInfoWindow();
  }
  public async deleteAllOverlaysCluster() {
    if (this.markerClustererLayer && this.markerClustererLayer.length > 0) {
      this.markerClustererLayer.forEach((layer: any) => {
        layer.clearMarkers();
      });
    }
    this.view.clearInfoWindow();
  }
}

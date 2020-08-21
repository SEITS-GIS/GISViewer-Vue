import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IHeatPoint,
  IOverlayClusterParameter,
  IOverlay,
  IOverlayDelete
} from '@/types/map';
import {loadModules} from 'esri-loader';
//declare let FlareClusterLayer: any;
//import FlareClusterLayer from './Render/FlareClusterLayer_v4';
export class Cluster {
  private static intances: Map<string, any>;
  private view!: any;
  private clusterLayer: any;
  public showGisDeviceInfo: any;
  private maxSingleFlareCount = 15;
  private areaDisplayMode = 'activated';
  private clusterGroups: Map<string, any> = new Map();

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: any) {
    let id = view.container.id;
    if (!Cluster.intances) {
      Cluster.intances = new Map();
    }
    let intance = Cluster.intances.get(id);
    if (!intance) {
      intance = new Cluster(view);
      Cluster.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (Cluster.intances as any) = null;
  }
  public async deleteAllOverlaysCluster() {
    this.clearLayer(undefined);
  }
  public async deleteOverlaysCluster(params: IOverlayDelete) {
    let types = params.types;
    this.clearLayer(types);
  }
  public async getOverlaysCluster(type: string) {}
  public async addOverlaysCluster(params: IOverlayClusterParameter) {
    let label = params.type;

    this.clearLayer([params.type] as string[]);

    let points = params.points;

    let popup = params.defaultTooltip;
    let zoom = params.zoom;
    let scale = 0;
    let data: any = [];

    this.view.map.allLayers.getItemAt(0).tileInfo.lods.forEach((lod: any) => {
      if (lod.level == zoom) {
        scale = lod.scale;
      }
    });
    points.forEach((point: any, index: number) => {
      if (Number(point.geometry.x) > 0) {
        let obj: any = {
          x: Number(point.geometry.x),
          y: Number(point.geometry.y),
          id: point.id || index,
          type: params.type
        };
        if (point.fields) {
          for (let field in point.fields) {
            obj[field] = point.fields[field];
          }
        }
        data.push(obj);
      }
    });
    let defaultSym = {};
    if (params.defaultSymbol) {
      defaultSym = {
        type: 'picture-marker',
        width: params.defaultSymbol.width + 'px',
        height: params.defaultSymbol.height + 'px',
        url: params.defaultSymbol.url,
        xoffset: params.defaultSymbol.xoffset || 0,
        yoffset: params.defaultSymbol.yoffset || 0
      };
    } else {
      defaultSym = {
        type: 'simple-marker',
        size: 6,
        color: '#FF0000',
        outline: null
      } as any;
    }

    this.initLayer({
      data: data,
      defaultSymbol: defaultSym,
      scale: scale,
      popup: popup,
      type: label
    });
  }
  //使toolTip中支持{字段}的形式
  private getToolTipContent(attrs: any, content: string): string {
    let tipContent = content;
    if (content) {
      //键值对
      for (let fieldName in attrs) {
        if (attrs.hasOwnProperty(fieldName)) {
          tipContent = tipContent.replace(
            '{' + fieldName + '}',
            attrs[fieldName]
          );
        }
      }
    } else {
      tipContent = content;
    }
    return tipContent;
  }
  private async initLayer(params: any) {
    const [
      SpatialReference,
      PopupTemplate,
      ClassBreaksRenderer,
      SimpleFillSymbol,
      SimpleLineSymbol,
      SimpleMarkerSymbol,
      libs,
      webMercatorUtils,
      Point
    ] = await loadModules([
      'esri/geometry/SpatialReference',
      'esri/PopupTemplate',
      'esri/renderers/ClassBreaksRenderer',
      'esri/symbols/SimpleFillSymbol',
      'esri/symbols/SimpleLineSymbol',
      'esri/symbols/SimpleMarkerSymbol',
      'libs/FlareClusterLayer_v4',
      'esri/geometry/support/webMercatorUtils',
      'esri/geometry/Point'
    ]);
    //init the layer, more options are available and explained in the cluster layer constructor

    //set up a class breaks renderer to render different symbols based on the cluster count. Use the required clusterCount property to break on.
    let defaultSym = params.defaultSymbol;

    let renderer = new ClassBreaksRenderer({
      defaultSymbol: defaultSym
    });
    renderer.field = 'clusterCount';

    let smSymbol = new SimpleMarkerSymbol({
      size: 22,
      outline: new SimpleLineSymbol({color: [221, 159, 34, 0.8]}),
      color: [255, 204, 102, 0.8]
    });
    let mdSymbol = new SimpleMarkerSymbol({
      size: 24,
      outline: new SimpleLineSymbol({color: [82, 163, 204, 0.8]}),
      color: [102, 204, 255, 0.8]
    });
    let lgSymbol = new SimpleMarkerSymbol({
      size: 28,
      outline: new SimpleLineSymbol({color: [41, 163, 41, 0.8]}),
      color: [51, 204, 51, 0.8]
    });
    let xlSymbol = new SimpleMarkerSymbol({
      size: 32,
      outline: new SimpleLineSymbol({color: [200, 52, 59, 0.8]}),
      color: [250, 65, 74, 0.8]
    });

    renderer.addClassBreakInfo(0, 1, defaultSym);
    renderer.addClassBreakInfo(1, 19, smSymbol);
    renderer.addClassBreakInfo(20, 150, mdSymbol);
    renderer.addClassBreakInfo(151, 1000, lgSymbol);
    renderer.addClassBreakInfo(1001, Infinity, xlSymbol);

    let areaRenderer;

    // if area display mode is set. Create a renderer to display cluster areas. Use SimpleFillSymbols as the areas are polygons
    let defaultAreaSym = new SimpleFillSymbol({
      style: 'solid',
      color: [0, 0, 0, 0.2],
      outline: new SimpleLineSymbol({color: [0, 0, 0, 0.3]})
    });

    areaRenderer = new ClassBreaksRenderer({
      defaultSymbol: defaultAreaSym
    });
    areaRenderer.field = 'clusterCount';

    let smAreaSymbol = new SimpleFillSymbol({
      color: [255, 204, 102, 0.4],
      outline: new SimpleLineSymbol({color: [221, 159, 34, 0.8], style: 'dash'})
    });
    let mdAreaSymbol = new SimpleFillSymbol({
      color: [102, 204, 255, 0.4],
      outline: new SimpleLineSymbol({color: [82, 163, 204, 0.8], style: 'dash'})
    });
    let lgAreaSymbol = new SimpleFillSymbol({
      color: [51, 204, 51, 0.4],
      outline: new SimpleLineSymbol({color: [41, 163, 41, 0.8], style: 'dash'})
    });
    let xlAreaSymbol = new SimpleFillSymbol({
      color: [250, 65, 74, 0.4],
      outline: new SimpleLineSymbol({color: [200, 52, 59, 0.8], style: 'dash'})
    });

    areaRenderer.addClassBreakInfo(0, 19, smAreaSymbol);
    areaRenderer.addClassBreakInfo(20, 150, mdAreaSymbol);
    areaRenderer.addClassBreakInfo(151, 1000, lgAreaSymbol);
    areaRenderer.addClassBreakInfo(1001, Infinity, xlAreaSymbol);

    // Set up another class breaks renderer to style the flares individually
    let flareRenderer = new ClassBreaksRenderer({
      defaultSymbol: renderer.defaultSymbol
    });
    flareRenderer.field = 'clusterCount';

    let smFlareSymbol = new SimpleMarkerSymbol({
      size: 14,
      color: [255, 204, 102, 0.8],
      outline: new SimpleLineSymbol({color: [221, 159, 34, 0.8]})
    });
    let mdFlareSymbol = new SimpleMarkerSymbol({
      size: 14,
      color: [102, 204, 255, 0.8],
      outline: new SimpleLineSymbol({color: [82, 163, 204, 0.8]})
    });
    let lgFlareSymbol = new SimpleMarkerSymbol({
      size: 14,
      color: [51, 204, 51, 0.8],
      outline: new SimpleLineSymbol({color: [41, 163, 41, 0.8]})
    });
    let xlFlareSymbol = new SimpleMarkerSymbol({
      size: 14,
      color: [250, 65, 74, 0.8],
      outline: new SimpleLineSymbol({color: [200, 52, 59, 0.8]})
    });

    flareRenderer.addClassBreakInfo(0, 1, defaultSym);
    flareRenderer.addClassBreakInfo(1, 19, smFlareSymbol);
    flareRenderer.addClassBreakInfo(20, 150, mdFlareSymbol);
    flareRenderer.addClassBreakInfo(151, 1000, lgFlareSymbol);
    flareRenderer.addClassBreakInfo(1001, Infinity, xlFlareSymbol);

    //set up a popup template
    let popupTemplate = undefined;
    if (params.popup) {
      popupTemplate = new PopupTemplate({
        title: '',
        content: params.popup
      });
    }

    let options = {
      id: 'flare-cluster-layer',
      clusterRenderer: renderer,
      areaRenderer: areaRenderer,
      flareRenderer: flareRenderer,
      singlePopupTemplate: popupTemplate,
      spatialReference: new SpatialReference({wkid: 4326}),
      subTypeFlareProperty: 'type',
      singleFlareTooltipProperty: 'id',
      displaySubTypeFlares: true,
      maxSingleFlareCount: this.maxSingleFlareCount,
      clusterRatio: 75,
      clusterAreaDisplay: this.areaDisplayMode,
      clusterToScale: params.scale,
      data: params.data
    };

    let clusterLayer = new libs.FlareClusterLayer(options);
    clusterLayer.label = params.type;
    this.view.map.add(clusterLayer);
    this.clusterGroups.set(params.type, clusterLayer);
  }

  private clearLayer(types: string[] | undefined) {
    if (types && types.length > 0) {
      types.forEach((type) => {
        let layer = this.clusterGroups.get(type);
        if (layer) {
          this.view.map.remove(layer);
          this.clusterGroups.delete(type);
        }
      }, this);
    } else {
      this.clusterGroups.forEach((layer: any) => {
        this.view.map.remove(layer);
      });
      this.clusterGroups.clear();
    }
  }
}

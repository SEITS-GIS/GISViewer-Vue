import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IHeatPoint,
  IOverlayClusterParameter,
  IOverlayDelete
} from '@/types/map';
import {loadModules} from 'esri-loader';
import {Point} from 'esri/geometry';
export class Cluster2D {
  private static intances: Map<string, any>;
  private view!: any;
  public showGisDeviceInfo: any;
  private clusterGroups: Map<string, any> = new Map();

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: __esri.MapView) {
    let id = view.container.id;
    if (!Cluster2D.intances) {
      Cluster2D.intances = new Map();
    }
    let intance = Cluster2D.intances.get(id);
    if (!intance) {
      intance = new Cluster2D(view);
      Cluster2D.intances.set(id, intance);
    }
    return intance;
  }

  public async deleteAllOverlaysCluster() {
    this.clearLayer(undefined);
  }
  public async deleteOverlaysCluster(params: IOverlayDelete) {
    let types = params.types;
    this.clearLayer(types);
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
  public async addOverlaysCluster(params: IOverlayClusterParameter) {
    // Create featurelayer from client-side graphics
    type MapModules = [
      typeof import('esri/Graphic'),
      typeof import('esri/layers/FeatureLayer')
    ];
    const [Graphic, FeatureLayer] = await (loadModules([
      'esri/Graphic',
      'esri/layers/FeatureLayer'
    ]) as Promise<MapModules>);

    let points = params.points || params.overlays || [];
    let custom = params.custom || {};
    let defaultSymbol = params.defaultSymbol;
    let graphics: any[] = [];
    let fields: any[] = [
      {
        name: 'ObjectID',
        alias: 'ObjectID',
        type: 'oid'
      },
      {
        name: 'ObjectType',
        alias: 'ObjectType',
        type: 'string'
      },
      {
        name: 'id',
        alias: 'id',
        type: 'string'
      },
      {
        name: 'type',
        alias: 'type',
        type: 'string'
      }
    ];
    let fieldName = points[0].fields;
    for (let str in fieldName) {
      let fieldtype = 'string';
      fields.push({name: str, alias: str, type: fieldtype});
    }
    graphics = points.map((point: any) => {
      for (let str in point.fields) {
        if (point.fields[str] instanceof Array) {
          point.fields[str] = JSON.stringify(point.fields[str]);
        }
      }
      point.fields.id = point.id || point.fields.id || '';
      point.fields.type = params.type || point.fields.type || '';
      let gra = new Graphic({
        geometry: {
          type: 'point',
          x: point.geometry.x,
          y: point.geometry.y
        } as any,
        attributes: point.fields
      });
      return gra;
    });
    let expression = custom.content
      ? custom.content.replace('{', '$feature.')
      : '';
    expression = expression.replace('}', '');
    let labelinfo = [
      {
        labelExpressionInfo: {
          expression: expression
        },
        useCodedValues: true,
        labelPlacement: 'above-center',
        symbol: {
          type: 'text',
          color: custom.color || 'red',
          font: {
            size: custom.fontSize || 10,
            weight: custom.weight || 'normal'
          },
          yoffset: -5
        }
      }
    ] as any;
    let yoffset = 30;
    if (defaultSymbol) {
      yoffset = Number(
        defaultSymbol.height || defaultSymbol.size instanceof Array
          ? (defaultSymbol.size as number[])[1]
          : defaultSymbol.size
      );
      yoffset = yoffset / 1.5;
    }

    let featureReduction = {
      type: 'cluster',
      clusterRadius: '75px',
      clusterMinSize: '50px',
      clusterMaxSize: '75px',
      labelingInfo: [
        {
          deconflictionStrategy: 'none',
          labelExpressionInfo: {
            expression: '$feature.cluster_count'
          },
          symbol: {
            type: 'text',
            color: 'white',
            font: {
              size: 14,
              weight: 'bold'
            },
            yoffset: yoffset.toString()
          },
          labelPlacement: 'center-center'
        }
      ]
    } as any;
    let clusterlayer = new FeatureLayer({
      source: graphics,
      fields: fields,
      objectIdField: 'ObjectID',
      geometryType: 'point',
      labelingInfo: labelinfo
    });
    clusterlayer.outFields = ['*'];

    let maxzoom = params.zoom || 100;
    let simpleRenderer = this.getRender(defaultSymbol);

    clusterlayer.featureReduction =
      this.view.zoom > maxzoom ? undefined : featureReduction;

    clusterlayer.renderer = simpleRenderer;
    (clusterlayer as any).maxzoom = maxzoom;
    this.view.map.add(clusterlayer);
    this.clusterGroups.set(params.type || 'default', clusterlayer);
    let _this = this;
    this.view.watch('zoom', (newValue: number) => {
      _this.clusterGroups.forEach((layer: any) => {
        layer.featureReduction =
          newValue > layer.maxzoom ? undefined : featureReduction;
      });
    });
  }
  private getRender(symbol: any): any {
    let width = Number(
      symbol.width || symbol.size instanceof Array
        ? (symbol.size as number[])[0]
        : symbol.size
    );
    let height = Number(
      symbol.height || symbol.size instanceof Array
        ? (symbol.size as number[])[1]
        : symbol.size
    );
    return {
      type: 'simple', // autocasts as new SimpleRenderer()
      symbol: {
        type: 'picture-marker',
        url: symbol.url,
        width: width,
        height: height,
        xoffset: symbol.xoffset || 0,
        yoffset: symbol.yoffset || 0
      }
    };
  }
}

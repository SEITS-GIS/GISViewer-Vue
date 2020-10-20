import Axios from "axios";
import { loadModules } from "esri-loader";

export default class SelectRoute2D {
  private static intances: Map<string, SelectRoute2D>;

  private view!: __esri.MapView;

  /** 显示全部路网的图层 */
  private allRoadLayer!: __esri.FeatureLayer;
  /** 显示已选定道路的图层 */
  private selectedRoadLayer!: __esri.GraphicsLayer;
  /** 显示候选道路的图层 */
  private candidateRoadLayer!: __esri.GraphicsLayer;
  /** 已选定的道路graphic */
  private selectedRoadGraphicArray: Array<__esri.Graphic> = [];

  /** 显示全部信号机的图层 */
  private allTrafficSignalLayer!: __esri.FeatureLayer;
  /** 显示已选定信号机的图层 */
  private selectedTrafficSignalLayer!: __esri.GraphicsLayer;

  private beginRouteButton = {
    title: "开始",
    id: "beginRoute",
    className: "esri-icon-play",
  };

  private endRouteButton = {
    title: "结束",
    id: "endRoute",
    className: "esri-icon-check-mark",
  };

  private addRoadButton = {
    title: "添加",
    id: "addRoad",
    className: "esri-icon-plus",
  };

  private reSelectNextRoadButton = {
    title: "重选",
    id: "reSelectNextRoad",
    className: "esri-icon-rotate",
  };

  private popupTemplate = {
    title: "{NAME_CHN}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "S_LANES",
            label: "车道数",
          },
          {
            fieldName: "WIDTH",
            label: "宽度",
          },
          {
            fieldName: "LENGTH",
            label: "长度",
          },
        ],
      },
    ],
  };

  public selectRouteFinished!: (routeInfo: object) => void;

  public static getInstance(view: __esri.MapView) {
    const id = view.container.id;
    if (!SelectRoute2D.intances) {
      SelectRoute2D.intances = new Map();
    }
    let instance = SelectRoute2D.intances.get(id);
    if (!instance) {
      instance = new SelectRoute2D(view);
      SelectRoute2D.intances.set(id, instance);
    }
    return instance;
  }

  private constructor(view: __esri.MapView) {
    this.view = view;
  }

  /** 读取路段数据，并显示路段 */
  public async initializeRoute() {
    const roadNetworkUrl =
      "http://115.28.88.187:6080/arcgis/rest/services/ZhongZhi/RoadNetwork/MapServer/2";
    const trafficSignalUrl =
      "http://115.28.88.187:6080/arcgis/rest/services/ZhongZhi/RoadNetwork/MapServer/0";

    type MapModules = [
      typeof import("esri/layers/GraphicsLayer"),
      typeof import("esri/layers/FeatureLayer")
    ];
    const [GraphicsLayer, FeatureLayer] = await (loadModules([
      "esri/layers/GraphicsLayer",
      "esri/layers/FeatureLayer",
    ]) as Promise<MapModules>);

    this.allRoadLayer = new FeatureLayer({
      url: roadNetworkUrl,
      definitionExpression: "ROAD_CLASS <> 47000",
      popupTemplate: {
        ...this.popupTemplate,
        actions: [this.beginRouteButton as any],
      },
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-line",
          color: "lightblue",
          width: "2px",
        },
      } as any,
    });
    this.selectedRoadLayer = new GraphicsLayer();
    this.candidateRoadLayer = new GraphicsLayer();
    this.view.map.addMany([
      this.allRoadLayer,
      this.selectedRoadLayer,
      this.candidateRoadLayer,
    ]);

    this.allTrafficSignalLayer = new FeatureLayer({
      url: trafficSignalUrl,
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-marker",
          style: "circle",
          color: "lawngreen",
          size: "8px",
          outline: {
            color: "white",
            width: 1,
          },
        },
      } as any,
    });
    this.selectedTrafficSignalLayer = new GraphicsLayer();
    this.view.map.addMany([
      this.allTrafficSignalLayer,
      this.selectedTrafficSignalLayer,
    ]);

    this.view.popup.on("trigger-action", async (event) => {
      this.view.popup.close();

      switch (event.action.id) {
        case "beginRoute": {
          // 选好起点后路网不再能点击，只能点击候选路段
          this.allRoadLayer.popupEnabled = false;

          // popup.selectedFeature.attributes只包含popupTemplate中配置的字段
          // 只能用FID来查找ROAD_ID
          const { FID } = this.view.popup.selectedFeature.attributes;
          const selectedGraphic = await this.getRoadGraphicByFID(FID);
          if (selectedGraphic) {
            this.selectedRoadGraphicArray = [selectedGraphic.clone()];
            this.addSelectedRoad();
          }

          break;
        }

        case "addRoad": {
          const { FID } = this.view.popup.selectedFeature.attributes;
          const selectedGraphic = await this.getRoadGraphicByFID(FID);
          if (selectedGraphic) {
            this.selectedRoadGraphicArray.push(selectedGraphic.clone());
            this.addSelectedRoad();
          }
          break;
        }

        case "endRoute": {
          const { FID } = this.view.popup.selectedFeature.attributes;
          const selectedGraphic = await this.getRoadGraphicByFID(FID);
          if (selectedGraphic) {
            this.selectedRoadGraphicArray.push(selectedGraphic.clone());
            this.addSelectedRoad(true);
            if (this.selectRouteFinished) {
              const roadIds = this.selectedRoadGraphicArray.map(
                (graphic) => graphic.attributes["ROAD_ID"]
              );
              this.selectRouteFinished({ roadIds });
            }
          }
          break;
        }
      }
    });
  }

  /** 根据FID查找道路Graphic */
  private async getRoadGraphicByFID(
    fid: string
  ): Promise<__esri.Graphic | void> {
    const query: __esri.Query = this.allRoadLayer.createQuery();
    query.where = `FID = ${fid}`;
    const results = await this.allRoadLayer.queryFeatures(query);
    if (results.features.length > 0) {
      return results.features[0];
    } else {
      return;
    }
  }

  /** 根据road_id查找Graphic */
  private async getRoadGraphicByRoadId(
    roadId: string
  ): Promise<__esri.Graphic | void> {
    const query: __esri.Query = this.allRoadLayer.createQuery();
    query.where = `ROAD_ID = '${roadId}'`;
    const results = await this.allRoadLayer.queryFeatures(query);
    if (results.features.length > 0) {
      return results.features[0];
    } else {
      return;
    }
  }

  /** 搜索指定点周边的信号机 */
  private async searchTrafficSignalByPoint(point: __esri.Point) {
    // 生成缓冲区
    type MapModules = [
      typeof import("esri/geometry/geometryEngineAsync"),
      typeof import("esri/Graphic")
    ];
    const [geometryEngineAsync, Graphic] = await (loadModules([
      "esri/geometry/geometryEngineAsync",
      "esri/Graphic",
    ]) as Promise<MapModules>);
    const buffer = (await geometryEngineAsync.geodesicBuffer(
      point,
      10,
      "meters"
    )) as __esri.Polygon;
    const bufferGraphic: __esri.Graphic = new Graphic({
      geometry: buffer,
      symbol: {
        type: "simple-fill",
        color: [51, 51, 204, 0.9],
        outline: {
          color: "white",
          width: 1
        }
      } as any,
    });
    this.selectedTrafficSignalLayer.add(bufferGraphic)

    const query = this.allTrafficSignalLayer.createQuery();
    query.geometry = buffer;
    query.spatialRelationship = "contains";
    query.returnGeometry = true;
    query.outFields = ["*"];
    const results = await this.allTrafficSignalLayer.queryFeatures(query);
    console.log(results);
  }

  /**
   * 显示当前已选定的路段
   * @param isLastRoad 是否为最后一个路段
   * */
  private async addSelectedRoad(isLastRoad: boolean = false) {
    // 将选定路段列表中的最后一个添加到地图上
    const lastGraphic = this.selectedRoadGraphicArray[
      this.selectedRoadGraphicArray.length - 1
    ];
    lastGraphic.symbol = {
      type: "simple-line",
      color: "darkslateblue",
      width: 4,
    } as any;
    lastGraphic.popupTemplate = {
      ...this.popupTemplate,
      actions: [this.reSelectNextRoadButton as any],
    } as any;
    this.selectedRoadLayer.add(lastGraphic);

    // 在路段最后一个点周边搜索信号机
    const polyline = lastGraphic.geometry as __esri.Polyline;
    const path = polyline.paths[0];
    const lastPoint = polyline.getPoint(0, path.length - 1);
    await this.searchTrafficSignalByPoint(lastPoint);

    // 不是最后一个路段，则显示候选路段
    this.candidateRoadLayer.removeAll();
    if (!isLastRoad) {
      this.showNextRoad(lastGraphic.attributes["TROAD_ID"]);
    }
  }

  /** 显示多条待选路段 */
  private async showNextRoad(roadIds: string) {
    const roadIdArray = roadIds.split(",");
    roadIdArray.forEach(async (roadId) => {
      const roadGraphic = await this.getRoadGraphicByRoadId(roadId);
      if (roadGraphic) {
        const candidateRoad = roadGraphic.clone();
        candidateRoad.symbol = {
          type: "simple-line",
          color: "dodgerblue",
          width: 4,
        } as any;
        candidateRoad.popupTemplate = {
          ...this.popupTemplate,
          actions: [this.addRoadButton, this.endRouteButton],
        } as any;
        this.candidateRoadLayer.add(candidateRoad);
      }
    });
  }
}

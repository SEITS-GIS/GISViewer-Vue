import { ISelectRouteParam } from "@/types/map";
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
  /** 已选定的信号机编号 */
  private selectedTrafficSignalIdArray: Array<string> = [];

  /** 搜索信号机的缓冲距离 */
  private readonly bufferDistance = 20;

  private beginRouteButton = {
    title: "开始",
    id: "beginRoute",
    className: "esri-icon-play",
  } as __esri.ActionButton;

  private endRouteButton = {
    title: "结束",
    id: "endRoute",
    className: "esri-icon-check-mark",
  } as __esri.ActionButton;

  private addRoadButton = {
    title: "添加",
    id: "addRoad",
    className: "esri-icon-plus",
  } as __esri.ActionButton;

  private reSelectNextRoadButton = {
    title: "重选",
    id: "reSelectNextRoad",
    className: "esri-icon-forward",
  } as __esri.ActionButton;

  private resetAllRoadButton = {
    title: "重设",
    id: "resetAllRoad",
    className: "esri-icon-close",
  } as __esri.ActionButton;

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
  public async initializeRoute(params: ISelectRouteParam) {
    const roadNetworkUrl =
      params?.roadUrl ||
      "http://115.28.88.187:6080/arcgis/rest/services/ZhongZhi/RoadNetwork/MapServer/2";
    const trafficSignalUrl =
      params?.trafficSignalUrl ||
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
        actions: [this.beginRouteButton],
      },
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-line",
          color: "lightblue",
          width: 2,
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
          this.selectedRoadGraphicArray = [];

          // popup.selectedFeature.attributes只包含popupTemplate中配置的字段
          // 只能用FID来查找ROAD_ID
          const { FID } = this.view.popup.selectedFeature.attributes;
          const selectedGraphic = await this.getRoadGraphicByFID(FID);
          this.addSelectedRoad(selectedGraphic.clone());

          break;
        }

        case "addRoad": {
          const { FID } = this.view.popup.selectedFeature.attributes;
          const selectedGraphic = await this.getRoadGraphicByFID(FID);
          this.addSelectedRoad(selectedGraphic.clone());
          break;
        }

        case "reSelectNextRoad": {
          const { FID } = this.view.popup.selectedFeature.attributes;
          const selectedGraphic = await this.getRoadGraphicByFID(FID);

          //从已选定路段中移除当前及之后路段
          this.reSelectRoad(selectedGraphic.attributes["ROAD_ID"]);

          break;
        }

        case "endRoute": {
          const { FID } = this.view.popup.selectedFeature.attributes;
          const selectedGraphic = await this.getRoadGraphicByFID(FID);
          this.addSelectedRoad(selectedGraphic.clone(), true);

          // 向父组件回传本次路径选择结果
          if (this.selectRouteFinished) {
            const roadIds = this.selectedRoadGraphicArray.map(
              (graphic) => graphic.attributes["ROAD_ID"]
            );
            this.selectRouteFinished({
              roadIds,
              signalIds: this.selectedTrafficSignalIdArray,
            });
          }
          break;
        }
      }
    });
  }

  /** 根据FID查找道路Graphic */
  private async getRoadGraphicByFID(fid: string): Promise<__esri.Graphic> {
    const query: __esri.Query = this.allRoadLayer.createQuery();
    query.where = `FID = ${fid}`;
    const results = await this.allRoadLayer.queryFeatures(query);
    return results.features[0];
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
  private async searchTrafficSignal(center: __esri.Geometry) {
    // 生成缓冲区
    type MapModules = [typeof import("esri/geometry/geometryEngineAsync")];
    const [geometryEngineAsync] = await (loadModules([
      "esri/geometry/geometryEngineAsync",
    ]) as Promise<MapModules>);
    const buffer = (await geometryEngineAsync.geodesicBuffer(
      center,
      this.bufferDistance,
      "meters"
    )) as __esri.Polygon;

    const query = this.allTrafficSignalLayer.createQuery();
    query.geometry = buffer;
    query.spatialRelationship = "contains";
    query.returnGeometry = true;
    query.outFields = ["*"];
    const results = await this.allTrafficSignalLayer.queryFeatures(query);
    results.features.forEach((graphic) => {
      const signalGraphic = graphic.clone();
      const signalId: string = signalGraphic.attributes["SYNODE_ID"];
      if (!this.selectedTrafficSignalIdArray.includes(signalId)) {
        signalGraphic.symbol = {
          type: "simple-marker",
          style: "circle",
          color: "gold",
          size: "12px",
          outline: {
            color: "white",
            width: 1,
          },
        } as any;
        this.selectedTrafficSignalLayer.add(signalGraphic);
        this.selectedTrafficSignalIdArray.push(signalId);
      }
    });
  }

  /**
   * 显示当前已选定的路段
   * @param isLastRoad 是否为最后一个路段
   * */
  private async addSelectedRoad(
    graphic: __esri.Graphic,
    isLastRoad: boolean = false
  ) {
    graphic.symbol = {
      type: "simple-line",
      color: "red",
      width: 4,
    } as any;
    graphic.popupTemplate = {
      ...this.popupTemplate,
      actions: [this.reSelectNextRoadButton],
    } as any;
    this.selectedRoadLayer.add(graphic);
    this.selectedRoadGraphicArray.push(graphic);

    // 在路段最后一个点周边搜索信号机
    // const polyline = graphic.geometry as __esri.Polyline;
    // const path = polyline.paths[0];
    // const lastPoint = polyline.getPoint(0, path.length - 1);
    await this.searchTrafficSignal(graphic.geometry);

    // 显示候选路段
    this.candidateRoadLayer.removeAll();
    if (!isLastRoad) {
      this.showNextRoad(graphic.attributes["TROAD_ID"]);
    }
  }

  private reSelectRoad(roadId: string) {
    let roadIndex = 0;
    for (let i = 0; i < this.selectedRoadGraphicArray.length; i++) {
      const graphic = this.selectedRoadGraphicArray[i];
      if (graphic.attributes["ROAD_ID"] === roadId) {
        roadIndex = i;
        break;
      }
    }
    const removeGraphics = this.selectedRoadGraphicArray.slice(roadIndex);
    this.selectedRoadGraphicArray = this.selectedRoadGraphicArray.slice(
      0,
      roadIndex
    );
    this.selectedRoadLayer.removeMany(removeGraphics);
    this.addSelectedRoad(removeGraphics[0]);
  }

  /** 显示多条待选路段 */
  private async showNextRoad(roadIds: string) {
    const roadIdArray = roadIds.split(",");
    for (let i = 0; i < roadIdArray.length; i++) {
      const roadId = roadIdArray[i];
      if (roadId !== "") {
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
      }
    }

    // 如果只有一条待选路段，打开弹出框
    if (this.candidateRoadLayer.graphics.length === 1) {
      this.view.popup.open({
        location: (this.candidateRoadLayer.graphics.getItemAt(0)
          .geometry as __esri.Polyline).extent.center,
        features: [this.candidateRoadLayer.graphics.getItemAt(0)],
      });
    }
  }
}

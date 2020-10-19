import Axios from "axios";
import { loadModules } from "esri-loader";

export default class SelectRoute2D {
  private static intances: Map<string, SelectRoute2D>;

  private selectedRoadGraphicArray: Array<__esri.Graphic> = [];

  private view!: __esri.MapView;
  private allRoadLayer!: __esri.FeatureLayer;
  private selectedRoadLayer!: __esri.GraphicsLayer;
  private candidateRoadLayer!: __esri.GraphicsLayer;

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
      "http://115.28.88.187:6080/arcgis/rest/services/ZhongZhi/RoadNetwork/MapServer/1";

    type MapModules = [
      typeof import("esri/layers/GraphicsLayer"),
      typeof import("esri/layers/FeatureLayer"),
      typeof import("esri/Graphic")
    ];
    const [GraphicsLayer, FeatureLayer, Graphic] = await (loadModules([
      "esri/layers/GraphicsLayer",
      "esri/layers/FeatureLayer",
      "esri/Graphic",
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
    this.view.map.add(this.allRoadLayer);

    this.selectedRoadLayer = new GraphicsLayer();
    this.candidateRoadLayer = new GraphicsLayer();
    this.view.map.addMany([this.selectedRoadLayer, this.candidateRoadLayer]);

    this.view.popup.on("trigger-action", async (event) => {
      this.view.popup.close();

      switch (event.action.id) {
        case "beginRoute": {
          // 选好起点后路网不再能点击
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
            this.selectRouteFinished({ data: "111" });
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

  /**
   * 显示当前已选定的路段
   * @param isLastRoad 是否为最后一个路段
   * */
  private addSelectedRoad(isLastRoad: boolean = false) {
    const lastGraphic = this.selectedRoadGraphicArray[
      this.selectedRoadGraphicArray.length - 1
    ];
    lastGraphic.symbol = {
      type: "simple-line",
      color: "deepskyblue",
      width: "4px",
    } as any;
    lastGraphic.popupTemplate = {
      ...this.popupTemplate,
      actions: [this.reSelectNextRoadButton as any],
    } as any;
    this.selectedRoadLayer.add(lastGraphic);

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
          color: "forestgreen",
          width: "4px",
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

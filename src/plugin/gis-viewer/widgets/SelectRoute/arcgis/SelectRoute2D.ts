import Axios from "axios";
import { loadModules } from "esri-loader";

export default class SelectRoute2D {
  private static intances: Map<string, SelectRoute2D>;

  private selectedRoadIdArray: Array<string> = [];

  private view!: __esri.MapView;
  private allRoadLayer!: __esri.FeatureLayer;
  private candidateRoadLayer!: __esri.GraphicsLayer;

  private beginRouteButton = {
    title: "开始",
    id: "beginRoute",
    className: "esri-icon-play",
  };

  private endRouteButton = {
    title: "结束",
    id: "endRoute",
    className: "esri-icon-close",
  };

  private addRoadButton = {
    title: "添加",
    id: "addRoad",
    className: "esri-icon-check-mark",
  };

  private reSelectNextRoadButton = {
    title: "重选",
    id: "reSelectNextRoad",
    className: "esri-icon-rotate",
  };

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
    this.candidateRoadLayer = new GraphicsLayer();
    this.view.map.add(this.candidateRoadLayer);

    this.allRoadLayer = new FeatureLayer({
      url: roadNetworkUrl,
      definitionExpression: "ROAD_CLASS <> 47000",
      popupTemplate: {
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
    // this.view.popup.viewModel.actions.getItemAt(0).visible = false

    this.view.popup.on("trigger-action", async (event) => {
      this.view.popup.close();

      switch (event.action.id) {
        case "beginRoute": {
          // popup.selectedFeature.attributes只包含popupTemplate中配置的字段
          // 只能用FID来查找ROAD_ID
          const { FID } = this.view.popup.selectedFeature.attributes;
          const selectedGraphic = await this.getRoadGraphicByFID(FID);
          if (selectedGraphic) {
            const {
              ROAD_ID: roadId,
              TROAD_ID: nextRoadIds,
            } = selectedGraphic.attributes;
            this.selectedRoadIdArray = [roadId];

            /** 已选定的路段，显示重选按钮 */
            this.allRoadLayer.popupTemplate.actions.removeAll();
            this.allRoadLayer.popupTemplate.actions.add(
              this.reSelectNextRoadButton as any
            );
            this.showSelectedRoad();

            await this.showNextRoad(nextRoadIds);
          }

          break;
        }

        case "addRoad": {
          const { FID } = this.view.popup.selectedFeature.attributes;
          const selectedGraphic = await this.getRoadGraphicByFID(FID);
          if (selectedGraphic) {
            const {
              ROAD_ID: roadId,
              TROAD_ID: nextRoadIds,
            } = selectedGraphic.attributes;
            this.selectedRoadIdArray.push(roadId);
            this.showSelectedRoad();
            await this.showNextRoad(nextRoadIds);

            break;
          }
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

  /** 显示当前已选定的路段 */
  private showSelectedRoad() {
    let ids = "";
    this.selectedRoadIdArray.forEach((id) => (ids += "'" + id + "',"));
    ids = ids.substr(0, ids.length - 1);
    this.allRoadLayer.definitionExpression = `ROAD_ID in (${ids})`;
  }

  /** 显示多条待选路段 */
  private async showNextRoad(roadIds: string) {
    this.candidateRoadLayer.removeAll();

    const roadIdArray = roadIds.split(",");
    roadIdArray.forEach(async (roadId) => {
      const roadGraphic = await this.getRoadGraphicByRoadId(roadId);
      if (roadGraphic) {
        const candidateRoad = roadGraphic.clone();
        candidateRoad.symbol = {
          type: "simple-line",
          color: "forestgreen",
          width: "2px",
        } as any;
        candidateRoad.popupTemplate = {
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
          actions: [this.addRoadButton as any],
        } as any;
        this.candidateRoadLayer.add(candidateRoad);
      }
    });
  }
}

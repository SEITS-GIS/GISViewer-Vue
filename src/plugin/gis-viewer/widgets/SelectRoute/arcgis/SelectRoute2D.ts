import Axios from "axios";
import { loadModules } from "esri-loader";

export default class SelectRoute2D {
  private static intances: Map<string, SelectRoute2D>;

  private view!: __esri.MapView;
  private allRoadLayer!: __esri.FeatureLayer;

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

    // 读取路段数据
    // const response = await Axios.get(`${roadNetworkUrl}/query`, {
    //   params: {
    //     where: "1=1",
    //     outFields: "*",
    //     f: "pjson",
    //   },
    // });
    // if ((response.status = 200)) {
    //   const roadData = response.data.features;
    // }
  }
}

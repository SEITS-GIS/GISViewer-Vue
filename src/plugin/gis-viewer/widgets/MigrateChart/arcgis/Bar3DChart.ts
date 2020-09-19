import {
  IOverlayParameter,
  IResult,
  IHeatParameter,
  IHeatPoint
} from '@/types/map';
import {loadModules} from 'esri-loader';
import * as echarts from 'echarts';
import {timers} from 'jquery';
require('echarts-gl');

export class Bar3DChart {
  private static intances: Map<string, any>;
  private view!: any;
  private echartlayer: any;
  private offset: number = -20;
  private chartsGroup: Array<any> = new Array<any>();
  private echartsIntance: any;
  private colors: Array<string> = [
    'rgba(0,255,255,0.4)',
    'rgba(255,255,0,0.4)',
    'rgba(255,215,0,0.4)',
    'rgba(255,69,0,0.4)',
    'rgba(0,250,154,0.4)',
    'rgba(0,255,0,0.4)',
    'rgba(255,0,0,0.4)',
    'rgba(255,20,147,0.4)',
    'rgba(0,191,255,0.4)'
  ];

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: __esri.MapView | __esri.SceneView) {
    let id = view.container.id;
    if (!Bar3DChart.intances) {
      Bar3DChart.intances = new Map();
    }
    let intance = Bar3DChart.intances.get(id);
    if (!intance) {
      intance = new Bar3DChart(view);
      Bar3DChart.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (Bar3DChart.intances as any) = null;
  }

  public async hideBarChart() {
    this.clear();
  }
  private clear() {
    if (this.chartsGroup && this.chartsGroup.length > 0) {
      this.chartsGroup.forEach((el: any) => {
        el.chart.clear();
        let parent = this.view.container.children[0].children[0];
        parent.removeChild(el.container);
      });
      this.chartsGroup = [];
    }
  }

  public async showBarChart(params: any) {
    let points = params.points;
    let name = params.name || 'line';
    const [geometryJsonUtils, SpatialReference] = await loadModules([
      'esri/geometry/support/jsonUtils',
      'esri/geometry/SpatialReference'
    ]);
    points.forEach((point: any, index: number) => {
      let geometry = geometryJsonUtils.fromJSON(point.geometry);
      point.geometry = geometry;
      this.add(point, index, name);
    });
    this.addEvent();
  }
  private add(props: any, index: number, name: string) {
    let chartDiv = document.createElement('div');
    chartDiv.style.width = this.view.width + 'px';
    chartDiv.style.height = this.view.height + 'px';
    let chartid = 'chartDiv' + index;
    chartDiv.setAttribute('id', chartid);
    chartDiv.style.position = 'absolute';
    chartDiv.style.top = '0px';
    chartDiv.style.left = '0px';
    chartDiv.style.width = '200px';
    chartDiv.style.height = '150px';
    let parent = this.view.container.children[0].children[0];
    parent.appendChild(chartDiv);
    let myChart = echarts.init(document.getElementById(chartid));
    let mode = ['进', '出'];
    let flows = ['流量'];

    let data = [
      [0, 0, props.fields['inflow']],
      [0, 1, props.fields['outflow']]
    ];
    /*用来配置参数*/
    let option = {
      xAxis3D: {
        type: 'category',
        data: mode,
        show: false,
        name: '',
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255,0)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis3D: {
        type: 'category',
        data: flows,
        show: false,
        name: '',
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255,0)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      zAxis3D: {
        type: 'value',
        name: '',
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255,0)'
          }
        },
        show: false,
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      grid3D: {
        boxWidth: 100,
        boxDepth: 50,
        viewControl: {
          beta: 25,
          alpha: 10
        }
        // light: {
        //   main: {
        //     intensity: 1.9
        //   },
        //   ambient: {
        //     intensity: 0.8
        //   }
        // }
      },
      series: [
        {
          type: 'bar3D',
          name: name,
          data: data.map((item: any, index: number) => {
            return {
              value: [item[1], item[0], item[2]],
              label: {
                textStyle: {
                  color: index == 1 ? 'rgb(0,215,0)' : 'rgb(255,215,0)'
                }
              }
            };
          }),
          shading: 'lambert',
          label: {
            show: true,
            formatter: (params: any) => {
              console.log(params);
              if (params.dataIndex == 0) {
                return (
                  (params.seriesName == 'line' ? '昨日:' : '进') +
                  params.value[2] +
                  '人'
                );
              } else {
                return (
                  (params.seriesName == 'line' ? '今日:' : '出') +
                  params.value[2] +
                  '人'
                );
              }
            },
            textStyle: {
              fontSize: 16,
              backgroundColor: 'rgba(0,0,0,0)'
            }
          },
          itemStyle: {
            color: (d: any) => {
              if (d.dataIndex == 0) {
                return 'rgb(255,215,0)';
              } else {
                return 'rgb(0,255,255)';
              }
            },
            opacity: 1
          },
          emphasis: {
            label: {
              textStyle: {
                fontSize: 20,
                color: '#900'
              }
            },
            itemStyle: {
              color: '#900'
            }
          }
        }
      ]
    };
    /*调用option生成图表*/
    myChart.setOption(option);
    this.changeBarPosition(chartDiv, props.geometry);
    this.chartsGroup.push({
      container: chartDiv,
      center: props.geometry,
      chart: myChart
    });
  }

  private subLocate(
    div: any,
    location: string
  ): {xoffset: number; yoffset: number} {
    let xoffset: number = 0;
    let yoffset: number = 0;
    const width = div.clientWidth;
    const height = div.clientHeight;
    switch (location) {
      case 'top':
        xoffset = 0 - width / 2 - 10;
        yoffset = 0 - height - this.offset;
    }
    return {xoffset: xoffset, yoffset: yoffset};
  }
  private changeBarPosition(div: any, geo: any) {
    let center = geo;
    let point = this.view.toScreen(center);
    const offset: {xoffset: number; yoffset: number} = this.subLocate(
      div,
      'top'
    );
    div.style.left = point.x + 10 + offset.xoffset + 'px';
    div.style.top = point.y + offset.yoffset + 'px';
  }
  private addEvent() {
    let o: any = this;
    o.view.watch('extent', (event: any) => {
      //o.changeText();
      if (o.chartsGroup.length > 0) {
        o.chartsGroup.forEach((el: any) => {
          o.changeBarPosition(el.container, el.center);
        });
      }
    });
  }
}

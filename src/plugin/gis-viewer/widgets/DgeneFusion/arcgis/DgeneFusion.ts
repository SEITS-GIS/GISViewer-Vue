import {loadModules} from 'esri-loader';
import $ from 'jquery';
import {IResult} from '@/types/map';
import Axios from 'axios';
import {Utils} from '@/plugin/gis-viewer/Utils';
import {reject} from 'esri/core/promiseUtils';
import {Vue} from 'vue-property-decorator';
import Loading from './Loading.vue';

declare let Dgene: any;
export class DgeneFusion {
  private static intances: Map<string, any>;
  private view!: any;
  private showZoom: number = 10;
  private mouseEventFn: any;
  private showOut: boolean = true;
  private loadOutState: boolean = false;
  private videoStateUrl: string =
    'http://10.31.214.237:15021/utcp/trafficemgc/getCameraStatus';

  private fusion_view_state: string = 'all';
  private FlyCenter: any;
  private videocode: string = 'HQ0912New';
  private loadingVm: any;
  private originView: any = {
    x: 0,
    y: 2000,
    z: 45
  };
  private FlyView: any = {
    x: -63,
    y: 251,
    z: 311
  };
  private FlyViewOut: any = {
    x: 700,
    y: 700,
    z: 700
  };
  private rotateState: string = 'auto';
  private setting: any = {
    isLocal: true, // isLocal?apiBase = 'static/api':apiBase = 'project/api/'+id
    url: 'http://10.31.251.205/20200930/static/api/',
    api: {
      // http://fusion.dgene.com/admin/project/v2/11
      apiBase: 'http://10.31.251.205/20200930/static/api/',
      // apiBase: '/v2/11',
      file: '/file',
      scene: '/scene',
      fusion: '/fusion'
    },
    // loadType 模型贴图资源指向
    loadType: 'local',
    // 视频来源地址,请注意同源协议规范
    videoSource: 'src',
    // isDown 是否开启管理员隐藏 点击获取模块
    isDown: true,
    // 动画时间和融合时间
    animateDuringTime: 3000,
    fusionTime: 1000,
    // fov 窗口系数
    fovWinScale: 1.1,
    // 是否开启gui
    isGui: false,
    // 单融合状态下控制齐禁用开关
    fusConEnable: true,
    // allow development
    development: 'U2FsdGVkX1/k05uITAByD2mRfDmDXYXPH/=',
    publicKey:
      'FtJXj7vVFLjHaXfL7vOZYuxnfZ3KCU54ywKhJMuvC7l2jG0TqYpFGlu5dIv0hWTs',
    // 是否开启outline
    isOutLine: false,
    appendDomID: 'dgeneDiv',
    id: 'canvas'
  };
  private fusion_view: any;
  private fusion_control: any;
  private all_video = new Array();

  private constructor(view: any) {
    this.view = view;
  }
  public static getInstance(view: any) {
    let id = view.container.id;
    if (!DgeneFusion.intances) {
      DgeneFusion.intances = new Map();
    }
    let intance = DgeneFusion.intances.get(id);
    if (!intance) {
      intance = new DgeneFusion(view);
      DgeneFusion.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (DgeneFusion.intances as any) = null;
  }
  private hideDgene() {}
  public async showDgene(params: any) {
    let _this = this;
    if (params == undefined) {
      params = {};
    }
    let duration = params.duration || 5000;
    const [Point] = await loadModules(['esri/geometry/Point']);
    let center = new Point({
      x: -14071.811607336222,
      y: -4342.546650737293,
      spatialReference: this.view.spatialReference
    });
    // this.view.watch('zoom', (newValue: any, oldValue: any) => {
    //   if (newValue >= this.showZoom && oldValue < newValue) {
    //     _this.showFusion();
    //   }
    // });
    this.stopMouseWheelEvent(true);
    this.view
      .goTo(
        {
          center: center,
          zoom: this.showZoom
        },
        {duration: duration}
      )
      .then(() => {
        _this.stopMouseWheelEvent(false);
        _this.showFusion(params);
        if (_this.fusion_view.camFlyTo) {
          _this.fusion_view.camFlyTo(this.originView, 1);
        }
      });
  }
  public stopMouseWheelEvent(param: boolean) {
    if (!param) {
      if (this.mouseEventFn) {
        console.log('start mouseWheel');
        this.mouseEventFn.remove();
      }
    } else {
      console.log('stop mouseWheel');
      this.mouseEventFn = this.view.on('mouse-wheel', (evt: any) => {
        if (evt && evt.stopPropagation) {
          //因此它支持W3C的stopPropagation()方法
          evt.stopPropagation();
        } else if (evt && evt.srcEvent) {
          evt.srcEvent.stopPropagation();
        } else {
          //否则，我们需要使用IE的方式来取消事件冒泡
          (window as any).event.cancelBubble = true;
        }
      });
    }
  }
  public restoreDegeneFsion(params: any): Promise<IResult> {
    let _this = this;
    let pos = this.originView;
    this.stopMouseWheelEvent(false);
    // if (this.fusion_view.camFlyTo) {
    //   this.fusion_view.camFlyTo(pos, 3000);
    // }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        _this.hideFusion();
        _this.view.goTo({
          center: this.view.mapOptions.center,
          zoom: this.view.mapOptions.zoom
        });
        resolve({status: 0, message: 'restore map'});
      }, 300);
    });
  }
  public async addDgeneFusion(params: any): Promise<IResult> {
    let _this = this;
    this.all_video = [];
    let parentid = params.appendDomID || 'app';
    this.showOut = params.showOut !== false;

    let dgeneDiv = document.createElement('div');
    dgeneDiv.style.width = this.view.width + 'px';
    dgeneDiv.style.height = this.view.height + 'px';
    dgeneDiv.setAttribute('id', 'dgeneDiv');
    dgeneDiv.style.position = 'absolute';
    dgeneDiv.style.visibility = 'hidden';
    dgeneDiv.style.top = '0px';
    dgeneDiv.style.left = '0px';
    let divmap = document.getElementById(parentid) as any;
    divmap.appendChild(dgeneDiv);
    window.onresize = () => {
      // $('#dgeneDiv').css({
      //   width: window.screen.width + 'px',
      //   height: window.screen.height + 'px'
      // });
      // _this.fusion_view.setCanvasSize(
      //   window.screen.width,
      //   window.screen.height
      // );
    };
    this.showLoading({content: '1%'});
    window.onkeydown = (event: any) => {
      _this.fusion_view.stopAutoRotate();
      _this.rotateState = 'stop';

      setTimeout(() => {
        _this.fusion_view.stopAutoRotate();
        _this.rotateState = 'stop';
      }, 2000);
      if (event.keyCode == 32) {
        if (_this.fusion_view) {
          _this.fusion_view.showMapSprite(); //showMapSprite hideMapSprite
          _this.showDgeneOutPoint(_this.showOut);
        }
      } else {
        _this.fusion_view.hideMapSprite(); //showMapSprite hideMapSprite
      }
    };
    this.rotateState = 'stop';
    window.ondblclick = () => {
      if ($('#dgeneDiv').css('visibility') != 'hidden') {
        if (_this.rotateState == 'stop') {
          _this.rotateState = 'auto';
          _this.fusion_view.autoRotate();
        } else {
          _this.rotateState = 'stop';
          _this.fusion_view.stopAutoRotate();
        }
      }
    };
    this.view.watch('width,height', async (newValue: any) => {
      $('#dgeneDiv').css({
        width: _this.view.width + 'px',
        height: _this.view.height + 'px'
      });
      _this.fusion_view.setCanvasSize(_this.view.width, _this.view.height);
    });
    return new Promise((resolve, reject) => {
      _this.showDgeneFusion(params).then((e: IResult) => {
        _this.addVideo(params);
        resolve(e);
      });
    });
  }
  public async addVideo(params: any) {
    //let videodata = videoJson.data;
    let _this = this;
    let showOutVideo = params.outvideo !== false;

    Axios.get('./static/station.json').then((res: any) => {
      let stations = res.data;
      for (let name in stations) {
        let pos = stations[name];
        this.fusion_view.loadMapSprite2(
          './assets/image/' + name + '.png',
          'test',
          {
            x: pos[0],
            y: pos[1] + 10,
            z: pos[2]
          },
          20
        );
      }
    });
    Axios.get(this.setting.url + '/fusion.json').then((res: any) => {
      let videodata = res.data.data;
      if (videodata) {
        for (let data in videodata) {
          let vdata = (videodata as any)[data];
          _this.all_video.push({
            name: data,
            isout: vdata.isOut,
            isreal: vdata.isreal,
            fly: vdata.isGlobalView
          });
          let size = vdata.isOut ? 8 : 2;

          let position = vdata.isreal
            ? vdata.realposition
            : vdata.camJson.position;
          // console.log(data, position);
          if (showOutVideo || !vdata.isOut) {
            //console.log(data, position);
            // if (true) {
            //   this.fusion_view.loadMapSprite2(
            //     './assets/mapIcons/text/' + data + '.png',
            //     'test',
            //     {
            //       x: position.x,
            //       y: position.y + 2.5 * size,
            //       z: position.z
            //     },
            //     size * 10
            //   );
            // }
            this.fusion_view.loadMapSprite(
              data,
              {
                x: position.x,
                y: position.y,
                z: position.z
              },
              size,
              0x00ff00,
              0.9,
              180
            );
          }
        }
        setTimeout(() => {
          _this.refreshVideoState();
        }, 3000);
      }
    });
  }
  public async showVideo(params: any) {
    this.fusion_view.activeFuse(name);
  }
  public async showDgeneFusion(params: any): Promise<IResult> {
    let dgene = params.url || 'dgene';
    let showOut = params.showOut;
    await Utils.loadScripts(['libs/' + dgene + '/runtime.js']).then(
      async () => {
        await Utils.loadScripts(['libs/' + dgene + '/2.js']).then(async () => {
          await Utils.loadScripts(['libs/' + dgene + '/app.js']);
        });
      }
    );
    // await loadModules([
    //   'libs/dgene2/runtime.js',
    //   'libs/dgene2/2.js',
    //   'libs/dgene2/app.js'
    // ]);
    let clickCallBack = params.onclick;
    let setting = this.setting;
    if (params.settingUrl) {
      setting.url = params.settingUrl;
      setting.api.apiBase = params.settingUrl;
    }
    let _this = this;
    let callback = params.callback;
    /* eslint-disable */
    /* eslint-disable */
    // 叠境三维融合库调用示范
    return new Promise((resolve, reject) => {
      _this.fusion_view = new Dgene(
        (item: any, loaded: number, total: number) => {
          if (Math.floor(Number(loaded / total) * 100) % 10 == 0) {
            console.log(
              `Dgene info: data loaded ${Math.floor(
                (loaded / total) * 100
              ).toString()}%`
            );
          }
          let processTotal = showOut ? 180 : 100;

          if (loaded < processTotal) {
            _this.loadingVm.changeLoading(
              Math.floor((loaded / processTotal) * 100)
            );
          }
          if (callback) {
            callback(loaded, total);
          }
        },
        () => {
          setTimeout(() => {
            console.log('dgene fusion map onload success');
            for (const k in _this.fusion_view.initSetting.fusion) {
              console.log(
                `fusion index is >> ${_this.fusion_view.initSetting.fusion[k].index} fusion keyCode is >> ${_this.fusion_view.initSetting.fusion[k].keyCode}`
              );
            }
            let control = _this.fusion_view.getControl();
            _this.fusion_control = control;
            _this.loadingVm.changeLoading(100);
            resolve({
              status: 0,
              message: 'dgene fusion map onload success',
              result: _this.fusion_view
            });
          }, 1000);
        },
        setting,
        (name: any) => {
          _this.fusion_view.stopAutoRotate();
          console.log(name);
          let a = _this.all_video.filter((item: any) => {
            if (item.name == name) {
              return true;
            }
            return false;
          });
          if (a.length > 0) {
            let data = a[0];
            let fly = data.fly !== false;
            if (_this.fusion_view) {
              _this.fusion_view.hideMapSprite(); //showMapSprite hideMapSprite
            }
            if (data.isreal) {
              _this.fusion_view.showVideoDom(name);
            } else {
              _this.fusion_view.activeFuse(name);
            }
            if (!fly) {
              if (document.getElementById(name)) {
                (document.getElementById(name) as any).style.display = 'block';
              }
            }
          }
        },
        () => {
          if (_this.showOut && !_this.loadOutState) {
            _this.fusion_view.loadOutSideModel();
            _this.loadOutState = true;
            //_this.fusion_view.addSprite();
          }
        },
        (obj: any) => {
          console.log(obj);
        }
      );
    });
  }
  private hideFusion() {
    $('#dgeneDiv').css('visibility', 'hidden');
    $('#' + this.view.container.id).fadeIn(1000);
  }
  private showLoading(props: any) {
    if (!this.loadingVm) {
      let vm = new Vue({
        // 为什么不使用 template 要使用render 因为现在是webpack里面没有编译器 只能使用render
        render: (h) => h(Loading, {props}) // render 生成虚拟dom  {props: props}
      }).$mount(); // $mount 生成真实dom, 挂载dom 挂载在哪里, 不传参的时候只生成不挂载，需要手动挂载
      this.view.container.children[0].children[0].appendChild(vm.$el);
      this.loadingVm = vm.$children[0];
    }
  }
  private showDgeneOutPoint(show: boolean) {
    if (this.fusion_view) {
      this.all_video.forEach((item: any) => {
        if (item.isout) {
          this.fusion_view.getScene().getObjectByName(item.name).visible = show;
        }
      });
    }
  }
  private showFusion(params: any) {
    let _this = this;
    this.rotateState = 'stop';

    let carmeraCallback = params.callback;
    this.fusion_view.camFlyTo(this.originView, 1);
    let pos = this.showOut ? _this.FlyViewOut : _this.FlyView;
    setTimeout(() => {
      _this.fusion_view.camFlyTo(pos, 3000);
    }, 10);
    // setTimeout(() => {
    //   _this.fusion_view.newHideOut1({
    //     duration1: 0,
    //     duration2: 0,
    //     duration3: 1000,
    //     firstPos: {x: 0, y: 0, z: 0},
    //     firstTar: {x: 0, y: 0, z: 0},
    //     nextPos: _this.FlyView,
    //     nextTar: {x: 0, y: 0, z: 0},
    //     downHeight: -6000
    //   });
    //   _this.showDgeneOutPoint(false);
    //   _this.showOut = false;
    // }, 2000);

    setTimeout(() => {
      _this.rotateState = 'auto';
      _this.fusion_view.autoRotate();
      setTimeout(() => {
        _this.rotateState = 'stop';
        _this.fusion_view.stopAutoRotate();
      }, 35000);
    }, 5500);
    // $('#gisDiv').css({
    //   'background-color': '#003452'
    // });
    $('#dgeneDiv').css({
      display: 'flex',
      position: 'fixed',
      'z-index': '90'
    });
    $('#dgeneDiv').css('visibility', 'visible');
    $('#' + this.view.container.id).fadeOut(1000);
    this.fusion_control.addEventListener('change', (e: any) => {
      let dir = _this.fusion_view.getCameraPosition();
      //console.log(dir);
      let theta = Math.atan2(-dir.x, -dir.z);
      theta = (180 * theta) / Math.PI + 180;
      //var theta = Math.atan2(-dir.x, -dir.z);
      if (carmeraCallback) {
        carmeraCallback(theta);
      }
      if (_this.fusion_view.getCameraY() < 60) {
        _this.fusion_view.setCamNear(0.1, 20000);
      } else {
        _this.fusion_view.setCamNear(50, 20000);
      }
    });
  }
  private changeDgeneOut() {
    let dir = this.fusion_view.getCameraPosition();
    if (this.showOut) {
      //当前显示外面,切换到隐藏外面
      this.fusion_view.newHideOut1({
        duration1: 500,
        duration2: 1000,
        duration3: 1500,
        firstPos: dir,
        firstTar: {x: 0, y: 0, z: 0},
        nextPos: {
          x: -63.93155359536513,
          y: 259.3165187210438,
          z: 312.28570642332915
        },
        nextTar: {
          x: -63.93155359536513,
          y: 259.3165187210438,
          z: 312.28570642332915
        },
        downHeight: -6000
      });
    } else {
      this.fusion_view.newShowOut3({
        duration1: 200,
        duration2: 1000,
        duration3: 1500,
        firstPos: dir,
        firstTar: {x: 0, y: 0, z: 0},
        nextPos: {x: 700, y: 700, z: 700},
        nextTar: {x: 0, y: 0, z: 0},
        firstHeight: 6000,
        downHeight: 0
      });
    }
    this.showOut = !this.showOut;
    if (this.showOut) {
      setTimeout(() => {
        this.showDgeneOutPoint(this.showOut);
      }, 2000);
    } else {
      this.showDgeneOutPoint(this.showOut);
    }
  }
  private getVideoStatus(): Promise<any> {
    let _this = this;
    return new Promise((resolve, reject) => {
      Axios.get(_this.videoStateUrl).then((res: any) => {
        resolve(res.data);
      });
    });
  }
  private refreshVideoState() {
    let _this = this;
    this.getVideoStatus().then((res) => {
      let videos = res;
      videos.forEach((video: any) => {
        if (video.FSTR_ID) {
          let name = _this.videocode + video.FSTR_ID;
          if (video.FSTR_STATUS.toString() == '1') {
            _this.fusion_view.setSpriteMaterialColor(name, 0x00ff00, 0.9);
          } else {
            _this.fusion_view.setSpriteMaterialColor(name, 0x000000, 0.9);
          }
        }
      });
      _this.showDgeneOutPoint(_this.showOut);
      setTimeout(() => {
        _this.refreshVideoState();
      }, 60 * 1000);
    });
  }
}

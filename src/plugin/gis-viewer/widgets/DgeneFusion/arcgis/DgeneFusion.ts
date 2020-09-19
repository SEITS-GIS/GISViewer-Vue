import {loadModules} from 'esri-loader';
import $ from 'jquery';
import {IResult} from '@/types/map';
import Axios from 'axios';
import {Utils} from '@/plugin/gis-viewer/Utils';
import {reject} from 'esri/core/promiseUtils';

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
  private originView: any = {
    x: 0,
    y: 2000,
    z: 45
  };
  private FlyView: any = {
    x: 211,
    y: 190,
    z: 342
  };
  private rotateState: string = 'auto';
  private setting: any = {
    isLocal: true, // isLocal?apiBase = 'static/api':apiBase = 'project/api/'+id
    url: 'http://10.31.251.205/test/static/api/',
    api: {
      // http://fusion.dgene.com/admin/project/v2/11
      apiBase: 'http://10.31.251.205/test/static/api/',
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
  private out_video = new Array();
  private in_video = new Array();

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
        _this.showFusion();
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
    this.out_video = [];
    this.in_video = [];
    let parentid = params.appendDomID || 'app';
    this.showOut = params.showOut !== false;

    let dgeneDiv = document.createElement('div');
    dgeneDiv.style.width = this.view.width + 'px';
    dgeneDiv.style.height = this.view.height + 'px';
    dgeneDiv.setAttribute('id', 'dgeneDiv');
    dgeneDiv.style.position = 'absolute';
    dgeneDiv.style.display = 'none';
    dgeneDiv.style.top = '0px';
    dgeneDiv.style.left = '0px';
    let divmap = document.getElementById(parentid) as any;
    divmap.appendChild(dgeneDiv);
    window.onresize = () => {
      $('#dgeneDiv').css({
        width: window.screen.width + 'px',
        height: window.screen.height + 'px'
      });
      _this.fusion_view.setCanvasSize(
        window.screen.width,
        window.screen.height
      );
    };
    window.onkeydown = (event: any) => {
      console.log(event.keyCode);
      if (event.keyCode == 32) {
        if (_this.fusion_view) {
          _this.fusion_view.showMapSprite(); //showMapSprite hideMapSprite
        }
      }
    };
    this.rotateState = 'stop';
    window.ondblclick = () => {
      if ($('#dgeneDiv').css('display') != 'none') {
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
            y: pos[1],
            z: pos[2]
          },
          50
        );
      }
    });
    Axios.get('./static/fusion.json').then((res: any) => {
      let videodata = res.data.data;
      if (videodata) {
        for (let data in videodata) {
          let vdata = (videodata as any)[data];

          if (vdata.isreal) {
            _this.out_video.push(data);
          } else {
            _this.in_video.push(data);
          }
          let size = vdata.isreal ? 8 : 2;
          let position = vdata.isreal
            ? vdata.realposition
            : vdata.camJson.position;

          // console.log(data, position);
          if (showOutVideo || !vdata.isreal) {
            console.log(data, position);
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
    let setting = this.setting;
    let _this = this;
    let callback = params.callback;
    /* eslint-disable */
    /* eslint-disable */
    // 叠境三维融合库调用示范
    return new Promise((resolve, reject) => {
      _this.fusion_view = new Dgene(
        (item: any, loaded: number, total: number) => {
          if (_this.showOut && !_this.loadOutState) {
            _this.fusion_view.loadOutSideModel();
            _this.loadOutState = true;
          }
          if (Math.floor(Number(loaded / total) * 100) % 10 == 0) {
            console.log(
              `Dgene info: data loaded ${Math.floor(
                (loaded / total) * 100
              ).toString()}%`
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
          if (_this.out_video.indexOf(name) > -1) {
            if (_this.fusion_view) {
              _this.fusion_view.hideMapSprite(); //showMapSprite hideMapSprite
            }
            _this.fusion_view.showVideoDom(name);
          } else if (_this.in_video.indexOf(name) > -1) {
            if (_this.fusion_view) {
              _this.fusion_view.hideMapSprite(); //showMapSprite hideMapSprite
            }
            _this.fusion_view.activeFuse(name);
          }
        }
      );
    });
  }
  private hideFusion() {
    $('#dgeneDiv').fadeOut('slow');
    $('#' + this.view.container.id).fadeIn(1000);
  }
  private showFusion() {
    let _this = this;
    this.rotateState = 'stop';
    this.fusion_view.camFlyTo(this.originView, 1);
    setTimeout(() => {
      let pos = _this.FlyView;
      _this.fusion_view.camFlyTo(pos, 5000);
    }, 200);

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
    $('#dgeneDiv').fadeIn('slow');
    $('#' + this.view.container.id).fadeOut(1000);
    this.fusion_control.addEventListener('change', (e: any) => {
      // console.log(_this.fusion_view.getCameraPosition());
      if (_this.fusion_view.getCameraY() < 60) {
        _this.fusion_view.setCamNear(0.1, 20000);
      } else {
        _this.fusion_view.setCamNear(50, 20000);
      }
    });
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
      setTimeout(() => {
        _this.refreshVideoState();
      }, 60 * 1000);
    });
  }
}

import {loadModules} from 'esri-loader';
import $ from 'jquery';
import {IResult} from '@/types/map';
import {reject} from 'esri/core/promiseUtils';
import videoJson from './config/fusion.json';

declare let Dgene: any;
export class DgeneFusion {
  private static intances: Map<string, any>;
  private view!: any;
  private showZoom: number = 10;
  private mouseEventFn: any;
  private originView: any = {
    x: 0,
    y: 300,
    z: 45
  };
  private FlyView: any = {
    x: 180,
    y: 30,
    z: 45
  };
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

    this.view.watch('zoom', (newValue: any, oldValue: any) => {
      if (newValue >= this.showZoom && oldValue < newValue) {
        _this.showFusion();
      }
    });
    this.stopMouseWheelEvent(true);
    this.view
      .goTo(
        {
          center: this.view.center,
          zoom: this.showZoom
        },
        {duration: 5000}
      )
      .then(() => {
        _this.stopMouseWheelEvent(false);
        _this.fusion_view.camFlyTo(this.originView, 1);
      });
  }
  public stopMouseWheelEvent(param: boolean) {
    if (!param) {
      if (this.mouseEventFn) {
        this.mouseEventFn.remove();
      }
    } else {
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

    this.fusion_view.camFlyTo(pos, 3000);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        _this.hideFusion();
        resolve({status: 0, message: 'restore map'});
      }, 3300);
    });
  }
  public async addDgeneFusion(params: any): Promise<IResult> {
    let _this = this;
    let parentid = params.appendDomID || 'app';
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

    return new Promise((resolve, reject) => {
      _this.showDgeneFusion(params).then((e: IResult) => {
        _this.addVideo();
        resolve(e);
      });
    });
  }
  public async addVideo() {
    let videodata = videoJson.data;
    if (videodata) {
      for (let data in videodata) {
        let posion = (videodata as any)[data].camJson.position;
        this.fusion_view.loadMapSprite(
          './assets/image/video.png',
          data,
          {
            x: posion.x,
            y: posion.y + 2,
            z: posion.z
          },
          4
        );
      }
    }
  }
  public async showVideo(params: any) {
    this.fusion_view.activeFuse(name);
  }
  public async showDgeneFusion(params: any): Promise<IResult> {
    await loadModules([
      'libs/dgene/2.js',
      'libs/dgene/app.js',
      'libs/dgene/runtime.js'
    ]);
    let setting = this.setting;
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
          if (callback) {
            callback(loaded, total);
          }
        },
        () => {
          setTimeout(() => {
            console.log('dgene fusion map onload success');
            console.log(_this.fusion_view.initSetting.fusion);
            for (const k in _this.fusion_view.initSetting.fusion) {
              console.log(
                `fusion index is >> ${_this.fusion_view.initSetting.fusion[k].index} fusion keyCode is >> ${_this.fusion_view.initSetting.fusion[k].keyCode}`
              );
              let control = _this.fusion_view.getControl();
              _this.fusion_control = control;
              resolve({status: 0, message: 'dgene fusion map onload success'});
            }
          }, 1000);
        },
        setting,
        (name: any) => {
          _this.fusion_view.activeFuse(name);
        }
      );
    });
  }
  private hideFusion() {
    $('#dgeneDiv').fadeOut('slow');
    $('#divMap').fadeIn(1000);
  }
  private showFusion() {
    let _this = this;
    this.fusion_view.camFlyTo(this.originView, 1);
    setTimeout(() => {
      let pos = _this.FlyView;

      this.fusion_view.camFlyTo(pos, 5000);
      console.log(this.fusion_view.getCameraPosition());
    }, 200);
    $('#gisDiv').css({
      'background-color': '#003452'
    });
    $('#dgeneDiv').css({
      display: 'flex',
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      'z-index': '90',
      top: '0px',
      left: '0px'
    });
    $('#dgeneDiv').fadeIn('slow');

    $('#divMap').fadeOut(1000);
    this.fusion_control.addEventListener('change', (e: any) => {
      //console.log(_this.fusion_view.getCameraPosition());
      if (_this.fusion_view.getCameraY() > 300) {
        console.log('hide fu');
        _this.hideFusion();
      }
    });
  }
}

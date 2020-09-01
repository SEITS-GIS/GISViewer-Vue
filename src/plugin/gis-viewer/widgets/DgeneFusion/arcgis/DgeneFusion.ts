import {loadModules} from 'esri-loader';
import $ from 'jquery';
import {IResult} from '@/types/map';
import {reject} from 'esri/core/promiseUtils';
declare let Dgene: any;
export class DgeneFusion {
  private static intances: Map<string, any>;
  private view!: any;
  private setting: any = {
    isLocal: false, // isLocal?apiBase = 'static/api':apiBase = 'project/api/'+id
    url: 'http://fusion.dgene.com/api',
    api: {
      // http://fusion.dgene.com/admin/project/v2/11
      apiBase: '/v2/23',
      // apiBase: '/v2/11',
      file: '/file',
      scene: '/scene',
      fusion: '/fusion'
    },
    // loadType 模型贴图资源指向
    loadType: 'url',
    // 视频来源地址,请注意同源协议规范
    videoSource: 'src',
    // isDown 是否开启管理员隐藏 点击获取模块
    isDown: false,
    // 动画时间和融合时间
    animateDuringTime: 1000,
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

    this.view
      .goTo(
        {
          center: this.view.center,
          zoom: 16
        },
        {duration: 5000}
      )
      .then(() => {
        this.fusion_view.camFlyTo(
          {
            x: 0,
            y: 200,
            z: 45
          },
          1
        );
      });
  }
  public restoreDegeneFsion(params: any): Promise<IResult> {
    let _this = this;
    let pos = {
      x: 0,
      y: 300,
      z: 45
    };

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
    this.view.watch('zoom', (newValue: any, oldValue: any) => {
      if (newValue >= 16 && oldValue < newValue) {
        _this.showFusion();
      }
    });

    return new Promise((resolve, reject) => {
      _this.showDgeneFusion(params).then((e: IResult) => {
        resolve(e);
      });
    });
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
        setting
      );
    });
  }
  private hideFusion() {
    $('#DgeneFusion').fadeOut('slow');
    $('#divMap').fadeIn(1000);
  }
  private showFusion() {
    this.fusion_view.camFlyTo(
      {
        x: 0,
        y: 200,
        z: 45
      },
      1
    );
    setTimeout(() => {
      let pos = {
        x: 100,
        y: 50,
        z: 50
      };

      this.fusion_view.camFlyTo(pos, 5000);
      console.log(this.fusion_view.getCameraPosition());
    }, 200);
    $('#gisDiv').css({
      'background-color': '#003452'
    });
    $('#DgeneFusion').css({
      display: 'flex',
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      'z-index': '90',
      top: '0px',
      left: '0px'
    });
    $('#DgeneFusion').fadeIn('slow');

    $('#divMap').fadeOut(1000);
    let _this = this;
    this.fusion_control.addEventListener('change', (e: any) => {
      //console.log(_this.fusion_view.getCameraPosition());
      if (_this.fusion_view.getCameraY() > 300) {
        console.log('hide fu');
        _this.hideFusion();
      }
    });
  }
}

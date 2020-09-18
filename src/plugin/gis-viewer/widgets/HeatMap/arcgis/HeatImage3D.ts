import {loadModules} from 'esri-loader';
declare let THREE: any;
export default class HeatImage3D {
  private view: any;
  private static intances: Map<string, any>;
  private heatRender: any;
  private constructor(view: __esri.SceneView) {
    // Geometrical transformations that must be recomputed
    // from scratch at every frame.
    this.view = view;
  }
  public static getInstance(view: any) {
    let id = view.container.id;
    if (!HeatImage3D.intances) {
      HeatImage3D.intances = new Map();
    }
    let intance = HeatImage3D.intances.get(id);
    if (!intance) {
      intance = new HeatImage3D(view);
      HeatImage3D.intances.set(id, intance);
    }
    return intance;
  }
  public static destroy() {
    (HeatImage3D.intances as any) = null;
  }
  public async startup(param: {graphics: any[]; options: any}) {
    let that = this;
    loadModules(['esri/views/3d/externalRenderers']).then(
      ([externalRenderers]) => {
        if (that.heatRender) {
          externalRenderers.remove(this.view, this.heatRender);
          that.heatRender.clear();
          that.heatRender = null;
        }
        that.heatRender = new HeatImageRender(
          that.view,
          param.graphics,
          param.options
        );
        externalRenderers.add(this.view, this.heatRender);
      }
    );
  }
  public async clear() {
    let that = this;
    loadModules(['esri/views/3d/externalRenderers']).then(
      ([externalRenderers]) => {
        if (that.heatRender) {
          externalRenderers.remove(this.view, this.heatRender);
          that.heatRender.clear();
          that.heatRender = null;
        }
      }
    );
  }
}
class HeatImageRender {
  private aPosition = 0;
  private aOffset = 1;
  private camera: any; // js camera
  private scene: any; // js scene
  private ambient: any; // js ambient light source
  private sun: any; // js sun light source

  private renderer: any;

  public view: any;
  private heatmapInstance: any;
  private customLayer: any;
  private heat: any;
  private scale: number = 144447;
  private allImage: any;
  private heatData: any;
  private aClass: any;
  private pt = [121.43, 31.15];
  public constructor(view: __esri.SceneView, graphics: any[], options: any) {
    // Geometrical transformations that must be recomputed
    // from scratch at every frame.
    this.view = view;
  }

  // Called once a custom layer is added to the map.layers collection and this layer view is instantiated.
  public async setup(context: any) {
    this.aClass = await loadModules([
      'esri/geometry/Point',
      'esri/views/3d/externalRenderers',
      'esri/geometry/SpatialReference',
      'libs/heatmap.min.js'
    ]);

    this.renderer = new THREE.WebGLRenderer({
      context: context.gl,
      premultipliedAlpha: false
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setViewport(0, 0, this.view.width, this.view.height);

    this.renderer.autoClear = false;

    var originalSetRenderTarget = this.renderer.setRenderTarget.bind(
      this.renderer
    );
    this.renderer.setRenderTarget = (target: any) => {
      originalSetRenderTarget(target);
      if (target == null) {
        context.bindRenderTarget();
      }
    };

    this.scene = new THREE.Scene();
    // setup the camera
    this.camera = new THREE.PerspectiveCamera();

    // setup scene lighting
    this.ambient = new THREE.AmbientLight(0xffffff, 0.5);
    //this.scene.add(this.ambient);
    this.sun = new THREE.DirectionalLight(0xffffff, 0.5);
    //this.scene.add(this.sun);
    context.resetWebGLState();

    const [Point, externalRenderers, SpatialReference, h337] = this.aClass;
    let heatDiv = document.createElement('div');
    heatDiv.style.width = this.view.width + 'px';
    heatDiv.style.height = this.view.height + 'px';
    heatDiv.setAttribute('id', 'heatmapdiv');
    heatDiv.style.position = 'absolute';
    heatDiv.style.top = '0px';
    heatDiv.style.left = '0px';
    let parent = document.getElementsByClassName('esri-overlay-surface')[0];
    parent.appendChild(heatDiv);
    this.heat = heatDiv;

    let heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: heatDiv,
      radius: 23
    });
    let pdata = [];
    for (let i = 0; i < 400; i++) {
      var temp = Math.floor(Math.random() * 1000) % 2 == 0 ? 1 : -1;
      var temp2 = Math.floor(Math.random() * 1000) % 3 == 0 ? 1 : -1;
      var x1 = 1 + (1 * (Math.random() * 500 - 1)) / 1;
      var y1 = 1 + (1 * (Math.random() * 500 - 1)) / 1;
      var value = Math.floor(1000 * Math.random() + 1);
      pdata.push({
        x: Math.floor(x1),
        y: Math.floor(y1),
        value: value
      });
    }
    var data = {
      max: 1000,
      min: 0,
      data: pdata
    };
    let step = this.scale / this.view.scale;
    this.heatData = pdata;
    heatmapInstance.setData(data);
    this.heatmapInstance = heatmapInstance;
    heatDiv.style.display = 'none';
    let canvas = this.heat.firstChild;

    let mat = new THREE.MeshBasicMaterial({
      color: 0x1e90ff,
      transparent: true,
      opacity: 0.6
    });
    let model2 = new THREE.Mesh(new THREE.CircleGeometry(300, 64), mat);

    var texture = new THREE.CanvasTexture(canvas);
    var geometry = new THREE.PlaneGeometry(1000, 1000, 32);
    var material = new THREE.MeshBasicMaterial({
      map: texture, // 设置纹理贴图,
      transparent: true,
      depthTest: false
    });
    var model = new THREE.Mesh(geometry, material);

    let posEst = this.pt;

    posEst = [posEst[0], posEst[1], 300];

    let transform = new THREE.Matrix4();
    transform.fromArray(
      externalRenderers.renderCoordinateTransformAt(
        this.view,
        posEst,
        SpatialReference.WGS84,
        new Array(16)
      )
    );
    transform.decompose(model.position, model.quaternion, model.scale);

    this.scene.add(model);

    let image = new Image();
    image.src = 'http://localhost/gz.svg';
    image.width = 600;
    image.height = 600;
    image.onload = (e: any) => {
      this.allImage = image;
    };
  }

  // Called every time a frame is rendered.
  private async render(context: any) {
    var cam = context.camera;

    this.camera.position.set(cam.eye[0], cam.eye[1], cam.eye[2]);
    this.camera.up.set(cam.up[0], cam.up[1], cam.up[2]);
    this.camera.lookAt(
      new THREE.Vector3(cam.center[0], cam.center[1], cam.center[2])
    );

    // Projection matrix can be copied directly
    this.camera.projectionMatrix.fromArray(cam.projectionMatrix);

    this.view.environment.lighting.date = Date.now();

    var l = context.sunLight;
    this.sun.position.set(l.direction[0], l.direction[1], l.direction[2]);
    this.sun.intensity = l.diffuse.intensity;
    this.sun.color = new THREE.Color(
      l.diffuse.color[0],
      l.diffuse.color[1],
      l.diffuse.color[2]
    );

    this.ambient.intensity = l.ambient.intensity;
    this.ambient.color = new THREE.Color(
      l.ambient.color[0],
      l.ambient.color[1],
      l.ambient.color[2]
    );

    if (false) {
      let step = this.scale / this.view.scale;
      let point = new this.aClass[0]({
        x: this.pt[0],
        y: this.pt[1],
        spatialReference: new this.aClass[2]({wkid: 4326})
      });
      let pcc = this.view.toScreen(point);

      let xoffset = Math.min(pcc.x, 0);
      let yoffset = Math.min(pcc.y, 0);
      this.heat.innerHTML = '';
      let heatmapInstance = this.aClass[3].create({
        container: this.heat,
        radius: 23 * step
      });
      let pdata = this.heatData;
      let pdata2 = pdata.map((dt: any) => {
        return {
          x: Math.floor(dt.x * step + xoffset),
          y: Math.floor(dt.y * step + yoffset),
          value: dt.value
        };
      });

      var resdata = {
        max: 1000,
        min: 0,
        data: pdata2
      };
      heatmapInstance.setData(resdata);
      let canvas = this.heat.firstChild;
      let cts = canvas.getContext('2d');

      console.log(xoffset + ',' + yoffset);

      cts.globalCompositeOperation = 'destination-atop';
      cts.drawImage(this.allImage, xoffset, yoffset, 600 * step, 600 * step);
    }
    // draw the scene
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    this.renderer.resetGLState();
    this.renderer.render(this.scene, this.camera);
    // as we want to smoothly animate the ISS movement, immediately request a re-render
    this.aClass[1].requestRender(this.view);
    // cleanup
    context.resetWebGLState();
    //renderParameters.resetWebGLState();
  }
  // Called internally from render().
  public async clear() {}
}

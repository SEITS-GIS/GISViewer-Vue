export let GdConfig = {
  arcgis_api:
    'https://webapi.amap.com/maps?v=1.4.15&key=29dd04daa39aa33a7e2cdffa37ebec4d',
  theme: 'custom', //dark,vec
  baseLayers: [{type: 'traffic', label: '路况', visible: false}],
  options: {
    center: [121.441, 31.159],
    zoom: 13
    //viewMode: '3D'
    //mapStyle: 'amap://styles/darkblue' //设置地图的显示样式
  }
};

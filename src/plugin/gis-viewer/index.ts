import GisViewer from './MapContainer.vue';
export default GisViewer;
(window as any).dojoConfig = {
  async: true,
  tlmSiblingOfDojo: false,
  packages: [
    {
      name: 'libs',
      location: location.protocol + '//' + location.host + '/libs/'
    }
  ],
  has: {
    'esri-promise-compatibility': 1
  }
};

import MapLoader from './MapLoader';

export default class Game {
  constructor() {
    this.mapLoader = new MapLoader();
    this.initialize();
  }

  initialize() {
    this.loadMap('femine.json');
  }
  /**
   * @param {string} filepath
   */
  loadMap(filepath) {
    this.map = this.mapLoader.loadMap(filepath);
  }
}
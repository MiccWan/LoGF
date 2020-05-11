import GameMap from 'logf-common/core/data/map/GameMap';
import mapLoader from '../mapLoader';

export default class Game {
  constructor() {    
    this.init();
  }

  init() {
    this.map = this.loadMap('logf');
  }

  /**
   * @param {string} folderName
   * @return {GameMap}
   */
  loadMap(folderName) {
    const mapData = mapLoader.loadMap(folderName);
    return new GameMap(mapData);
  }
}
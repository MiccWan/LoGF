import GameMap from 'logf-common/core/data/map/GameMap';
import mapLoader from '../mapLoader';

export default class Game {
  constructor() {    
    this.init();
  }

  init() {
    this.map = this._buildMap('logf');
  }

  /**
   * @param {string} mapName
   * @return {GameMap}
   */
  _buildMap(mapName) {
    const mapData = mapLoader.loadMap(mapName);
    return new GameMap(mapData);
  }
}
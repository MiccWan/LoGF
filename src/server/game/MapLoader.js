import fs from 'fs';
import path from 'path';
//import Node from 'logf-common/core/data/Map/Node';
//import Edge from 'logf-common/core/data/Map/Edge';
//import Nodes from 'logf-common/core/data/Map/Nodes';
//import Edges from 'logf-common/core/data/Map/Edges';
import GameMap from 'logf-common/core/data/map/GameMap';

const mapsFolderPath = path.join(__dirname, '../src/server/custom/maps');
export default class MapLoader {
  // ###########################################################################
  //  public
  // ###########################################################################

  /**
   * @param {string} filePath
   * @return {GameMap}
   */
  loadMap(filePath) {
    return this._buildMap(filePath);
  }

  // ###########################################################################
  //  private
  // ###########################################################################

  /**
   * @param {string} folderName 
   * @return {GameMap}
   */
  _buildMap(folderName) {
    const folderPath = path.join(mapsFolderPath, folderName);
    const mapData = this._loadMapFolder(folderPath);
    const gameMap = new GameMap(mapData);
    return gameMap;
  }

  _loadMapFolder(folderPath) {
    const mapData = {};
    mapData.node = this._readJSON(folderPath, 'node.json');
    mapData.edge = this._readJSON(folderPath, 'edge.json');
    mapData.token = this._readJSON(folderPath, 'token.json');
    mapData.mob = this._readJSON(folderPath, 'mob.json');
    return mapData;
  }

  _readJSON(...args) {
    try {
      const filePath = path.join(...args);
      const data = fs.readFileSync(filePath);
      return JSON.parse(data.toString('utf-8'));
    }
    catch (err) {
      console.error(err);
      debugger;
      throw err;
    }
  }

}
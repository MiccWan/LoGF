import fs from 'fs';
import path from 'path';
import GameMap from 'logf-common/core/data/map/GameMap';

const mapsFolderPath = path.join(__dirname, '../src/server/custom/maps');

export default class MapLoader {
  // ###########################################################################
  //  public
  // ###########################################################################

  /**
   * @param {string} folderName
   * @return {GameMap}
   */
  loadMap(folderName) {
    const folderPath = path.join(mapsFolderPath, folderName);
    const mapData = this._buildMapData(folderPath);
    return mapData;
  }

  // ###########################################################################
  //  private
  // ###########################################################################

  _buildMapData(folderPath) {
    const mapData = {};
    mapData.node = this._readJSON(folderPath, 'node.json');
    mapData.edge = this._readJSON(folderPath, 'edge.json');
    mapData.token = this._readJSON(folderPath, 'token.json');
    mapData.mob = this._readJSON(folderPath, 'mob.json');
    return mapData;
  }

  _readJSON(...args) {
    const filePath = path.join(...args);
    try {
      const data = fs.readFileSync(filePath);
      return JSON.parse(data.toString('utf-8'));
    }
    catch (err) {
      console.error(`Error reading file ${filePath}`);
      throw err;
    }
  }
}
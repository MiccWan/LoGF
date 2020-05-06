import fs from 'fs';
import path from 'path';
import Node from 'logf-common/core/data/Map/Node';
import Edge from 'logf-common/core/data/Map/Edge';
import Nodes from 'logf-common/core/data/Map/Nodes';
import Edges from 'logf-common/core/data/Map/Edges';
import GameMap from 'logf-common/core/data/Map/GameMap';
import TerrainType from 'logf-common/core/constant/TerrainType';

export default class MapLoader {
  // ###########################################################################
  //  public
  // ###########################################################################

  /**
   * @param {string} filePath
   * @return {GameMap}
   */
  loadMap(filePath) {
    return this._loadMap(filePath);
  }

  // ###########################################################################
  //  private
  // ###########################################################################
  
  /**
   * @param {string} filePath 
   * @return {GameMap}
   */
  _loadMap(filePath) {
    filePath = path.join(__dirname, '../src/server/custom/maps', filePath);
    let mapData = this._readJSON(filePath);
    const nodeArr = mapData.nodes.map((node) => {
      node.terrain = TerrainType.valueFrom(node.terrain);
      return new Node(node);
    });
    const edgeArr = mapData.edges.map((edge) => {
      return new Edge(edge);
    });
    // const nodes = new Nodes(nodeArr, edgeArr);
    // const edges = new Edges(edgeArr);
    // const gameMap = new GameMap(nodes, edges);
    const gameMap = new GameMap([], []);
    return gameMap;
  }

  _readJSON(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data.toString('utf-8'));
  }
}
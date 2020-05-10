import shuffle from 'lodash/shuffle';
import TerrainType from 'logf-common/core/constant/TerrainType';
import { makeToken } from 'logf-common/util/makeToken';
import TokenType from 'logf-common/core/constant/TokenType';
import Node from './Node';

export default class Nodes {
  constructor(mapData) {
    /** @type {Node[]} */
    this._all;

    this._buildNodes(mapData);
  }

  // ########################################
  //  public
  // ########################################

  /**
   * @param {string} id 
   * @return {Node}
   */
  getbyId(id) {
    return this.nodeById[id];
  }

  /**
   * @param {number} terrain 
   * @return {Node[]}
   */
  getbyTerrain(terrain) {
    return this.nodesByTerrain[terrain];
  }

  /**
   * @param {string} id
   * @return {Node[]} 
   */
  getNeighborById(id) {
    return this.neighbor[id];
  }

  // ########################################
  //  private
  // ########################################


  // ###########################################################################
  //  constructor
  // ###########################################################################

  _buildNodes(mapData) {
    //build token and shuffle
    const tokens = this._buildTokens(mapData);

    // build node
    this._all = mapData.node.map((nodeData) => {
      nodeData.terrain = TerrainType.valueFrom(nodeData.terrain);
      const node = new Node(nodeData);
      node.setToken(tokens[nodeData.terrain].pop());
      return node;
    });

    // add to reverse lookup
    this.nodesByTerrain = this._buildNodesByTerrain();
    this.nodeById = this._buildNodesById();
    this.neighbor = this._buildNeighbor(mapData.edge);
  }

  /**
   * @return {Node[][]}
   */
  _buildNodesByTerrain() {
    const nodesByTerrain = [];
    for (const node of this._all) {
      nodesByTerrain[node.terrain].push(node);
    }
    return nodesByTerrain;
  }

  /**
   * @return {Map}
   */
  _buildNodesById() {
    const nodesById = new Map();
    for (const node of this._all) {
      nodesById.set(node.id, node);
    }
    return nodesById;
  }

  /*_buildNodes(mapData) {
    const nodeArr = mapData.node.map((node) => {
      node.terrain = TerrainType.valueFrom(node.terrain);
      return new Node(node);
    });
    const edgeArr = mapData.edge.map((edge) => {
      return new Edge(edge);
    });
    
  }*/

  /**
   * @return {Map} 
   */
  _buildNeighbor(edges) {
    const neighborByNodeId = new Map();
    for (const edge of edges) {
      const neighbor1 = neighborByNodeId.get(edge.from) || [];
      neighbor1.push(this.getbyId(edge.to));
      neighborByNodeId.set(edge.from, neighbor1);

      const neighbor2 = neighborByNodeId.get(edge.to) || [];
      neighbor2.push(this.getbyId(edge.from));
      neighborByNodeId.set(edge.to, neighbor2);
    }
    return neighborByNodeId;
  }

  _buildTokens(mapData) {
    const tokenData = mapData.token;
    const tokens = {};
    console.log(Object.keys(tokenData));
    for (let terrainName of Object.keys(tokenData)) {
      const tokenArr = [];
      for (let [key, val] of Object.entries(tokenData[terrainName])) {
        if (key === 'mob') {
          for (let [mobName, amount] of Object.entries(val)) {
            for (let i = 0; i < amount; i++) {
              const mobProp = mapData.mob[mobName];
              tokenArr.push(makeToken('mob', mobProp));
            }
          }
        }
        else {
          for (let i = 0; i < val; i++) {
            tokenArr.push(makeToken(key));
          }
        }
      }
      const terrainType = TerrainType.valueFrom(terrainName);
      tokens[terrainType] = shuffle(tokenArr);
    }

    return tokens;
  }
}

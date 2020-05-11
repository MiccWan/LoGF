import shuffle from 'lodash/shuffle';
import TerrainType from 'logf-common/core/constant/TerrainType';
import { makeToken } from 'logf-common/util/makeToken';
import Node from './Node';

export default class Nodes {
  constructor(mapData) {
    this._nodesById = new Map();
    this._neighborById = {};
    this._nodesByTerrain = [];
    TerrainType.values.forEach(val => this._nodesByTerrain[val] = []);

    this._buildNodes(mapData);
  }

  // ###########################################################################
  //  public
  // ###########################################################################

  /**
   * @param {string} id 
   * @return {Node}
   */
  getbyId(id) {
    return this._nodesById.get(id);
  }

  /**
   * @param {number|string} terrain 
   * @return {Node[]}
   */
  getbyTerrain(terrain) {
    const terrainValue = TerrainType.valueFrom(terrain);
    return this._nodesByTerrain[terrainValue];
  }

  /**
   * @param {string} id
   * @return {Node[]} 
   */
  getNeighborById(id) {
    return this._neighborById(id);
  }

  // ###########################################################################
  //  private
  // ###########################################################################

  // ###########################################################################
  //  constructor
  // ###########################################################################

  _buildNodes(mapData) {
    // pre-build shuffled token array
    const tokens = this._buildTokens(mapData);

    // build node
    this._all = mapData.node.map((nodeData) => {
      nodeData.terrain = TerrainType.valueFrom(nodeData.terrain);
      const node = new Node(nodeData);

      // assign token for each node by default
      node.setToken(tokens[nodeData.terrain].pop());

      // add to reverse lookup
      this._nodesById.set(node.id, node);
      this._nodesByTerrain[node.terrain].push(node);
      this._neighborById[node.id] = [];

      return node;
    });

    this._buildNeighbor(mapData.edge);
  }


  _buildNeighbor(edges) {
    for (const edge of edges) {
      const { from, to } = edge;
      this._neighborById[from].push(this.getbyId(to));
      this._neighborById[to].push(this.getbyId(from));
    }
  }

  _buildTokens(mapData) {
    const tokenData = mapData.token;
    const tokens = {};
    for (let terrainName of Object.keys(tokenData)) {
      const tokenArr = [];
      for (let [tokenType, tokenAmount] of Object.entries(tokenData[terrainName])) {
        if (tokenType === 'mob') {
          for (let [mobName, mobAmount] of Object.entries(tokenAmount)) {
            for (let i = 0; i < mobAmount; i++) {
              const mobProp = mapData.mob[mobName];
              tokenArr.push(makeToken('mob', mobProp));
            }
          }
        }
        else {
          for (let i = 0; i < tokenAmount; i++) {
            tokenArr.push(makeToken(tokenType));
          }
        }
      }
      const terrainType = TerrainType.valueFrom(terrainName);
      tokens[terrainType] = shuffle(tokenArr);
    }

    return tokens;
  }
}

import TerrainType from 'logf-common/core/constant/TerrainType';
import Position from './Position';

export default class Node {
  /**
   * input be like {id:string, terrain:number, x:number, y:number}
   */
  constructor(nodeData) {
    /** @type {string} */
    this.id = nodeData.id;
    /** @type {number} */
    this.terrain = TerrainType.valueFrom(nodeData.terrain);
    /** @type {Position} */
    this.position = Position.fromObject(nodeData.position);
  }

  // ###########################################################################
  //  public
  // ###########################################################################
  
  setToken(token) {
    this.token = token;
  }
}

import Position from './Position';

export default class Node {
  /**
   * @param {{
   *  id: string,
   *  terrain: number,
   *  position: {
   *    x: number,
   *    y: number
   *  }
   * }} nodeData
   */
  constructor(nodeData) {
    this.id = nodeData.id;
    this.terrain = nodeData.terrain;
    this.position = Position.fromObject(nodeData.position);
  }

  // ###########################################################################
  //  public
  // ###########################################################################
  
  setToken(token) {
    this.token = token;
  }
}

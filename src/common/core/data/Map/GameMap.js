/**
 * @typedef {import('./Nodes').default} Nodes
 * @typedef {import('./Edges').default} Edges
 */
export default class GameMap {
  /**
   * @param {Nodes} nodes 
   * @param {Edges} edges 
   */
  constructor(nodes, edges) {
    this.nodes = nodes;
    this.edges = edges;
  }
}

/**
 * @typedef {import('./Node.js').default} Node
 * @typedef {import('./Edge.js').default} Edge 
 */
export default class Nodes {
  /**
   * node array to Nodes
   * @param {Node[]} nodes 
   * @param {Edge[]} edges
   */
  constructor(nodes, edges) {
    this.nodes = nodes;
    this.nodesByTerrain = this._buildNodesByTerrain(nodes);
    this.nodeById = this._buildNodesById(nodes);
    this.neighbor = this._buildNeighbor(edges);
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
  getNodeById(id) {
    return this.neighbor[id];
  }

  // ########################################
  //  private
  // ########################################
  
  /**
   * @param {Node[]} nodes 
   * @return {Node[][]}
   */
  _buildNodesByTerrain(nodes) {
    const nodesByTerrain = [];
    for (const node of nodes) {
      nodesByTerrain[node.terrain].push(node);
    }
    return nodesByTerrain;
  }

  /**
   * @param {Node[]} nodes 
   * @return {Map}
   */
  _buildNodesById(nodes) {
    const nodesById = new Map();
    for (const node of nodes) {
      nodesById.set(node.id, node);
    }
    return nodesById;
  }

  /**
   * @param {Edge[]} edges
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
}

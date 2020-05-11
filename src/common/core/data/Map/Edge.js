export default class Edge {
  /**
   * @param {{from: string, to: string}} edgeData
   */
  constructor(edgeData) {
    this.from = edgeData.from;
    this.to = edgeData.to;
  }
}

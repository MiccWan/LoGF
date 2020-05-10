
export default class Edge {
  /**
   * input be like {from:string, to:string}
   */
  constructor(edgeData) {
    /** @type {string}  */
    this.from = edgeData.from;
    /** @type {string}  */
    this.to = edgeData.to;
  }
}

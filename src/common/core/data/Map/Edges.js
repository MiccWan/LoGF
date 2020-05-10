import Edge from './Edge';

export default class Edges {
  constructor(mapData) {
    this._all = mapData.edge.map((edgeData) => {
      return new Edge(edgeData);
    });
  }

  // ########################################
  //  public
  // ########################################
  

  // ########################################
  //  private
  // ########################################
}

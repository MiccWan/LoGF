import Nodes from './Nodes';
import Edges from './Edges';

export default class GameMap {
  constructor(mapData) {
    this.nodes = new Nodes(mapData);
    this.edges = new Edges(mapData);
  }
}

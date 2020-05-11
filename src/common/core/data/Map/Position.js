export default class Position {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {{ x:number, y:number }} obj
   */
  static fromObject(obj) {
    return new Position(obj.x, obj.y);
  }
}

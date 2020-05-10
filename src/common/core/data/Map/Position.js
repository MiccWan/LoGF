export default class Position {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    /** @type {number} */
    this.x = x;
    /** @type {number} */
    this.y = y;
  }

  static fromObject(obj) {
    return new Position(obj.x, obj.y);
  }
}

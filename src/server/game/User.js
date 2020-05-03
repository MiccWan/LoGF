export default class User {
  constructor(socket) {
    this._socket = socket;
    this.init();
  }

  /**
   * @param {string} name 
   */
  init(name = 'Uknown player') {
    this._name = name;
  }
}
/**
 * @typedef {import('./User.js').default} User
 */

export default class Room {
  constructor() {
    this._players = [];
  }

  /**
   * @param {User} user
   */
  userJoin(user) {
    this._players.push(user);
  }
}
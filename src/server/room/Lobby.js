/**
 * @typedef {import('../game/User.js').default} User
 */

export default class Lobby {
  constructor() {
    this._users = [];
  }

  /**
   * @param {User} user
   */
  userJoin(user) {
    this._users.push(user);
  }
}
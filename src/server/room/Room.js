/**
 * @typedef {import('../game/User.js').default} User
 */
import Game from '../game/Game';

export default class Room {
  constructor(id) {
    this.roomId = id;
    this._users = [];
    this.game = new Game();
  }

  /**
   * @param {User} user
   */
  userJoin(user) {
    this._users.push(user);
  }
}
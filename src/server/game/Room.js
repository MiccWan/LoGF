/**
 * @typedef {import('./User.js').default} User
 */
import Game from './Game';

export default class Room {
  constructor() {
    this._players = [];
    this.game = new Game();
  }

  /**
   * @param {User} user
   */
  userJoin(user) {
    this._players.push(user);
  }
}
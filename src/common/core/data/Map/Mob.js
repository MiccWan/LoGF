export default class Mob {
  constructor(mobData) {
    /** @type {string} */
    this.name = mobData.name;
    /** @type {string} */
    this.displayName = mobData.displayName;
    /** @type {number} */
    this.hp = mobData.hp;
    /** @type {number} */
    this.attack = mobData.attack;
    /** @type {number} */
    this.defense = mobData.defense;
  }
}

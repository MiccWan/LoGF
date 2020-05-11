export default class Mob {
  /**
   * @param {{
   *  name: string,
   *  displayName: string,
   *  hp: number,
   *  attack: number,
   *  defense: number
   * }} mobData
   */
  constructor(mobData) {
    this.name = mobData.name;
    this.displayName = mobData.displayName;
    this.hp = mobData.hp;
    this.attack = mobData.attack;
    this.defense = mobData.defense;
  }
}

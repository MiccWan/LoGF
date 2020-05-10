export default class PlayerStatus {
  constructor() {
    this.hp = 20;
    this.maxHp = 20;
    this.action = 10;
    this.saturation = 10;
    this.oxygen = 10;
    this.capacity = 10;
    this.attack = 2;
    this.defense = 0;
    this.potential = 0;
    this._isMoved = false;
    this._isDead = false;
    this.deathProtect = 0;
  }
}
import PlayerResource from "./PlayerResource";
import PlayerStatus from "./PlayerStatus";
import PlayerAbility from "./PlayerAbility";

export default class Player {
  /**
   * @param {string} name 
   * @param {string} location 
   */
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.spawnPoint = [location];

    this.resource = new PlayerResource();
    this.status = new PlayerStatus();
    this.ability = new PlayerAbility();
  }

  // ###########################################################################
  //  public
  // ###########################################################################

  isDead() {
    return this.status._isDead;
  }
  
  // ###########################################################################
  //  private
  // ###########################################################################
}

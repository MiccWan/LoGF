import Token from './Token';
import Mob from '../Mob';

export default class MobToken extends Token {
  constructor(mobData) {
    super();
    this.mob = new Mob(mobData);
  }
  handleTrigger() {
    
  }
}

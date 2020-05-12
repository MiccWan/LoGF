import Room from './Room';
import Lobby from './Lobby';

class AllRooms {
  constructor() {
    this._all = [];
    this.lobby = new Lobby();
  }

  getById(id) {
    return this._all[id];
  }

  addRoom() {
    const newRoom = new Room(this._all.length);
    this._all.push(newRoom);
  }

  removeRoom(id) {
    this._all[id] = null;
  }
}

const allRooms = new AllRooms();

export default allRooms;
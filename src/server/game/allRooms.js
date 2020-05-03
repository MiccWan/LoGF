import Room from './Room';

class AllRooms {
  constructor() {
    this._all = [];
  }

  getById(id) {
    return this._all[id];
  }

  addRoom() {
    const newRoom = new Room();
    this._all.push(newRoom);
  }
}

const allRooms = new AllRooms();

export default allRooms;
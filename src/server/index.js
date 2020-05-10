import { initExpress } from './www';
import { initSocket } from './socket';
import { initRooms } from './game';

function activate() {
  const app = initExpress();
  initSocket(app);
  initRooms();
}

activate();
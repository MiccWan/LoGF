import { initExpress } from './www';
import { initSocket } from './socket';
import { initRooms } from './room';

function activate() {
  initRooms();
  const app = initExpress();
  initSocket(app);
}

try {
  activate();
}
catch (err) {
  debugger;
  throw err;
}
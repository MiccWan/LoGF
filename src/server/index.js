import { initExpress } from './www';
import { initSocket } from './socket';

function activate() {
  const app = initExpress();
  initSocket(app);
}

activate();
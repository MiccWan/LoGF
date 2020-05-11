import './resources';
import Player from 'logf-common/core/data/player/Player';
import GameMap from 'logf-common/core/data/map/GameMap';
import server from './socket';

async function activate() {
  const map = new GameMap(await server.getMap('logf'));

  console.log(map);

  const micc = new Player('Michael', 'd01');

  console.log(micc);

  alert('[Client] Hello world!');
}

activate();
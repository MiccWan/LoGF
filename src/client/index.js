import ioClient from 'socket.io-client';
import Player from 'logf-common/core/data/player/Player';


const micc = new Player('Michael', 'd01');

console.log(micc);

let io = ioClient();

alert('[Client] Hello world!');
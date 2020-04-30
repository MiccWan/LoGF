import SocketIO from 'socket.io';
import { allRooms } from '../game/allRooms';
import User from '../game/User';

export function initSocket(server) {
  const io = new SocketIO(server, {
    // `socket.io` serves the client files at '/socket.io/socket.io.js' by default, which throw an error
    // we dont need it to be serve here since we bundle 'socket.io-client' at the client side
    // see: https://stackoverflow.com/a/52095879/13438825
    serveClient: false
  });

  io.on('connection', (socket) => {
    const newUser = new User(socket);

    console.log('On user connect.');

    socket.on('addRoom', () => {
      allRooms.addRoom();
    });
  });
}
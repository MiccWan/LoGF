import SocketIO from 'socket.io';
import allRooms from '../room/allRooms';
import User from '../game/User';
import mapLoader from '../mapLoader';

export function initSocket(server) {
  const io = new SocketIO(server, {
    // `socket.io` serves the client files at '/socket.io/socket.io.js' by default, which throw an error
    // we dont need it to be serve here since we bundle 'socket.io-client' at the client side
    // see: https://stackoverflow.com/a/52095879/13438825
    serveClient: false
  });

  const sharedData = {
    map(mapName) {
      return mapLoader.loadMap(mapName);
    }
  };

  io.on('connection', (socket) => {
    const newUser = new User(socket);
    allRooms.lobby.userJoin(newUser);

    socket.on('getRequest', (dataName, props) => {
      if (!sharedData[dataName]) {
        socket.emit(`getResponse.${dataName}`, null);
      }
      else {
        const data = sharedData[dataName](props);
        socket.emit(`getResponse.${dataName}`, data);
      }
    });
  });
}
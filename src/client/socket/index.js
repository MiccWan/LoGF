import ioClient from 'socket.io-client';
import Server from './Server';

let io = ioClient();

const server = new Server(io);

export default server;
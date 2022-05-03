import { createServer } from 'http';
import { Server } from 'socket.io';

import { app } from '../http/app';
import { events } from './events';

const server = createServer(app);
const io = new Server(server);

io.on('connection', events);

export { io, server };

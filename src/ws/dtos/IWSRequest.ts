import { Server, Socket } from 'socket.io';

export interface IWSRequest {
  socket: Socket;
  params: {
    [key: string]: string | number | boolean;
  };
}

import { RemoteSocket, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import { io } from '../../../../infra/websocket/socket';
import { IEmitDTO } from '../dtos/IEmitDTO';
import { IServerProvider, IClientProvider } from '../IWebSocketProvider';

namespace SocketIoProvider {
  export class SocketIoServerProvider implements IServerProvider {
    async getClientById(socketId: string): Promise<IClientProvider | null> {
      const sockets = await io.in(socketId).fetchSockets();
      const socket = sockets.find((socket) => socket.id === socketId);

      if (!socket) return null;

      return new SocketIoClientProvider(socket);
    }

    emit({ trigger, data, room }: IEmitDTO): void {
      const remoteIo = io;

      if (room) remoteIo.to(room).emit(trigger, data);
      else remoteIo.emit(trigger, data);
    }
  }

  class SocketIoClientProvider implements IClientProvider {
    readonly socket: Socket | RemoteSocket<DefaultEventsMap, any>;

    constructor(socket: RemoteSocket<DefaultEventsMap, any>) {
      this.socket = socket;
    }

    join(room: string): void {
      this.socket.join(room);
    }
  }
}

export { SocketIoProvider };

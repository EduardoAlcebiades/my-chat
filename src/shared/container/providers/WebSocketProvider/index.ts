import { container } from 'tsyringe';

import { SocketIoProvider } from './implementations/SocketIoProvider';
import { IServerProvider } from './IWebSocketProvider';

container.registerSingleton<IServerProvider>(
  'WebSocketProvider',
  SocketIoProvider.SocketIoServerProvider
);

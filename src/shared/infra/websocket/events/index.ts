import { Socket } from 'socket.io';

import { OnDisconnectWSController } from '../../../../ws/controllers/OnDisconnectWSController';
import { OnMessageSentWSController } from '../../../../ws/controllers/OnMessageSentWSController';

const onDisconnectWSController = new OnDisconnectWSController();
const onMessageSentWSController = new OnMessageSentWSController();

const events = (socket: Socket): void => {
  socket.on('message_sent', (message) => {
    onMessageSentWSController.handle({
      socket,
      params: { message },
    });
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);

    onDisconnectWSController.handle({ socket, params: {} });
  });
};

export { events };

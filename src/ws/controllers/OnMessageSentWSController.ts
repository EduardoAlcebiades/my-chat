import { container } from 'tsyringe';

import { FindRoomBySocketIdService } from '../../modules/rooms/useCases/findRoom/FindRoomBySocketIdService';
import { IWSRequest } from '../dtos/IWSRequest';

class OnMessageSentWSController {
  async handle(request: IWSRequest): Promise<void> {
    const { message } = request.params;

    const findRoomBySocketIdService = container.resolve(
      FindRoomBySocketIdService
    );
    const room = await findRoomBySocketIdService.execute(request.socket.id);

    const nickname = room.participants.find(
      (participant) => participant.socketId === request.socket.id
    )?.nickname;

    if (nickname)
      request.socket.nsp
        .to(room.code.toString())
        .emit('message_sent', { nickname, message });
  }
}

export { OnMessageSentWSController };

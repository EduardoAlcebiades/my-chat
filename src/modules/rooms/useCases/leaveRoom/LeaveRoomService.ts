import { inject, injectable } from 'tsyringe';
import { IServerProvider } from '../../../../shared/container/providers/WebSocketProvider/IWebSocketProvider';

import { RoomNotFoundError } from '../../errors/RoomNotFoundError';
import { IRoomsRepository } from '../../repositories/IRoomsRepository';

@injectable()
class LeaveRoomService {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
    @inject('WebSocketProvider')
    private webSocketProvider: IServerProvider
  ) {}

  async execute(socketId: string) {
    const room = await this.roomsRepository.findBySocketId(socketId);

    if (!room) throw new RoomNotFoundError();

    const participant = room.participants.find(
      (participant) => participant.socketId === socketId
    );

    await this.roomsRepository.leaveRoom({ roomCode: room.code, socketId });

    this.webSocketProvider.emit({
      trigger: 'leave',
      data: participant,
      room: room.code.toString(),
    });

    return room;
  }
}

export { LeaveRoomService };

import { inject, injectable } from 'tsyringe';

import { IJoinRoomDTO } from '../../dtos/IJoinRoomDTO';
import { JoinRoomErrors } from '../../errors/JoinRoomErrors';
import { RoomNotFoundError } from '../../errors/RoomNotFoundError';
import { SocketNotConnectedError } from '../../errors/SocketNotConnectedError';
import { IRoomsRepository } from '../../repositories/IRoomsRepository';
import { compare } from '../../../../config/encrypt';
import { IServerProvider } from '../../../../shared/container/providers/WebSocketProvider/IWebSocketProvider';

@injectable()
class JoinRoomService {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
    @inject('WebSocketProvider')
    private webSocketProvider: IServerProvider
  ) {}

  async execute({ nickname, socketId, roomCode, password }: IJoinRoomDTO) {
    const client = await this.webSocketProvider.getClientById(socketId);

    if (!client) throw new SocketNotConnectedError();

    const roomBySocketId = await this.roomsRepository.findBySocketId(socketId);

    if (roomBySocketId) throw new JoinRoomErrors.SocketIdAlreadyInRoom();

    const room = await this.roomsRepository.findByCode(roomCode);

    if (!room) throw new RoomNotFoundError();

    if (room.participants.length >= room.maxParticipants)
      throw new JoinRoomErrors.ExceededParticipantLimitError();

    if (room.password && !compare(password || '', room.password))
      throw new JoinRoomErrors.InvalidPassword();

    const nicknameAlreadyInRoom = room.participants.some(
      (participant) => participant.nickname === nickname
    );

    if (nicknameAlreadyInRoom)
      throw new JoinRoomErrors.NicknameAlreadyInRoomError();

    await this.roomsRepository.joinRoom({
      nickname,
      socketId,
      roomCode,
    });

    client?.join(roomCode.toString());

    this.webSocketProvider.emit({
      trigger: 'join',
      data: { socketId, nickname },
      room: roomCode.toString(),
    });

    return room;
  }
}

export { JoinRoomService };

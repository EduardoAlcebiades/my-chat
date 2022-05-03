import { Room } from '../../../../shared/infra/mongodb/models/Room';
import { IRoomDocument } from '../../../../shared/infra/mongodb/schemas/RoomSchema';
import { ICreateRoomDTO } from '../../dtos/ICreateRoomDTO';
import { IJoinRoomDTO } from '../../dtos/IJoinRoomDTO';
import { ILeaveRoom } from '../../dtos/ILeaveRoom';
import { IRoomsRepository } from '../IRoomsRepository';

class RoomsRepository implements IRoomsRepository {
  async findBySocketId(socketId: string): Promise<IRoomDocument | null> {
    const room = await Room.findOne({ 'participants.socketId': socketId });

    return room;
  }

  async findByCode(code: number): Promise<IRoomDocument | null> {
    const room = await Room.findOne({ code });

    return room;
  }

  async getLatestRoomCode(): Promise<number> {
    const rooms = await Room.aggregate([
      { $sort: { code: -1 } },
      { $limit: 1 },
      { $project: { code: 1 } },
    ]).exec();

    const room = rooms[0] || {};

    return room.code || null;
  }

  async create({
    name,
    password,
    maxParticipants,
    code,
  }: ICreateRoomDTO): Promise<IRoomDocument> {
    const room = await Room.create({
      name,
      password,
      maxParticipants,
      code,
    });

    return room;
  }

  async joinRoom({
    nickname,
    roomCode,
    socketId,
  }: IJoinRoomDTO): Promise<IRoomDocument | null> {
    const room = await Room.findOneAndUpdate(
      {
        code: roomCode,
        'participants.socketId': { $ne: socketId },
        'participants.nickname': { $ne: nickname },
      },
      { $push: { participants: { nickname, socketId } } }
    );

    return room;
  }

  async leaveRoom({
    roomCode,
    socketId,
  }: ILeaveRoom): Promise<IRoomDocument | null> {
    const room = await Room.findOneAndUpdate(
      { code: roomCode },
      { $pull: { participants: { socketId } } }
    );

    return room;
  }
}

export { RoomsRepository };

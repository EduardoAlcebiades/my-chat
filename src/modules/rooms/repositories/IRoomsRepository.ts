import { IRoomDocument } from '../../../shared/infra/mongodb/schemas/RoomSchema';
import { ICreateRoomDTO } from '../dtos/ICreateRoomDTO';
import { IJoinRoomDTO } from '../dtos/IJoinRoomDTO';
import { ILeaveRoom } from '../dtos/ILeaveRoom';

export interface IRoomsRepository {
  findByCode(code: number): Promise<IRoomDocument | null>;
  findBySocketId(socketId: string): Promise<IRoomDocument | null>;
  create(data: ICreateRoomDTO): Promise<IRoomDocument>;
  getLatestRoomCode(): Promise<number>;
  joinRoom(data: IJoinRoomDTO): Promise<IRoomDocument | null>;
  leaveRoom(data: ILeaveRoom): Promise<IRoomDocument | null>;
}

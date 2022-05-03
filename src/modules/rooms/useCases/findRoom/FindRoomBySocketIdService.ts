import { inject, injectable } from 'tsyringe';

import { IRoomDocument } from '../../../../shared/infra/mongodb/schemas/RoomSchema';
import { RoomNotFoundError } from '../../errors/RoomNotFoundError';
import { IRoomsRepository } from '../../repositories/IRoomsRepository';

@injectable()
class FindRoomBySocketIdService {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository
  ) {}

  async execute(socketId: string): Promise<IRoomDocument> {
    const room = await this.roomsRepository.findBySocketId(socketId);

    if (!room) throw new RoomNotFoundError();

    return room;
  }
}

export { FindRoomBySocketIdService };

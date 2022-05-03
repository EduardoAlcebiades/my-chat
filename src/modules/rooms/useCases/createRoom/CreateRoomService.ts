import { inject, injectable } from 'tsyringe';

import { CreateRoomErros } from '../../errors/CreateRoomErros';
import { IRoomDocument } from '../../../../shared/infra/mongodb/schemas/RoomSchema';
import { IRoomsRepository } from '../../repositories/IRoomsRepository';
import { hash } from '../../../../config/encrypt';

interface IRequest {
  name: string;
  password?: string;
  maxParticipants: number;
}

@injectable()
class CreateRoomService {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository
  ) {}

  async execute({
    name,
    password,
    maxParticipants,
  }: IRequest): Promise<IRoomDocument> {
    const minRoomName = Number(process.env.MIN_ROOM_NAME);
    const minMaxParticipants = Number(process.env.MIN_ROOM_MAX_PARTICIPANTS);
    const minRoomCode = Number(process.env.MIN_ROOM_CODE);

    if (name.length < minRoomName)
      throw new CreateRoomErros.MinLenghtNameError();

    if (maxParticipants < minMaxParticipants)
      throw new CreateRoomErros.MinLenghtMaxParticipants();

    if (password?.trim()) password = hash(password);

    const latestRoomCode = await this.roomsRepository.getLatestRoomCode();
    const code = !latestRoomCode ? minRoomCode : latestRoomCode + 1;

    const room = await this.roomsRepository.create({
      name,
      password,
      maxParticipants,
      code,
    });

    return room;
  }
}

export { CreateRoomService };

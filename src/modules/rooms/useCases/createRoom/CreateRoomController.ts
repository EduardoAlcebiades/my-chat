import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseNumber, parseString } from '../../../../utils/DataTypeParser';

import { CreateRoomService } from './CreateRoomService';

class CreateRoomController {
  async handle(request: Request, response: Response) {
    const { name, password, maxParticipants } = request.body;

    const createRoomService = container.resolve(CreateRoomService);

    const room = await createRoomService.execute({
      name: parseString(name, () => ''),
      password: parseString(password, () => undefined),
      maxParticipants: parseNumber(maxParticipants, () => 0),
    });

    return response.status(201).json(room);
  }
}

export { CreateRoomController };

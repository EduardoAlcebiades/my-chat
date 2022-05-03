import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { parseNumber, parseString } from '../../../../utils/DataTypeParser';
import { JoinRoomService } from './JoinRoomService';

class JoinRoomController {
  async handle(request: Request, response: Response) {
    const { code, socketId } = request.params;
    const { nickname, password } = request.body;

    const joinRoomService = container.resolve(JoinRoomService);

    const room = await joinRoomService.execute({
      nickname: parseString(nickname, () => ''),
      socketId: parseString(socketId, () => ''),
      roomCode: parseNumber(code, () => 0),
      password: parseString(password, () => undefined),
    });

    return response.status(201).json(room);
  }
}

export { JoinRoomController };

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseString } from '../../../../utils/DataTypeParser';

import { FindRoomBySocketIdService } from './FindRoomBySocketIdService';

class FindRoomBySocketIdController {
  async handle(request: Request, response: Response) {
    const { socketId } = request.params;

    const findRoomService = container.resolve(FindRoomBySocketIdService);
    const room = await findRoomService.execute(parseString(socketId, () => ''));

    return response.json(room);
  }
}

export { FindRoomBySocketIdController };

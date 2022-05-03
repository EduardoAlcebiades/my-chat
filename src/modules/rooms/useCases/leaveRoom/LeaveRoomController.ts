import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { LeaveRoomService } from './LeaveRoomService';

class LeaveRoomController {
  async handle(request: Request, response: Response) {
    const { socketId } = request.params;

    const leaveRoomService = container.resolve(LeaveRoomService);

    const room = await leaveRoomService.execute(socketId);

    return response.json(room);
  }
}

export { LeaveRoomController };

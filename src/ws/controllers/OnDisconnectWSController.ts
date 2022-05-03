import { container } from 'tsyringe';

import { LeaveRoomService } from '../../modules/rooms/useCases/leaveRoom/LeaveRoomService';
import { IWSRequest } from '../dtos/IWSRequest';

class OnDisconnectWSController {
  async handle(params: IWSRequest): Promise<void> {
    const leaveRoomService = container.resolve(LeaveRoomService);

    await leaveRoomService.execute(params.socket.id);
  }
}

export { OnDisconnectWSController };

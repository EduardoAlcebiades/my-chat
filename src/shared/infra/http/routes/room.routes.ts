import { Router } from 'express';

import { CreateRoomController } from '../../../../modules/rooms/useCases/createRoom/CreateRoomController';
import { FindRoomBySocketIdController } from '../../../../modules/rooms/useCases/findRoom/FindRoomBySocketIdController';
import { JoinRoomController } from '../../../../modules/rooms/useCases/joinRoom/JoinRoomController';
import { LeaveRoomController } from '../../../../modules/rooms/useCases/leaveRoom/LeaveRoomController';

const roomRoutes = Router();

const createRoomController = new CreateRoomController();
const joinRoomController = new JoinRoomController();
const leaveRoomController = new LeaveRoomController();
const findRoomBySocketIdController = new FindRoomBySocketIdController();

roomRoutes.post('/', createRoomController.handle);
roomRoutes.get('/bySocket/:socketId', findRoomBySocketIdController.handle);
roomRoutes.patch('/:code/join/:socketId', joinRoomController.handle);
roomRoutes.patch('/leave/:socketId', leaveRoomController.handle);

export { roomRoutes };

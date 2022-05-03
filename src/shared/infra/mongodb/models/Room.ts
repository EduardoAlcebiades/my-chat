import mongoose from 'mongoose';

import { IRoomDocument, RoomSchema } from '../schemas/RoomSchema';

const roomModelName = 'rooms';

const Room = mongoose.model<IRoomDocument>(roomModelName, RoomSchema);

export { Room, roomModelName };

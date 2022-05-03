import { Document, Schema } from 'mongoose';

interface IRoomDocument extends Document {
  code: number;
  name: string;
  password?: string;
  maxParticipants: number;
  participants: Array<{
    socketId: string;
    nickname: string;
  }>;
  createdAt: Date;
}

const RoomSchema = new Schema({
  code: {
    type: Number,
    required: true,
    unique: true,
    default: 10000,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: String,
  maxParticipants: {
    type: Number,
    required: true,
  },
  participants: {
    type: [
      {
        socketId: {
          type: String,
          required: true,
        },
        nickname: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

RoomSchema.index({ code: 1 });
RoomSchema.index({ 'participants.socketId': 1 });

export { RoomSchema, IRoomDocument };

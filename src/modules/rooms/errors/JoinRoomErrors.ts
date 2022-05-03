import { AppError } from '../../../shared/errors/AppError';

namespace JoinRoomErrors {
  export class SocketIdAlreadyInRoom extends AppError {
    constructor() {
      super({
        message: 'The specified socket is already in a room',
        statusCode: 409,
      });
    }
  }

  export class NicknameAlreadyInRoomError extends AppError {
    constructor() {
      super({
        message: 'The specified nickname is already in the room',
        statusCode: 409,
      });
    }
  }

  export class ExceededParticipantLimitError extends AppError {
    constructor() {
      super({
        message: 'Exceeded participant limit',
        statusCode: 403,
      });
    }
  }

  export class InvalidPassword extends AppError {
    constructor() {
      super({
        message: 'Invalid room password',
        statusCode: 401,
      });
    }
  }
}

export { JoinRoomErrors };

import { AppError } from '../../../shared/errors/AppError';

namespace CreateRoomErros {
  export class MinLenghtNameError extends AppError {
    constructor() {
      super({
        message: 'The room name must be at least 3 characters long',
        statusCode: 406,
      });
    }
  }

  export class MinLenghtMaxParticipants extends AppError {
    constructor() {
      super({
        message: 'The maximum number of participants must be at least 5',
        statusCode: 406,
      });
    }
  }
}

export { CreateRoomErros };

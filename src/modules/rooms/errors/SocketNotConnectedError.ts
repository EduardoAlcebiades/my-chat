import { AppError } from '../../../shared/errors/AppError';

class SocketNotConnectedError extends AppError {
  constructor() {
    super({
      message: 'The specified socket is not connected',
      statusCode: 406,
    });
  }
}

export { SocketNotConnectedError };

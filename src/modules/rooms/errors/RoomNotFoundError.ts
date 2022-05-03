import { AppError } from '../../../shared/errors/AppError';

class RoomNotFoundError extends AppError {
  constructor() {
    super({ message: 'The specified room was not found', statusCode: 404 });
  }
}

export { RoomNotFoundError };

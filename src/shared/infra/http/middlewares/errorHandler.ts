import { NextFunction, Request, Response } from 'express';

import { AppError } from '../../../errors/AppError';

export async function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response> {
  const { message, name, stack } = err;

  const error = { name, message, statusCode: 500, stack };

  if (err instanceof AppError) error.statusCode = err.statusCode;

  return response.status(error.statusCode).json({ error });
}

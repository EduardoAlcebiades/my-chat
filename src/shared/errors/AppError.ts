type AppErrorConstructor = {
  message?: string;
  statusCode?: number;
};

class AppError extends Error {
  readonly statusCode: number;

  constructor({ message, statusCode = 500 }: AppErrorConstructor) {
    super(message);

    this.statusCode = statusCode;
  }
}

export { AppError, AppErrorConstructor };

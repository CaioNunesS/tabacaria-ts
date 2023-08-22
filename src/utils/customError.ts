export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode || 400;
  }
}

export const throwError = (message: string, stutusCode: number) => {
  throw new CustomError(message, stutusCode);
};

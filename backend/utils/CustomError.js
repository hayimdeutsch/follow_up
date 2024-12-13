export default class CustomError extends Error {
  constructor(message, statusCode, originalError) {
    super(message);
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

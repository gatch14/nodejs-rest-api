module.exports = class RouteNotFoundError extends Error {
  constructor(message, extra) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = 'RouteNotFoundError';
    this.message = message || 'API endpoint does not exist.';
    this.extra = extra;
  }
};

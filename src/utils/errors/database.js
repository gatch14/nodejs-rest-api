module.exports = class DatabaseError extends Error {
  constructor(message, extra) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'DatabaseError';
    this.message = message || 'Something went wrong :(';
    this.extra = extra;
  }
};

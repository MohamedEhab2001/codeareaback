const bookingError = require("./bookingError");
const { StatusCodes } = require("http-status-codes");
class unathanticated extends bookingError {
  constructor(message, howToFix) {
    super(message, howToFix);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = unathanticated;

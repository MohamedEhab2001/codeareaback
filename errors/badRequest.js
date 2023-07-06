const { StatusCodes } = require("http-status-codes");
const bookingError = require("./bookingError");
class badRequest extends bookingError {
  constructor(message, howToFix) {
    super(message, howToFix);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = badRequest;

const bookingError = require("./bookingError");
const { StatusCodes } = require("http-status-codes");
class internalServer extends bookingError {
  constructor(message, howToFix) {
    super(message, howToFix);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = internalServer;

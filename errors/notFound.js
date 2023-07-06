const bookingError = require("./bookingError");
const { StatusCodes } = require("http-status-codes");
class notFound extends bookingError {
  constructor(message, howToFix) {
    super(message, howToFix);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = notFound;

const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    type: err.constructor.name,
    msg: err.message,
    fixIt: err.howToFix,
    status: err.statusCode,
  });
};

module.exports = errorHandlerMiddleware;

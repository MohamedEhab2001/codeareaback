const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    type: err.constructor.name,
    msg: err.message,
    fixIt: err.howToFix,
    status: err.statusCode || err.status,
    err
  });
};

module.exports = errorHandlerMiddleware;

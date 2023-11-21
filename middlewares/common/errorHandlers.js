const createError = require("http-errors");

// 404 not found middleware
function notFoundHandler(req, res, next) {
  next(createError(404, `Can't find ${req.originalUrl} on this server!`));
}

function errorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

module.exports = { notFoundHandler, errorHandler };

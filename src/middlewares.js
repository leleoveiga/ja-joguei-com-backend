function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  // const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const statusMessage = err.response?.statusText ?? "Erro inesperado!";
  const status = err.response?.status ?? 500;
  res.statusMessage = statusMessage;
  res.status(status);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
};

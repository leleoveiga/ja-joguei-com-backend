function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  //   const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  console.log(err.response);
  console.log(err.response.data);
  res.status(err.response.data.status.status_code ?? err.statusCode);
  //   res.json({
  //     message: err.message,
  //     stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  //   });
  res.json(err.response.data);
}

module.exports = {
  notFound,
  errorHandler,
};

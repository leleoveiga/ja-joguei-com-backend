function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  // const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  console.log(err.response);
  // res.status(err.response.status);
  // console.log(`Error captured by middleware: ${err.message}`);
  // console.log(`Error captured by middleware: ${err.response.statusText}`);
  // res.json({
  //   message: err.message,
  //   stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  // });
}

module.exports = {
  notFound,
  errorHandler,
};

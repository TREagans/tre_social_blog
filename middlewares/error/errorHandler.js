// page not found 
const notFound = (req, res, next) => {

  // we'll construct our own error
  const error = new Error(`Not Found - ${req.originalUrl}`);

  // set status to 404 - not found 
  res.status(404);

  // pass the error to the next middleware
  next(error);
}


// this error handler takes 4 parameters - oct 18
// err object, request, response, and next
const errorHandler = (err, req, res, next) => {

  // sometimes when you have an error, you'll still get a
  // status code of 200, so this will prevent that from happening
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // apply our statusCode variable as the res.statusCode
  // and send back a .json response to the front end
  // we display the error stack track unless we're in prrod env
  res.status(statusCode).json({
    success: false,
    message: err?.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
}

module.exports = {
  errorHandler,
  notFound
}
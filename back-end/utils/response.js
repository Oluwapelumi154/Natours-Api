exports.serviceResponse = (status, statusCode, message, data) => ({
  status,
  statusCode,
  message,
  data
});

exports.successResponseMsg = (res, status, statusCode, message, data) =>
  res.status(statusCode).json({
    status,
    message,
    data
  });

exports.errResponseMsg = (res, status, statusCode, message) =>
  res.status(statusCode).json({
    status,
    message
  });

exports.authResponseMsg = (res, status, statusCode, message, data) =>
  res.status(statusCode).json({
    status,
    message,
    isAuthenticated: true,
    data
  });

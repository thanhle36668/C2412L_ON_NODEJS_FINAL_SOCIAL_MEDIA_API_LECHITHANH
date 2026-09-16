const resMiddleware = (_, res, next) => {
  res.success = (mess, statusCode = 200, data = null) => {
    return res.status(statusCode).json({
      success: true,
      mess,
      data,
    });
  };

  res.error = (mess, errorCode = "E-SV", statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      mess,
      errorCode,
    });
  };

  next();
};

module.exports = resMiddleware;

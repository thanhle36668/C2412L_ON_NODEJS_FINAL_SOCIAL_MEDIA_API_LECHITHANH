const errorMiddleware = (err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      mess: "JSON không hợp lệ",
      errorCode: "E-VAL",
    });
  }

  const message = err.message || "Internal Server Error";
  const errorCode = err.errorCode || "INTERNAL_SERVER_ERROR";
  const statusCode = err.statusCode || 500;

  if (typeof res.error === "function") {
    console.error("Error: " + err);
    return res.error(message, errorCode, statusCode);
  }

  return res
    .status(statusCode)
    .json({ success: false, mess: message, errorCode });
};

module.exports = errorMiddleware;

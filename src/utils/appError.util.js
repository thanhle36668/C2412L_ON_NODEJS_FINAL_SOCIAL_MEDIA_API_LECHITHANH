class AppError extends Error {
  constructor(message, errorCode, statusCode) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }

  static notFound(message = "Không tìm thấy tài nguyên") {
    return new AppError(message, "E-NOT", 404);
  }

  static forbidden(message = "Không có quyền thực hiện") {
    return new AppError(message, "E-FOR", 403);
  }

  static conflict(message = "Dữ liệu đã tồn tại") {
    return new AppError(message, "E-RES", 409);
  }

  static badRequest(message = "Dữ liệu không hợp lệ") {
    return new AppError(message, "E-BAD", 400);
  }

  static unauthorized(message = "Chưa đăng nhập hoặc phiên hết hạn") {
    return new AppError(message, "E-AUTH", 401);
  }
}

module.exports = AppError;

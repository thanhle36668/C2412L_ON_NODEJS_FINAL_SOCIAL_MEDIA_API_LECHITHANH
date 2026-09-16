const { verifyAccessToken } = require("../utils/jwt.util");
const User = require("../models/user.model");
const AppError = require("../utils/appError.util");
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const accessToken =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!accessToken) {
      throw AppError.unauthorized("Vui lòng đăng nhập (thiếu token)");
    }

    let decoded;
    try {
      decoded = verifyAccessToken(accessToken);
    } catch {
      throw AppError.unauthorized("Token không hợp lệ hoặc đã hết hạn");
    }

    const user = await User.findByPk(decoded.sub);
    if (!user) {
      throw AppError.unauthorized(
        "Người dùng không tồn tại hoặc phiên đã hết hạn",
      );
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;

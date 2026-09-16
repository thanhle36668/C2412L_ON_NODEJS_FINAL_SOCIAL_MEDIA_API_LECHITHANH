const { Op } = require("sequelize");
const User = require("../models/user.model");
const { hashPw, comparePw } = require("../utils/hashpw.util");
const { generateAccessToken } = require("../utils/jwt.util");
const AppError = require("../utils/appError.util");

class AuthService {
  async register({ username, email, password }) {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      throw AppError.conflict("Username hoặc email đã tồn tại");
    }

    const hashedPassword = await hashPw(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw AppError.badRequest("Email hoặc mật khẩu không đúng");
    }

    const isMatch = await comparePw(password, user.password);
    if (!isMatch) {
      throw AppError.badRequest("Email hoặc mật khẩu không đúng");
    }

    const accessToken = generateAccessToken({
      sub: user.id,
      username: user.username,
      email: user.email,
    });

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    };
  }
}

module.exports = new AuthService();

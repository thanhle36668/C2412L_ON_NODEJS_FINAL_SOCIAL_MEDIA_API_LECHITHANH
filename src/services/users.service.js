const { Op } = require("sequelize");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const AppError = require("../utils/appError.util");

class UsersService {
  getMe(user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };
  }

  async getById(id) {
    const user = await User.findByPk(id, {
      attributes: ["id", "username", "email", "avatar"],
      include: [
        {
          model: Post,
          as: "posts",
        },
      ],
    });

    if (!user) {
      throw AppError.notFound("Người dùng không tồn tại");
    }

    return user;
  }

  async updateMe(id, { username, avatar }) {
    const allowedUpdate = {};
    if (username !== undefined) {
      const existing = await User.findOne({
        where: {
          username,
          id: { [Op.ne]: id },
        },
      });

      if (existing) {
        throw AppError.conflict("Username đã tồn tại");
      }

      allowedUpdate.username = username;
    }

    if (avatar !== undefined) {
      allowedUpdate.avatar = avatar;
    }

    await User.update(allowedUpdate, {
      where: { id },
    });

    const updatedUser = await User.findByPk(id, {
      attributes: ["id", "username", "email", "avatar"],
    });

    return updatedUser;
  }
}

module.exports = new UsersService();

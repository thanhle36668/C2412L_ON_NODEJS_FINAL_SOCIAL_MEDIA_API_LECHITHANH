const usersService = require("../services/users.service");

class UsersController {
  async getMe(req, res, next) {
    try {
      const user = usersService.getMe(req.user);
      return res.success("Lấy thông tin người dùng thành công", 200, user);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const id = Number(req.params.id);
      const user = await usersService.getById(id);
      return res.success("Lấy thông tin người dùng thành công", 200, user);
    } catch (error) {
      next(error);
    }
  }

  async updateMe(req, res, next) {
    try {
      const id = req.user.id;
      const { username, avatar } = req.body;
      const user = await usersService.updateMe(id, {
        username,
        avatar,
      });
      return res.success("Cập nhật thông tin thành công", 200, user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();

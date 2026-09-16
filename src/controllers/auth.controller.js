const authService = require("../services/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const newUser = await authService.register({ username, email, password });
      return res.success("Đăng ký tài khoản thành công", 201, newUser);
    } catch (error) {
      console.error("Error: " + error.message);
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await authService.login({ email, password });
      return res.success("Đăng nhập thành công", 200, result);
    } catch (error) {
      console.error("Error: " + error.message);
      next(error);
    }
  }
}

module.exports = new AuthController();

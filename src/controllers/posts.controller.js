const postsService = require("../services/posts.service");

class PostsController {
  async getFeed(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await postsService.getFeed(page, limit);
      return res.success("Lấy danh sách bài viết thành công", 200, result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const postId = Number(req.params.id);
      const post = await postsService.getById(postId);
      return res.success("Lấy chi tiết bài viết thành công", 200, post);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userId = req.user.id;
      const { content, image_url } = req.body;
      const newPost = await postsService.create(userId, { content, image_url });
      return res.success("Tạo bài viết thành công", 201, newPost);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const postId = Number(req.params.id);
      const userId = req.user.id;
      const deletedPost = await postsService.delete(postId, userId);
      return res.success("Đã xóa thành công", 200, deletedPost);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const postId = Number(req.params.id);
      const userId = req.user.id;
      const { content, image_url } = req.body;
      const updatedPost = await postsService.update(postId, userId, {
        content,
        image_url,
      });
      return res.success("Cập nhật bài viết thành công", 200, updatedPost);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostsController();

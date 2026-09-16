const commentsService = require("../services/comments.service");

class CommentsController {
  async getByPost(req, res, next) {
    try {
      const postId = Number(req.params.postId);
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await commentsService.getByPost(postId, page, limit);
      return res.success("Lấy comment thành công", 200, result);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const postId = Number(req.params.postId);
      const userId = req.user.id;
      const { content } = req.body;
      const newComment = await commentsService.create(postId, userId, {
        content,
      });
      return res.success("Tạo comment thành công", 201, newComment);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = Number(req.params.id);
      const userId = req.user.id;
      const commentDeleted = await commentsService.delete(id, userId);
      return res.success("Xóa comment thành công", 200, commentDeleted);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentsController();

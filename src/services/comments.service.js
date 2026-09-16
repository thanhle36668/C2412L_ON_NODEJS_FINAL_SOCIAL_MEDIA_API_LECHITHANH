const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const AppError = require("../utils/appError.util");

class CommentsService {
  async getByPost(postId, page, limit) {
    const post = await Post.findByPk(postId);

    if (!post) throw AppError.notFound("Bài viết không tồn tại");

    const { count, rows } = await Comment.findAndCountAll({
      where: { postId },
      limit,
      offset: (page - 1) * limit,
      order: [
        ["createdAt", "DESC"],
        ["id", "DESC"],
      ],
      attributes: ["id", "content", "createdAt", "updatedAt"],
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "avatar"],
        },
      ],
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async create(postId, userId, { content }) {
    const post = await Post.findByPk(postId);

    if (!post) {
      throw AppError.notFound("Bài viết không tồn tại");
    }

    const newComment = await Comment.create({
      postId,
      userId,
      content,
    });

    return newComment;
  }

  async delete(id, userId) {
    const comment = await Comment.findByPk(id);

    if (!comment) {
      throw AppError.notFound("Comment không tồn tại");
    }

    if (comment.userId !== userId) {
      throw AppError.forbidden("Bạn không có quyền xóa comment này");
    }

    await comment.destroy();

    return comment;
  }
}

module.exports = new CommentsService();

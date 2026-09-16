const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
const AppError = require("../utils/appError.util");
class PostsService {
  async getFeed(page, limit) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Post.findAndCountAll({
      limit,
      offset,
      order: [
        ["createdAt", "DESC"],
        ["id", "DESC"],
      ],
      include: [
        { model: User, as: "author", attributes: ["id", "username", "avatar"] },
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

  async getById(id) {
    const post = await Post.findByPk(id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "avatar"],
        },
      ],
    });

    if (!post) {
      throw AppError.notFound("Bài viết không tồn tại");
    }

    return post;
  }

  async create(userId, { content, image_url }) {
    const newPost = await Post.create({
      userId,
      content,
      imageUrl: image_url || null,
    });

    return newPost;
  }

  async update(postId, userId, { content, image_url }) {
    const allowedUpdate = {};

    const post = await Post.findByPk(postId);

    if (!post) {
      throw AppError.notFound("Bài viết không tồn tại");
    }

    if (post.userId !== userId) {
      throw AppError.forbidden("Bạn không có quyền cập nhật bài viết này");
    }

    if (content !== undefined) allowedUpdate.content = content;
    if (image_url !== undefined) allowedUpdate.imageUrl = image_url;

    await post.update(allowedUpdate);

    return post;
  }

  async delete(postId, userId) {
    const post = await Post.findByPk(postId);

    if (!post) {
      throw AppError.notFound("Bài viết không tồn tại");
    }

    if (post.userId !== userId) {
      throw AppError.forbidden("Bạn không có quyền xóa bài viết này");
    }

    await Comment.destroy({ where: { postId: post.id } });
    await post.destroy();

    return post;
  }
}

module.exports = new PostsService();

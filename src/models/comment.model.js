const { sequelize } = require("../configs/db.config");
const { DataTypes } = require("sequelize");
const User = require("./user.model");
const Post = require("./post.model");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "post_id",
    },
  },
  {
    tableName: "comment",
    timestamps: true,
    paranoid: true,
  },
);

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "author" });

Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

module.exports = Comment;

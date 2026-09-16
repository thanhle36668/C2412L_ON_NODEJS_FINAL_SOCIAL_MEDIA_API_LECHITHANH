const { param, query, body } = require("express-validator");
const getCommentValidation = [
  param("postId").isInt({ min: 1 }).withMessage("ID phải là số nguyên dương"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page phải là số nguyên lớn hơn hoặc bằng 1"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("limit phải là số nguyên từ 1 đến 50"),
];

const createCommentValidation = [
  param("postId").isInt({ min: 1 }).withMessage("ID phải là số nguyên dương"),
  body("content")
    .notEmpty()
    .withMessage("Nội dung comment không được để trống")
    .isLength({ max: 1000 })
    .withMessage("Nội dung comment tối đa 1000 ký tự"),
];

const deleteCommentValidation = [
  param("id").isInt({ min: 1 }).withMessage("ID phải là số nguyên dương"),
];

module.exports = {
  getCommentValidation,
  createCommentValidation,
  deleteCommentValidation,
};

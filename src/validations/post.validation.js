const { query, param, body } = require("express-validator");

const getFeedValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page phải là số nguyên lớn hơn hoặc bằng 1"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("limit phải là số nguyên từ 1 đến 50"),
];

const postIdParam = [
  param("id").isInt({ min: 1 }).withMessage("ID phải là số nguyên dương"),
];

const createPostValidation = [
  body("content")
    .notEmpty()
    .withMessage("Content không được để trống")
    .isLength({ max: 1000 })
    .withMessage("Content tối đa 1000 ký tự"),
  body("image_url").optional().isURL().withMessage("Image URL không hợp lệ"),
];

const updatePostValidation = [
  body("content")
    .optional()
    .notEmpty()
    .withMessage("Content không được để trống")
    .isLength({ max: 1000 })
    .withMessage("Content tối đa 1000 ký tự"),
  body("image_url").optional().isURL().withMessage("Image URL không hợp lệ"),
];

module.exports = {
  getFeedValidation,
  postIdParam,
  createPostValidation,
  updatePostValidation,
};

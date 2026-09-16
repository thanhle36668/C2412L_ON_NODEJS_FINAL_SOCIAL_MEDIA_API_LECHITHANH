const { body, param } = require("express-validator");

const userIdParam = [
  param("id").isInt({ min: 1 }).withMessage("ID phải là số nguyên dương"),
];

const updateMeValidation = [
  body("username")
    .optional()
    .notEmpty()
    .withMessage("Username không được để trống")
    .isLength({ min: 3 })
    .withMessage("Username tối thiểu 3 ký tự"),
  body("avatar")
    .optional()
    .isURL()
    .withMessage("Avatar phải là đường dẫn hợp lệ (URL)"),
];

module.exports = { updateMeValidation, userIdParam };

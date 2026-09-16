const { body } = require("express-validator");

const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username không được để trống")
    .isLength({ min: 3 })
    .withMessage("Username tối thiểu 3 ký tự"),
  body("email")
    .notEmpty()
    .withMessage("Email không được để trống")
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("password")
    .notEmpty()
    .withMessage("Password không được để trống")
    .isLength({ min: 6 })
    .withMessage("Password tối thiểu 6 ký tự"),
];

const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email không được để trống")
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("password").notEmpty().withMessage("Password không được để trống"),
];

module.exports = { registerValidation, loginValidation };

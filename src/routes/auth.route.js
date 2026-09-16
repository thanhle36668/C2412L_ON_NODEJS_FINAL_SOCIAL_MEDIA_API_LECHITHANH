const express = require("express");
const {
  registerValidation,
  loginValidation,
} = require("../validations/auth.validation");
const validate = require("../middlewares/validate.middleware");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/health", (_, res) => {
  res.success("Auth is listening....", 200);
});

router.post("/register", registerValidation, validate, authController.register);
router.post("/login", loginValidation, validate, authController.login);

module.exports = router;

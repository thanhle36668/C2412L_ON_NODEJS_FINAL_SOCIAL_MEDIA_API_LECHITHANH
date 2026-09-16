const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const usersController = require("../controllers/users.controller");
const validate = require("../middlewares/validate.middleware");
const {
  updateMeValidation,
  userIdParam,
} = require("../validations/user.validation");

const router = express.Router();

router.get("/health", (_, res) => {
  res.success("Users is listening....", 200);
});

router.use(authMiddleware);

router.get("/me", usersController.getMe);

router.get("/:id", userIdParam, validate, usersController.getById);

router.put("/me", updateMeValidation, validate, usersController.updateMe);

module.exports = router;

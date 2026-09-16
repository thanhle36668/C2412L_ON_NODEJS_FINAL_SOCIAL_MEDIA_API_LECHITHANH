const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getCommentValidation,
  createCommentValidation,
  deleteCommentValidation,
} = require("../validations/comment.validation");
const validate = require("../middlewares/validate.middleware");
const commentsController = require("../controllers/comments.controller");

const router = express.Router();

router.get("/health", (_, res) => {
  res.success("Comments is listening....", 200);
});

router.use(authMiddleware);

router.get(
  "/post/:postId",
  getCommentValidation,
  validate,
  commentsController.getByPost,
);

router.post(
  "/post/:postId",
  createCommentValidation,
  validate,
  commentsController.create,
);
router.delete(
  "/:id",
  deleteCommentValidation,
  validate,
  commentsController.delete,
);

module.exports = router;

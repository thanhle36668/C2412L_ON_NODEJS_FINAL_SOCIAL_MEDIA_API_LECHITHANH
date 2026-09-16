const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getFeedValidation,
  postIdParam,
  createPostValidation,
  updatePostValidation,
} = require("../validations/post.validation");
const validate = require("../middlewares/validate.middleware");
const postsController = require("../controllers/posts.controller");

const router = express.Router();

router.get("/health", (_, res) => {
  res.success("Posts is listening....", 200);
});

router.use(authMiddleware);

router.get("/", getFeedValidation, validate, postsController.getFeed);

router.get("/:id", postIdParam, validate, postsController.getById);

router.post("/", createPostValidation, validate, postsController.create);

router.put(
  "/:id",
  postIdParam,
  updatePostValidation,
  validate,
  postsController.update,
);

router.delete("/:id", postIdParam, validate, postsController.delete);

module.exports = router;

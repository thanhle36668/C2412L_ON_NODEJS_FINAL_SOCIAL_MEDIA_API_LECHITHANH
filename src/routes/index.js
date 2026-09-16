const express = require("express");
const authRouter = require("./auth.route");
const usersRouter = require("./users.route");
const postsRouter = require("./posts.route");
const commentsRouter = require("./comments.route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);

module.exports = router;

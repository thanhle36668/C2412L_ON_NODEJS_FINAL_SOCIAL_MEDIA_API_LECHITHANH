const express = require("express");
const resMiddleware = require("./src/middlewares/response.middleware");
const errorMiddleware = require("./src/middlewares/error.middleware");
const { connectDB } = require("./src/configs/db.config");
const { port } = require("./src/configs/env.config");
const router = require("./src/routes");

const app = express();

app.use(resMiddleware);

app.use(express.json());

app.use("/api", router);

app.get("/health", (_, res, next) => {
  try {
    res.success("App is running...", 200);
  } catch (error) {
    console.error("Error: " + error.message);
    next(new Error("Lỗi Server...."));
  }
});

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`App is running in port ${port}`);
    });
  } catch (error) {
    console.error("Lỗi khởi động server:", error.message);
    process.exit(1);
  }
};

startServer();

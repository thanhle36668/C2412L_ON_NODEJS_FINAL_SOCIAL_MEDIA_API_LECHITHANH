const { Sequelize } = require("sequelize");
const { db, nodeEnv } = require("./env.config");

const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  port: db.port,
  dialect: "mysql",
  logging: nodeEnv === "development" ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công....");
  } catch {
    throw new Error("Kết nối database thất bại");
  }
};

module.exports = { sequelize, connectDB };

const jwt = require("jsonwebtoken");

const { jwt: jwtConfig } = require("../configs/env.config");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, jwtConfig.accessSecret, {
    expiresIn: jwtConfig.accessExpiresIn,
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, jwtConfig.accessSecret);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};

const bcrypt = require("bcrypt");
const { bcryptSaltRounds } = require("../configs/env.config");

const hashPw = async (rawPw) => {
  const salt = await bcrypt.genSalt(bcryptSaltRounds);

  return bcrypt.hash(String(rawPw), salt);
};

const comparePw = async (rawPw, hashedPw) => {
  return bcrypt.compare(String(rawPw), hashedPw);
};

module.exports = {
  hashPw,
  comparePw,
};
